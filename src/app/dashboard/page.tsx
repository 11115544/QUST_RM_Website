import Link from 'next/link';
import { Users, Trophy, Bot, Package, CheckSquare, Calendar } from 'lucide-react';

const cards = [
  { href: '/dashboard/members', label: '队员管理', icon: Users, desc: '队员信息、考勤、成长记录' },
  { href: '/dashboard/competitions', label: '赛事管理', icon: Trophy, desc: '赛事信息、备战、成绩与复盘' },
  { href: '/dashboard/robots', label: '机器人研发', icon: Bot, desc: '机器人档案、研发进度、技术文档、故障' },
  { href: '/dashboard/materials', label: '物资装备', icon: Package, desc: '物资分类、出入库、库存、采购' },
  { href: '/dashboard/tasks', label: '任务管理', icon: CheckSquare, desc: '日常任务、会议、经费、通知' },
  { href: '/dashboard/calendar', label: '日程协作', icon: Calendar, desc: '团队日历、个人日程' },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900">工作台</h1>
      <p className="mt-1 text-slate-600">快速进入各核心管理模块</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">{item.label}</h2>
                <p className="mt-0.5 text-sm text-slate-600">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
