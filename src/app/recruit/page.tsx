import Link from 'next/link';

export const metadata = {
  title: '新人招募',
  description: '招募组别、要求与在线报名',
};

export default function RecruitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">新人招募</h1>
      <p className="mt-2 text-slate-600">
        招募周期、各组别（机械、电控、算法、运营、宣传）招募要求。在线报名表单：姓名、联系方式、专业、意向组别、个人简介、附件（简历、作品）。报名人员可登录查看审核进度。
      </p>
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">当前招募阶段：未开始 / 招募中 / 已结束</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">姓名</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              placeholder="请输入"
              readOnly
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">联系方式</label>
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              placeholder="手机/邮箱"
              readOnly
              disabled
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">意向组别</label>
            <select className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" disabled>
              <option>机械组</option>
              <option>电控组</option>
              <option>算法组</option>
              <option>运营组</option>
              <option>宣传组</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700">个人简介</label>
            <textarea
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              rows={4}
              placeholder="报名开放后在此填写"
              readOnly
              disabled
            />
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          正式报名功能将对接后端 API，支持附件上传与审核进度查询。
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
        >
          先注册账号
        </Link>
      </div>
    </div>
  );
}
