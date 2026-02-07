'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [group, setGroup] = useState('');
  const [intro, setIntro] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: phone || undefined,
          email: email || undefined,
          password,
          groupId: group || undefined,
          intro: intro || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || '注册失败');
        setLoading(false);
        return;
      }
      router.push('/login?registered=1');
    } catch {
      setError('网络错误，请重试');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-slate-900">注册</h1>
      <p className="mt-1 text-slate-600">填写信息后需队长审核通过方可加入战队</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            姓名
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            手机号
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
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
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            minLength={6}
            required
          />
        </div>
        <div>
          <label htmlFor="group" className="block text-sm font-medium text-slate-700">
            意向组别
          </label>
          <select
            id="group"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          >
            <option value="">请选择</option>
            <option value="mechanical">机械组</option>
            <option value="electronic">电控组</option>
            <option value="algorithm">算法组</option>
            <option value="operation">运营组</option>
            <option value="media">宣传组</option>
          </select>
        </div>
        <div>
          <label htmlFor="intro" className="block text-sm font-medium text-slate-700">
            个人简介
          </label>
          <textarea
            id="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            rows={3}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary py-2.5 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? '提交中...' : '提交注册'}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        已有账号？{' '}
        <Link href="/login" className="font-medium text-primary hover:underline">
          登录
        </Link>
      </p>
    </div>
  );
}
