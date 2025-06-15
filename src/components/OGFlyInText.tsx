
import React from "react";

interface OGFlyInTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds
  animationClass?: string; // allow override if needed
}

const OGFlyInText: React.FC<OGFlyInTextProps> = ({
  children,
  className = "",
  delay = 0,
  animationClass = "animate-3d-fly-in", // use new animation by default
}) => (
  <span
    className={`inline-block ${animationClass} ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: "both",
    }}
  >
    {children}
  </span>
);

export default OGFlyInText;
