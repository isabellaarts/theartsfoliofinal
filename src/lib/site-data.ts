import heroFantasy from "@/assets/hero-fantasy.jpg";
import cover1 from "@/assets/portfolio-cover-1.jpg";
import cover2 from "@/assets/portfolio-cover-2.jpg";
import cover3 from "@/assets/portfolio-cover-3.jpg";
import map1 from "@/assets/portfolio-map-1.jpg";
import map2 from "@/assets/portfolio-map-2.jpg";
import char1 from "@/assets/portfolio-char-1.jpg";
import char2 from "@/assets/portfolio-char-2.jpg";
import char3 from "@/assets/portfolio-char-3.jpg";
import brand1 from "@/assets/portfolio-brand-1.jpg";
import web1 from "@/assets/portfolio-web-1.jpg";
import social1 from "@/assets/portfolio-social-1.jpg";
import emily from "@/assets/artist-emily.jpg";
import luna from "@/assets/artist-luna.jpg";
import isabella from "@/assets/artist-isabella.jpg";
import noah from "@/assets/artist-noah.jpg";
import sophia from "@/assets/artist-sophia.jpg";
import ella from "@/assets/artist-ella.jpg";
import cover1Sketch from "@/assets/cover1-sketch.png";
import char1Lineart from "@/assets/char1-lineart.png";
import map1Draft from "@/assets/map1-draft.png";
import char2Concept from "@/assets/char2-concept.png";

export const IMAGES = {
  heroFantasy,
  cover1,
  cover2,
  cover3,
  map1,
  map2,
  char1,
  char2,
  char3,
  brand1,
  web1,
  social1,
  emily,
  luna,
  isabella,
  noah,
  sophia,
  ella,
};

export type PortfolioCategory =
  | "Book Covers"
  | "Character Art"
  | "Illustration"
  | "Logo Design"
  | "Branding"
  | "UI/UX Design"
  | "Photography"
  | "Video Editing"
  | "Web Design & Development"
  | "Fantasy Maps"
  | "Interior Art"
  | "Logos"
  | "Websites"
  | "Social Media";

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  videoUrl?: string;
  mediaType?: "image" | "video";
  description: string;
  aspect: "tall" | "wide" | "square";
  tags?: string[];
  artistSlug?: string;
  status?: "draft" | "published";
  order?: number;
  metaTitle?: string;
  metaDescription?: string;
  imageAlt?: string;
  seoSlug?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
}

