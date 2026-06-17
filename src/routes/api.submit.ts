import { createFileRoute } from "@tanstack/react-router";
import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import type { Submission } from "../lib/site-data";
import { readDb, writeDb } from "../lib/db";

const BREVO_API_KEY = "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";

export const Route = createFileRoute("/api/submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const name = formData.get("name")?.toString() || "";
          const email = formData.get("email")?.toString() || "";
          const subject = formData.get("subject")?.toString() || "New Inquiry";
          const formType = formData.get("form_type")?.toString() || "General";

          // Parse other form fields
          const data: Record<string, any> = {};
          formData.forEach((value, key) => {
            // Exclude attachment and meta keys
            if (key !== "attachment" && key !== "subject" && key !== "form_type") {
              // Handle multiple attachments or multi-value if needed
              if (typeof value === "string") {
                data[key] = value;
              }
            }
          });

          // File upload handling
          const attachments = formData.getAll("attachment");
          const savedFiles: { name: string; url: string; buffer: Buffer; mimeType: string }[] = [];

          for (const file of attachments) {
            // Verify if it is a File object and not empty
            if (file && typeof file === "object" && "name" in file && "size" in file && file.size > 0) {
              const fileObj = file as File;

              // Validate file extension
              const allowedExtensions = [".pdf", ".doc", ".docx", ".txt", ".png", ".jpg", ".jpeg", ".gif", ".zip"];
              const ext = path.extname(fileObj.name).toLowerCase();
              
              if (!allowedExtensions.includes(ext)) {
                return new Response(
                  JSON.stringify({ success: false, message: `File type ${ext} not allowed. Supported: pdf, doc, docx, txt, png, jpg, jpeg, gif, zip` }),
                  { status: 400, headers: { "Content-Type": "application/json" } }
                );
              }

              // Validate file size (10MB limit per file)
              const maxSizeBytes = 10 * 1024 * 1024;
              if (fileObj.size > maxSizeBytes) {
                return new Response(
                  JSON.stringify({ success: false, message: `File "${fileObj.name}" exceeds maximum size of 10MB.` }),
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
              
              savedFiles.push({
                name: fileObj.name,
                url: `/uploads/${uniqueFilename}`,
                buffer,
                mimeType: fileObj.type || "application/octet-stream"
              });
            }
          }

          // Fetch IP address from headers
          const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

          // Store in DB
          const db = await readDb();
          const submission: Submission = {
            id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            formType,
            data,
            timestamp: new Date().toISOString(),
            fileUrl: savedFiles.length > 0 ? savedFiles[0].url : undefined,
            fileUrls: savedFiles.map(f => f.url),
            ip
          };
          db.submissions.push(submission);
          await writeDb(db);

          // Prepare email content
          const urlObj = new URL(request.url);
          const requestOrigin = urlObj.origin;

          let fieldsListHtml = "";
          for (const [key, value] of Object.entries(data)) {
            fieldsListHtml += `<li><strong>${key}:</strong> ${value}</li>`;
          }

          let attachmentLinksHtml = "";
          if (savedFiles.length > 0) {
            attachmentLinksHtml = `
              <div style="margin-top: 25px; padding: 15px; background-color: #f3e8ff; border-left: 4px solid #6d28d9; border-radius: 4px;">
                <strong>Attached Files (${savedFiles.length}):</strong><br/>
                <ul style="margin: 5px 0 0 0; padding-left: 20px;">
            `;
            for (const f of savedFiles) {
              const absoluteUrl = `${requestOrigin}${f.url}`;
              attachmentLinksHtml += `<li style="margin-bottom: 5px;"><a href="${absoluteUrl}" style="color: #6d28d9; text-decoration: underline; font-weight: bold;" target="_blank">${f.name}</a></li>`;
            }
            attachmentLinksHtml += `</ul></div>`;
          }

          const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 8px;">
              <h2 style="color: #6d28d9; border-bottom: 2px solid #6d28d9; padding-bottom: 10px; margin-top: 0;">New Form Submission: ${formType}</h2>
              <p>You received a new submission from your website.</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold; width: 120px;">Name:</td>
                  <td style="padding: 8px;">${name || data.name || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Email:</td>
                  <td style="padding: 8px;">${email || data.email || "N/A"}</td>
                </tr>
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold;">IP Address:</td>
                  <td style="padding: 8px;">${ip}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold;">Timestamp:</td>
                  <td style="padding: 8px;">${submission.timestamp}</td>
                </tr>
              </table>
              
              <h3 style="color: #6d28d9; margin-top: 25px;">Form Fields</h3>
              <ul style="padding-left: 20px;">
                ${fieldsListHtml}
              </ul>
              
              ${attachmentLinksHtml}
              
              <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px; margin-bottom: 20px;" />
              <p style="font-size: 11px; color: #888; text-align: center; margin-bottom: 0;">This email was sent automatically by The Arts Folio custom backend system.</p>
            </div>
          `;

          // Prepare email payload attachments
          const emailAttachments = savedFiles.map(f => ({
            content: f.buffer.toString("base64"),
            name: f.name
          }));

          // Call Brevo SMTP API inside a try/catch to make it robust
          try {
            console.log(`[Form Submission] Attempting to dispatch email via Brevo...`);
            const emailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "accept": "application/json",
                "api-key": BREVO_API_KEY,
                "content-type": "application/json"
              },
              body: JSON.stringify({
                sender: { name: "The Arts Folio Custom Forms", email: "info@theartsfolio.com" },
                to: [{ email: "info@theartsfolio.com", name: "The Arts Folio Admin" }],
                subject: `[${formType}] ${subject} from ${name || data.name || "User"}`,
                htmlContent,
                attachment: emailAttachments.length > 0 ? emailAttachments : undefined
              })
            });

            if (!emailResponse.ok) {
              const errText = await emailResponse.text();
              console.error("[Form Submission] Brevo email dispatch rejected:", errText);
            } else {
              console.log("[Form Submission] Brevo email dispatch successful.");
            }
          } catch (emailErr: any) {
            console.error("[Form Submission] Brevo connection failed:", emailErr.message || emailErr);
          }

          return new Response(JSON.stringify({ success: true, submissionId: submission.id }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (error: any) {
          console.error("Custom submission route execution error:", error);
          return new Response(JSON.stringify({ success: false, message: error.message || "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
