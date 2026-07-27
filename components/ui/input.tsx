import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
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
          text-stone-900
          outline-none
          transition-all
          placeholder:text-stone-400
          focus:border-amber-700
          focus:ring-4
          focus:ring-amber-100
          disabled:cursor-not-allowed
          disabled:bg-stone-100
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;