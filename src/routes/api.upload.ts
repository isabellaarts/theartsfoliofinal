import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ogfffocysvkvgqvtsqsp.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZmZmb2N5c3ZrdmdxdnRzcXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzQyMzksImV4cCI6MjA5ODU1MDIzOX0.Nb-3lOfQvaEr5YVVrqq1cV5LIduqVCnWn77BgQTpICI";

function isSupabaseActive(): boolean {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file");
          
          if (!file || typeof file !== "object" || !("name" in file)) {
            return new Response(
              JSON.stringify({ success: false, message: "No file uploaded" }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const fileObj = file as File;

          // Validate file size (100MB limit for portfolio items/videos)
          const maxSizeBytes = 100 * 1024 * 1024;
          if (fileObj.size > maxSizeBytes) {
            return new Response(
              JSON.stringify({ success: false, message: "File exceeds maximum size of 100MB." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // Create uploads directory
          const uploadsDir = path.join(process.cwd(), "public", "uploads");
          if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true });
          }

          // Save the file
          const uniqueFilename = `${Date.now()}-${fileObj.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
          const buffer = Buffer.from(await fileObj.arrayBuffer());
          await fs.writeFile(path.join(uploadsDir, uniqueFilename), buffer);
          
          // Also save to .output/public/uploads if it exists (for compiled/production environments)
          const outputDir = path.join(process.cwd(), ".output", "public", "uploads");
          if (existsSync(path.join(process.cwd(), ".output", "public"))) {
            if (!existsSync(outputDir)) {
              mkdirSync(outputDir, { recursive: true });
            }
            await fs.writeFile(path.join(outputDir, uniqueFilename), buffer);
          }
          
          // Also save to persistent directory if environment variable is set
          if (process.env.PERSISTENT_DIR) {
            const persistentUploadsDir = path.join(process.env.PERSISTENT_DIR, "uploads");
            if (!existsSync(persistentUploadsDir)) {
              mkdirSync(persistentUploadsDir, { recursive: true });
            }
            await fs.writeFile(path.join(persistentUploadsDir, uniqueFilename), buffer);
          }
          
          let fileUrl = `/uploads/${uniqueFilename}`;

          // If Supabase is active, upload to Supabase Storage
          if (isSupabaseActive()) {
            try {
              console.log("Uploading file to Supabase Storage:", uniqueFilename);
              const supabaseUploadUrl = `${SUPABASE_URL}/storage/v1/object/uploads/${uniqueFilename}`;
              const uploadRes = await fetch(supabaseUploadUrl, {
                method: "POST",
                headers: {
                  apikey: SUPABASE_ANON_KEY,
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                  "Content-Type": fileObj.type || "application/octet-stream"
                },
                body: buffer
              });

              if (!uploadRes.ok) {
                const text = await uploadRes.text();
                throw new Error(`Supabase Storage upload failed (${uploadRes.status}): ${text}`);
              }

              fileUrl = `/uploads/${uniqueFilename}`;
              console.log("File uploaded to Supabase Storage fallback active. Local proxy URL:", fileUrl);
            } catch (err: any) {
              console.error("Supabase Storage upload error:", err.message);
            }
          }

          return new Response(
            JSON.stringify({ success: true, url: fileUrl }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (error: any) {
          console.error("Upload route error:", error);
          return new Response(
            JSON.stringify({ success: false, message: error.message || "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
