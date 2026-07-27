import { forwardRef, TextareaHTMLAttributes } from "react";

type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className = "", ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`
        w-full
        rounded-xl
        border
        border-stone-300
        bg-white
        px-4
        py-3
        text-sm
        outline-none
        transition-all
        placeholder:text-stone-400
        focus:border-amber-700
        focus:ring-4
        focus:ring-amber-100
        ${className}
      `}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;