import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const Route = createFileRoute("/uploads/$filename")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const { filename } = params;
          if (!filename) {
            return new Response("Filename is required", { status: 400 });
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
          const ext = path.extname(filename).toLowerCase();
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
