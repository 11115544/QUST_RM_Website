
export const metadata = {
  title: '荣誉展示 - 青岛科技大学 YKTKEMIAO 战队',
  description: '青岛科技大学 RoboMaster 战队历年赛事及科技类奖项',
};

const honors = [
  {
    id: '2025-rmul-shandong',
    title: '第二十四届全国大学生机器人大赛 RoboMaster 2025 机甲大师高校联盟赛（山东站）步兵对抗赛 三等奖',
    org: '青岛科技大学 YKTKEMIAO 战队',
    time: '2025年4月10日',
    issued: '全国大学生机器人大赛组委会',
    image: '/images/honor-cert-2025.png',
  },
  // 更多荣誉可由后台录入
];

export default function HonorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">荣誉展示</h1>
      <p className="mt-2 text-slate-600">
        青岛科技大学 YKTKEMIAO 战队 · 按时间倒序排列，支持按年份、奖项类型筛选。赛事荣誉、科技类奖项、赞助合作荣誉等。
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {honors.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
          >
            <div className="relative aspect-[3/4] bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-800 line-clamp-2">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{item.org}</p>
              <p className="mt-0.5 text-sm text-slate-500">{item.time} · {item.issued}</p>
            </div>
          </div>
        ))}
        {/* 占位：更多荣誉由后台录入后展示 */}
        {[1, 2].map((i) => (
          <div
            key={`placeholder-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="h-40 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
              获奖照片/视频
            </div>
            <h3 className="mt-3 font-semibold text-slate-800">奖项名称</h3>
            <p className="mt-1 text-sm text-slate-500">获奖时间 · 参赛队员</p>
          </div>
        ))}
      </div>
    </div>
  );
}
