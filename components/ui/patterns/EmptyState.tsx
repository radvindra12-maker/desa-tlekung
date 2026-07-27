import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-8 py-16 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-sm leading-6 text-stone-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}
    </div>
  );
}