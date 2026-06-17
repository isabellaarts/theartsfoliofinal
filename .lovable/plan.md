## The Arts Folio — Build Plan

A premium, dark-themed creative agency marketing site. All pages built with polished design; forms are visual only (no backend); ~12 AI-generated images for hero, portfolio, and team avatars.

### Design system (src/styles.css)

- Dark theme with deep secondary surfaces: `#0F0F15` background, `#17171F` cards, `#1E1E2E` elevated.
- Primary brand: `#6A5CFF` (indigo), `#9D4EDD` (violet), `#FF4D8D` (pink) — used in gradients.
- Gradient tokens: `--gradient-primary` (indigo→violet→pink), `--gradient-accent-cyan`, `--gradient-radial-glow`.
- Glassmorphism utility tokens: blur + translucent border + subtle inner highlight.
- Typography: Space Grotesk (headings, bold/tight) + Inter (body) loaded via `<link>` in `__root.tsx`, registered as `--font-display` / `--font-sans` in `@theme`.
- Shared motion: fade-in, scale-in, gradient-shift, marquee, parallax-on-scroll utility classes.

### Routes (src/routes/)

Each route gets its own `head()` with unique title, description, og:title, og:description.

```
__root.tsx           sticky glass navbar + footer + floating chat widget
index.tsx            Home (hero, why-us, AI-art section, services preview, portfolio teaser, reviews carousel, CTA)
about.tsx            Story, mission/vision, timeline, values, stats
services.tsx         9 service sections, process, FAQ, CTA
portfolio.tsx        Filterable masonry gallery + lightbox + project detail modal
team.tsx             4 artist cards (Emily, Luna, Isabella, Noah)
team.$artist.tsx     Dynamic artist profile (bio, skills, gallery, socials)
reviews.tsx          Full reviews wall (10+ testimonials)
careers.tsx          Open positions + application form (UI only)
blog.tsx             Categorized post list + search (static sample posts)
blog.$slug.tsx       Sample blog post layout
contact.tsx          Contact form + info cards + map placeholder
quote.tsx            "Get Free Quote" custom quotation form
privacy.tsx, terms.tsx, refund.tsx, cookies.tsx   Legal pages
sitemap[.]xml.ts     Generated sitemap (relative URLs, BASE_URL="")
```

`public/robots.txt` with `Allow: /`.

### Shared components (src/components/)

- `Navbar.tsx` — transparent → glassmorphism on scroll, mobile drawer, "Get Free Quote" CTA.
- `Footer.tsx` — 6 sections + newsletter input + socials + copyright.
- `LiveChatWidget.tsx` — floating gradient button → glass panel with message form (UI only).
- `GradientButton.tsx`, `GlassCard.tsx`, `SectionHeading.tsx`, `Marquee.tsx`.
- `PortfolioGrid.tsx` (filter chips + masonry + lightbox).
- `ReviewsCarousel.tsx` (embla-carousel, already available).
- `ServiceCard.tsx`, `ArtistCard.tsx`, `ProcessStep.tsx`, `StatCounter.tsx`, `FAQAccordion.tsx`.

### Imagery (AI-generated via imagegen tool, saved to src/assets/)

~12 premium images at standard/premium tier:

1. Hero — fantasy artwork background (1920×1080)
2. About hero — atelier/studio vibe
   3-4. Two ambient section backgrounds (AI-art problem, CTA)
   5-8. Four artist portraits (Emily, Luna, Isabella, Noah)
   9-12. Four hero portfolio pieces (book cover, fantasy map, character art, logo/brand mockup)
   Additional ~6 smaller portfolio thumbnails for gallery variety.

### Animations

Tailwind v4 keyframes in `styles.css`: floating elements (hero), parallax on scroll (CSS-driven via `translate3d` on scroll), counter on view, marquee for "trusted by" strip, hover lift + gradient shimmer on cards, masonry items fade-up on intersection.

### SEO

- Per-route `head()` meta + canonical on each leaf.
- `__root.tsx` keeps sitewide defaults + JSON-LD Organization.
- `services.tsx` adds JSON-LD `Service`; `team.$artist.tsx` adds `Person`; blog post adds `Article`.
- Sitemap server route, robots.txt, relative URLs everywhere (no project domain yet).

### Out of scope for v1

- No backend, database, auth, file uploads, real chat, email sending, blog CMS.
- All forms submit to a toast "Thanks — we'll be in touch" (sonner is preinstalled).
- Portfolio "View Project" opens a lightbox/modal, not a separate detail page per item.

### Technical notes

- Tailwind v4 CSS-first: tokens in `@theme`, gradients in `:root`, glass utility via `@utility`.
- Use `<Link to="/team/$artist" params={...}>` for artist pages — no href interpolation.
- Carousel via existing `src/components/ui/carousel.tsx` (embla).
- Lightbox built with existing Radix dialog primitive.
- No new heavy dependencies needed.

Ready to implement on approval.
