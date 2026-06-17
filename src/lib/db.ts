import { pbkdf2Sync, randomBytes } from "node:crypto";
import { TEAM, PORTFOLIO, REVIEWS, type Artist, type PortfolioItem, type Submission, type GlobalReview, type UserAccount, type InteractiveGalleryItem, type SiteConfig, DEFAULT_SITE_CONFIG, DEFAULT_INTERACTIVE_GALLERY, DEFAULT_CONTACT_PAGE_CONFIG } from "./site-data";

export type { Submission, GlobalReview };

export interface DbSchema {
  submissions: Submission[];
  team: Artist[];
  portfolio: PortfolioItem[];
  reviews: GlobalReview[];
  users?: UserAccount[];
  interactiveGallery?: InteractiveGalleryItem[];
  siteConfig?: SiteConfig;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, originalHash] = parts;
  const hash = pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}


// Helper to get Node.js modules dynamically at runtime (only on the server)
async function getNodeModules() {
  const fs = await import("node:fs/promises");
  const { existsSync, mkdirSync } = await import("node:fs");
  const path = await import("node:path");
  return { fs: fs.default || fs, existsSync, mkdirSync, path: path.default || path };
}

function getDbPath() {
  if (typeof process === "undefined" || !process.cwd) return "";
  return process.cwd() + "/src/data/db.json";
}

