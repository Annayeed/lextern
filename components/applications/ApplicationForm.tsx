"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createApplication, updateApplication } from "@/lib/actions";
import { STATUS_ORDER, STATUS_CONFIG } from "@/types";
import type { Application } from "@/types";
import { Save, X } from "lucide-react";

const ORG_TYPES = [
  "Law Firm",
  "Advocate's Chamber",
  "Company (In-house)",
  "NGO",
  "Court",
  "Tribunal",
  "Research Centre",
  "Think Tank",
  "Other",
];

const PRACTICE_AREAS = [
  "Litigation",
  "Corporate / M&A",
  "IPR / Patent",
  "Criminal Law",
  "Constitutional Law",
  "Family Law",
  "Arbitration / ADR",
  "Tax Law",
  "Labour Law",
  "Banking & Finance",
  "Environmental Law",
  "Research / Academic",
  "Other",
];

interface ApplicationFormProps {
  application?: Application;
}

export function ApplicationForm({ application }: ApplicationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(application);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const result = isEdit
      ? await updateApplication(application!.id, formData)
      : await createApplication(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Core info */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Organisation details</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Organisation name *</label>
              <input
                type="text"
                name="org_name"
                required
                defaultValue={application?.org_name}
                placeholder="Anand & Anand"
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Internship title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={application?.title}
                placeholder="IPR Internship – Summer 2026"
                className="input-field"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Organisation type</label>
              <select name="org_type" defaultValue={application?.org_type ?? ""} className="input-field">
                <option value="">Select type</option>
                {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Practice area</label>
              <select name="practice_area" defaultValue={application?.practice_area ?? ""} className="input-field">
                <option value="">Select area</option>
                {PRACTICE_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Contact person</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Contact name</label>
            <input
              type="text"
              name="contact_person"
              defaultValue={application?.contact_person ?? ""}
              placeholder="Pravin Anand"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Contact email</label>
            <input
              type="email"
              name="contact_email"
              defaultValue={application?.contact_email ?? ""}
              placeholder="hr@anandanand.com"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Status & dates */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Status & dates</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Status *</label>
            <select
              name="status"
              defaultValue={application?.status ?? "wishlist"}
              className="input-field"
            >
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
              ))}
            </select>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Date applied</label>
              <input
                type="date"
                name="applied_date"
                defaultValue={application?.applied_date ?? ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Follow-up date</label>
              <input
                type="date"
                name="followup_date"
                defaultValue={application?.followup_date ?? ""}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">Deadline date</label>
              <input
                type="date"
                name="deadline_date"
                defaultValue={application?.deadline_date ?? ""}
                className="input-field"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Notes</h2>
        <textarea
          name="notes"
          defaultValue={application?.notes ?? ""}
          rows={4}
          placeholder="Interview prep notes, supervisor details, salary info, anything you want to remember…"
          className="input-field resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary"
        >
          <X size={15} />
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Save size={15} />
          )}
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add application"}
        </button>
      </div>
    </form>
  );
}
