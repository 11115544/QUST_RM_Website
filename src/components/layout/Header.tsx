'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

const publicNav = [
  { href: '/', label: '首页' },
  { href: '/about', label: '战队简介' },
  { href: '/honors', label: '荣誉展示' },
  { href: '/gallery', label: '战队风采' },
  { href: '/recruit', label: '新人招募' },
  { href: '/sponsor', label: '赞助合作' },
];

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard');
  const isLogin = pathname === '/login' || pathname === '/register';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-secondary no-underline">
          <span className="relative flex h-9 w-9 shrink-0 sm:h-10 sm:w-10">
            <img
              src="/images/qust-badge.png"
              alt="青岛科技大学校徽"
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden text-slate-700 sm:inline">
            <span className="text-primary">青岛科技大学</span>
            <span className="mx-1 text-slate-400">·</span>
            <span>YKTKEMIAO 战队</span>
          </span>
          <span className="text-slate-700 sm:hidden">青科大 RM 战队</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {item.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors',
                isDashboard ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              工作台
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {status === 'loading' ? (
            <span className="text-sm text-slate-500">加载中...</span>
          ) : session ? (
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full p-1.5 hover:bg-slate-100"
                aria-label="用户菜单"
              >
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium max-w-[120px] truncate">
                  {session.user?.name}
                </span>
              </button>
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border bg-white py-1 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  工作台
                </Link>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 text-red-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </button>
              </div>
            </div>
          ) : !isLogin ? (
            <>
              <Link
                href="/login"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
              >
                登录
              </Link>
              <Link
                href="/register"
                className="hidden sm:block rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
              >
                注册
              </Link>
            </>
          ) : null}
          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="菜单"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block rounded-md px-3 py-2 text-sm font-medium',
                pathname === item.href ? 'bg-primary/10 text-primary' : 'text-slate-600'
              )}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600"
              onClick={() => setMobileOpen(false)}
            >
              工作台
            </Link>
          )}
          {!session && !isLogin && (
            <div className="mt-2 flex gap-2">
              <Link href="/login" className="flex-1 rounded-md bg-primary py-2 text-center text-sm text-white">
                登录
              </Link>
              <Link href="/register" className="flex-1 rounded-md border py-2 text-center text-sm">
                注册
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
