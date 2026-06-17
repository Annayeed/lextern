"use client";

import { useState, useTransition } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { updateApplicationStatus } from "@/lib/actions";
import type { Application, ApplicationStatus } from "@/types";
import { STATUS_CONFIG } from "@/types";
import { cn } from "@/lib/utils";

const COLUMNS: ApplicationStatus[] = [
  "wishlist",
  "applied",
  "followup_due",
  "interview_scheduled",
  "offer_received",
  "accepted",
  "rejected",
];

interface KanbanBoardProps {
  applications: Application[];
}

const COL_BORDER: Record<ApplicationStatus, string> = {
  wishlist: "border-t-slate-300",
  applied: "border-t-blue-400",
  followup_due: "border-t-amber-400",
  interview_scheduled: "border-t-purple-400",
  offer_received: "border-t-emerald-400",
  accepted: "border-t-green-500",
  rejected: "border-t-red-300",
};

export function KanbanBoard({ applications }: KanbanBoardProps) {
  const [localApps, setLocalApps] = useState(applications);
  const [isPending, startTransition] = useTransition();

  const byStatus = (status: ApplicationStatus) =>
    localApps.filter((a) => a.status === status);

  function handleStatusChange(appId: string, newStatus: ApplicationStatus) {
    setLocalApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
    startTransition(async () => {
      await updateApplicationStatus(appId, newStatus);
    });
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <div className="flex gap-4 min-w-max pb-4">
        {COLUMNS.map((status) => {
          const apps = byStatus(status);
          const config = STATUS_CONFIG[status];
          return (
            <div key={status} className="w-64 shrink-0">
              <div className={cn(
                "rounded-xl border-t-2 bg-gray-50/80 border border-gray-100",
                COL_BORDER[status]
              )}>
                {/* Column header */}
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", config.dotColor)} />
                    <span className="text-xs font-semibold text-gray-700">{config.label}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-400 tabular-nums">
                    {apps.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="p-2 space-y-2 min-h-[120px]">
                  {apps.length === 0 ? (
                    <div className="flex items-center justify-center h-16">
                      <p className="text-xs text-gray-300">No applications</p>
                    </div>
                  ) : (
                    apps.map((app) => (
                      <KanbanCard
                        key={app.id}
                        application={app}
                        onStatusChange={handleStatusChange}
                        allStatuses={COLUMNS}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KanbanCard({
  application,
  onStatusChange,
  allStatuses,
}: {
  application: Application;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  allStatuses: ApplicationStatus[];
}) {
  const [showMove, setShowMove] = useState(false);

  return (
    <div className="relative">
      <ApplicationCard application={application} compact />
      <button
        onClick={() => setShowMove(!showMove)}
        className="absolute top-2 right-7 text-[10px] text-gray-300 hover:text-gray-500
                   bg-white border border-gray-100 rounded px-1.5 py-0.5 hidden group-hover:block"
        title="Move to…"
      >
        ⋯
      </button>
      {showMove && (
        <div className="absolute right-0 top-8 z-10 w-44 card shadow-lg py-1">
          <p className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
            Move to
          </p>
          {allStatuses
            .filter((s) => s !== application.status)
            .map((s) => (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(application.id, s);
                  setShowMove(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700
                           hover:bg-gray-50 transition-colors"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_CONFIG[s].dotColor)} />
                {STATUS_CONFIG[s].label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
