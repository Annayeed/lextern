"use client";

import { useEffect, useState, useTransition } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { updateProfile } from "@/lib/actions";
import { createClient } from "@/lib/supabase";
import type { Profile } from "@/types";
import { Save, User, Bell, LogOut } from "lucide-react";
import { signOut } from "@/lib/actions";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data as Profile);
      setLoading(false);
    });
  }, []);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-24">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-navy-900" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell userName={profile?.full_name} college={profile?.college}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your account details and preferences.</p>
        </div>

        {success && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            Profile updated successfully.
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          {/* Personal info */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <User size={14} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Personal information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label">Full name</label>
                <input
                  type="text"
                  name="full_name"
                  required
                  defaultValue={profile?.full_name ?? ""}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Email address</label>
                <input
                  type="email"
                  value={profile?.email ?? ""}
                  disabled
                  className="input-field"
                />
                <p className="mt-1 text-xs text-gray-400">Email cannot be changed here.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">College</label>
                  <input
                    type="text"
                    name="college"
                    required
                    defaultValue={profile?.college ?? ""}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Year of study</label>
                  <select
                    name="year_of_study"
                    defaultValue={profile?.year_of_study ?? "3"}
                    className="input-field"
                  >
                    <option value="1">1st year</option>
                    <option value="2">2nd year</option>
                    <option value="3">3rd year</option>
                    <option value="4">4th year</option>
                    <option value="5">5th year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={14} className="text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900">Email notifications</h2>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  name="email_digest_on"
                  defaultChecked={profile?.email_digest_on ?? true}
                  className="peer sr-only"
                />
                <div className="h-5 w-9 rounded-full bg-gray-200 peer-checked:bg-navy-900 transition-colors" />
                <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Daily digest email</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Receive a summary of follow-ups due and upcoming deadlines every morning at 8 AM.
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <form action={signOut}>
              <button type="submit" className="btn-ghost text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut size={14} />
                Sign out
              </button>
            </form>
            <button type="submit" disabled={isPending} className="btn-primary">
              {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Save size={14} />
              )}
              {isPending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
