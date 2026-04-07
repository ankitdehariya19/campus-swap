import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-[#262626] bg-[#171717] text-gray-400 hover:border-gray-500 hover:text-white",
    ghost: "bg-transparent text-gray-400 hover:bg-[#171717] hover:text-white",
    danger: "bg-[#450A0A]/30 border border-[#991B1B] text-[#F87171] hover:bg-[#450A0A]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "w-9 h-9",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
