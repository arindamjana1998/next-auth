import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default:
        "bg-[var(--hot-pink)] text-white hover:bg-[var(--hot-pink-hover)] focus-visible:ring-[var(--hot-pink)]",
      outline:
        "border border-gray-300 bg-transparent hover:bg-gray-100 focus-visible:ring-gray-400",
      ghost: "hover:bg-gray-100 focus-visible:ring-gray-400",
    };

    const sizes = {
      default: "h-12 min-h-[48px] px-5 text-base",
      sm: "h-9 min-h-[44px] px-4 text-sm",
      lg: "h-14 min-h-[56px] px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
