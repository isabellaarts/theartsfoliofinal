import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { SERVICES } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  Map,
  Sparkles,
  PenTool,
  Palette,
  Globe,
  Share2,
  Layers,
  Lock,
  ArrowRight,
  Check,
  Users,
  Workflow,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

const ICONS = { BookOpen, Map, Sparkles, PenTool, Palette, Globe, Share2, Layers, Lock };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — The Arts Folio" },
      {
        name: "description",
        content:
          "Book covers, fantasy maps, character art, interior illustrations, branding, websites, social media — every creative service crafted by hand.",
      },
      { property: "og:title", content: "Services — The Arts Folio" },
      {
        property: "og:description",
        content: "Every creative service crafted by hand by The Arts Folio.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "Service",
            position: i + 1,
            name: s.title,
            description: s.overview,
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Every visual you need, <span className="text-gradient">custom-crafted</span>
              </>
            }
            description="From cover concept to full brand systems, every service is hand-drawn and tailored to your story."
          />
        </div>
      </section>

      {/* Service nav */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full glass px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors"
            >
              {s.title}
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 space-y-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 space-y-12">
          {SERVICES.map((s, idx) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <article id={s.slug} key={s.slug} className="scroll-mt-28">
                <div className="glass-strong rounded-3xl p-8 md:p-12 hover-lift">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start gap-6 pb-8 border-b border-white/5">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">
                        Service {String(idx + 1).padStart(2, "0")}
                      </p>
                      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                        {s.title}
                      </h2>
                      <p className="mt-2 font-display text-lg md:text-xl text-foreground/85 italic">
                        {s.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="mt-8 grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
                        Overview
                      </h3>
                      <p className="text-base md:text-lg text-foreground/85 leading-relaxed">
                        {s.overview}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-pink mb-3">
                        At a glance
                      </p>
                      {s.slug === "web-design" ? (
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Delivery:</strong> 2–8 Weeks Typical
                          </li>
                          <li>
                            <strong>Technology:</strong> WordPress, Shopify & Custom Development
                          </li>
                          <li>
                            <strong>Optimization:</strong> SEO, Speed & Mobile Responsive
                          </li>
                          <li>
                            <strong>Support:</strong> Maintenance & Growth Assistance
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Timeline:</strong> 3–6 weeks typical
                          </li>
                          <li>
                            <strong>Pricing:</strong> Custom quote
                          </li>
                          <li>
                            <strong>Rights:</strong> Full commercial
                          </li>
                          <li>
                            <strong>Process:</strong> Sketch → Line → Color → Final
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* What's Included + Ideal For + Process + Benefits */}
                  <div className="mt-10 grid md:grid-cols-2 gap-6">
                    <DetailBlock
                      icon={Check}
                      title="What's Included"
                      items={s.included}
                      accent="violet"
                    />
                    <DetailBlock
                      icon={Users}
                      title="Perfect For"
                      items={s.idealFor}
                      accent="pink"
                    />
                    <DetailBlock
                      icon={Workflow}
                      title="Our Process"
                      items={s.process}
                      ordered
                      accent="indigo"
                    />
                    <DetailBlock
                      icon={TrendingUp}
                      title="Benefits"
                      items={s.benefits}
                      accent="violet"
                    />
                  </div>

                  {/* FAQ */}
                  <div className="mt-10">
                    <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" /> Frequently asked
                    </h3>
                    <Accordion type="single" collapsible className="space-y-2">
                      {s.faqs.map((f, i) => (
                        <AccordionItem
                          key={i}
                          value={`${s.slug}-f${i}`}
                          className="glass rounded-2xl border-0 px-5"
                        >
                          <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                            {f.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {f.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>

                  {/* Per-service CTA */}
                  <div className="mt-10 rounded-2xl bg-gradient-brand p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 justify-between shadow-glow">
                    <div>
                      <h4 className="font-display text-xl md:text-2xl font-bold text-white">
                        Ready to start your {s.title.toLowerCase()} project?
                      </h4>
                      <p className="text-sm text-white/80 mt-1">
                        Free quote, free consultation, no obligation.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to="/quote"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-violet hover:scale-105 transition-transform"
                      >
                        Request a Custom Quote <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/25 transition-colors"
                      >
                        Book Free Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why The Arts Folio */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Why The Arts Folio"
            title={
              <>
                What makes us <span className="text-gradient">different</span>
              </>
            }
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-3">
            {[
              "Human Artists Only",
              "No AI Generated Artwork",
              "Custom Made For Every Client",
              "Transparent Revision Process",
              "High Resolution Deliverables",
              "Commercial Usage Options",
              "Dedicated Artist Communication",
              "Worldwide Client Support",
            ].map((t) => (
              <div key={t} className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-brand shrink-0">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Start your project"
        title={
          <>
            Ready to turn your ideas into <span className="text-white/90">stunning visuals?</span>
          </>
        }
        description="Whether you need a bestselling book cover, a fantasy world map, character artwork, branding, or a complete website, The Arts Folio is ready to bring your vision to life."
        buttons={[
          { label: "Request a Custom Quote", to: "/quote" },
          { label: "Hire an Artist", to: "/artists", variant: "ghost" },
          { label: "Schedule a Consultation", to: "/contact", variant: "ghost" },
        ]}
      />
    </>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  items,
  ordered,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  ordered?: boolean;
  accent: "violet" | "pink" | "indigo";
}) {
  const dot =
    accent === "pink"
      ? "bg-brand-pink"
      : accent === "indigo"
        ? "bg-brand-indigo"
        : "bg-brand-violet";
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-brand-pink" />
        <h4 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h4>
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            {ordered ? (
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${dot} text-[10px] font-bold text-white mt-0.5`}
              >
                {i + 1}
              </span>
            ) : (
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot} mt-2`} />
            )}
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
