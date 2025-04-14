
import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "heavy";
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = "medium", children, ...props }, ref) => {
    const intensityClasses = {
      light: "bg-white/5 backdrop-blur-sm border-white/10",
      medium: "bg-white/10 backdrop-blur-lg border-white/20",
      heavy: "bg-white/20 backdrop-blur-xl border-white/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border shadow-lg",
          intensityClasses[intensity],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export default GlassCard;