export const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "blog_1",
    slug: "designing-a-cover-that-sells",
    title: "Designing a Cover That Sells (Without Looking Like Everyone Else)",
    category: "Cover Design",
    excerpt: "Genre conventions exist for a reason — and so does breaking them. Here's the line we walk on every commission.",
    image: "/src/assets/portfolio-cover-1.jpg",
    imageAlt: "A beautiful illustrated book cover design with gold filigree and dramatic lighting",
    date: "May 14, 2026",
    status: "published",
    metaTitle: "Designing a Cover That Sells | The Arts Folio",
    metaDescription: "Learn how we design genre-aware but highly original book covers that stand out on bookshelves.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">Understanding Genre Expectations</h2>
      <p>Body copy continues here. Pull quotes, image captions and figure references would all be styled consistently with the site's design system to maintain a calm, premium reading experience.</p>
      <blockquote class="border-l-2 border-brand-pink pl-5 italic text-muted-foreground my-6">"The cover sells the book the same way the trailer sells the film — once."</blockquote>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  },
  {
    id: "blog_2",
    slug: "fantasy-maps-101",
    title: "Fantasy Maps 101: From Continent Sketch to Final Cartography",
    category: "Fantasy World Building",
    excerpt: "How we build a believable world map, layer by layer — and what we wish more authors knew before commissioning one.",
    image: "/src/assets/portfolio-map-1.jpg",
    imageAlt: "An intricate vintage fantasy map showing continents and mountain ranges",
    date: "April 30, 2026",
    status: "published",
    metaTitle: "Fantasy Maps 101: Custom Cartography | The Arts Folio",
    metaDescription: "Discover how we turn hand-drawn sketches of fantasy worlds into final, high-fidelity fantasy maps.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">Crafting Realistic Topography</h2>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <blockquote class="border-l-2 border-brand-pink pl-5 italic text-muted-foreground my-6">"A good map makes a fantasy world feel tangible before the reader even turns to page one."</blockquote>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  },
  {
    id: "blog_3",
    slug: "ai-vs-human-art",
    title: "Why Authors Are Moving Away From AI Art",
    category: "Publishing Tips",
    excerpt: "Inconsistency, copyright, character drift — the costs of cutting corners. A grounded look at where AI fits, and where it doesn't.",
    image: "/src/assets/portfolio-char-2.jpg",
    imageAlt: "Detailed conceptual digital illustration of a character highlighting human artistry",
    date: "April 12, 2026",
    status: "published",
    metaTitle: "Why Authors Are Moving Away From AI Art | The Arts Folio",
    metaDescription: "Exploring the hidden costs of AI art in publishing and why authors prefer custom human illustration.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">The Quality and Trademark Challenge</h2>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  },
  {
    id: "blog_4",
    slug: "character-portraits-that-pop",
    title: "Character Portraits That Actually Sell Your Series",
    category: "Character Art",
    excerpt: "Composition, lighting and signature silhouette — what makes a portrait do work for your book and your marketing.",
    image: "/src/assets/portfolio-char-1.jpg",
    imageAlt: "Stunning character portrait sketch focusing on lighting and high-contrast lines",
    date: "March 28, 2026",
    status: "published",
    metaTitle: "Character Portraits That Sell Books | The Arts Folio",
    metaDescription: "Learn how composition, silhouette, and proper lighting make character art a powerful book promo tool.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">The Power of Silhouette and Lighting</h2>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  },
  {
    id: "blog_5",
    slug: "book-launch-creative-checklist",
    title: "The Book Launch Creative Checklist",
    category: "Marketing",
    excerpt: "Every asset you'll wish you ordered before launch day, in the order we recommend producing them.",
    image: "/src/assets/portfolio-social-1.jpg",
    imageAlt: "Various author brand promotional assets spread out beautifully",
    date: "March 10, 2026",
    status: "published",
    metaTitle: "The Ultimate Book Launch Creative Checklist | The Arts Folio",
    metaDescription: "A complete timeline and checklist of illustrated assets you need to prepare for a successful book launch.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">Building Visual Assets Before Launch</h2>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  },
  {
    id: "blog_6",
    slug: "brand-systems-for-indie-authors",
    title: "Brand Systems for Indie Authors",
    category: "Marketing",
    excerpt: "Why a coherent author brand is the highest-leverage thing you can build between books.",
    image: "/src/assets/portfolio-social-1.jpg",
    imageAlt: "Elegant brand system showcasing logos and typography guides",
    date: "February 24, 2026",
    status: "published",
    metaTitle: "Brand Systems for Indie Authors | The Arts Folio",
    metaDescription: "Explore why custom branding is critical for indie authors building long-term readerships.",
    content: `
      <p>This is a sample article placeholder. Real editorial content would live here, written by our team and contributing artists. Each article covers a single craft topic in depth — designed to be read once and referenced often.</p>
      <h2 class="font-display text-2xl font-bold mt-10 mb-4 text-white">Cohesion Across Platforms</h2>
      <p>From sketching genre-aware compositions to mastering character-light, our journal exists to share what we've learned working with hundreds of authors and brands across the world.</p>
      <p>Replace this placeholder with your real article copy at any time through the Admin Portal.</p>
    `
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Veil of Embers",
    category: "Book Covers",
    image: cover1,
    aspect: "tall",
    description:
      "A YA fantasy debut cover combining hand-painted character art with custom typography.",
  },
  {
    id: "p2",
    title: "Crimson Vow",
    category: "Book Covers",
    image: cover2,
    aspect: "tall",
    description:
      "A gothic romance series cover with high-contrast silhouette work and atmospheric lighting.",
  },
  {
    id: "p3",
    title: "Outer Bloom",
    category: "Book Covers",
    image: cover3,
    aspect: "tall",
    description: "Sci-fi paperback cover with a moody retro-futurist palette and grain treatment.",
  },
  {
    id: "p4",
    title: "Atlas of Aerith",
    category: "Fantasy Maps",
    image: map1,
    aspect: "wide",
    description:
      "Continent-scale hand-drawn map with custom cartouches, compass rose and inset details.",
  },
  {
    id: "p5",
    title: "Kingdom of Stifed",
    category: "Fantasy Maps",
    image: map2,
    aspect: "wide",
    description: "Stronghold map series with painstaking ink linework and aged parchment texture.",
  },
  {
    id: "p6",
    title: "Sylvani the Bladekeeper",
    category: "Character Art",
    image: char1,
    aspect: "tall",
    description: "Hero character sheet — full render, expression studies and armor breakdown.",
  },
  {
    id: "p7",
    title: "The Last Pyromancer",
    category: "Character Art",
    image: char2,
    aspect: "tall",
    description: "Antagonist concept with dynamic spell FX and signature silhouette.",
  },
  {
    id: "p8",
    title: "Scarlet, The Reaper",
    category: "Character Art",
    image: char3,
    aspect: "tall",
    description: "Portrait commission, painterly digital with strong cinematic lighting.",
  },
  {
    id: "p9",
    title: "Loulane Identity",
    category: "Logos",
    image: brand1,
    aspect: "wide",
    description: "Full brand identity: mark, packaging, stationery and digital guidelines.",
  },
  {
    id: "p10",
    title: "Glatworks Studio Site",
    category: "Websites",
    image: web1,
    aspect: "wide",
    description: "Marketing website with glassmorphic UI, gradient art direction and CMS.",
  },
  {
    id: "p11",
    title: "Media Drop Launch",
    category: "Social Media",
    image: social1,
    aspect: "square",
    description: "Launch campaign post pack — 14 posts, stories, reels covers.",
  },
];

export interface ServiceFAQ {
  q: string;
  a: string;
}
export interface Service {
  slug: string;
  title: string;
  icon: string;
  tagline: string;
  blurb: string;
  overview: string;
  included: string[];
  process: string[];
  idealFor: string[];
  benefits: string[];
  faqs: ServiceFAQ[];
}

