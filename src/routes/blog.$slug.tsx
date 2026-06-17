import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.slug)} — The Arts Folio Journal` },
      {
        name: "description",
        content:
          "An article from The Arts Folio journal — craft notes and field reports from working artists.",
      },
      { property: "og:title", content: `${slugToTitle(params.slug)} — The Arts Folio Journal` },
      { property: "og:description", content: "An article from The Arts Folio journal." },
      { property: "og:url", content: `/blog/${params.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: slugToTitle(params.slug),
          author: { "@type": "Organization", name: "The Arts Folio" },
        }),
      },
    ],
  }),
  component: PostPage,
});

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function PostPage() {
  const { slug } = Route.useParams();
  return (
    <article className="pt-36 pb-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">The Arts Folio Journal</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold leading-tight">
          {slugToTitle(slug)}
        </h1>
        <div className="mt-10 prose-invert space-y-5 text-base md:text-lg leading-relaxed text-foreground/85">
          <p>
            This is a sample article placeholder. Real editorial content would live here, written by
            our team and contributing artists. Each article covers a single craft topic in depth —
            designed to be read once and referenced often.
          </p>
          <p>
            From sketching genre-aware compositions to mastering character-light, our journal exists
            to share what we've learned working with hundreds of authors and brands across the
            world.
          </p>
          <h2 className="font-display text-2xl font-bold mt-10">Section heading</h2>
          <p>
            Body copy continues here. Pull quotes, image captions and figure references would all be
            styled consistently with the site's design system to maintain a calm, premium reading
            experience.
          </p>
          <blockquote className="border-l-2 border-brand-pink pl-5 italic text-muted-foreground">
            "The cover sells the book the same way the trailer sells the film — once."
          </blockquote>
          <p>Replace this placeholder with your real article copy at any time.</p>
        </div>
      </div>
    </article>
  );
}
