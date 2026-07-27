import { AlertCircle } from "lucide-react";

type FormErrorProps = {
  message?: string;
  className?: string;
};

export default function FormError({
  message,
  className,
}: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className={`mt-2 flex items-center gap-2 text-sm text-red-600 ${className ?? ""}`}
    >
      <AlertCircle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}