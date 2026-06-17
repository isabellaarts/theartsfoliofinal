import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { toast } from "sonner";
import { MapPin, Briefcase, Upload } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Join The Arts Folio" },
      { name: "description", content: "Open creative positions at The Arts Folio — book cover artists, character artists, cartographers, designers and more." },
      { property: "og:title", content: "Careers — Join The Arts Folio" },
      { property: "og:description", content: "Open creative positions at The Arts Folio." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersPage,
});

const POSITIONS = [
  { title: "Book Cover Artist", type: "Remote · Full-time" },
  { title: "Character Artist", type: "Remote · Full-time" },
  { title: "Fantasy Map Artist", type: "Remote · Contract" },
  { title: "Graphic Designer", type: "Remote · Full-time" },
  { title: "Web Designer", type: "Remote · Contract" },
  { title: "Social Media Designer", type: "Remote · Part-time" },
];

function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Careers"
            title={<>Join <span className="text-gradient">The Arts Folio</span></>}
            description="We're growing carefully. If you craft work you're proud of and love working with authors, we'd love to hear from you."
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-10">
          <h3 className="font-display text-2xl font-bold mb-6">Open positions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {POSITIONS.map((p) => (
              <GlassCard key={p.title} className="flex items-center justify-between">
                <div>
                  <h4 className="font-display text-lg font-semibold">{p.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground flex items-center gap-2">
                     <MapPin className="h-3.5 w-3.5" /> {p.type}
                  </p>
                </div>
                <Briefcase className="h-5 w-5 text-brand-violet" />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <GlassCard className="p-8 md:p-10">
            <h3 className="font-display text-3xl font-bold">Apply now</h3>
            <p className="mt-2 text-muted-foreground">Tell us about your work. We read every application.</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  const formData = new FormData(e.currentTarget);
                  formData.append("subject", "New Career Application Submission");
                  formData.append("form_type", "Career Application");

                  const response = await fetch("/api/submit", {
                    method: "POST",
                    body: formData
                  });
                  const result = await response.json();
                  if (result.success) {
                    toast.success("Application sent!", { description: "We'll review and reply within a week." });
                    e.currentTarget.reset();
                    setSelectedFiles([]);
                  } else {
                    toast.error("Failed to submit application", { description: result.message || "Please try again later." });
                  }
                } catch (error) {
                  toast.error("An error occurred", { description: "Please try again later." });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="mt-8 space-y-4"
            >
              <Field label="Name" name="name" placeholder="e.g. Robert Johnson" required />
              <Field label="Email" name="email" type="email" placeholder="e.g. robert@illustration.com" required />
              <Field label="Portfolio link" name="portfolio" type="url" placeholder="e.g. https://artstation.com/robert" required />
              <Field label="Years of experience" name="experience" placeholder="e.g. 5 years" required />
              <div>
                <label className="block text-sm font-medium mb-2">Resume / CV</label>
                <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-dashed border-white/15 px-4 py-6 hover:bg-white/5 transition-colors">
                  <Upload className="h-5 w-5 text-brand-violet" />
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-muted-foreground">
                      {selectedFiles.length > 0
                        ? `Selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                        : "Click to upload PDF or DOCX"}
                    </span>
                    {selectedFiles.length > 0 && (
                      <span className="text-xs text-muted-foreground/60 mt-0.5">
                        Total size: {(selectedFiles.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    name="attachment"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.currentTarget.files || []);
                      setSelectedFiles(files);
                    }}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required maxLength={2000} rows={5}
                  placeholder="e.g. I specialize in dark fantasy landscapes and book covers. I have worked with self-published authors for 3 years..."
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-brand px-6 py-4 text-base font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Submit application"}
              </button>
            </form>
          </GlassCard>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        maxLength={255}
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
      />
    </div>
  );
}
