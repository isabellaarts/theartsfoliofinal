import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { toast } from "sonner";
import { Upload, Sparkles } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Custom Quote — The Arts Folio" },
      { name: "description", content: "Request a custom quote for your book cover, fantasy map, character art, branding or web project." },
      { property: "og:title", content: "Get a Custom Quote — The Arts Folio" },
      { property: "og:description", content: "Request a tailored creative quote from The Arts Folio." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-50" />
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand-pink" /> Free, no obligation
          </div>
          <SectionHeading
            eyebrow="Custom quote"
            title={<>Tell us about your <span className="text-gradient">project</span></>}
            description="Share a few details and we'll send back a tailored quote and creative plan within 24 hours."
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-3xl px-5 lg:px-10">
          <GlassCard className="p-8 md:p-12">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  const formData = new FormData(e.currentTarget);
                  formData.append("subject", "New Custom Quote Request");
                  formData.append("form_type", "Custom Quote");

                  const response = await fetch("/api/submit", {
                    method: "POST",
                    body: formData
                  });
                  const result = await response.json();
                  if (result.success) {
                    toast.success("Quote request received!", { description: "Our team will reply within 24 hours." });
                    e.currentTarget.reset();
                    setSelectedFiles([]);
                  } else {
                    toast.error("Failed to send request", { description: result.message || "Please try again later." });
                  }
                } catch (error) {
                  toast.error("An error occurred", { description: "Please try again later." });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Your name" name="name" placeholder="e.g. Eleanor Vance" required />
                <Field label="Email" name="email" type="email" placeholder="e.g. eleanor@vance-writes.com" required />
              </div>
              <Field label="Project type" name="type" placeholder="e.g. Fantasy Book Cover, Kingdom Map, Character Design" required />
              <div className="grid md:grid-cols-2 gap-4 items-end">
                <Field label="Budget" name="budget" placeholder="e.g. $1,000 - $3,000" />
                <div>
                  <label className="block text-sm font-medium mb-2">Target Deadline</label>
                  <DatePicker name="deadline" placeholder="Select deadline" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="message"
                  required maxLength={3000} rows={6}
                  placeholder="Tell us about the world, the tone (dark, whimsical), key landmarks, or scenes..."
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Reference images (optional)</label>
                <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-dashed border-white/15 px-4 py-6 hover:bg-white/5 transition-colors">
                  <Upload className="h-5 w-5 text-brand-violet" />
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-muted-foreground">
                      {selectedFiles.length > 0
                        ? `Selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                        : "Click to upload images"}
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
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.currentTarget.files || []);
                      setSelectedFiles(files);
                    }}
                  />
                </label>
              </div>
              <button
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-brand px-6 py-4 text-base font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Get my custom quote"}
              </button>
              <p className="text-xs text-center text-muted-foreground">By submitting you agree to our privacy policy. We never share your details.</p>
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
        name={name} type={type} required={required} placeholder={placeholder} maxLength={255}
        className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
      />
    </div>
  );
}
