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
          const allowedDir1 = path.resolve(path.join(process.cwd(), "public", "uploads"));
          const allowedDir2 = path.resolve(path.join(process.cwd(), ".output", "public", "uploads"));
          
          if (!resolvedPath.startsWith(allowedDir1) && !resolvedPath.startsWith(allowedDir2)) {
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