export const SERVICES: Service[] = [
  {
    slug: "book-cover-design",
    title: "Book Cover Design",
    icon: "BookOpen",
    tagline: "Bring Your Story to Life Before the First Page Is Read",
    blurb: "Fantasy, Romance, Horror, Sci-Fi, Thriller — covers engineered to sell.",
    overview:
      "A book cover is often the first impression readers have of your story. Our team creates professionally illustrated and market-focused book covers designed to capture attention, communicate genre, and increase reader engagement. Whether you are publishing through Amazon KDP, IngramSpark, or a traditional publisher, we create covers that help your book stand out in a crowded marketplace.",
    included: [
      "Custom Cover Artwork",
      "Front Cover Design",
      "Full Wrap Design",
      "Typography & Title Treatment",
      "Print & eBook Versions",
      "Multiple Revision Rounds",
      "Commercial Usage Rights",
    ],
    process: [
      "Project Discussion",
      "Concept Development",
      "Rough Sketch Approval",
      "Line Art Creation",
      "Rendering & Detailing",
      "Final Design & Delivery",
    ],
    idealFor: [
      "Fantasy Authors",
      "Romance Authors",
      "Horror Authors",
      "Sci-Fi Authors",
      "Thriller Writers",
      "Publishers",
    ],
    benefits: [
      "Genre-perfect first impressions",
      "Higher click-through on retailer pages",
      "Print and digital files ready",
      "Full commercial rights",
    ],
    faqs: [
      {
        q: "Do you handle print specifications?",
        a: "Yes — we deliver full wrap files for KDP, IngramSpark, Lulu and traditional printers, with proper bleed, spine width and barcode space.",
      },
      {
        q: "How many revisions are included?",
        a: "Generous revision rounds at the sketch, line and color stages so the cover is exactly what you want before final delivery.",
      },
      {
        q: "Do you research the genre?",
        a: "Every project begins with comparative genre research so your cover signals the right reader expectation while still standing out.",
      },
    ],
  },
  {
    slug: "fantasy-maps",
    title: "Fantasy Map Design",
    icon: "Map",
    tagline: "Transform Your World Into a Living Map",
    blurb: "Continent-, kingdom-, city- and battle-scale maps, all hand-drawn.",
    overview:
      "Every great fantasy world deserves a map that enhances immersion and storytelling. We create custom fantasy maps that help readers visualize kingdoms, continents, cities, landmarks, and adventures. Our maps are designed to feel authentic, detailed, and visually engaging.",
    included: [
      "World Maps",
      "Kingdom Maps",
      "Regional Maps",
      "City Maps",
      "Battle Maps",
      "Vintage Styles",
      "Modern Fantasy Styles",
    ],
    process: [
      "World-building call",
      "Topography & borders",
      "Sketch pass",
      "Inking & labels",
      "Color & texture",
      "Final delivery",
    ],
    idealFor: ["Novel Authors", "Dungeon Masters", "RPG Creators", "Game Developers", "Publishers"],
    benefits: [
      "Deeper reader immersion",
      "Print-ready inserts",
      "Game-table usable resolution",
      "Vintage or modern styling",
    ],
    faqs: [
      {
        q: "Can you draw maps from my existing notes?",
        a: "Yes — share your world bible, sketches or even rough doodles and we'll translate them into a publishable map.",
      },
      {
        q: "What styles do you offer?",
        a: "Aged parchment, ink-linework, full-color painterly, isometric and modern fantasy — picked to match your tone.",
      },
    ],
  },
  {
    slug: "character-art",
    title: "Character Art",
    icon: "Sparkles",
    tagline: "Create Characters Readers Will Never Forget",
    blurb: "Painterly portraits, full-body renders, expression and turnaround sheets.",
    overview:
      "Characters are the heart of every story. Our artists design detailed, expressive, and memorable character illustrations that reflect your vision and strengthen your storytelling. From heroes and villains to entire character lineups, we bring imagination to life.",
    included: [
      "Full Body Illustrations",
      "Portrait Art",
      "Character Sheets",
      "Costume Design",
      "Weapon Design",
      "Multiple Poses",
      "Commercial Rights",
    ],
    process: [
      "Concept brief",
      "Silhouette studies",
      "Sketch approval",
      "Line art",
      "Color & rendering",
      "Final files",
    ],
    idealFor: ["Authors", "Game Studios", "Content Creators", "Publishers", "Collectors"],
    benefits: [
      "Stronger pitch decks",
      "Reusable across media",
      "High-resolution print files",
      "Distinct, ownable silhouettes",
    ],
    faqs: [
      {
        q: "Can you keep characters consistent across many illustrations?",
        a: "Yes — we build a character sheet first so every subsequent illustration stays on-model.",
      },
      {
        q: "Do you offer NSFW character work?",
        a: "Yes, via our private commission service with full confidentiality. 18+ only.",
      },
    ],
  },
  {
    slug: "interior-illustrations",
    title: "Interior Illustrations",
    icon: "PenTool",
    tagline: "Enhance Every Chapter With Professional Artwork",
    blurb: "Chapter art, scenes, spot illustrations and decorative elements.",
    overview:
      "Interior illustrations create deeper emotional engagement and elevate the reading experience. We produce high-quality black-and-white and full-color illustrations for novels, children's books, fantasy books, and collector editions.",
    included: [
      "Chapter Illustrations",
      "Scene Artwork",
      "Spot Illustrations",
      "Decorative Elements",
      "Print-Ready Files",
      "Publishing Support",
    ],
    process: [
      "Manuscript review",
      "Scene selection",
      "Sketch pass",
      "Line art",
      "Rendering",
      "Print-ready delivery",
    ],
    idealFor: ["Novelists", "Children's Authors", "Publishers", "Collector Edition Buyers"],
    benefits: [
      "Increased Reader Engagement",
      "Premium Book Appearance",
      "Improved Visual Storytelling",
    ],
    faqs: [
      {
        q: "Black-and-white or full color?",
        a: "Both — we recommend a style based on your genre, page count and budget.",
      },
      {
        q: "Do you work to a printer's spec sheet?",
        a: "Always. Send the printer's template and we'll deliver to bleed and margin.",
      },
    ],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    icon: "Palette",
    tagline: "Build a Brand That Stands Out",
    blurb: "Modern, memorable, scalable identity systems.",
    overview:
      "Your logo is the visual foundation of your business. We create modern, memorable, and scalable logo designs that help brands establish trust and recognition. Every logo is designed with strategy, creativity, and long-term usability in mind.",
    included: [
      "Multiple Concepts",
      "Professional Typography",
      "Brand Color Palette",
      "Vector Files",
      "Social Media Versions",
      "Commercial Rights",
    ],
    process: [
      "Brand discovery",
      "Mood board",
      "Concept sketches",
      "Refinement",
      "Final system",
      "File handoff",
    ],
    idealFor: ["Startups", "Small Businesses", "Authors", "Agencies", "Online Brands"],
    benefits: [
      "Recognisable in any size",
      "Cohesive identity system",
      "Source files included",
      "Confident, lasting craft",
    ],
    faqs: [
      {
        q: "How many concepts do we get?",
        a: "Multiple distinct directions, refined into a single chosen mark with variations.",
      },
      {
        q: "Do you provide brand guidelines?",
        a: "Yes — color, type, spacing and usage rules are included by default.",
      },
    ],
  },
  {
    slug: "web-design",
    title: "Website Design & Development",
    icon: "Globe",
    tagline: "Beautiful Websites Designed To Convert",
    blurb: "Marketing sites, portfolios and author platforms that win readers.",
    overview:
      "We design and develop modern websites that combine stunning visuals with seamless user experiences. Our websites are responsive, fast-loading, and optimized for conversions.",
    included: [
      "Business Websites",
      "Portfolio Websites",
      "Landing Pages",
      "Author Websites",
      "Agency Websites",
      "E-commerce Solutions",
    ],
    process: [
      "Goals & strategy",
      "Sitemap & wireframes",
      "Visual design",
      "Build & integrations",
      "Content & SEO",
      "Launch & support",
    ],
    idealFor: ["Authors", "Agencies", "Startups", "Small Businesses", "Creators"],
    benefits: [
      "Mobile Responsive Design",
      "SEO Optimization",
      "Contact Forms",
      "Custom Animations",
      "Performance Optimization",
      "Modern UI/UX",
    ],
    faqs: [
      {
        q: "Do you handle hosting?",
        a: "We deploy to managed hosting and hand off ownership, or we maintain on a small retainer.",
      },
      {
        q: "Can you migrate my existing site?",
        a: "Yes — we'll preserve URLs and SEO equity during the migration.",
      },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Design",
    icon: "Share2",
    tagline: "Professional Content For Modern Brands",
    blurb: "Cohesive content packs, ad creatives and templates.",
    overview:
      "Consistency is key in social media marketing. We create visually engaging social media graphics that help businesses maintain a professional online presence.",
    included: [
      "Instagram Posts",
      "Facebook Posts",
      "Story Designs",
      "Promotional Graphics",
      "Advertisement Creatives",
      "Branded Templates",
    ],
    process: [
      "Brand audit",
      "Visual system",
      "Template build",
      "Content pack",
      "Delivery",
      "Optional retainer",
    ],
    idealFor: ["Authors launching books", "DTC Brands", "Agencies", "Founders"],
    benefits: ["Stronger Brand Identity", "Better Engagement", "Professional Appearance"],
    faqs: [
      {
        q: "Do you provide editable templates?",
        a: "Yes — Canva or Figma templates so your team can repurpose without touching us every time.",
      },
      {
        q: "Can you handle launch campaigns?",
        a: "Full launch packs — countdown, reveal, behind-the-scenes, testimonials, ad creatives.",
      },
    ],
  },
  {
    slug: "page-overlays",
    title: "Page Overlay Design",
    icon: "Layers",
    tagline: "Stream Graphics Designed For Maximum Impact",
    blurb: "Twitch & YouTube overlays, scenes, alerts, full packages.",
    overview:
      "Our custom overlays help streamers, creators, and online personalities build a recognizable and professional brand.",
    included: [
      "Twitch Overlays",
      "Stream Starting Screens",
      "Webcam Frames",
      "Alert Designs",
      "Ending Screens",
      "Complete Overlay Packages",
    ],
    process: [
      "Brand call",
      "Concept",
      "Asset design",
      "Animation",
      "OBS-ready packaging",
      "Final delivery",
    ],
    idealFor: ["Streamers", "Gamers", "YouTubers", "Content Creators"],
    benefits: [
      "Instant on-brand recognition",
      "Animated, broadcast-ready files",
      "OBS / Streamlabs ready",
    ],
    faqs: [
      {
        q: "Do overlays come animated?",
        a: "Yes — we deliver static and animated WebM/MOV variants for transparent overlays.",
      },
      {
        q: "Can you brand a full channel?",
        a: "Yes — logo, banner, overlays, alerts, panels, end cards as one cohesive package.",
      },
    ],
  },
  {
    slug: "nsfw-art",
    title: "NSFW Commission Art",
    icon: "Lock",
    tagline: "Professional Private Commission Artwork",
    blurb: "Confidential, contract-bound private commissions. 18+ only.",
    overview:
      "We provide confidential, custom-created NSFW illustrations for private clients. Every project is handled professionally, respectfully, and according to the client's creative requirements. All commission discussions and files remain confidential. Client privacy and professional communication are always respected.",
    included: [
      "Original Character Artwork",
      "Custom Scenes",
      "Fantasy Themes",
      "Stylized Illustrations",
      "High Resolution Files",
    ],
    process: [
      "Private brief",
      "NDA & terms",
      "Sketch",
      "Approval",
      "Final render",
      "Discreet delivery",
    ],
    idealFor: ["Private collectors", "Adult creators", "Verified clients (18+)"],
    benefits: [
      "Total client confidentiality",
      "Hand-drawn, never AI",
      "Discreet, contract-bound process",
    ],
    faqs: [
      {
        q: "Is my project confidential?",
        a: "Always. NDA-bound from the first message, files never shared, no public posting without your written consent.",
      },
      {
        q: "Who can commission?",
        a: "Verified adult clients only. Age verification is required before any work begins.",
      },
    ],
  },
];

export interface ArtistReview {
  author: string;
  country: string;
  rating: number;
  text: string;
  requestedRemoval?: boolean;
}
export interface ArtistFAQ {
  q: string;
  a: string;
}
export interface ArtistPricingItem {
  title: string;
  description: string;
  price: string;
}

export interface Artist {
  slug: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  image: string;
  bio: string;
  process: string;
  skills: string[];
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    behance?: string;
    artstation?: string;
  };
  portfolio: string[];
  reviews: ArtistReview[];
  services: string[]; // service slugs
  faqs: ArtistFAQ[];
  pricing?: ArtistPricingItem[];
  
  // CMS-driven fields
  showcaseTitle?: string;
  showcaseDescription?: string;
  showcaseBeforeImg?: string;
  showcaseAfterImg?: string;
  showcaseBeforeLabel?: string;
  showcaseAfterLabel?: string;
  
  processVideoTitle?: string;
  processVideoDescription?: string;
  processVideoUrl?: string;
  
  contactFormEyebrow?: string;
  contactFormTitle?: string;
  
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton1Label?: string;
  ctaButton2Label?: string;
  passcode?: string;
}

