import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold text-white">青岛科技大学 YKTKEMIAO 战队</p>
            <p className="mt-1 text-sm">QUST · RoboMaster 机甲大师 · 日常运营 · 赛事备战 · 对外展示</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/about" className="hover:text-white">战队简介</Link>
            <Link href="/honors" className="hover:text-white">荣誉展示</Link>
            <Link href="/recruit" className="hover:text-white">新人招募</Link>
            <Link href="/sponsor" className="hover:text-white">赞助合作</Link>
          </div>
        </div>
        <p className="mt-6 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          注：文档部分内容可能由 AI 生成 · 仅供战队内部使用
        </p>
      </div>
    </footer>
  );
}
