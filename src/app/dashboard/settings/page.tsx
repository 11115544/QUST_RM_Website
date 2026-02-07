export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">网站设置</h1>
      <p className="mt-1 text-slate-600">
        战队名称/Logo/口号/简介、配色与导航、数据备份与恢复、操作日志、移动端适配。
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        仅超级管理员可操作。配置项与备份/日志待开发。
      </div>
    </div>
  );
}
