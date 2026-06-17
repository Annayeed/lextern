import { Bell } from "lucide-react";

interface Followup {
  org_name: string;
  followup_date: string | null;
}

interface UpcomingFollowupsProps {
  items: Followup[];
}

export function UpcomingFollowups({
  items,
}: UpcomingFollowupsProps) {
  if (items.length === 0) return null;

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bell size={16} className="text-amber-600" />
        <h3 className="font-semibold text-gray-900">
          Upcoming Follow-ups
        </h3>
      </div>

      <div className="space-y-2">
        {items.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex justify-between text-sm"
          >
            <span>{item.org_name}</span>
            <span className="text-gray-500">
              {item.followup_date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}