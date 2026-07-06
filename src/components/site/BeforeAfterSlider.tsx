import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MediaWatermark } from "@/components/site/VideoWatermark";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<string>("aspect-[4/3]");

  useEffect(() => {
    if (!afterImage) return;
    const img = new Image();
    img.src = afterImage;
    img.onload = () => {
      const ratio = img.width / img.height;
      if (ratio > 1.2) {
        setAspectRatio("aspect-[16/9]");
      } else if (ratio < 0.8) {
        setAspectRatio("aspect-[3/4]");
      } else {
        setAspectRatio("aspect-[4/3]");
      }
    };
  }, [afterImage]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      // Left click held
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className={cn(
        "relative select-none overflow-hidden rounded-3xl cursor-ew-resize border border-white/10 group shadow-glow bg-black/40 flex items-center justify-center",
        aspectRatio,
        className,
      )}
    >
      {/* After image (background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white/90 z-20 transition-opacity duration-300 group-hover:opacity-100 opacity-60">
        {afterLabel}
      </span>

      {/* Before image (clipped overlay) */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
      />
      <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white/90 z-20 transition-opacity duration-300 group-hover:opacity-100 opacity-60">
        {beforeLabel}
      </span>

      {/* Repeating Diagonal Watermark */}
      <MediaWatermark />

      {/* Slider line separator */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white z-30 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Drag handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-brand-violet shadow-2xl flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
          <div className="flex gap-0.5 items-center justify-center">
            <span className="text-[10px] font-bold">◀</span>
            <span className="text-[10px] font-bold">▶</span>
          </div>
        </div>
      </div>
    </div>
  );
}

