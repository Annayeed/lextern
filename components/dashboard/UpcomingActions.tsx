import { Calendar, Bell } from "lucide-react";

interface UpcomingActionsProps {
  count: number;
}

export function UpcomingActions({ count }: UpcomingActionsProps) {
  return (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Bell size={18} className="text-blue-600" />
        <h2 className="font-semibold text-blue-900">
          Upcoming Actions
        </h2>
      </div>

      <div className="flex items-center gap-2 text-sm text-blue-700">
        <Calendar size={14} />
        <span>
          You currently have {count} tracked applications.
        </span>
      </div>

      <p className="text-xs text-blue-600 mt-2">
        Follow-ups, reminders and deadlines will appear here.
      </p>
    </div>
  );
}