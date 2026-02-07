import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from './prisma';
// 与 schema 中 role 取值一致（SQLite 无 enum，用字符串）
export type SessionRole = 'SUPER_ADMIN' | 'MODULE_ADMIN' | 'MEMBER' | 'TEACHER' | 'GUEST';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login', error: '/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        login: { label: '手机号/邮箱', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null;
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.login },
              { phone: credentials.login },
            ],
          },
          include: { profile: true },
        });
        if (!user?.passwordHash) return null;
        const ok = await compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name,
          role: user.role,
          image: user.profile?.avatar ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role as SessionRole;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: SessionRole }).role = token.role as SessionRole;
      }
      return session;
    },
  },
};
