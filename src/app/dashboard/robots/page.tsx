export default function RobotsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">机器人研发</h1>
      <p className="mt-1 text-slate-600">
        机器人档案、设计资料、版本管理、研发任务与进度、技术文档归档、故障上报与处理。
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        支持代码高亮、图纸在线预览（CAD/SolidWorks）。故障管理待开发。
      </div>
    </div>
  );
}
