import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SERVICES, type Artist, IMAGES } from "@/lib/site-data";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { InquiryForm } from "@/components/site/InquiryForm";
import { getSiteData } from "@/lib/server-functions";
import { useSiteData } from "@/hooks/use-site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Instagram,
  ArrowLeft,
  ArrowRight,
  Star,
  Quote,
  Linkedin,
  Sparkles,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useLeadModal } from "@/components/site/LeadModalContext";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

import cover1Sketch from "@/assets/cover1-sketch.png";
import char1Lineart from "@/assets/char1-lineart.png";
import map1Draft from "@/assets/map1-draft.png";
import char2Concept from "@/assets/char2-concept.png";

export const Route = createFileRoute("/artists/$artist")({
  loader: async ({ params }) => {
    const res = await getSiteData();
    if (!res.success) throw notFound();
    const artist = res.team?.find((m) => m.slug === params.artist);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.artist;
    return {
      meta: [
        { title: a ? `${a.name} — ${a.role} — The Arts Folio` : "Artist — The Arts Folio" },
        {
          name: "description",
          content: a
            ? `${a.name}, ${a.role} at The Arts Folio. ${a.bio.slice(0, 140)}`
            : "Artist profile",
        },
        {
          property: "og:title",
          content: a ? `${a.name} — The Arts Folio` : "Artist — The Arts Folio",
        },
        { property: "og:description", content: a?.bio ?? "Artist profile" },
        { property: "og:url", content: a ? `/artists/${a.slug}` : "/artists" },
        { property: "og:type", content: "profile" },
      ],
      links: a ? [{ rel: "canonical", href: `/artists/${a.slug}` }] : [],
      scripts: a
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: a.name,
                jobTitle: a.role,
                description: a.bio,
                image: a.image,
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="pt-36 pb-20 text-center">
      <h1 className="font-display text-4xl">Artist not found</h1>
      <Link to="/artists" className="mt-6 inline-block text-gradient">
        ← Back to artists
      </Link>
    </div>
  ),
  component: ArtistPage,
});

const CATEGORIES = ["All", "Covers", "Characters", "Maps", "Branding"];

function ArtistPage() {
  const { artist: loaderArtist } = Route.useLoaderData();
  const { artists } = useSiteData();
  
  // Dynamic client lookup to refresh instantly when edited on the dashboard
  const artist = artists.find((a) => a.slug === loaderArtist.slug) || loaderArtist;
  
  const [filter, setFilter] = useState("All");
  const services = SERVICES.filter((s) => artist.services?.includes(s.slug) || []);
  const { openModal } = useLeadModal();

  const beforeImg = artist.showcaseBeforeImg || cover1Sketch;
  const afterImg = artist.showcaseAfterImg || IMAGES.cover1;
  const beforeLabel = artist.showcaseBeforeLabel || "Rough Sketch";
  const afterLabel = artist.showcaseAfterLabel || "Finished Work";
  const videoUrl = artist.processVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-artist-mixing-oil-colors-on-a-palette-40188-large.mp4";
  
  const showcaseTitle = artist.showcaseTitle || "See the craftsmanship";
  const showcaseDescription = artist.showcaseDescription || `Every illustration ${artist.name.split(" ")[0]} works on is hand-crafted and customized. Use the slider to see the transition from draft layouts and sketch structures to the finished masterpiece.`;
  const processVideoTitle = artist.processVideoTitle || "Process video";
  const processVideoDescription = artist.processVideoDescription || `Watch ${artist.name.split(" ")[0]}'s creative process in action. From rough composition layouts to final renders, see the skill and time required to build custom illustrations.`;
  const contactFormEyebrow = artist.contactFormEyebrow || `Hire ${artist.name.split(" ")[0]}`;
  const contactFormTitle = artist.contactFormTitle || `Send ${artist.name.split(" ")[0]} a project brief`;
  const ctaTitle = artist.ctaTitle || `Work with ${artist.name} today`;
  const ctaDescription = artist.ctaDescription || "Custom quotes, transparent process, hand-drawn work. Start your project in minutes.";
  const ctaButton1Label = artist.ctaButton1Label || "Hire This Artist";
  const ctaButton2Label = artist.ctaButton2Label || "Book a Free Consultation";

  // State to manage the active portfolio item for the details modal
  const [activeItem, setActiveItem] = useState<any | null>(null);

  // Fetch and filter portfolio items associated with this artist
  const { portfolio: allPortfolio } = useSiteData();
  const artistItems = allPortfolio.filter((p) => p.artistSlug === artist.slug && p.status === "published");
  const sortedItems = [...artistItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  
  // Dynamic categories based on actual categories present in this artist's portfolio
  const categoriesList = ["All", ...Array.from(new Set(sortedItems.map((item) => item.category)))];
  const items = filter === "All" ? sortedItems : sortedItems.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div
          className="absolute inset-0 -z-10 opacity-15 blur-3xl"
          style={{
            backgroundImage: `url(${artist.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <Link
            to="/artists"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to artists
          </Link>
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div className="relative overflow-hidden rounded-3xl glass-strong shadow-glow">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-brand-pink">
                <Sparkles className="h-3 w-3" /> {artist.specialization}
              </div>
              <h1 className="mt-4 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]">
                {artist.name}
              </h1>
              <p className="mt-3 font-display text-xl text-foreground/80">{artist.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {artist.experience} experience · {artist.reviews ? artist.reviews.length : 0}+ happy clients
              </p>

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-pink text-brand-pink" />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  5.0 from clients worldwide
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => openModal(artist.name)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
                >
                  Hire This Artist <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openModal(artist.name)}
                  className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-base font-semibold hover:bg-white/10 cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>

              <div className="mt-6 flex gap-2">
                {artist.socials?.instagram && (
                  <SocialIcon href={artist.socials.instagram} icon={Instagram} label="Instagram" />
                )}
                {artist.socials?.behance && (
                  <SocialIcon href={artist.socials.behance} icon={Globe} label="Behance" />
                )}
                {artist.socials?.artstation && (
                  <SocialIcon href={artist.socials.artstation} icon={Globe} label="ArtStation" />
                )}
                {artist.socials?.linkedin && (
                  <SocialIcon href={artist.socials.linkedin} icon={Linkedin} label="LinkedIn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + Process + Skills */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 grid lg:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="font-display text-2xl font-bold">Biography</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">{artist.bio}</p>
            <h3 className="mt-8 font-display text-2xl font-bold">Creative process</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">{artist.process}</p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-2xl font-bold">Skills & expertise</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {artist.skills?.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-gradient-brand/15 border border-brand-violet/30 px-4 py-1.5 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <Stat label="Experience" value={artist.experience} />
              <Stat label="Reviews" value={`${artist.reviews ? artist.reviews.length : 0}+`} />
              <Stat label="Rating" value="5.0" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Before & After + Process Videos Showcase */}
      <section className="py-16 bg-surface-2/30">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">{showcaseTitle}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {showcaseDescription}
            </p>
            <BeforeAfterSlider
              beforeImage={beforeImg}
              afterImage={afterImg}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
            />
          </div>
          <div>
            <h3 className="font-display text-3xl font-bold mb-4">{processVideoTitle}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {processVideoDescription}
            </p>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/3] bg-black/40">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            align="left"
            eyebrow="Portfolio"
            title={
              <>
                Selected <span className="text-gradient">work</span>
              </>
            }
          />
          {categoriesList.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2 mb-8">
              {categoriesList.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${filter === c ? "bg-gradient-brand text-white shadow-glow" : "glass hover:bg-white/10"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {items.length === 0 ? (
            <div className="text-center py-12 glass rounded-3xl border-white/5">
              <p className="text-muted-foreground">No portfolio work published yet.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveItem(p)}
                  className="group relative block w-full aspect-square overflow-hidden rounded-3xl glass hover-lift cursor-pointer text-left"
                >
                  {p.mediaType === "video" ? (
                    <video
                      src={p.videoUrl}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-pink">{p.category}</p>
                    <h4 className="mt-1 font-display text-lg font-bold text-white leading-tight">{p.title}</h4>
                    <span className="mt-2 inline-block text-[10px] font-semibold rounded-full bg-white/10 backdrop-blur px-2.5 py-0.5 text-white w-fit">
                      View Work
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Item Detail Dialog */}
      <Dialog open={!!activeItem} onOpenChange={(o) => !o && setActiveItem(null)}>
        <DialogContent className="max-w-5xl glass-strong border-white/10 p-0 overflow-hidden">
          {activeItem && (
            <div className="grid md:grid-cols-2">
              <div className="relative bg-black/20 flex items-center justify-center">
                {activeItem.mediaType === "video" ? (
                  <video
                    src={activeItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover max-h-[80vh]"
                  />
                ) : (
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover max-h-[80vh]"
                  />
                )}
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">
                    {activeItem.category}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-bold">{activeItem.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{activeItem.description}</p>
                  {activeItem.tags && activeItem.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {activeItem.tags.map((t: string) => (
                        <span key={t} className="text-[10px] uppercase bg-white/5 px-2.5 py-1 rounded-full text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-8 space-y-3 text-sm pt-8 border-t border-white/5">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Artist</span>
                    <span>{artist.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span>{activeItem.category}</span>
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

      {/* Reviews for this artist */}
      {artist.reviews && artist.reviews.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHeading
              align="left"
              eyebrow={`Reviews for ${artist.name.split(" ")[0]}`}
              title={
                <>
                  What clients <span className="text-gradient">say</span>
                </>
              }
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artist.reviews.map((r, i) => (
                <GlassCard key={i}>
                  <Quote className="h-6 w-6 text-brand-violet" />
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
                  <div className="mt-5 flex items-center gap-3 pt-5 border-t border-white/5">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-xs font-bold text-white">
                      {r.author
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{r.author}</p>
                      <p className="text-xs text-muted-foreground">{r.country}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-brand-pink text-brand-pink" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {services.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHeading
              align="left"
              eyebrow="Related services"
              title={
                <>
                  Services {artist.name.split(" ")[0]} <span className="text-gradient">offers</span>
                </>
              }
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to="/services"
                  hash={s.slug}
                  className="glass rounded-3xl p-6 hover-lift group text-left block"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">{s.tagline}</p>
                  <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{s.overview}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-gradient transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {artist.pricing && artist.pricing.length > 0 && (
        <section className="py-16 bg-surface-2/15">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHeading
              align="left"
              eyebrow="Rates & Services"
              title={
                <>
                  Pricing & <span className="text-gradient">Packages</span>
                </>
              }
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {artist.pricing.map((p, i) => (
                <GlassCard key={i} className="flex flex-col justify-between h-full border-white/5 hover:border-brand-violet/30 transition-colors">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed min-h-[50px]">{p.description}</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-brand-pink font-semibold">Starting at</span>
                    <span className="font-display text-2xl font-bold text-gradient">{p.price}</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hire this artist form */}
      <section id="hire" className="py-16 scroll-mt-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <InquiryForm
            eyebrow={contactFormEyebrow}
            title={contactFormTitle}
            artistName={artist.name}
          />
        </div>
      </section>

      {/* FAQ */}
      {artist.faqs && artist.faqs.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-5 lg:px-10">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  About working with{" "}
                  <span className="text-gradient">{artist.name.split(" ")[0]}</span>
                </>
              }
            />
            <div className="mt-10">
              <Accordion type="single" collapsible className="space-y-3">
                {artist.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`f${i}`} className="glass rounded-2xl border-0 px-6">
                    <AccordionTrigger className="text-left font-display text-lg font-semibold hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Hire this artist"
        title={<>{ctaTitle}</>}
        description={ctaDescription}
        buttons={[
          { label: ctaButton1Label, to: "/quote" },
          { label: ctaButton2Label, to: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-white/10 transition-colors"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="font-display text-2xl font-bold text-gradient">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