const social = (handle: string) => ({
  instagram: `https://instagram.com/${handle}`,
  behance: `https://behance.net/${handle}`,
  artstation: `https://artstation.com/${handle}`,
  linkedin: `https://linkedin.com/in/${handle}`,
});

export const TEAM: Artist[] = [
  {
    slug: "emily",
    name: "Emily Carter",
    role: "Senior Book Cover Artist",
    specialization: "Book Covers • Typography",
    experience: "10+ years",
    image: emily,
    bio: "10+ years designing covers across fantasy, romance and thriller. Emily blends classical painting techniques with sharp typographic instinct, leading our cover team and mentoring junior artists.",
    process:
      "Starts every cover with three days of genre research and comparative analysis, sketches in greyscale to lock composition, then renders in full color over multiple passes.",
    skills: [
      "Cover Design",
      "Typography",
      "Genre Research",
      "Print Production",
      "Digital Painting",
    ],
    socials: social("emily.artsfolio"),
    portfolio: [cover1, cover2, cover3, char1, brand1, social1],
    reviews: [
      {
        author: "Sarah Mitchell",
        country: "United Kingdom",
        rating: 5,
        text: "The cover Emily designed for my debut novel doubled my preorders. Worth every penny — and the process was a joy.",
      },
      {
        author: "Olivia Martins",
        country: "Brazil",
        rating: 5,
        text: "After three failed attempts with AI-only studios, Emily delivered a real, painterly cover that finally felt like my book.",
      },
      {
        author: "James O'Connor",
        country: "Ireland",
        rating: 5,
        text: "Premium agency feel without the agency price. My self-pub looks like a Big Five release.",
      },
    ],
    services: ["book-cover-design", "interior-illustrations", "logo-design"],
    faqs: [
      {
        q: "How fast can Emily start my cover?",
        a: "Typical lead time is 2–4 weeks. Rush slots open monthly.",
      },
      {
        q: "Does Emily work on series?",
        a: "Yes — she specializes in series identity across 3-7 book runs.",
      },
    ],
  },
  {
    slug: "luna",
    name: "Luna Vasquez",
    role: "Fantasy Map Specialist",
    specialization: "Cartography • World-building",
    experience: "8 years",
    image: luna,
    bio: "Cartographer and illustrator with a love for world-building. From sprawling continents to medieval city plans, every line is hand-drawn. Luna leads our maps department and has shipped maps for over 120 published titles.",
    process:
      "Begins with a world-building call to understand geography, politics and history. Drafts in pencil, refines in ink, finishes with watercolor or digital parchment textures.",
    skills: ["Cartography", "Ink Illustration", "World Building", "Color Theory", "Hand Lettering"],
    socials: social("luna.cartography"),
    portfolio: [map1, map2, char1, cover1, web1, brand1],
    reviews: [
      {
        author: "Daniel Park",
        country: "South Korea",
        rating: 5,
        text: "Luna built a kingdom-scale map for my trilogy. Readers won't stop sharing it.",
      },
      {
        author: "Adewale Okafor",
        country: "Nigeria",
        rating: 5,
        text: "The map alone made my book pitch land — agents asked about it before the manuscript.",
      },
    ],
    services: ["fantasy-maps", "interior-illustrations"],
    faqs: [
      {
        q: "Can Luna design a map without a finished manuscript?",
        a: "Yes — a strong outline and world bible is enough to begin.",
      },
      {
        q: "What sizes do you deliver?",
        a: "Standard 300DPI print, high-res poster, and web-optimized exports.",
      },
    ],
  },
  {
    slug: "isabella",
    name: "Isabella Rossi",
    role: "Character Artist",
    specialization: "Character Art • Concept",
    experience: "9 years",
    image: isabella,
    bio: "Painterly digital illustrator focused on hero portraits and concept work. Isabella brings characters off the page with strong anatomy, cinematic lighting and an unmistakable signature style.",
    process:
      "Studies references obsessively, runs silhouette thumbnails for the strongest shape, then layers paint over greyscale value studies.",
    skills: ["Character Design", "Digital Painting", "Concept Art", "Anatomy", "Costume Design"],
    socials: social("isabella.rossi"),
    portfolio: [char1, char2, char3, cover2, cover3, social1],
    reviews: [
      {
        author: "Priya Nair",
        country: "India",
        rating: 5,
        text: "Isabella's character portraits are the heart of my IP pitch deck. Investors keep asking who painted them.",
      },
      {
        author: "Hiroshi Tanaka",
        country: "Japan",
        rating: 5,
        text: "Three character sheets, three perfect deliveries. Now my permanent character artist.",
      },
    ],
    services: ["character-art", "book-cover-design", "interior-illustrations"],
    faqs: [
      {
        q: "Does Isabella take NSFW commissions?",
        a: "Yes — confidential, contract-bound, 18+ only.",
      },
      {
        q: "Can she match an existing character style?",
        a: "Yes — share reference and she'll match or evolve the look.",
      },
    ],
  },
  {
    slug: "noah",
    name: "Noah Bennett",
    role: "Graphic Designer & Branding Specialist",
    specialization: "Branding • UI/UX",
    experience: "11 years",
    image: noah,
    bio: "Identity systems, packaging and digital design. Noah builds brands that feel inevitable. Previously in-house at two agencies before joining The Arts Folio.",
    process:
      "Discovery interviews, competitive audit, three radical directions, one refined system, full guideline document.",
    skills: ["Brand Identity", "Packaging", "UI/UX", "Motion", "Print Design"],
    socials: social("noah.bennett"),
    portfolio: [brand1, web1, social1, cover3, map1, char1],
    reviews: [
      {
        author: "Marco Rinaldi",
        country: "Italy",
        rating: 5,
        text: "Noah rebuilt our brand from the logo up. Cleaner, sharper, instantly more premium.",
      },
      {
        author: "Sophie Laurent",
        country: "France",
        rating: 5,
        text: "Three rounds, one perfect identity. Couldn't have asked for a better partner.",
      },
    ],
    services: ["logo-design", "web-design", "social-media", "page-overlays"],
    faqs: [
      {
        q: "Does Noah build the website himself?",
        a: "He leads design and partners with our front-end engineers for the build.",
      },
      {
        q: "What's a typical brand timeline?",
        a: "Four to eight weeks from kickoff to full guideline document.",
      },
    ],
  },
  {
    slug: "sophia",
    name: "Sophia Chen",
    role: "Interior Illustrator & Children's Art",
    specialization: "Interior Art • Children's Books",
    experience: "7 years",
    image: sophia,
    bio: "Award-winning interior illustrator with a warm, painterly style. Sophia has illustrated more than 40 published children's titles and chapter books for major and indie publishers.",
    process:
      "Reads the manuscript twice, sketches every spread in thumbnails, builds a tight pencil pass, then watercolor and digital finishing.",
    skills: [
      "Children's Illustration",
      "Chapter Art",
      "Watercolor",
      "Storyboarding",
      "Picture Books",
    ],
    socials: social("sophia.chen"),
    portfolio: [cover1, cover2, char1, char3, social1, brand1],
    reviews: [
      {
        author: "Amelia Schneider",
        country: "Germany",
        rating: 5,
        text: "Sophia's interiors made my book a gift-table favorite. Every page is a print.",
      },
      {
        author: "Yuki Tanaka",
        country: "Japan",
        rating: 5,
        text: "Patient, talented, on time. The kind of illustrator publishers fight to book.",
      },
    ],
    services: ["interior-illustrations", "book-cover-design", "character-art"],
    faqs: [
      {
        q: "Does Sophia work in color and B/W?",
        a: "Both — picked based on print budget and genre.",
      },
      {
        q: "Can she illustrate a full picture book?",
        a: "Yes — full 32-page picture books are her specialty.",
      },
    ],
  },
  {
    slug: "ella",
    name: "Ella Williams",
    role: "Social Media & Stream Graphics Lead",
    specialization: "Social Design • Stream Overlays",
    experience: "6 years",
    image: ella,
    bio: "Visual systems designer for content brands. Ella builds the daily-use design language that lets creators scale without losing identity. Designs for some of the top 200 Twitch channels.",
    process:
      "Brand sprint workshop, three-direction concepts, one chosen system, animated assets, hand-off with editable templates.",
    skills: [
      "Social Templates",
      "Stream Overlays",
      "Motion Graphics",
      "Brand Systems",
      "Ad Creative",
    ],
    socials: social("ella.williams"),
    portfolio: [social1, web1, brand1, cover3, char2, map2],
    reviews: [
      {
        author: "Marcus Reid",
        country: "United States",
        rating: 5,
        text: "Ella's overlay package transformed my channel overnight. Subs and ad revenue both jumped.",
      },
      {
        author: "Lena Park",
        country: "South Korea",
        rating: 5,
        text: "She built templates my team uses every day. Cohesive, beautiful, easy to maintain.",
      },
    ],
    services: ["social-media", "page-overlays", "logo-design"],
    faqs: [
      {
        q: "Do animated overlays cost more?",
        a: "Yes, slightly — but a single package replaces months of one-off work.",
      },
      {
        q: "Can Ella train my in-house team?",
        a: "Yes — she runs onboarding calls and ships a brand-system PDF.",
      },
    ],
  },
];

