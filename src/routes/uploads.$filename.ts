import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://ogfffocysvkvgqvtsqsp.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZmZmb2N5c3ZrdmdxdnRzcXNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NzQyMzksImV4cCI6MjA5ODU1MDIzOX0.Nb-3lOfQvaEr5YVVrqq1cV5LIduqVCnWn77BgQTpICI";

function isSupabaseActive(): boolean {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export const Route = createFileRoute("/uploads/$filename")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        try {
          const { filename } = params;
          if (!filename) {
            return new Response("Filename is required", { status: 400 });
          }

          // Protect media files (images, videos) from direct access
          const ext = path.extname(filename).toLowerCase();
          const isMedia = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp4", ".webm", ".mov"].includes(ext);

          if (isMedia) {
            const referer = request.headers.get("referer");
            const host = request.headers.get("host") || "";
            const isDev = process.env.NODE_ENV === "development";
            
            let isValidReferer = false;
            if (referer) {
              try {
                const urlObj = new URL(referer);
                if (
                  urlObj.host === host || 
                  urlObj.host.includes("theartsfolio.com") || 
                  urlObj.host.includes("render.com") || 
                  urlObj.host.includes("localhost") || 
                  urlObj.host.includes("127.0.0.1")
                ) {
                  isValidReferer = true;
                }
              } catch (e) {}
            }
            
            if (!isValidReferer && !isDev) {
              return new Response(
                "Unauthorized direct media access is prohibited. Please view via the official portal.",
                { status: 403 }
              );
            }
          }

          // Check possible storage locations
          const possiblePaths = [
            path.join(process.cwd(), "public", "uploads", filename),
            path.join(process.cwd(), ".output", "public", "uploads", filename),
          ];

          if (process.env.PERSISTENT_DIR) {
            possiblePaths.unshift(path.join(process.env.PERSISTENT_DIR, "uploads", filename));
          }

          let filePath = "";
          for (const p of possiblePaths) {
            if (existsSync(p)) {
              filePath = p;
              break;
            }
          }

          if (!filePath) {
            // Check Supabase Storage if active
            if (isSupabaseActive()) {
              try {
                const supabasePublicUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/${filename}`;
                const supabaseRes = await fetch(supabasePublicUrl);
                if (supabaseRes.ok) {
                  const fileBuffer = await supabaseRes.arrayBuffer();
                  const ext = path.extname(filename).toLowerCase();
                  let contentType = "application/octet-stream";
                  
                  if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
                  else if (ext === ".png") contentType = "image/png";
                  else if (ext === ".gif") contentType = "image/gif";
                  else if (ext === ".webp") contentType = "image/webp";
                  else if (ext === ".svg") contentType = "image/svg+xml";
                  else if (ext === ".mp4") contentType = "video/mp4";
                  else if (ext === ".webm") contentType = "video/webm";
                  else if (ext === ".mov") contentType = "video/quicktime";
                  else if (ext === ".pdf") contentType = "application/pdf";
                  else if (ext === ".zip") contentType = "application/zip";

                  return new Response(fileBuffer, {
                    status: 200,
                    headers: {
                      "Content-Type": contentType,
                      "Cache-Control": "public, max-age=31536000",
                    },
                  });
                }
              } catch (supabaseErr) {
                console.error("Failed to fetch from Supabase fallback:", supabaseErr);
              }
            }

            return new Response("File not found", { status: 404 });
          }

          // Security Check: Prevent Directory Traversal
          const resolvedPath = path.resolve(filePath);
          const allowedDirs = [
            path.resolve(path.join(process.cwd(), "public", "uploads")),
            path.resolve(path.join(process.cwd(), ".output", "public", "uploads")),
          ];
          
          if (process.env.PERSISTENT_DIR) {
            allowedDirs.push(path.resolve(path.join(process.env.PERSISTENT_DIR, "uploads")));
          }

          const isAllowed = allowedDirs.some((dir) => resolvedPath.startsWith(dir));
          if (!isAllowed) {
            return new Response("Access Denied", { status: 403 });
          }

          const fileBuffer = await fs.readFile(filePath);

          // Determine MIME type
          let contentType = "application/octet-stream";
          
          if (ext === ".jpg" || ext === ".jpeg") {
            contentType = "image/jpeg";
          } else if (ext === ".png") {
            contentType = "image/png";
          } else if (ext === ".gif") {
            contentType = "image/gif";
          } else if (ext === ".webp") {
            contentType = "image/webp";
          } else if (ext === ".svg") {
            contentType = "image/svg+xml";
          } else if (ext === ".mp4") {
            contentType = "video/mp4";
          } else if (ext === ".webm") {
            contentType = "video/webm";
          } else if (ext === ".mov") {
            contentType = "video/quicktime";
          } else if (ext === ".pdf") {
            contentType = "application/pdf";
          } else if (ext === ".zip") {
            contentType = "application/zip";
          }

          return new Response(fileBuffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000",
            },
          });
        } catch (error: any) {
          console.error("Error serving uploaded file:", error);
          return new Response("Internal server error", { status: 500 });
        }
      },
    },
  },
});
