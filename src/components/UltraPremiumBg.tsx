import React from "react";

/**
 * Ultra-premium animated background for Automation Mitra
 * Features:
 * - Diagonal moving animated lines (SVG grid, parallax, very low opacity)
 * - Soft gradient radial glows (background depth, glassy feel)
 * - Animated particle/node stars (gently drifting & pulsing)
 * - Responsive, dark-modern, non-distracting, 4K safe (scales via CSS)
 */
const NODE_COUNT = 18;

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function UltraPremiumBg() {
  // Generate node positions & animation timings once
  const [nodes] = React.useState(() =>
    Array.from({ length: NODE_COUNT }).map((_, i) => ({
      top: `${getRandom(10, 85)}%`,
      left: `${getRandom(8, 92)}%`,
      size: getRandom(1.5, 3.2),
      delay: getRandom(0, 16),
      pulseDur: getRandom(3.5, 7.8),
      moveDur: getRandom(14, 27),
      color:
        i % 5 === 0
          ? "#72e4ff"
          : i % 4 === 0
          ? "#a68fff"
          : i % 2 === 0
          ? "#00ffe6"
          : "#5a78fa",
    }))
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 w-full h-full -z-20 overflow-hidden"
      style={{
        // Responsive: covers 4K+ but doesn't interfere with scrolling
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      {/* NOISE OVERLAY: sits atop all BGs within this layer */}
      <div className="noise-overlay" />
      {/* Moving animated diagonal gridlines behind everything */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        width="100%"
        height="100%"
        viewBox="0 0 3840 2160"
        preserveAspectRatio="none"
        style={{
          zIndex: 1,
        }}
      >
        <defs>
          {/* Gradient for the lines */}
          <linearGradient id="gridline" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#243746" stopOpacity="0.16" />
            <stop offset="74%" stopColor="#82e0ff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#d1a2ff" stopOpacity="0.09" />
          </linearGradient>
          {/* Animated grid offset */}
          <animateTransform
            xlinkHref="#grid-g"
            attributeName="transform"
            attributeType="XML"
            type="translate"
            from="0 0"
            to="60 36"
            dur="22s"
            repeatCount="indefinite"
          />
        </defs>
        {/* Diagonal gridlines: horizontal + some diagonals */}
        <g id="grid-g">
          {Array.from({ length: 19 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              x2={3840}
              y1={(2160 / 18) * i}
              y2={(2160 / 18) * i}
              stroke="url(#gridline)"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.7}
              style={{
                filter: i % 5 === 0 ? "blur(2.8px)" : undefined,
              }}
            />
          ))}
          {/* Diagonal lines */}
          {Array.from({ length: 9 }).map((_, i) => {
            const offset = i * 400;
            return (
              <line
                key={`d${i}`}
                x1={offset}
                y1={0}
                x2={offset + 800}
                y2={2160}
                stroke="url(#gridline)"
                strokeWidth="1.1"
                opacity="0.18"
                style={{
                  filter: "blur(1.0px)",
                }}
              />
            );
          })}
        </g>
      </svg>
      {/* Glassy radial glows */}
      <div>
        <div
          className="absolute -top-44 left-1/4 w-[66vw] h-[44vw] md:w-[1200px] md:h-[900px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at 38% 42%, #5fd3fe80 0%, #472cdd44 38%, #21398511 88%)",
            zIndex: 2,
          }}
        />
        <div
          className="absolute top-[7%] left-[60vw] w-[28vw] h-[360px] rounded-full opacity-45 blur-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 60% 10%, #be9aff67 0%, #47ffe213 80%, transparent 100%)",
            zIndex: 3,
          }}
        />
        <div
          className="absolute -bottom-24 right-[12vw] w-[44vw] h-[32vw] rounded-full opacity-38 blur-[96px]"
          style={{
            background:
              "radial-gradient(circle at 74% 80%, #22f8e626 0%, #a1aaff1a 74%, transparent 100%)",
            zIndex: 2,
          }}
        />
      </div>
      {/* Parallax vertical shimmer */}
      <div className="absolute left-2/3 top-0 w-28 h-full opacity-16">
        <div
          className="animate-bg-pulse h-full w-full rounded-2xl"
          style={{
            background:
              "linear-gradient(93deg,#4b60fca2 17%,#3afee868 92%,#bd8afa00 100%)",
            filter: "blur(62px)",
          }}
        />
      </div>
      {/* Gently drifting, softly pulsing particle nodes */}
      {nodes.map((n, i) => (
        <span
          key={i}
          className="absolute rounded-full pointer-events-none opacity-70"
          style={{
            top: n.top,
            left: n.left,
            width: `${n.size}vw`,
            height: `${n.size}vw`,
            background: `radial-gradient(circle, ${n.color} 0%, #ffffff15 100%)`,
            filter: "blur(0.5vw)",
            animation: `bg-node-move-${i} ${n.moveDur}s linear infinite, bg-node-pulse-${i} ${n.pulseDur}s ease-in-out infinite`,
            zIndex: 4,
          }}
        />
      ))}
      {/* Animate each particle node with unique move & pulse */}
      <style>
        {`
        /* Pulse and move anims for each node, unique to avoid sync */
        ${nodes
          .map(
            (n, i) => `
            @keyframes bg-node-move-${i} {
              0% { transform: translate(0px, 0px);}
              28% { transform: translate(${getRandom(
                -30,
                34
              )}px, ${getRandom(-25, 26)}px);}
              54% { transform: translate(${getRandom(
                -55,
                85
              )}px, ${getRandom(-65, 90)}px);}
              100% { transform: translate(0px, 0px);}
            }
            @keyframes bg-node-pulse-${i} {
              0%,100% { filter: blur(0.5vw) brightness(1); opacity: 0.72; }
              48% { filter: blur(0.9vw) brightness(1.11); opacity: 1; }
            }
          `
          )
          .join("\n")}
        `}
      </style>
      {/* Soft translucent overlay for glass depth */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "linear-gradient(120deg,rgba(25,16,60,0.32) 70%,rgba(55,60,120,0.18) 100%)",
          backdropFilter: "blur(8px)",
          zIndex: 20,
        }}
      />
    </div>
  );
}
