import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

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
          
          const fileUrl = `/uploads/${uniqueFilename}`;

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
