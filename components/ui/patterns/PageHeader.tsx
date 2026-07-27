import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-2xl font-bold tracking-tight text-stone-900">
        {title}
      </h1>

      {description && (
        <p className="text-sm leading-6 text-stone-600">
          {description}
        </p>
      )}
    </div>
  );
}