import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
}

const variants: Record<string, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusMap: Record<string, string> = {
  pending: "warning",
  paid: "info",
  completed: "success",
  cancelled: "danger",
  active: "success",
  open: "info",
  closed: "danger",
  upcoming: "warning",
  draft: "default",
  published: "success",
  new: "info",
  read: "default",
  responded: "success",
  approved: "success",
  rejected: "danger",
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const badgeVariant = variant || statusMap[status.toLowerCase()] || "default";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[badgeVariant]
      )}
    >
      {status}
    </span>
  );
}