export const REVIEWS = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    text: "The cover Emily designed for my debut novel doubled my preorders. Worth every penny — and the process was a joy.",
    rating: 5,
  },
  {
    name: "Daniel Park",
    country: "South Korea",
    text: "Luna built a kingdom-scale map for my trilogy. Readers won't stop sharing it. Stunning craft, fast turnarounds.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    country: "India",
    text: "Isabella's character portraits are the heart of my IP pitch deck. Investors keep asking who painted them.",
    rating: 5,
  },
  {
    name: "Marco Rinaldi",
    country: "Italy",
    text: "Noah rebuilt our brand from the logo up. Cleaner, sharper, instantly more premium. Couldn't recommend more.",
    rating: 5,
  },
  {
    name: "Amelia Schneider",
    country: "Germany",
    text: "Transparent process, hand-drawn proofs, revisions on time. They treat the work — and the author — with respect.",
    rating: 5,
  },
  {
    name: "Hiroshi Tanaka",
    country: "Japan",
    text: "Three covers, three home runs. The Arts Folio is my publisher's permanent design partner now.",
    rating: 5,
  },
  {
    name: "Olivia Martins",
    country: "Brazil",
    text: "After three failed attempts with AI-only studios, I came here and got a real cover. Night and day.",
    rating: 5,
  },
  {
    name: "Adewale Okafor",
    country: "Nigeria",
    text: "From concept call to final file, communication was clear and fast. The map alone made my book pitch land.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    country: "France",
    text: "Truly bespoke work. They listened, sketched, refined — every revision made the cover stronger.",
    rating: 5,
  },
  {
    name: "James O'Connor",
    country: "Ireland",
    text: "Premium agency feel without the agency price. My self-pub looks like a Big Five release.",
    rating: 5,
  },
];

