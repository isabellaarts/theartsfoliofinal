import * as React from "react";

export function VideoWatermark() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden z-20">
      <div 
        className="text-white/[0.07] font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.3em] uppercase select-none transform -rotate-12 border border-white/[0.03] px-6 py-3 rounded-2xl backdrop-blur-[0.5px]"
        style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
      >
        The Arts Folio
      </div>
    </div>
  );
}

export function MediaWatermark({ opacity = 0.04 }: { opacity?: number }) {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
      <text 
        x="110" 
        y="110" 
        fill="white" 
        font-family="'Space Grotesk', system-ui, -apple-system, sans-serif" 
        font-size="11" 
        font-weight="bold"
        letter-spacing="0.15em"
        opacity="${opacity}" 
        transform="rotate(-35 110 110)" 
        text-anchor="middle"
      >
        THE ARTS FOLIO
      </text>
    </svg>
  `;
  
  const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
  const backgroundStyle = { backgroundImage: `url("${svgUrl}")` };

  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-10 bg-repeat bg-center"
      style={backgroundStyle}
    />
  );
}

export function ImageProtector() {
  return (
    <div 
      className="absolute inset-0 z-20 bg-transparent select-none no-select no-drag" 
      style={{ WebkitTouchCallout: "none" }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    />
  );
}
