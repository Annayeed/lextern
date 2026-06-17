"use server";

import { createServerSupabaseClient } from "./supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ApplicationStatus } from "@/types";

// ── AUTH ─────────────────────────────────────────────────────────────────────

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;
  const college = formData.get("college") as string;
  const year_of_study = parseInt(formData.get("year_of_study") as string, 10);

  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { full_name, college, year_of_study },
  },
});

console.log("SIGNUP DATA:", JSON.stringify(data, null, 2));
console.log("SIGNUP ERROR:", error);

if (error) {
  return { error: error.message };
}
  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log("LOGIN DATA:", JSON.stringify(data, null, 2));
console.log("LOGIN ERROR:", error);

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
 
export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/login");
}
// ── APPLICATIONS ─────────────────────────────────────────────────────────────

export async function createApplication(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const applied_date = formData.get("applied_date") as string | null;
  const followup_date = formData.get("followup_date") as string | null;

  const { error } = await supabase.from("applications").insert({
    user_id: user.id,
    title: formData.get("title") as string,
    org_name: formData.get("org_name") as string,
    org_type: (formData.get("org_type") as string) || null,
    practice_area: (formData.get("practice_area") as string) || null,
    contact_person: (formData.get("contact_person") as string) || null,
    contact_email: (formData.get("contact_email") as string) || null,
    status: (formData.get("status") as ApplicationStatus) || "wishlist",
    applied_date: applied_date || null,
    followup_date: followup_date || null,
    deadline_date: (formData.get("deadline_date") as string) || null,
    notes: (formData.get("notes") as string) || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/applications");
  redirect("/dashboard");
}

export async function updateApplication(id: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("applications")
    .update({
      title: formData.get("title") as string,
      org_name: formData.get("org_name") as string,
      org_type: (formData.get("org_type") as string) || null,
      practice_area: (formData.get("practice_area") as string) || null,
      contact_person: (formData.get("contact_person") as string) || null,
      contact_email: (formData.get("contact_email") as string) || null,
      status: formData.get("status") as ApplicationStatus,
      applied_date: (formData.get("applied_date") as string) || null,
      followup_date: (formData.get("followup_date") as string) || null,
      deadline_date: (formData.get("deadline_date") as string) || null,
      notes: (formData.get("notes") as string) || null,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/applications/${id}`);
  redirect("/dashboard");
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  return { success: true };
}

export async function deleteApplication(id: string) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: formData.get("full_name") as string,
      college: formData.get("college") as string,
      year_of_study: parseInt(formData.get("year_of_study") as string, 10),
      email_digest_on: formData.get("email_digest_on") === "on",
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}
