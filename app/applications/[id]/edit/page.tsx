import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { AppShell } from "@/components/layout/AppShell";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import type { Application, Profile } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Application" };

export default async function EditApplicationPage({
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

  return (
    <AppShell
      userName={(profile as Profile | null)?.full_name}
      college={(profile as Profile | null)?.college}
    >
      <div className="max-w-2xl mx-auto">
        <Link href={`/applications/${id}`} className="btn-ghost text-xs -ml-2 mb-4 inline-flex">
          <ArrowLeft size={14} />
          Back to application
        </Link>
        <h1 className="page-title mb-1">Edit application</h1>
        <p className="page-subtitle mb-6">
          {(application as Application).org_name} — {(application as Application).title}
        </p>
        <ApplicationForm application={application as Application} />
      </div>
    </AppShell>
  );
}
