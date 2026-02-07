import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SessionProvider } from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
  title: {
    default: '青岛科技大学 YKTKEMIAO 战队 | RoboMaster 战队管理平台',
    template: '%s | 青岛科技大学 YKTKEMIAO 战队',
  },
  description: '青岛科技大学 RoboMaster 机甲大师 YKTKEMIAO 战队 — 日常运营、研发训练、赛事备战、对外展示',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
