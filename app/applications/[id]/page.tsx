import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { AppShell } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfirmDeleteButton } from "@/components/ui/ConfirmDialog";
import { deleteApplication } from "@/lib/actions";
import { formatDate, formatRelativeDate, isOverdue } from "@/lib/utils";
import type { Application, Profile } from "@/types";
import { ArrowLeft, Edit2, Calendar, User, Mail, Building2, Briefcase, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Application" };

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: application }, { data: profile }] = await Promise.all([
    supabase.from("applications").select("*").eq("id", id).eq("user_id", user.id).single(),
    supabase.from("profiles").select("full_name, college").eq("id", user.id).single(),
  ]);

  if (!application) notFound();

  const app = application as Application;
  const prof = profile as Pick<Profile, "full_name" | "college"> | null;
  const overdue = isOverdue(app.followup_date);

  async function handleDelete() {
    "use server";
    await deleteApplication(id);
  }

  return (
    <AppShell userName={prof?.full_name} college={prof?.college}>
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link href="/dashboard" className="btn-ghost text-xs -ml-2 mb-4 inline-flex">
          <ArrowLeft size={14} />
          Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{app.org_name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{app.title}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href={`/applications/${id}/edit`} className="btn-secondary text-xs">
              <Edit2 size={13} />
              Edit
            </Link>
            <form action={handleDelete}>
  <button type="submit" className="btn-danger">
    Delete
  </button>
</form>
           
          </div>
        </div>

        {/* Status + alerts */}
        <div className="card p-5 mb-4">
          <div className="flex items-center justify-between">
            <StatusBadge status={app.status} />
            <p className="text-xs text-gray-400">
              Updated {formatDate(app.updated_at)}
            </p>
          </div>

          {overdue && app.followup_date && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <AlertCircle size={13} className="text-red-500 shrink-0" />
              <p className="text-xs text-red-700 font-medium">
                Follow-up overdue — was due {formatRelativeDate(app.followup_date)}
              </p>
            </div>
          )}
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Organisation */}
          <div className="card p-5 space-y-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Organisation</h2>
            {app.org_type && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-700">{app.org_type}</span>
              </div>
            )}
            {app.practice_area && (
              <div className="flex items-center gap-2 text-sm">
                <Briefcase size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-700">{app.practice_area}</span>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="card p-5 space-y-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h2>
            {app.contact_person ? (
              <div className="flex items-center gap-2 text-sm">
                <User size={14} className="text-gray-400 shrink-0" />
                <span className="text-gray-700">{app.contact_person}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No contact added</p>
            )}
            {app.contact_email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-gray-400 shrink-0" />
                <a
                  href={`mailto:${app.contact_email}`}
                  className="text-navy-900 hover:underline truncate"
                >
                  {app.contact_email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Dates */}
        <div className="card p-5 mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Dates</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-1">Applied</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-700">
                <Calendar size={13} className="text-gray-400" />
                {formatDate(app.applied_date)}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Follow-up</p>
              <div className={`flex items-center gap-1.5 text-sm ${overdue ? "text-red-600 font-medium" : "text-gray-700"}`}>
                <Calendar size={13} className={overdue ? "text-red-400" : "text-gray-400"} />
                {app.followup_date ? formatRelativeDate(app.followup_date) : "—"}
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Deadline</p>
              <div className="flex items-center gap-1.5 text-sm text-gray-700">
                <Calendar size={13} className="text-gray-400" />
                {formatDate(app.deadline_date)}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {app.notes && (
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={14} className="text-gray-400" />
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Notes</h2>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{app.notes}</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
