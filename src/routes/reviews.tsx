import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { Quote, Star } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MediaWatermark, ImageProtector } from "@/components/site/VideoWatermark";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — The Arts Folio" },
      {
        name: "description",
        content:
          "Read what authors, publishers and founders worldwide say about working with The Arts Folio.",
      },
      { property: "og:title", content: "Client Reviews — The Arts Folio" },
      {
        property: "og:description",
        content: "What clients say about working with The Arts Folio.",
      },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { reviews } = useSiteData();
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);
  const [activeScreenshotName, setActiveScreenshotName] = useState<string>("");

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Client reviews"
            title={
              <>
                Words from <span className="text-gradient">authors & founders</span>
              </>
            }
            description="Every review below is from a real commissioned client. 5-star rated across the board."
          />
        </div>
      </section>
      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => {
            const hasScreenshot = !!r.screenshotUrl;
            return (
              <GlassCard 
                key={r.id || i} 
                className={cn("flex flex-col justify-between overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-white/20", hasScreenshot ? "p-0" : "")}
              >
                {hasScreenshot ? (
                  <div className="flex flex-col h-full">
                    {/* Message Screenshot Container */}
                    <div 
                      onClick={() => {
                        setActiveScreenshot(r.screenshotUrl || null);
                        setActiveScreenshotName(r.name);
                      }}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-black/20 border-b border-white/5 group cursor-pointer"
                    >
                      <img
                        src={r.screenshotUrl}
                        alt={`Screenshot review from ${r.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <MediaWatermark />
                      <ImageProtector />
                      {r.screenshotType && (
                        <div className="absolute top-4 left-4 z-20">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur border border-white/10 text-brand-pink">
                            {r.screenshotType}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="text-[11px] font-semibold rounded-full bg-white/10 backdrop-blur px-3 py-1.5 border border-white/20 text-white">
                          View Full Image
                        </span>
                      </div>
                    </div>

                    {/* Meta info details */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      {r.text && (
                        <p className="text-sm leading-relaxed text-foreground/80 italic mb-5">
                          "{r.text}"
                        </p>
                      )}
                      <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white">
                          {r.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.country}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {Array.from({ length: r.rating }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-brand-pink text-brand-pink" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <Quote className="h-7 w-7 text-brand-violet" />
                    <p className="mt-4 text-base leading-relaxed text-foreground/90">"{r.text}"</p>
                    <div className="mt-6 flex items-center gap-3 pt-6 border-t border-white/5">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                        {r.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.country}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Screenshot Lightbox Modal */}
      <Dialog open={!!activeScreenshot} onOpenChange={(o) => !o && setActiveScreenshot(null)}>
        <DialogContent className="max-w-4xl glass-strong border-white/10 p-0 overflow-hidden">
          {activeScreenshot && (
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[550px] bg-black/40">
              {/* Blurred background fill */}
              <img
                src={activeScreenshot}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none"
              />
              {/* Sharp protected screenshot */}
              <img
                src={activeScreenshot}
                alt={`Screenshot review from ${activeScreenshotName}`}
                className="relative z-10 max-w-full max-h-[85vh] object-contain p-4"
              />
              <MediaWatermark />
              <ImageProtector />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <CTASection
        eyebrow="Join them"
        title={
          <>
            Add your story to the <span className="text-white/90">reviews above</span>
          </>
        }
        description="850+ projects, 47 countries, every single one hand-made."
        buttons={[
          { label: "Start Your Project", to: "/quote" },
          { label: "Book a Free Consultation", to: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}
