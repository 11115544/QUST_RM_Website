import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  name: z.string().min(1, '请输入姓名'),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(6, '密码至少 6 位'),
  groupId: z.string().optional(),
  intro: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors[0]?.message ?? '参数错误' },
        { status: 400 }
      );
    }
    const { name, phone, email, password, groupId, intro } = parsed.data;
    if (!phone && !email) {
      return NextResponse.json(
        { message: '请至少填写手机号或邮箱' },
        { status: 400 }
      );
    }
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          ...(phone ? [{ phone }] : []),
          ...(email ? [{ email }] : []),
        ].filter(Boolean),
      },
    });
    if (existing) {
      return NextResponse.json(
        { message: '该手机号或邮箱已注册' },
        { status: 400 }
      );
    }
    const passwordHash = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        passwordHash,
        role: 'GUEST',
      },
    });
    await prisma.teamJoinRequest.create({
      data: {
        userId: user.id,
        groupId: groupId || null,
        intro: intro || null,
        status: 'pending',
      },
    });
    return NextResponse.json({ ok: true, userId: user.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: '注册失败，请稍后重试' },
      { status: 500 }
    );
  }
}
