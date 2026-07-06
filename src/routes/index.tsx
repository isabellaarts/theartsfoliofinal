import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  BookOpen,
  Map,
  PenTool,
  Palette,
  Globe,
  Share2,
  Layers,
  Lock,
  ArrowRight,
  Star,
  Award,
  Hand,
  Video,
  ShieldCheck,
  Globe2,
  PencilRuler,
  Quote,
  CheckCircle,
  Play,
  Pause,
  ChevronRight,
  Eye,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading, GlassCard, GradientOrb } from "@/components/site/ui-bits";
import { InquiryForm } from "@/components/site/InquiryForm";
import { IMAGES, SERVICES, STATS, DEFAULT_SITE_CONFIG, DEFAULT_INTERACTIVE_GALLERY } from "@/lib/site-data";
import { useSiteData } from "@/hooks/use-site-data";
import { useLeadModal } from "@/components/site/LeadModalContext";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { VideoWatermark } from "@/components/site/VideoWatermark";
import { cn } from "@/lib/utils";

import cover1Sketch from "@/assets/cover1-sketch.png";
import char1Lineart from "@/assets/char1-lineart.png";
import map1Draft from "@/assets/map1-draft.png";
import char2Concept from "@/assets/char2-concept.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Arts Folio — Where Stories Become Visual Masterpieces" },
      {
        name: "description",
        content:
          "Premium art & design studio for authors, publishers and brands. Custom book covers, fantasy maps, character art, branding, websites and more.",
      },
      {
        property: "og:title",
        content: "The Arts Folio — Where Stories Become Visual Masterpieces",
      },
      {
        property: "og:description",
        content:
          "Custom book covers, fantasy maps, character art and brand design crafted entirely by human artists.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const SERVICE_ICONS = { BookOpen, Map, Sparkles, PenTool, Palette, Globe, Share2, Layers, Lock };

function HomePage() {
  return (
    <>
      <Hero />
      <PostHeroCTA />
      <Marquee />
      <WhyChooseUs />
      <AiArtProblem />
      <ArtworkCreationTrust />
      <ServicesPreview />
      <FeaturedPortfolio />
      <StatsSection />
      <ReviewsCarousel />
      <InlineInquiry />
      <FinalCTA />
    </>
  );
}

function PostHeroCTA() {
  const { openModal } = useLeadModal();
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="glass-strong rounded-3xl px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">
              Free, no obligation
            </p>
            <p className="mt-1 font-display text-lg md:text-xl font-semibold">
              Get a tailored quote in under 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openModal(null)}
              className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
            >
              Request a Custom Quote
            </button>
            <button
              onClick={() => openModal(null)}
              className="rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 cursor-pointer"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const highlightText = (text: string, phrase: string) => {
  if (!text) return "";
  const regex = new RegExp(`(${phrase})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === phrase.toLowerCase() ? (
      <span key={i} className="text-gradient">
        {part}
      </span>
    ) : (
      part
    )
  );
};

function InlineInquiry() {
  const { siteConfig } = useSiteData();
  const activeConfig = siteConfig || DEFAULT_SITE_CONFIG;
  const section = activeConfig.startYourProjectSection;

  return (
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">{section.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-[1.05]">
            {highlightText(section.title, "vision")}
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            {section.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/artists"
              className="rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Browse Artists
            </Link>
            <Link
              to="/portfolio"
              className="rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              View Portfolio
            </Link>
          </div>
        </div>
        <InquiryForm eyebrow="Quick brief" title="Send us your project" />
      </div>
    </section>
  );
}

function Hero() {
  const { openModal } = useLeadModal();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={IMAGES.heroFantasy}
          alt="Fantasy artwork hero"
          width={1920}
          height={1080}
          className="h-full w-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        <div className="absolute inset-0 bg-radial-glow opacity-60" />
      </div>

      {/* floating art elements */}
      <div className="absolute top-32 left-10 hidden md:block animate-float-slow">
        <div className="h-24 w-24 rounded-3xl glass grid place-items-center rotate-6">
          <PencilRuler className="h-10 w-10 text-brand-pink" />
        </div>
      </div>
      <div className="absolute bottom-40 right-12 hidden md:block animate-float">
        <div className="h-28 w-28 rounded-full glass grid place-items-center">
          <Palette className="h-12 w-12 text-brand-violet" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 hidden lg:block animate-float-slow">
        <div className="h-16 w-16 rounded-2xl bg-gradient-brand shadow-glow grid place-items-center -rotate-12">
          <Sparkles className="h-7 w-7 text-white" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-10 py-24 md:py-36">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground animate-fade-up">
          <Star className="h-3.5 w-3.5 fill-brand-pink text-brand-pink" />
          Award-winning creative studio
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-5xl animate-fade-up">
          Professional Art & Design Studio for{" "}
          <span className="text-gradient animate-gradient">Authors, Publishers</span> & Brands
        </h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-up [animation-delay:120ms]">
          We create stunning book covers, fantasy maps, character illustrations, branding, websites
          and digital experiences that leave lasting impressions.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:240ms]">
          <button
            onClick={() => openModal(null)}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
          >
            Request Custom Quote
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-base font-semibold hover:bg-white/10 transition-colors"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Book Covers",
    "Fantasy Maps",
    "Character Art",
    "Branding",
    "Web Design",
    "Interior Art",
    "Social Media",
    "Logo Design",
  ];
  return (
    <section className="relative py-10 border-y border-white/5 bg-surface-2/50 overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground/60">
              {it}
            </span>
            <Sparkles className="h-5 w-5 text-brand-violet" />
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    {
      icon: PencilRuler,
      title: "100% Custom Artwork",
      desc: "Every project is created from scratch — built for your story, not a stock library.",
    },
    {
      icon: Hand,
      title: "Human-Made Process",
      desc: "Hand-painted by trained artists. Zero AI-generated work. Ever.",
    },
    {
      icon: Layers,
      title: "Progress Updates",
      desc: "Rough sketch → line art → rendering → final delivery, with you at every step.",
    },
    {
      icon: Video,
      title: "Hand-Drawn Proof",
      desc: "Process videos available on request — full transparency, every commission.",
    },
    {
      icon: ShieldCheck,
      title: "Commercial Rights",
      desc: "Professional licensing tailored to your launch, distribution and marketing needs.",
    },
    {
      icon: Globe2,
      title: "Worldwide Clients",
      desc: "Serving authors, publishers and businesses across 47+ countries.",
    },
  ];
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <GradientOrb className="top-0 left-1/4 h-96 w-96 bg-brand-violet/40" />
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="Why choose us"
          title={
            <>
              Crafted by humans. <span className="text-gradient">Built to last.</span>
            </>
          }
          description="The Arts Folio is a premium, human-led studio. Here's what every client gets."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <GlassCard key={i} className="animate-fade-up">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                <it.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function AiArtProblem() {
  const steps = [
    "Concept Discussion",
    "Rough Sketch",
    "Revisions",
    "Clean Line Art",
    "Coloring & Rendering",
    "Final Delivery",
  ];
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-radial-glow opacity-30" />
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading
            align="left"
            eyebrow="The AI art problem"
            title={
              <>
                Why authors are moving <span className="text-gradient">away from AI art</span>
              </>
            }
            description="Inconsistencies, copyright concerns, broken character continuity and generic visuals — the costs of cutting corners. At The Arts Folio, every artwork is crafted through a professional artist workflow."
          />
        </div>
        <div className="relative">
          <div className="glass-strong rounded-3xl p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Our human workflow
            </p>
            <ol className="space-y-4">
              {steps.map((s, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <span className="font-display text-lg font-medium">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-muted-foreground border-t border-white/5 pt-6">
              Work-in-progress previews and hand-drawn process videos provided on request for full
              transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtworkCreationTrust() {
  const { openModal } = useLeadModal();
  const { interactiveGallery, siteConfig } = useSiteData();
  const activeConfig = siteConfig || DEFAULT_SITE_CONFIG;

  const galleryItems = (interactiveGallery && interactiveGallery.length > 0)
    ? interactiveGallery
    : DEFAULT_INTERACTIVE_GALLERY;

  const [activeComparison, setActiveComparison] = useState("");

  const activeItem = galleryItems.find(item => item.id === activeComparison) || galleryItems[0];

  useEffect(() => {
    if (galleryItems.length > 0 && !activeComparison) {
      setActiveComparison(galleryItems[0].id);
    }
  }, [galleryItems, activeComparison]);

  const processVideos = activeConfig.processVideos || DEFAULT_SITE_CONFIG.processVideos;

  return (
    <>
      {/* 1. See The Artwork Come To Life */}
      <section className="relative py-24 md:py-32 bg-surface-2/25 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-30" />
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Process Gallery"
            title={
              <>
                See the artwork <span className="text-gradient">come to life</span>
              </>
            }
            description="Great artwork doesn't appear instantly. Every project at The Arts Folio goes through a professional creative process where ideas evolve from rough concepts into polished final artwork."
          />

          <p className="mt-4 max-w-2xl mx-auto text-center text-sm text-muted-foreground">
            To provide complete transparency and build client confidence, we regularly share
            work-in-progress previews and hand-drawn process videos.
          </p>

          <div className="mt-16 grid lg:grid-cols-[1fr_1.8fr] gap-8 items-center">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
                Compare Stages
              </p>
              <h3 className="font-display text-2xl font-bold">Interactive Gallery</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Drag the interactive slider on the comparison image to see the shift from early
                sketches and outlines to completed masterpieces.
              </p>

              <div className="flex flex-col gap-2 pt-4">
                {galleryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveComparison(item.id)}
                    className={cn(
                      "text-left px-5 py-4 rounded-2xl border transition-all text-sm font-semibold",
                      (activeItem?.id === item.id)
                        ? "bg-gradient-brand/10 border-brand-violet/50 text-white shadow-glow"
                        : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.titleBefore}</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>{item.titleAfter}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {activeItem && (
                <BeforeAfterSlider
                  beforeImage={activeItem.beforeImage}
                  afterImage={activeItem.afterImage}
                  beforeLabel={activeItem.beforeLabel}
                  afterLabel={activeItem.afterLabel}
                />
              )}
              <p className="text-xs text-muted-foreground italic text-center">
                {activeItem?.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Process Video Showcase */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow={activeConfig.watchArtworkSection.eyebrow}
            title={highlightText(activeConfig.watchArtworkSection.title, "being created")}
            description={activeConfig.watchArtworkSection.description}
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processVideos.map((video, idx) => (
              <GlassCard
                key={idx}
                className="p-0 overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-black/40">
                  <video
                    src={video.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <VideoWatermark />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />
                </div>
                <div className="p-6">
                  <h4 className="font-display text-lg font-bold text-white">{video.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{video.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Clients Choose Human Artists & Transparency */}
      <section className="relative py-24 md:py-32 bg-surface-2/20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-brand-pink mb-4">
              <Sparkles className="h-3 w-3" /> Creativity Beyond Generation
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              Why clients choose <span className="text-gradient">human artists</span>
            </h2>

            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Many authors and businesses seek artwork that is unique, emotionally engaging, and
              tailored specifically to their vision. While AI tools can generate images quickly,
              clients often require:
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-4">
              {[
                "Consistent characters",
                "Accurate storytelling",
                "Creative collaboration",
                "Custom revisions",
                "Original artistic direction",
                "Professional communication",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 text-brand-pink shrink-0" />
                  <span className="text-sm font-semibold text-white/95">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              At The Arts Folio, every project is handled by real artists who work directly with
              clients throughout the creative process.
            </p>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-8 border-brand-violet/20 bg-brand-violet/5">
              <h3 className="font-display text-2xl font-bold mb-4">Transparency You Can Trust</h3>
              <ul className="space-y-3">
                {[
                  {
                    title: "Work-in-Progress Updates",
                    desc: "Regular check-ins so you are never left guessing.",
                  },
                  {
                    title: "Sketch Previews",
                    desc: "Approve layouts and scale before lines and color begin.",
                  },
                  {
                    title: "Revision Opportunities",
                    desc: "Collaborate and polish the artwork stage-by-stage.",
                  },
                  {
                    title: "Direct Artist Communication",
                    desc: "Discuss nuances directly with the designer handling the files.",
                  },
                  {
                    title: "Process Videos (When Available)",
                    desc: "Hand-drawn footage showing the craftsmanship step-by-step.",
                  },
                  {
                    title: "Fully Custom Artwork",
                    desc: "100% hand-crafted. Never generated or repurposed.",
                  },
                ].map((item, idx) => (
                  <li key={idx} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-pink font-semibold" />
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. Trust Section (Final Highlight): From Sketch To Masterpiece */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-glow bg-black/60 group">
              <video
                src={activeConfig.featuredTimelapseSection.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full aspect-[21/9] object-cover opacity-80"
              />
              <VideoWatermark />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-[0.2em] text-brand-pink font-semibold">
                  {activeConfig.featuredTimelapseSection.eyebrow}
                </span>
                <h3 className="font-display text-2xl font-bold mt-1 text-white">
                  {activeConfig.featuredTimelapseSection.title}
                </h3>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-3xl font-bold">{activeConfig.realCraftsmanshipSection.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {activeConfig.realCraftsmanshipSection.description1}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {activeConfig.realCraftsmanshipSection.description2}
              </p>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-sm font-semibold text-white/95">
                  {activeConfig.startYourProjectCard.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeConfig.startYourProjectCard.description}
                </p>
                <button
                  onClick={() => openModal(null)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-all cursor-pointer"
                >
                  {activeConfig.startYourProjectCard.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPreview() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="Our services"
          title={
            <>
              Every visual you need, <span className="text-gradient">under one roof</span>
            </>
          }
          description="From debut covers to full brand systems, we craft visual stories that endure."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.icon as keyof typeof SERVICE_ICONS];
            return (
              <Link
                key={s.slug}
                to="/services"
                className="group relative glass rounded-3xl p-8 hover-lift overflow-hidden"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl group-hover:opacity-30 transition-opacity" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 group-hover:bg-gradient-brand transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-foreground/80 group-hover:text-gradient transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedPortfolio() {
  const { portfolio } = useSiteData();
  const featured = portfolio.slice(0, 8);
  return (
    <section className="relative py-24 md:py-32 bg-surface-2/30">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            align="left"
            eyebrow="Featured work"
            title={
              <>
                Recent <span className="text-gradient">commissions</span>
              </>
            }
          />
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gradient transition-all"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 [grid-auto-flow:dense]">
          {featured.map((p, i) => (
            <Link
              key={p.id}
              to="/portfolio"
              className={`group relative overflow-hidden rounded-3xl glass hover-lift ${
                p.aspect === "wide" ? "col-span-2" : ""
              } ${i === 0 ? "row-span-2" : ""}`}
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-pink mb-1">
                  {p.category}
                </p>
                <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="glass-strong rounded-3xl p-10 md:p-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl md:text-6xl font-bold text-gradient">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsCarousel() {
  const { reviews } = useSiteData();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <SectionHeading
          eyebrow="Client reviews"
          title={
            <>
              Words from <span className="text-gradient">authors & founders</span>
            </>
          }
        />
        <div className="mt-12">
          <Carousel opts={{ loop: true, align: "start" }}>
            <CarouselContent className="-ml-4">
              {reviews.map((r, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <GlassCard className="h-full">
                    <Quote className="h-6 w-6 text-brand-violet" />
                    <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{r.text}"</p>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-3">
              <CarouselPrevious className="relative left-0 right-0 top-0 translate-x-0 translate-y-0 glass border-white/10 text-foreground" />
              <CarouselNext className="relative left-0 right-0 top-0 translate-x-0 translate-y-0 glass border-white/10 text-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { openModal } = useLeadModal();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-brand p-12 md:p-20 text-center shadow-glow">
          <div className="absolute inset-0 bg-radial-glow opacity-50" />
          <Award className="relative mx-auto h-12 w-12 text-white" />
          <h2 className="relative mt-6 font-display text-4xl md:text-6xl font-bold text-white">
            Ready to bring your vision to life?
          </h2>
          <p className="relative mt-5 text-lg text-white/85 max-w-xl mx-auto">
            Tell us about your project and we'll send back a tailored creative plan within 24 hours.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openModal(null)}
              className="rounded-full bg-white px-7 py-4 text-base font-semibold text-brand-violet hover:scale-105 transition-transform cursor-pointer"
            >
              Start Project
            </button>
            <button
              onClick={() => openModal(null)}
              className="rounded-full glass-strong border-white/30 px-7 py-4 text-base font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