export async function initDb() {
  const { fs, existsSync, mkdirSync } = await getNodeModules();
  const dbPath = getDbPath();
  if (!dbPath) return;

  const dataDir = dbPath.substring(0, dbPath.lastIndexOf("/"));
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Create uploads dir
  if (typeof process !== "undefined" && process.cwd) {
    const uploadsDir = process.cwd() + "/public/uploads";
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }
  }

  if (!existsSync(dbPath)) {
    const initialDb: DbSchema = {
      submissions: [],
      team: TEAM,
      portfolio: PORTFOLIO,
      reviews: REVIEWS,
      users: [
        {
          id: "usr_admin",
          username: "admin",
          passwordHash: hashPassword("admin"),
          role: "admin",
          name: "Administrator"
        },
        ...TEAM.map(artist => ({
          id: `usr_${artist.slug}`,
          username: artist.slug,
          passwordHash: hashPassword("password"),
          role: "artist" as const,
          artistSlug: artist.slug,
          name: artist.name
        }))
      ],
      interactiveGallery: DEFAULT_INTERACTIVE_GALLERY,
      siteConfig: DEFAULT_SITE_CONFIG
    };
    await fs.writeFile(dbPath, JSON.stringify(initialDb, null, 2), "utf-8");
  } else {
    // Schema migration for existing databases
    try {
      const data = await fs.readFile(dbPath, "utf-8");
      const db: DbSchema = JSON.parse(data);
      let migrated = false;

      // Migrate portfolio items
      if (db.portfolio) {
        db.portfolio.forEach((p, idx) => {
          if (!p.mediaType) {
            p.mediaType = "image";
            migrated = true;
          }
          if (!p.status) {
            p.status = "published";
            migrated = true;
          }
          if (p.order === undefined) {
            p.order = idx;
            migrated = true;
          }
          if (!p.artistSlug) {
            // Find which artist has this item's image/id in their portfolio list
            const artist = db.team?.find((a) =>
              a.portfolio?.some((img) => img === p.image || img.includes(p.id) || p.image.includes(img))
            );
            p.artistSlug = artist ? artist.slug : "emily";
            migrated = true;
          }
        });
      }

      // Migrate artists
      if (db.team) {
        db.team.forEach((a) => {
          if (!a.showcaseTitle) {
            a.showcaseTitle = "See the craftsmanship";
            a.showcaseBeforeLabel = a.slug === "luna" ? "Map Outline Draft" : a.slug === "isabella" ? "Clean Line Art" : a.slug === "noah" ? "Color Concept" : a.slug === "ella" ? "Concept Layout" : "Rough Sketch";
            a.showcaseAfterLabel = a.slug === "luna" ? "Finished Map" : a.slug === "isabella" ? "Fully Rendered Character" : a.slug === "noah" ? "Final Design" : a.slug === "ella" ? "Completed Assets" : "Final Cover";
            a.showcaseBeforeImg = a.slug === "luna" ? "/src/assets/map1-draft.png" : (a.slug === "noah" || a.slug === "ella") ? "/src/assets/char2-concept.png" : a.slug === "isabella" ? "/src/assets/char1-lineart.png" : "/src/assets/cover1-sketch.png";
            a.showcaseAfterImg = a.slug === "luna" ? "/src/assets/portfolio-map-1.jpg" : a.slug === "isabella" ? "/src/assets/portfolio-char-1.jpg" : (a.slug === "noah" || a.slug === "ella") ? "/src/assets/portfolio-char-2.jpg" : "/src/assets/portfolio-cover-1.jpg";
            a.showcaseDescription = `Every illustration ${a.name.split(" ")[0]} works on is hand-crafted and customized. Use the slider to see the transition from draft layouts and sketch structures to the finished masterpiece.`;
            migrated = true;
          }

          if (!a.processVideoTitle) {
            a.processVideoTitle = "Process video";
            a.processVideoDescription = `Watch ${a.name.split(" ")[0]}'s creative process in action. From rough composition layouts to final renders, see the skill and time required to build custom illustrations.`;
            a.processVideoUrl = a.slug === "luna" ? "https://assets.mixkit.co/videos/preview/mixkit-painting-on-a-canvas-with-watercolor-43407-large.mp4" : a.slug === "isabella" ? "https://assets.mixkit.co/videos/preview/mixkit-drawing-a-portrait-of-a-woman-on-paper-40192-large.mp4" : (a.slug === "noah" || a.slug === "ella") ? "https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-artist-drawing-on-a-digital-tablet-41617-large.mp4" : "https://assets.mixkit.co/videos/preview/mixkit-artist-mixing-oil-colors-on-a-palette-40188-large.mp4";
            migrated = true;
          }

          if (!a.contactFormEyebrow) {
            a.contactFormEyebrow = `Hire ${a.name.split(" ")[0]}`;
            a.contactFormTitle = `Send ${a.name.split(" ")[0]} a project brief`;
            migrated = true;
          }

          if (!a.ctaTitle) {
            a.ctaTitle = `Work with ${a.name} today`;
            a.ctaDescription = "Custom quotes, transparent process, hand-drawn work. Start your project in minutes.";
            a.ctaButton1Label = "Hire This Artist";
            a.ctaButton2Label = "Book a Free Consultation";
            migrated = true;
          }
        });
      }

      // Migrate pricing for team artists
      if (db.team) {
        db.team.forEach((a) => {
          if (!a.pricing || a.pricing.length === 0) {
            if (a.slug === "emily") {
              a.pricing = [
                { title: "Bust Up / Portrait", description: "Fully rendered head & shoulders cover concept", price: "$199" },
                { title: "eBook Cover Design", description: "Professional eBook cover with customized typography", price: "$399" },
                { title: "Full Illustrated Cover", description: "Premium illustrated wrap-around cover with source files", price: "$899" }
              ];
            } else if (a.slug === "luna") {
              a.pricing = [
                { title: "Regional Map", description: "Detailed vector rendering of regional provinces & terrain", price: "$299" },
                { title: "Kingdom Map", description: "Large scale ink cartography detailing all cities & paths", price: "$499" },
                { title: "World Map", description: "Continent or world-scale illustrated parchment map", price: "$799" }
              ];
            } else if (a.slug === "isabella") {
              a.pricing = [
                { title: "Bust Up Render", description: "Clean head and shoulders paint layer for characters", price: "$199" },
                { title: "Half-Body Render", description: "Concept sheet showing weapons, armor and features", price: "$349" },
                { title: "Full Character Sheet", description: "Turnaround sheet showing character from multiple angles", price: "$599" }
              ];
            } else if (a.slug === "noah") {
              a.pricing = [
                { title: "Custom Logo Mark", description: "Vector brand mark for book series or startup", price: "$499" },
                { title: "Brand Identity Pack", description: "Logo, typography guidelines, and color palettes", price: "$899" },
                { title: "Landing Page / UX", description: "High-converting responsive landing page layout", price: "$1,499" }
              ];
            } else if (a.slug === "sophia") {
              a.pricing = [
                { title: "Spot Illustration", description: "Small black & white illustration for chapter heads", price: "$99" },
                { title: "Half Page Scene", description: "Detailed grayscale scene rendering inside books", price: "$249" },
                { title: "Full Spread Illustration", description: "Full-color illustrated spread for children's books", price: "$449" }
              ];
            } else if (a.slug === "ella") {
              a.pricing = [
                { title: "Social Media Pack", description: "Banner & template pack for all major platforms", price: "$149" },
                { title: "Stream Overlay Bundle", description: "OBS panels, alerts, webcam frames, and scene cards", price: "$349" },
                { title: "Animated Overlay Bundle", description: "Custom animated transitions, screens, and overlays", price: "$599" }
              ];
            } else {
              a.pricing = [
                { title: "Custom Services", description: "Bespoke illustrations based on your creative brief", price: "Custom Quote" }
              ];
            }
            migrated = true;
          }
        });
      }

      // Migrate users
      if (!db.users || db.users.length === 0) {
        db.users = [
          {
            id: "usr_admin",
            username: "admin",
            passwordHash: hashPassword("admin"),
            role: "admin",
            name: "Administrator"
          },
          ...db.team.map(artist => ({
            id: `usr_${artist.slug}`,
            username: artist.slug,
            passwordHash: hashPassword("password"),
            role: "artist" as const,
            artistSlug: artist.slug,
            name: artist.name
          }))
        ];
        migrated = true;
      }

      // Migrate interactiveGallery
      if (!db.interactiveGallery || db.interactiveGallery.length === 0) {
        db.interactiveGallery = DEFAULT_INTERACTIVE_GALLERY;
        migrated = true;
      }

      // Migrate siteConfig
      if (!db.siteConfig) {
        db.siteConfig = DEFAULT_SITE_CONFIG;
        migrated = true;
      } else {
        if (!db.siteConfig.contactPage) {
          db.siteConfig.contactPage = DEFAULT_CONTACT_PAGE_CONFIG;
          migrated = true;
        }
        if (!db.siteConfig.socialLinks) {
          db.siteConfig.socialLinks = DEFAULT_SITE_CONFIG.socialLinks;
          migrated = true;
        }
      }

      if (migrated) {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
        console.log("Database successfully migrated to CMS-driven schema!");
      }
    } catch (err) {
      console.error("Migration error:", err);
    }
  }
}

export async function readDb(): Promise<DbSchema> {
  const { fs } = await getNodeModules();
  const dbPath = getDbPath();
  await initDb();
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

export async function writeDb(data: DbSchema): Promise<void> {
  const { fs } = await getNodeModules();
  const dbPath = getDbPath();
  await initDb();
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}
