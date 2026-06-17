import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: number | string;
  accent?: string;
  sub?: string;
}

export function StatsCard({ label, value, accent = "text-gray-900", sub }: StatsCardProps) {
  return (
    <div className="card p-4">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={cn("mt-1 text-3xl font-semibold tabular-nums", accent)}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
