import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { AppShell } from "@/components/layout/AppShell";
import { StatsCard } from "@/components/ui/StatsCard";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { EmptyState } from "@/components/ui/EmptyState";
import { UpcomingActions } from "@/components/dashboard/UpcomingActions";
import { UpcomingFollowups } from "@/components/dashboard/UpcomingFollowups";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import type { Application, Profile } from "@/types";
import { formatDate, isOverdue, isDueSoon } from "@/lib/utils";
import { AlertCircle, Calendar, PlusCircle, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const supabase = await createServerSupabaseClient();
  const params = await searchParams;
  const view = params.view === "kanban" ? "kanban" : "list";

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: applications }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false }),
  ]);

  const apps = (applications ?? []) as Application[];
  const prof = profile as Profile | null;

  // Compute stats
  const stats = {
    total: apps.length,
    applied: apps.filter((a) => a.status === "applied").length,
    interview: apps.filter((a) => a.status === "interview_scheduled").length,
    offer: apps.filter((a) =>
      ["offer_received", "accepted"].includes(a.status)
    ).length,
  };

  const overdueFollowups = apps.filter(
    (a) => isOverdue(a.followup_date) && !["accepted", "rejected"].includes(a.status)
  );

  const upcomingDeadlines = apps.filter(
  (a) =>
    isDueSoon(a.deadline_date, 7) &&
    !["accepted", "rejected"].includes(a.status)
);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = prof?.full_name?.split(" ")[0] ?? "there";

  return (
    <AppShell userName={prof?.full_name} college={prof?.college}>
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {greeting}, {firstName}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {prof?.college} · {prof?.year_of_study ? `${prof.year_of_study}${["st","nd","rd"][prof.year_of_study-1]||"th"} year` : ""}
        </p>
      </div>

      {/* Alerts */}
      {(overdueFollowups.length > 0 || upcomingDeadlines.length > 0) && (
        <div className="mb-6 space-y-2">
          {overdueFollowups.length > 0 && (
            <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  {overdueFollowups.length} follow-up{overdueFollowups.length > 1 ? "s" : ""} overdue
                </p>
                <p className="text-xs text-amber-600 mt-0.5">
                  {overdueFollowups.map((a) => a.org_name).slice(0, 3).join(", ")}
                  {overdueFollowups.length > 3 && ` and ${overdueFollowups.length - 3} more`}
                </p>
              </div>
            </div>
          )}
          {upcomingDeadlines.length > 0 && (
            <div className="flex items-start gap-3 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3">
              <Calendar size={16} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {upcomingDeadlines.length} deadline{upcomingDeadlines.length > 1 ? "s" : ""} in the next 7 days
                </p>
                <p className="text-xs text-blue-600 mt-0.5">
                  {upcomingDeadlines.map((a) => `${a.org_name} (${formatDate(a.deadline_date)})`).slice(0,2).join(" · ")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

<UpcomingActions count={apps.length} />

<UpcomingFollowups
  items={apps.filter((a) => a.followup_date)}
/>

<UpcomingDeadlines
  items={apps.filter((a) => a.deadline_date)}
/>     
{/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        <StatsCard label="Total" value={stats.total} />
        <StatsCard label="Applied" value={stats.applied} accent="text-blue-600" />
        <StatsCard label="Interviews" value={stats.interview} accent="text-purple-600" />
        <StatsCard label="Offers" value={stats.offer} accent="text-emerald-600" />
      </div>

      {/* View toggle + CTA */}
<div className="flex items-center justify-between mb-4">
  <h2 className="text-sm font-semibold text-gray-900">
    All applications
  </h2>

  <div className="flex items-center gap-2">
    <div className="flex rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Link
        href="?view=list"
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "list"
            ? "bg-navy-900 text-white"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <List size={13} /> List
      </Link>

      <Link
        href="?view=kanban"
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
          view === "kanban"
            ? "bg-navy-900 text-white"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <LayoutGrid size={13} /> Board
      </Link>
    </div>

    <Link
      href="/applications/new"
      className="btn-primary text-xs px-3 py-1.5"
    >
      <PlusCircle size={13} />
      Add
    </Link>
  </div>
</div>          
           

      {/* Applications */}
      {apps.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Add your first internship application to get started tracking your progress."
          action={{ label: "+ Add application", href: "/applications/new" }}
        />
      ) : view === "kanban" ? (
        <KanbanBoard applications={apps} />
      ) : (
        <div className="space-y-2">
          {apps.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