export const STATS = [
  { value: "850+", label: "Projects Delivered" },
  { value: "47", label: "Countries Served" },
  { value: "12+", label: "Years of Craft" },
  { value: "100%", label: "Hand-Made Art" },
];

export interface Submission {
  id: string;
  formType: string;
  data: Record<string, any>;
  timestamp: string;
  fileUrl?: string;
  fileUrls?: string[];
  ip?: string;
}

export interface GlobalReview {
  id?: string;
  name: string;
  country: string;
  text: string;
  rating: number;
  requestedRemoval?: boolean; // added flag for artist reviews request
  screenshotUrl?: string;
  screenshotType?: string;
}

export interface UserAccount {
  id: string;
  username: string;
  passwordHash?: string; // Hashed password
  role: "admin" | "artist";
  artistSlug?: string; // Links to an artist slug from TEAM
  name: string;
  email?: string;
}

export interface InteractiveGalleryItem {
  id: string;
  titleBefore: string;
  titleAfter: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
}

export interface ProcessVideo {
  title: string;
  desc: string;
  url: string;
}

export interface ContactPageConfig {
  eyebrow: string;
  title: string;
  description: string;
  email: string;
  whatsapp: string;
  hours: string;
  studioLocation: string;
  mapPlaceholderText: string;
}

