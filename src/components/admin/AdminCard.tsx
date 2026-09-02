import type { ReactNode } from "react";

interface AdminCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function AdminCard({ title, description, children, className = "" }: AdminCardProps) {
  return (
    <div className={`card-elevated overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="p-6 border-b border-border">
          {title && <h3 className="text-lg font-bold">{title}</h3>}
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
