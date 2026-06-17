import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isToday, isTomorrow, isPast, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    const date = parseISO(dateStr);
    return format(date, "d MMM yyyy");
  } catch {
    return "—";
  }
}

export function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    if (isPast(date)) return formatDistanceToNow(date, { addSuffix: true });
    return format(date, "d MMM");
  } catch {
    return "";
  }
}

export function isOverdue(dateStr: string | null): boolean {
  if (!dateStr) return false;
  try {
    return isPast(parseISO(dateStr)) && !isToday(parseISO(dateStr));
  } catch {
    return false;
  }
}

export function isDueSoon(dateStr: string | null, days = 3): boolean {
  if (!dateStr) return false;
  try {
    const date = parseISO(dateStr);
    const now = new Date();
    const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= days;
  } catch {
    return false;
  }
}
