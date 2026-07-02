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
