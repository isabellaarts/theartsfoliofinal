import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getSiteData } from "@/lib/server-functions";
import { useSiteData } from "@/hooks/use-site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const res = await getSiteData();
    if (!res.success) throw notFound();
    const blog = res.blogs?.find((b) => b.slug === params.slug);
    if (!blog) throw notFound();
    return { blog };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.blog;
    return {
      meta: [
        { title: b?.metaTitle || `${b?.title} — The Arts Folio` },
        {
          name: "description",
          content: b?.metaDescription || b?.excerpt || "An article from The Arts Folio journal — craft notes and field reports.",
        },
        { property: "og:title", content: b?.metaTitle || `${b?.title} — The Arts Folio` },
        { property: "og:description", content: b?.metaDescription || b?.excerpt || "An article from The Arts Folio journal." },
        { property: "og:url", content: b ? `/blog/${b.slug}` : "/blog" },
        { property: "og:type", content: "article" },
      ],
      links: b ? [{ rel: "canonical", href: `/blog/${b.slug}` }] : [],
      scripts: b
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: b.title,
                author: { "@type": "Organization", name: "The Arts Folio" },
                image: b.image,
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { blogs } = useSiteData();
  const loaderData = Route.useLoaderData() as { blog: any };
  
  // Real-time lookup fallback
  const blog = blogs.find((b) => b.slug === slug) || loaderData.blog;

  if (!blog) {
    return (
      <div className="pt-36 pb-32 text-center">
        <h1 className="font-display text-3xl text-white font-bold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-gradient">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-36 pb-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
        
        <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">{blog.category}</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
          {blog.title}
        </h1>
        
        <p className="mt-2 text-xs text-muted-foreground">{blog.date}</p>

        {blog.image && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/5 aspect-[16/9] w-full">
            <img
              src={blog.image}
              alt={blog.imageAlt || blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="mt-10 prose-invert space-y-6 text-base md:text-lg leading-relaxed text-foreground/85"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
