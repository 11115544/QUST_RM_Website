import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">找回密码</h1>
      <p className="mt-1 text-slate-600">通过手机号或邮箱找回密码（功能待对接验证码与重置接口）</p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        此处将提供：输入手机号/邮箱 → 发送验证码 → 验证后设置新密码。
      </div>
      <Link href="/login" className="mt-6 inline-block text-sm text-primary hover:underline">
        返回登录
      </Link>
    </div>
  );
}
