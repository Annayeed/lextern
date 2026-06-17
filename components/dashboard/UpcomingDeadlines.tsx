import { Calendar } from "lucide-react";

interface Deadline {
  org_name: string;
  deadline_date: string | null;
}

interface UpcomingDeadlinesProps {
  items: Deadline[];
}

export function UpcomingDeadlines({
  items,
}: UpcomingDeadlinesProps) {
  if (items.length === 0) return null;

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar size={16} className="text-red-600" />
        <h3 className="font-semibold text-gray-900">
          Upcoming Deadlines
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
              {item.deadline_date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}