export interface SocialLinksConfig {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
}

export interface SiteConfig {
  processVideos: ProcessVideo[];
  watchArtworkSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  featuredTimelapseSection: {
    eyebrow: string;
    title: string;
    videoUrl: string;
  };
  realCraftsmanshipSection: {
    title: string;
    description1: string;
    description2: string;
  };
  startYourProjectCard: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  startYourProjectSection: {
    eyebrow: string;
    title: string;
    description: string;
  };
  contactPage?: ContactPageConfig;
  socialLinks?: SocialLinksConfig;
}

export const DEFAULT_CONTACT_PAGE_CONFIG: ContactPageConfig = {
  eyebrow: "Contact",
  title: "Let's start a conversation",
  description: "Share your brief — we typically reply within a few hours during business days.",
  email: "info@theartsfolio.com",
  whatsapp: "+1 (555) 010-0420",
  hours: "Mon–Fri · 9am–7pm (Global)",
  studioLocation: "Remote-first · serving 47+ countries",
  mapPlaceholderText: "Remote studio · serving worldwide",
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  processVideos: [
    {
      title: "Sketch Timelapses",
      desc: "Watch initial ideas materialize on a digital canvas.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-artist-drawing-a-sketch-on-paper-40191-large.mp4",
    },
    {
      title: "Line Art Process",
      desc: "Pencil outlines are transformed into clean, stylized vectors.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-an-artist-drawing-lines-on-paper-40190-large.mp4",
    },
    {
      title: "Rendering Process",
      desc: "Cinematic shading, highlights, and custom lighting layers are added.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-artist-drawing-on-a-digital-tablet-41617-large.mp4",
    },
    {
      title: "Character Creation",
      desc: "Creating unique silhouettes and expressive features from scratch.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-drawing-a-portrait-of-a-woman-on-paper-40192-large.mp4",
    },
    {
      title: "Fantasy Map Development",
      desc: "Painstakingly detailing topography and custom labeling.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-painting-on-a-canvas-with-watercolor-43407-large.mp4",
    },
    {
      title: "Book Cover Creation",
      desc: "Blending character rendering with typography and effects.",
      url: "https://assets.mixkit.co/videos/preview/mixkit-artist-mixing-oil-colors-on-a-palette-40188-large.mp4",
    },
  ],
  watchArtworkSection: {
    eyebrow: "Craftsmanship",
    title: "Watch real artwork being created",
    description: "Unlike instant AI-generated images, professional artwork is built through creativity, skill, feedback, and refinement. Our artists document parts of the creative journey, allowing clients to see how concepts evolve into finished pieces.",
  },
  featuredTimelapseSection: {
    eyebrow: "Featured Timelapse",
    title: "From Sketch To Masterpiece",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-drawing-a-portrait-of-a-woman-on-paper-40192-large.mp4",
  },
  realCraftsmanshipSection: {
    title: "The Real Craftsmanship",
    description1: "Every masterpiece begins with a sketch. Our process videos allow clients to see the real craftsmanship behind each project, creating confidence that their artwork is being professionally developed by experienced artists.",
    description2: "See the difference between generated images and a professionally guided creative process.",
  },
  startYourProjectCard: {
    title: "Want to see how your project will be created?",
    description: "Request a consultation and we'll walk you through our entire creative process.",
    buttonLabel: "Start Your Project",
  },
  startYourProjectSection: {
    eyebrow: "Start your project",
    title: "Tell us about your vision",
    description: "A bestselling book cover, a fantasy world map, character artwork, branding, or a complete website — share your brief and we'll respond within 24 hours.",
  },
  contactPage: DEFAULT_CONTACT_PAGE_CONFIG,
};

