
import React from "react";
import clsx from "clsx";

/**
 * GlowHoverCard
 * Wrap any children to give them a premium glassy edge-glow animated card effect on hover/focus.
 *
 * Props:
 * - className: string (optional)
 * - children: React.ReactNode (required)
 * - style: React.CSSProperties (optional)
 */
const GlowHoverCard: React.FC<React.PropsWithChildren<{ className?: string; style?: React.CSSProperties }>> = ({
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "glow-hover-card relative bg-white/95 dark:bg-gray-900/80 border-0 rounded-xl shadow-xl transition-all duration-500 backdrop-blur-sm overflow-hidden group",
        className
      )}
      style={style}
      tabIndex={0}
      {...rest}
    >
      {/* Edge glow with animate-in + subtle floating on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 group-hover:blur-sm group-focus-visible:blur-sm z-10"
        style={{
          boxShadow:
            "0 0 18px 5px #38bdf822, 0 0 32px 12px #a78bfa44, 0 0 24px 10px #7dd3fc33",
        }}
      />
      {/* Floating animation */}
      <div className="relative z-20 animate-float">
        {children}
      </div>
    </div>
  );
};

export default GlowHoverCard;
