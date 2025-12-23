import React, { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group select-none py-2 px-3 rounded-xl transition-all hover:bg-gray-50 active:scale-95",
          className
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div className={cn(
            "h-6 w-6 rounded-lg border-2 border-gray-300 transition-all",
            "peer-checked:bg-[var(--hot-pink)] peer-checked:border-[var(--hot-pink)]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--hot-pink)] peer-focus-visible:ring-offset-2",
            "group-hover:border-gray-400"
          )} />
          <Check className="absolute h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
