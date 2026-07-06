import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { InquiryForm } from "@/components/site/InquiryForm";
import { type PortfolioCategory } from "@/lib/site-data";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/hooks/use-site-data";
import { Play } from "lucide-react";
import { VideoWatermark, MediaWatermark, ImageProtector } from "@/components/site/VideoWatermark";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — The Arts Folio" },
      {
        name: "description",
        content:
          "Recent commissioned book covers, fantasy maps, character art, branding and web work crafted by The Arts Folio.",
      },
      { property: "og:title", content: "Portfolio — The Arts Folio" },
      { property: "og:description", content: "Recent commissioned work by The Arts Folio." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const CATEGORIES: ("All" | PortfolioCategory)[] = [
  "All",
  "Book Covers",
  "Fantasy Maps",
  "Character Art",
  "Interior Art",
  "Logos",
  "Websites",
  "Social Media",
];

function PortfolioPage() {
  const { portfolio } = useSiteData();
  const [filter, setFilter] = useState<"All" | PortfolioCategory>("All");
  const [active, setActive] = useState<(typeof portfolio)[number] | null>(null);
  const publishedItems = portfolio.filter((p) => p.status !== "draft");
  const items = filter === "All" ? publishedItems : publishedItems.filter((p) => p.category === filter);

  useEffect(() => {
    if (active) {
      document.title = active.metaTitle || `${active.title} — Portfolio — The Arts Folio`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", active.metaDescription || active.description);
      }
    } else {
      document.title = "Portfolio — The Arts Folio";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Recent commissioned book covers, fantasy maps, character art, branding and web work crafted by The Arts Folio.");
      }
    }
  }, [active]);

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Stories we've <span className="text-gradient">made visible</span>
              </>
            }
            description="A selection of recent commissions across book covers, maps, characters and brand work."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer",
                  filter === c
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "glass hover:bg-white/10",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {items.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-3xl glass hover-lift cursor-pointer text-left"
              >
                {p.mediaType === "video" ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt || p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <MediaWatermark />
                    <ImageProtector />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none z-20">
                      <div className="h-14 w-14 rounded-full glass border border-white/20 flex items-center justify-center text-white shadow-glow hover:scale-110 hover:bg-white/10 transition-all duration-300 pointer-events-none">
                        <Play className="h-6 w-6 text-white fill-white ml-0.5 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.imageAlt || p.title}
                      loading="lazy"
                      className="w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <MediaWatermark />
                    <ImageProtector />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">{p.category}</p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{p.title}</h3>
                  <span className="mt-3 inline-block text-xs font-semibold rounded-full bg-white/10 backdrop-blur px-3 py-1 w-fit text-white">
                    View Project
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-5xl glass-strong border-white/10 p-0 overflow-hidden">
          {active && (
            <div className="grid md:grid-cols-2">
              <div className="relative bg-black/20 flex items-center justify-center">
                {active.mediaType === "video" ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black/40 min-h-[300px] md:min-h-[450px]">
                    <video
                      src={active.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain max-h-[80vh]"
                    />
                    <VideoWatermark />
                  </div>
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40 min-h-[300px] md:min-h-[450px]">
                    {/* Blurred background */}
                    <img
                      src={active.image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-105 pointer-events-none"
                    />
                    {/* Foreground object-contain image */}
                    <img
                      src={active.image}
                      alt={active.imageAlt || active.title}
                      className="relative z-5 w-full h-full object-contain max-h-[80vh]"
                    />
                    <MediaWatermark />
                    <ImageProtector />
                  </div>
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">
                    {active.category}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{active.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{active.description}</p>
                  {active.tags && active.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {active.tags.map((t) => (
                        <span key={t} className="text-[10px] uppercase bg-white/5 px-2.5 py-1 rounded-full text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 space-y-3 text-sm pt-8 border-t border-white/5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span>{active.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Process</span>
                    <span>Sketch → Line → Color → Final</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Rights</span>
                    <span>Full commercial</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


      <CTASection
        eyebrow="Like what you see"
        title={
          <>
            Let's create your <span className="text-white/90">next masterpiece</span>
          </>
        }
        description="Every project on this page started with a brief just like yours. Tell us about yours."
        buttons={[
          { label: "Request a Custom Quote", to: "/quote" },
          { label: "Hire an Artist", to: "/artists", variant: "ghost" },
        ]}
      />

      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <InquiryForm eyebrow="Quick brief" title="Or send us your project brief" />
        </div>
      </section>
    </>
  );
}
