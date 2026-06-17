export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "followup_due"
  | "interview_scheduled"
  | "offer_received"
  | "accepted"
  | "rejected";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  college: string;
  year_of_study: number;
  email_digest_on: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  title: string;
  org_name: string;
  org_type: string | null;
  practice_area: string | null;
  contact_person: string | null;
  contact_email: string | null;
  status: ApplicationStatus;
  applied_date: string | null;
  followup_date: string | null;
  deadline_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  dotColor: string;
}

export const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
  wishlist: {
    label: "Wishlist",
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-300",
    dotColor: "bg-slate-400",
  },
  applied: {
    label: "Applied",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    dotColor: "bg-blue-500",
  },
  followup_due: {
    label: "Follow-up Due",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    dotColor: "bg-amber-500",
  },
  interview_scheduled: {
    label: "Interview Scheduled",
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    dotColor: "bg-purple-500",
  },
  offer_received: {
    label: "Offer Received",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-300",
    dotColor: "bg-emerald-500",
  },
  accepted: {
    label: "Accepted",
    color: "text-green-800",
    bgColor: "bg-green-100",
    borderColor: "border-green-400",
    dotColor: "bg-green-600",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    dotColor: "bg-red-400",
  },
};

export const STATUS_ORDER: ApplicationStatus[] = [
  "wishlist",
  "applied",
  "followup_due",
  "interview_scheduled",
  "offer_received",
  "accepted",
  "rejected",
];
