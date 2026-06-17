import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Instagram, ArrowRight, Star } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export const Route = createFileRoute("/artists/")({
  head: () => ({
    meta: [
      { title: "Our Artists — The Arts Folio" },
      {
        name: "description",
        content:
          "Meet the artists behind The Arts Folio — book cover designers, cartographers, character artists, illustrators and branding specialists.",
      },
      { property: "og:title", content: "Our Artists — The Arts Folio" },
      { property: "og:description", content: "Meet the artists behind The Arts Folio." },
      { property: "og:url", content: "/artists" },
    ],
    links: [{ rel: "canonical", href: "/artists" }],
  }),
  component: ArtistsPage,
});

function ArtistsPage() {
  const { artists } = useSiteData();
  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Our artists"
            title={
              <>
                The hands behind <span className="text-gradient">the work</span>
              </>
            }
            description="A small, senior team of specialists. No outsourcing, no shortcuts."
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((m) => (
            <GlassCard key={m.slug} className="overflow-hidden p-0 flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-pink">
                    {m.specialization}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">{m.name}</h3>
                  <p className="text-sm text-white/80">{m.experience} experience</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">{m.bio}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({m.reviews ? m.reviews.length : 0} reviews)
                  </span>
                </div>
                <div className="mt-auto pt-5 flex gap-2">
                  <Link
                    to="/artists/$artist"
                    params={{ artist: m.slug }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2.5 text-xs font-semibold text-white cursor-pointer"
                  >
                    View profile <ArrowRight className="h-3 w-3" />
                  </Link>
                  <a
                    href={m.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Conversion ready"
        title={
          <>
            Not sure which artist <span className="text-white/90">fits your project?</span>
          </>
        }
        description="Tell us about your project and we'll match you with the right specialist within 24 hours."
        buttons={[
          { label: "Start Your Project", to: "/quote" },
          { label: "Book a Free Consultation", to: "/contact", variant: "ghost" },
        ]}
      />

      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <InquiryForm
            eyebrow="Quick brief"
            title="Or send us your brief now"
            submitLabel="Send to The Arts Folio"
          />
        </div>
      </section>
    </>
  );
}
