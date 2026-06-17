import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  college?: string;
}

export function AppShell({ children, userName, college }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar userName={userName} college={college} />
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
