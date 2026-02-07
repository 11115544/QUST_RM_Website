export default function MembersPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">队员管理</h1>
      <p className="mt-1 text-slate-600">
        队员信息录入/修改、分组管理、考勤管理、成长记录。队员可修改个人联系方式与简介，核心信息需管理员审核。
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        列表与表单功能待对接 API 与权限（超级管理员/模块管理员/普通队员/指导老师）。
      </div>
    </div>
  );
}
