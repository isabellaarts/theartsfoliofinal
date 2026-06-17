import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading, GlassCard } from "@/components/site/ui-bits";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Upload, Clock } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { useSiteData } from "@/hooks/use-site-data";
import { DEFAULT_CONTACT_PAGE_CONFIG } from "@/lib/site-data";
import worldMapGlobe from "@/assets/world-map-globe.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Arts Folio" },
      { name: "description", content: "Get in touch with The Arts Folio. Tell us about your project and we'll send back a tailored creative plan within 24 hours." },
      { property: "og:title", content: "Contact — The Arts Folio" },
      { property: "og:description", content: "Get in touch with The Arts Folio." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { siteConfig } = useSiteData();
  const config = siteConfig?.contactPage || DEFAULT_CONTACT_PAGE_CONFIG;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const highlightText = (text: string, phrase: string) => {
    if (!text) return "";
    const regex = new RegExp(`(${phrase})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === phrase.toLowerCase() ? (
        <span key={i} className="text-gradient">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-radial-glow opacity-40" />
        <div className="mx-auto max-w-5xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow={config.eyebrow}
            title={highlightText(config.title, "conversation")}
            description={config.description}
          />
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 grid lg:grid-cols-[1fr_2fr] gap-8">
          <div className="space-y-4">
            <GlassCard>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">{config.email}</p>
            </GlassCard>
            <GlassCard>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">WhatsApp</h3>
              <p className="mt-1 text-sm text-muted-foreground">{config.whatsapp}</p>
            </GlassCard>
            <GlassCard>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">Hours</h3>
              <p className="mt-1 text-sm text-muted-foreground">{config.hours}</p>
            </GlassCard>
            <GlassCard>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">Studio</h3>
              <p className="mt-1 text-sm text-muted-foreground">{config.studioLocation}</p>
            </GlassCard>
          </div>

          <GlassCard className="p-8 md:p-10">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  const formData = new FormData(e.currentTarget);
                  formData.append("subject", "New Contact Form Submission");
                  formData.append("form_type", "Contact Inquiry");

                  const response = await fetch("/api/submit", {
                    method: "POST",
                    body: formData
                  });
                  const result = await response.json();
                  if (result.success) {
                    toast.success("Message sent!", { description: "We'll reply within 24 hours." });
                    e.currentTarget.reset();
                    setSelectedFiles([]);
                  } else {
                    toast.error("Failed to send message", { description: result.message || "Please try again later." });
                  }
                } catch (error) {
                  toast.error("An error occurred", { description: "Please try again later." });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" name="name" placeholder="e.g. Alice Smith" required />
                <Field label="Email" name="email" type="email" placeholder="e.g. alice@example.com" required />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Company" name="company" placeholder="e.g. Summit Press (optional)" />
                <Field label="Service needed" name="service" placeholder="e.g. Book Cover Design, Custom Cartography" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 items-end">
                <Field label="Budget range" name="budget" placeholder="e.g. $1,500 - $4,000" />
                <div>
                  <label className="block text-sm font-medium mb-2">Target Deadline</label>
                  <DatePicker name="deadline" placeholder="Select deadline" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  required maxLength={2000} rows={6}
                  placeholder="e.g. Hello, I am planning a trilogy release and would love to get details on your fantasy maps and book cover services..."
                  className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project brief (optional)</label>
                <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-dashed border-white/15 px-4 py-6 hover:bg-white/5 transition-colors">
                  <Upload className="h-5 w-5 text-brand-violet" />
                  <div className="flex flex-col text-left">
                    <span className="text-sm text-muted-foreground">
                      {selectedFiles.length > 0
                        ? `Selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                        : "Click to upload PDF, DOCX or image"}
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
              <button
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-brand px-6 py-4 text-base font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
            </form>
          </GlassCard>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <GlassCard className="aspect-[21/9] relative grid place-items-center p-0 overflow-hidden">
            {/* World Map Globe Overlay */}
            <img
              src={worldMapGlobe}
              alt="World Map"
              className="absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none select-none invert mix-blend-screen"
            />
            <div className="relative z-10 text-center">
              <MapPin className="mx-auto h-12 w-12 text-brand-violet" />
              <p className="mt-4 font-display text-2xl font-bold">{config.mapPlaceholderText}</p>
              <p className="mt-2 text-sm text-muted-foreground">Map placeholder</p>
            </div>
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
