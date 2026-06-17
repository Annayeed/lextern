"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions";
import {
  LayoutDashboard,
  PlusCircle,
  User,
  LogOut,
  Scale,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applications/new", label: "Add Application", icon: PlusCircle },
  { href: "/profile", label: "My Profile", icon: User },
];

interface SidebarProps {
  userName?: string;
  college?: string;
}

export function Sidebar({ userName, college }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-navy-900 min-h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-gold shrink-0">
          <Scale size={14} className="text-navy-900" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-none">LexTern</p>
          <p className="text-[10px] text-white/30 mt-0.5 leading-none">Internship OS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
            >
              <Icon size={16} className={active ? "text-amber-gold" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + sign out */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-gold/20">
            <Briefcase size={12} className="text-amber-gold" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/80 truncate">{userName ?? "Student"}</p>
            <p className="text-[10px] text-white/30 truncate">{college ?? ""}</p>
          </div>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                       text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
