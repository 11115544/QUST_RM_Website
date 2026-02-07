'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Bot,
  Package,
  CheckSquare,
  MessageSquare,
  FolderOpen,
  Bell,
  Calendar,
  Settings,
} from 'lucide-react';

const nav = [
  { href: '/dashboard', label: '工作台', icon: LayoutDashboard },
  { href: '/dashboard/members', label: '队员管理', icon: Users },
  { href: '/dashboard/competitions', label: '赛事管理', icon: Trophy },
  { href: '/dashboard/robots', label: '机器人研发', icon: Bot },
  { href: '/dashboard/materials', label: '物资装备', icon: Package },
  { href: '/dashboard/tasks', label: '任务管理', icon: CheckSquare },
  { href: '/dashboard/forum', label: '讨论区', icon: MessageSquare },
  { href: '/dashboard/files', label: '文件共享', icon: FolderOpen },
  { href: '/dashboard/messages', label: '消息通知', icon: Bell },
  { href: '/dashboard/calendar', label: '日程协作', icon: Calendar },
  { href: '/dashboard/settings', label: '网站设置', icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-0.5 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
