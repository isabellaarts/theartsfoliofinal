import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Artist, PortfolioItem, GlobalReview, UserAccount, InteractiveGalleryItem, SiteConfig } from "./site-data";
import { readDb, writeDb, hashPassword, verifyPassword } from "./db";

// Fetch dynamic site data (artists, portfolio items, and global reviews)
export const getSiteData = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const db = await readDb();
      return {
        success: true,
        team: db.team,
        portfolio: db.portfolio,
        reviews: db.reviews,
        users: (db.users || []).map((u) => ({
          id: u.id,
          username: u.username,
          role: u.role,
          artistSlug: u.artistSlug,
          name: u.name,
          email: u.email,
        })),
        interactiveGallery: db.interactiveGallery || [],
        siteConfig: db.siteConfig || null,
      };
    } catch (error: any) {
      console.error("Server function getSiteData error:", error);
      return { success: false, message: error.message || "Failed to load site data" };
    }
  });

// Fetch all form submissions (Admin only)
export const getSubmissions = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const db = await readDb();
      return {
        success: true,
        submissions: db.submissions,
      };
    } catch (error: any) {
      console.error("Server function getSubmissions error:", error);
      return { success: false, message: error.message || "Failed to load submissions" };
    }
  });

// Delete a form submission
export const deleteSubmission = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    try {
      const db = await readDb();
      db.submissions = db.submissions.filter((s) => s.id !== id);
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function deleteSubmission error:", error);
      return { success: false, message: error.message || "Failed to delete submission" };
    }
  });

// Add or update an artist profile
export const saveArtist = createServerFn({ method: "POST" })
  .validator(
    z.object({
      slug: z.string(),
      artistData: z.any()
    })
  )
  .handler(
    async ({ data: { slug, artistData } }) => {
      try {
        const db = await readDb();
        const index = db.team.findIndex((a) => a.slug === slug);
        
        if (index >= 0) {
          // Update
          db.team[index] = { ...db.team[index], ...artistData, slug };
        } else {
          // Add
          db.team.push(artistData);
        }
        
        await writeDb(db);
        return { success: true, artist: artistData as Artist };
      } catch (error: any) {
        console.error("Server function saveArtist error:", error);
        return { success: false, message: error.message || "Failed to save artist profile" };
      }
    }
  );

// Delete an artist profile
export const deleteArtist = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    try {
      const db = await readDb();
      db.team = db.team.filter((a) => a.slug !== slug);
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function deleteArtist error:", error);
      return { success: false, message: error.message || "Failed to delete artist profile" };
    }
  });

// Add or update a portfolio item
export const savePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.any())
  .handler(async ({ data: item }) => {
    try {
      const db = await readDb();
      const index = db.portfolio.findIndex((p) => p.id === item.id);
      
      if (index >= 0) {
        db.portfolio[index] = item as PortfolioItem;
      } else {
        db.portfolio.push(item as PortfolioItem);
      }
      
      await writeDb(db);
      return { success: true, item: item as PortfolioItem };
    } catch (error: any) {
      console.error("Server function savePortfolioItem error:", error);
      return { success: false, message: error.message || "Failed to save portfolio item" };
    }
  });

// Delete a portfolio item
export const deletePortfolioItem = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    try {
      const db = await readDb();
      db.portfolio = db.portfolio.filter((p) => p.id !== id);
      // Also remove from any artist portfolio lists referencing this id
      db.team.forEach((artist) => {
        if (artist.portfolio) {
          artist.portfolio = artist.portfolio.filter((img) => img !== id && !img.includes(id));
        }
      });
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function deletePortfolioItem error:", error);
      return { success: false, message: error.message || "Failed to delete portfolio item" };
    }
  });

// Add or update a global review
export const saveReview = createServerFn({ method: "POST" })
  .validator(z.any())
  .handler(async ({ data: review }) => {
    try {
      const db = await readDb();
      const reviewId = review.id || `rev_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`;
      
      const index = db.reviews.findIndex((r: any) => r.id === reviewId);
      const reviewToSave = { ...(review as GlobalReview), id: reviewId };
      
      if (index >= 0) {
        db.reviews[index] = reviewToSave;
      } else {
        db.reviews.push(reviewToSave);
      }
      
      await writeDb(db);
      return { success: true, review: reviewToSave };
    } catch (error: any) {
      console.error("Server function saveReview error:", error);
      return { success: false, message: error.message || "Failed to save review" };
    }
  });

// Delete a global review
export const deleteReview = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    try {
      const db = await readDb();
      db.reviews = db.reviews.filter((r: any) => r.id !== id && r.text !== id); // supports id or raw text matching
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function deleteReview error:", error);
      return { success: false, message: error.message || "Failed to delete review" };
    }
  });

