export const metadata = {
  title: '赞助合作',
  description: '赞助政策、合作案例与联系方式',
};

export default function SponsorPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">赞助合作</h1>
      <p className="mt-2 text-slate-600">
        战队赞助政策、赞助权益（宣传曝光、品牌展示）、合作案例。公开赞助对接人姓名、电话、邮箱；支持在线提交赞助咨询表单。赞助商 Logo、名称展示（需获得授权）。
      </p>
      <div className="mt-8 space-y-8">
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-800">赞助权益</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
            <li>宣传曝光与品牌展示</li>
            <li>赛事与日常露出</li>
            <li>（更多权益由管理员配置）</li>
          </ul>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-800">联系我们</h2>
          <p className="mt-2 text-slate-600">赞助对接人：（管理员配置姓名、电话、邮箱）</p>
          <p className="mt-2 text-sm text-slate-500">支持在线提交赞助咨询表单。</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-800">合作赞助商</h2>
          <div className="mt-4 flex flex-wrap gap-6">
            <div className="h-16 w-32 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
              Logo
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
