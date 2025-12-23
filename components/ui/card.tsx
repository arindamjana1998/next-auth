import React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden", className)}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("px-6 py-4 border-b border-gray-50 bg-gray-50/50", className)}>{children}</div>;
};

export const CardTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <h3 className={cn("text-lg font-bold text-gray-900", className)}>{children}</h3>;
};

export const CardContent = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("p-6", className)}>{children}</div>;
};

export const CardFooter = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("px-6 py-4 border-t border-gray-50 bg-gray-50/50", className)}>{children}</div>;
};