// Save portfolio items order
export const savePortfolioOrder = createServerFn({ method: "POST" })
  .validator(z.array(z.object({ id: z.string(), order: z.number() })))
  .handler(async ({ data: orders }) => {
    try {
      const db = await readDb();
      orders.forEach((o) => {
        const item = db.portfolio.find((p) => p.id === o.id);
        if (item) {
          item.order = o.order;
        }
      });
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function savePortfolioOrder error:", error);
      return { success: false, message: error.message || "Failed to save portfolio order" };
    }
  });

// Validate user credentials securely on the server
export const validateCredentials = createServerFn({ method: "POST" })
  .validator(z.object({ username: z.string(), password: z.string() }))
  .handler(async ({ data: { username, password } }) => {
    try {
      const db = await readDb();
      const cleanUsername = username.trim().toLowerCase();
      const user = db.users?.find((u) => u.username.toLowerCase() === cleanUsername);
      if (!user) return { success: false, message: "Invalid username or password" };
      
      const isMatch = verifyPassword(password, user.passwordHash || "");
      if (!isMatch) return { success: false, message: "Invalid username or password" };
      
      return {
        success: true,
        user: {
          username: user.username,
          role: user.role,
          artistSlug: user.artistSlug,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error: any) {
      console.error("Server function validateCredentials error:", error);
      return { success: false, message: error.message || "Authentication failed" };
    }
  });

// Save (create or update) a user account
export const saveUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      user: z.any(),
      password: z.string().optional(),
    })
  )
  .handler(async ({ data: { user, password } }) => {
    try {
      const db = await readDb();
      if (!db.users) db.users = [];
      
      const index = db.users.findIndex((u) => u.id === user.id);
      
      // Check for duplicate username
      const duplicate = db.users.find(
        (u) => u.username.toLowerCase() === user.username.toLowerCase() && u.id !== user.id
      );
      if (duplicate) {
        return { success: false, message: `Username "${user.username}" is already taken.` };
      }
      
      let passwordHash = "";
      if (password) {
        passwordHash = hashPassword(password);
      }
      
      if (index >= 0) {
        // Update
        const existing = db.users[index];
        db.users[index] = {
          ...existing,
          ...user,
          passwordHash: passwordHash ? passwordHash : existing.passwordHash,
        };
      } else {
        // Create new
        if (!password) {
          return { success: false, message: "Password is required for new users." };
        }
        const newUser: UserAccount = {
          id: user.id || `usr_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          username: user.username,
          passwordHash,
          role: user.role,
          artistSlug: user.artistSlug,
          name: user.name,
          email: user.email,
        };
        db.users.push(newUser);
      }
      
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function saveUser error:", error);
      return { success: false, message: error.message || "Failed to save user account" };
    }
  });

// Delete a user account
export const deleteUser = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    try {
      const db = await readDb();
      if (db.users) {
        db.users = db.users.filter((u) => u.id !== id);
        await writeDb(db);
      }
      return { success: true };
    } catch (error: any) {
      console.error("Server function deleteUser error:", error);
      return { success: false, message: error.message || "Failed to delete user account" };
    }
  });

// Save homepage configuration
export const saveSiteConfig = createServerFn({ method: "POST" })
  .validator(z.any())
  .handler(async ({ data: siteConfig }) => {
    try {
      const db = await readDb();
      db.siteConfig = siteConfig as SiteConfig;
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function saveSiteConfig error:", error);
      return { success: false, message: error.message || "Failed to save site configuration" };
    }
  });

// Add or update an interactive gallery item
export const saveGalleryItem = createServerFn({ method: "POST" })
  .validator(z.any())
  .handler(async ({ data: item }) => {
    try {
      const db = await readDb();
      if (!db.interactiveGallery) db.interactiveGallery = [];
      
      const index = db.interactiveGallery.findIndex((g) => g.id === item.id);
      if (index >= 0) {
        db.interactiveGallery[index] = item as InteractiveGalleryItem;
      } else {
        const newItem = {
          ...(item as InteractiveGalleryItem),
          id: item.id || `gal_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`
        };
        db.interactiveGallery.push(newItem);
      }
      
      await writeDb(db);
      return { success: true };
    } catch (error: any) {
      console.error("Server function saveGalleryItem error:", error);
      return { success: false, message: error.message || "Failed to save gallery item" };
    }
  });

// Delete an interactive gallery item
export const deleteGalleryItem = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    try {
      const db = await readDb();
      if (db.interactiveGallery) {
        db.interactiveGallery = db.interactiveGallery.filter((g) => g.id !== id);
        await writeDb(db);
      }
      return { success: true };
    } catch (error: any) {
      console.error("Server function deleteGalleryItem error:", error);
      return { success: false, message: error.message || "Failed to delete gallery item" };
    }
  });


