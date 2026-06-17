import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { Quote, Star } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

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
          {reviews.map((r, i) => (
            <GlassCard key={i}>
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
            </GlassCard>
          ))}
        </div>
      </section>
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