export const DEFAULT_INTERACTIVE_GALLERY: InteractiveGalleryItem[] = [
  {
    id: "cover",
    titleBefore: "Rough Sketch",
    titleAfter: "Final Artwork",
    beforeImage: cover1Sketch,
    afterImage: IMAGES.cover1,
    beforeLabel: "Rough Sketch",
    afterLabel: "Final Book Cover",
    description: "We map out compositions and values early to ensure the storytelling lands before adding complex details.",
  },
  {
    id: "character",
    titleBefore: "Line Art",
    titleAfter: "Fully Rendered Illustration",
    beforeImage: char1Lineart,
    afterImage: IMAGES.char1,
    beforeLabel: "Clean Line Art",
    afterLabel: "Fully Rendered Character",
    description: "Clean anatomical line work establishes strong form and silhouette before the painting and rendering phase.",
  },
  {
    id: "map",
    titleBefore: "Map Draft",
    titleAfter: "Completed Fantasy Map",
    beforeImage: map1Draft,
    afterImage: IMAGES.map1,
    beforeLabel: "Pencil Map Draft",
    afterLabel: "Completed Fantasy Map",
    description: "Topography, mountain placement, and kingdom borders are drafted in pencil for approval before final inking.",
  },
  {
    id: "concept",
    titleBefore: "Character Concept",
    titleAfter: "Final Character Design",
    beforeImage: char2Concept,
    afterImage: IMAGES.char2,
    beforeLabel: "Color Concept",
    afterLabel: "Final Character Rendering",
    description: "Loose painterly color sketches lock the lighting scheme and mood before finalizing character details.",
  },
];

const ASSET_MAPPING: Record<string, string> = {
  "/src/assets/hero-fantasy.jpg": heroFantasy,
  "/src/assets/portfolio-cover-1.jpg": cover1,
  "/src/assets/portfolio-cover-2.jpg": cover2,
  "/src/assets/portfolio-cover-3.jpg": cover3,
  "/src/assets/portfolio-map-1.jpg": map1,
  "/src/assets/portfolio-map-2.jpg": map2,
  "/src/assets/portfolio-char-1.jpg": char1,
  "/src/assets/portfolio-char-2.jpg": char2,
  "/src/assets/portfolio-char-3.jpg": char3,
  "/src/assets/portfolio-brand-1.jpg": brand1,
  "/src/assets/portfolio-web-1.jpg": web1,
  "/src/assets/portfolio-social-1.jpg": social1,
  "/src/assets/artist-emily.jpg": emily,
  "/src/assets/artist-luna.jpg": luna,
  "/src/assets/artist-isabella.jpg": isabella,
  "/src/assets/artist-noah.jpg": noah,
  "/src/assets/artist-sophia.jpg": sophia,
  "/src/assets/artist-ella.jpg": ella,
  "/src/assets/cover1-sketch.png": cover1Sketch,
  "/src/assets/char1-lineart.png": char1Lineart,
  "/src/assets/map1-draft.png": map1Draft,
  "/src/assets/char2-concept.png": char2Concept,
};

export function resolveImageUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("/src/assets/")) {
    return ASSET_MAPPING[url] || url;
  }
  return url;
}


