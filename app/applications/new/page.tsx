import { AppShell } from "@/components/layout/AppShell";
import { ApplicationForm } from "@/components/applications/ApplicationForm";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Add Application" };

export default async function NewApplicationPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, college")
    .eq("id", user.id)
    .single();

  return (
    <AppShell userName={profile?.full_name} college={profile?.college}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard" className="btn-ghost text-xs mb-4 -ml-2 inline-flex">
            <ArrowLeft size={14} />
            Back to dashboard
          </Link>
          <h1 className="page-title">Add application</h1>
          <p className="page-subtitle">Track a new internship application from scratch.</p>
        </div>
        <ApplicationForm />
      </div>
    </AppShell>
  );
}
