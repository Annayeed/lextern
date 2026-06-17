import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatRelativeDate, isOverdue, cn } from "@/lib/utils";
import type { Application } from "@/types";
import { Calendar, User, AlertCircle, ChevronRight } from "lucide-react";

interface ApplicationCardProps {
  application: Application;
  compact?: boolean;
}

const STATUS_BORDER: Record<string, string> = {
  wishlist: "border-l-slate-300",
  applied: "border-l-blue-400",
  followup_due: "border-l-amber-400",
  interview_scheduled: "border-l-purple-400",
  offer_received: "border-l-emerald-400",
  accepted: "border-l-green-500",
  rejected: "border-l-red-300",
};

export function ApplicationCard({ application, compact }: ApplicationCardProps) {
  const overdue = isOverdue(application.followup_date);
  const borderClass = STATUS_BORDER[application.status] ?? "border-l-gray-200";

  return (
    <Link
      href={`/applications/${application.id}`}
      className={cn(
        "group block card border-l-4 hover:shadow-card-hover transition-all duration-150",
        borderClass,
        compact ? "p-3.5" : "p-4"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-navy-900 transition-colors">
                {application.org_name}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{application.title}</p>
            </div>
          </div>

          {!compact && (
            <div className="mt-2.5 flex items-center flex-wrap gap-x-3 gap-y-1.5">
              {application.contact_person && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <User size={11} />
                  {application.contact_person}
                </span>
              )}
              {application.followup_date && (
                <span className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  overdue ? "text-red-600" : "text-gray-400"
                )}>
                  {overdue && <AlertCircle size={11} />}
                  {!overdue && <Calendar size={11} />}
                  Follow-up {formatRelativeDate(application.followup_date)}
                </span>
              )}
              {application.deadline_date && (
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={11} />
                  Deadline {formatDate(application.deadline_date)}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <StatusBadge status={application.status} size="sm" />
          <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
