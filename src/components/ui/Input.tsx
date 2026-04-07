import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, icon, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            flex h-11 w-full bg-[#171717] px-3.5 text-sm ring-offset-black
            text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-white/10 focus-visible:border-gray-600
            disabled:cursor-not-allowed disabled:opacity-50
            border border-[#262626] rounded-xl transition-all duration-150
            ${icon ? "pl-10" : ""}
            ${error ? "border-rose-500 focus-visible:ring-rose-500/10 focus-visible:border-rose-500" : "border-[#262626]"}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[11px] font-medium text-rose-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
