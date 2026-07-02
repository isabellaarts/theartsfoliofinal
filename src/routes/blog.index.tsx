import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { Search, ArrowRight } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — The Arts Folio" },
      {
        name: "description",
        content:
          "Publishing tips, cover design insights, character art techniques and marketing wisdom for authors and brands.",
      },
      { property: "og:title", content: "Blog — The Arts Folio" },
      { property: "og:description", content: "Insights for authors, publishers and creators." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

const CATEGORIES = [
  "All",
  "Publishing Tips",
  "Cover Design",
  "Character Art",
  "Fantasy World Building",
  "Marketing",
];

function BlogPage() {
  const { blogs } = useSiteData();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const published = (blogs || []).filter((p) => p.status === "published");
  
  const filtered = published.filter(
    (p) => 
      (cat === "All" || p.category === cat) && 
      (p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="The journal"
            title={
              <>
                Insights, craft notes & <span className="text-gradient">field reports</span>
              </>
            }
            description="Practical writing from working artists and designers. No filler."
          />
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-full glass border-white/10 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                    cat === c ? "bg-gradient-brand text-white" : "glass hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }}>
              <GlassCard className="p-0 overflow-hidden h-full flex flex-col hover-lift">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.imageAlt || p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-brand-pink">
                      {p.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold leading-tight text-white">{p.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Read article <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-20">
              No articles found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
