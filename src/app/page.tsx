import Link from 'next/link';
import { Trophy, Users, Wrench, Calendar } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-20">
      <section className="text-center">
        <div className="flex justify-center gap-4 items-center flex-wrap">
          <img
            src="/images/qust-badge.png"
            alt="青岛科技大学校徽"
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain shrink-0"
          />
          <img
            src="/images/team-logo.png"
            alt="YKTKEMIAO 战队 Logo"
            className="h-14 w-14 sm:h-16 sm:w-16 object-contain shrink-0"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          青岛科技大学 <span className="text-primary">YKTKEMIAO</span> 战队
        </h1>
        <p className="mt-2 text-sm text-slate-500">RoboMaster 机甲大师 · 战队管理平台</p>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          围绕日常运营、研发训练、赛事备战、对外展示，为战队提供一体化管理与展示能力。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/about"
            className="rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90"
          >
            了解战队
          </Link>
          <Link
            href="/recruit"
            className="rounded-lg border border-slate-300 px-6 py-3 text-base font-medium hover:bg-slate-50"
          >
            加入我们
          </Link>
        </div>
      </section>

      <section className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/about"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <Users className="h-10 w-10 text-primary" />
          <h2 className="mt-3 font-semibold text-slate-900">战队简介</h2>
          <p className="mt-1 text-sm text-slate-600">
            成立时间、发展历程、组织架构与核心宗旨
          </p>
        </Link>
        <Link
          href="/honors"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <Trophy className="h-10 w-10 text-primary" />
          <h2 className="mt-3 font-semibold text-slate-900">荣誉展示</h2>
          <p className="mt-1 text-sm text-slate-600">
            历年赛事获奖、科技类奖项与赞助合作荣誉
          </p>
        </Link>
        <Link
          href="/gallery"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <Wrench className="h-10 w-10 text-primary" />
          <h2 className="mt-3 font-semibold text-slate-900">战队风采</h2>
          <p className="mt-1 text-sm text-slate-600">
            训练日常、赛事瞬间、机器人测试与队员介绍
          </p>
        </Link>
        <Link
          href="/sponsor"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <Calendar className="h-10 w-10 text-primary" />
          <h2 className="mt-3 font-semibold text-slate-900">赞助合作</h2>
          <p className="mt-1 text-sm text-slate-600">
            赞助政策、合作案例与对接方式
          </p>
        </Link>
      </section>

      <section className="mt-20 rounded-2xl bg-slate-900 px-6 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">青岛科技大学 YKTKEMIAO 战队 · 新人招募</h2>
        <p className="mt-2 text-slate-300">
          机械、电控、算法、运营、宣传等组别持续招募中
        </p>
        <Link
          href="/recruit"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium hover:bg-primary/90"
        >
          立即报名
        </Link>
      </section>
    </div>
  );
}
