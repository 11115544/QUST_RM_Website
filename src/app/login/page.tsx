'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        login,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError('手机号/邮箱或密码错误');
        setLoading(false);
        return;
      }
      window.location.href = callbackUrl;
    } catch {
      setError('登录失败，请重试');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">登录</h1>
      <p className="mt-1 text-slate-600">使用手机号或邮箱登录</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="login" className="block text-sm font-medium text-slate-700">
            手机号 / 邮箱
          </label>
          <input
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="请输入手机号或邮箱"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="请输入密码"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary"
            />
            记住密码
          </label>
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            忘记密码？
          </Link>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2.5 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        还没有账号？{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          注册
        </Link>
      </p>
    </div>
  );
}
