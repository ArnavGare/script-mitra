
import React from "react";

interface OGFlyInTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // seconds
}

const OGFlyInText: React.FC<OGFlyInTextProps> = ({
  children,
  className = "",
  delay = 0,
}) => (
  <span
    className={`inline-block animate-og-fly-in ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: "both",
    }}
  >
    {children}
  </span>
);

export default OGFlyInText;
