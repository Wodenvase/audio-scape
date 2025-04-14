
import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg",
        hoverEffect && "transition-all duration-300 hover:bg-white/15 hover:shadow-xl hover:border-white/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
