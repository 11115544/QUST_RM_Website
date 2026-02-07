import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/dashboard');

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto bg-slate-50">
        {children}
      </div>
    </div>
  );
}
