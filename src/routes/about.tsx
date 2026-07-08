import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";
import { STATS } from "@/lib/site-data";
import { Heart, Eye, MessageSquare, Award, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Arts Folio" },
      {
        name: "description",
        content:
          "The story, mission and people behind The Arts Folio — a premium human-led art and design studio serving authors and brands worldwide.",
      },
      { property: "og:title", content: "About — The Arts Folio" },
      {
        property: "og:description",
        content: "The story, mission and people behind The Arts Folio.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const timeline = [
    {
      year: "2013",
      title: "First commissioned cover",
      desc: "A single artist, a single laptop, a single brief.",
    },
    {
      year: "2016",
      title: "Studio formed",
      desc: "Three artists, one shared workflow, growing word of mouth.",
    },
    {
      year: "2019",
      title: "100+ books shipped",
      desc: "Authors across five continents joined our portfolio.",
    },
    {
      year: "2022",
      title: "Full creative agency",
      desc: "Branding, web, social and motion added to the offering.",
    },
    {
      year: "2026",
      title: "Today",
      desc: "850+ projects delivered, 47 countries served, all human-made.",
    },
  ];
  const values = [
    { icon: Sparkles, title: "Creativity", desc: "Every brief is a chance to surprise." },
    { icon: Eye, title: "Transparency", desc: "Show the work — sketches, revisions, everything." },
    { icon: MessageSquare, title: "Communication", desc: "Reply fast, listen harder, write less." },
    { icon: Award, title: "Quality", desc: "Print-ready, pixel-considered, lasting craft." },
    { icon: Shield, title: "Reliability", desc: "Deliver on time. Deliver on the word." },
    {
      icon: Heart,
      title: "Care",
      desc: "Treat each project like it's the one we're remembered for.",
    },
  ];

  return (
    <>
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                A studio built on <span className="text-gradient">human craft</span>
              </>
            }
            description="The Arts Folio started with a quiet conviction: that the best book covers, maps and characters come from real artists, working with real authors. A decade later, that conviction is still the studio."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-10 grid md:grid-cols-2 gap-8">
          <GlassCard>
            <h3 className="font-display text-2xl font-bold">Mission</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              To craft visual masterpieces that help every story find its audience — through human
              creativity, transparent process and uncompromised quality.
            </p>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display text-2xl font-bold">Vision</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              A world where independent authors and emerging brands have access to the same premium
              creative work that used to be reserved for the biggest publishers.
            </p>
          </GlassCard>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Timeline"
            title={
              <>
                Twelve years, <span className="text-gradient">one studio</span>
              </>
            }
          />
          <div className="mt-16 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-indigo via-brand-violet to-brand-pink" />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className={`relative grid md:grid-cols-2 gap-8 ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
                >
                  <div className="md:[direction:ltr]">
                    <GlassCard>
                      <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">{t.year}</p>
                      <h3 className="mt-2 font-display text-xl font-bold">{t.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                    </GlassCard>
                  </div>
                  <div className="hidden md:block" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 h-4 w-4 rounded-full bg-gradient-brand shadow-glow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
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

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <SectionHeading
            eyebrow="Our values"
            title={
              <>
                What we <span className="text-gradient">hold to</span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <GlassCard key={i}>
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                  <v.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Start your project"
        title={
          <>
            Work with a studio that{" "}
            <span className="text-white/90">treats your story like its own</span>
          </>
        }
        description="A senior team, hand-drawn work, transparent process. Let's talk."
        buttons={[
          { label: "Request a Custom Quote", to: "/quote" },
          { label: "View Portfolio", to: "/portfolio", variant: "ghost" },
        ]}
      />
    </>
  );
}
