import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = false }) => {
  return (
    <div className={cn(
      "bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300",
      hover && "hover:bg-slate-900/60 hover:border-slate-700/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
      className
    )}>
      {children}
    </div>
  );
};
