import { createContext, useContext, useState, ReactNode } from "react";
import { X, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/hooks/use-site-data";
import { DatePicker } from "@/components/ui/date-picker";

const CONTACT_EMAIL = ["info", "theartsfolio.com"].join("@");

interface LeadModalContextType {
  isOpen: boolean;
  artistContext: string | null;
  openModal: (artistName?: string | null) => void;
  closeModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [artistContext, setArtistContext] = useState<string | null>(null);

  const openModal = (artistName: string | null = null) => {
    setArtistContext(artistName);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setArtistContext(null);
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, artistContext, openModal, closeModal }}>
      {children}
      {isOpen && <GlobalLeadModal />}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}

function GlobalLeadModal() {
  const { artistContext, closeModal } = useLeadModal();
  const { artists } = useSiteData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string>(artistContext || "");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const artist = selectedArtist || "General Studio Inquiry";
      formData.append("subject", `New Lead Inquiry - ${artist}`);
      formData.append("assigned_artist", artist);
      formData.append("studio_email", CONTACT_EMAIL);
      formData.append("form_type", "Lead Inquiry");

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Thank you! Your inquiry has been received.", {
          description: "We'll get back to you within 24 hours.",
        });
        closeModal();
      } else {
        toast.error("Failed to send inquiry", {
          description: result.message || "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={closeModal} />

      <div className="relative w-full max-w-lg rounded-3xl glass-strong p-6 md:p-8 shadow-glow overflow-y-auto max-h-[90vh] animate-scale-in">
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-brand-pink" /> Start Your Project
        </div>

        <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">Get a Custom Quote</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Tell us about your project or email us directly at{" "}
          <a
            href={["mailto:", CONTACT_EMAIL].join("")}
            className="text-brand-pink hover:underline font-semibold"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Your Name
              </label>
              <input
                required
                name="name"
                maxLength={255}
                placeholder="e.g. John Doe"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                maxLength={255}
                placeholder="e.g. john@example.com"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Project Type
              </label>
              <input
                required
                name="type"
                maxLength={255}
                placeholder="e.g. Book Cover, Fantasy Map..."
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Select Artist (Optional)
              </label>
              <select
                name="artist"
                value={selectedArtist}
                onChange={(e) => setSelectedArtist(e.target.value)}
                className="w-full rounded-2xl bg-surface-2 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: "right 1rem center",
                  backgroundSize: "1.5em 1.5em",
                  backgroundRepeat: "no-repeat",
                  paddingRight: "2.5rem",
                }}
              >
                <option value="">General Studio Inquiry</option>
                {artists.map((artist) => (
                  <option key={artist.slug} value={artist.name}>
                    {artist.name} ({artist.role.split(" ").slice(-2).join(" ")})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Budget Range
              </label>
              <input
                name="budget"
                maxLength={255}
                placeholder="e.g. $500 - $2,000"
                className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Target Deadline
              </label>
              <DatePicker name="deadline" placeholder="Select deadline" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Project Description
            </label>
            <textarea
              required
              name="message"
              maxLength={2000}
              rows={4}
              placeholder="Describe your vision, ideas, and any references..."
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
              Attach Reference (Optional)
            </label>
            <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-dashed border-white/15 px-4 py-3 hover:bg-white/5 transition-colors">
              <Upload className="h-4 w-4 text-brand-violet" />
              <div className="flex flex-col text-left">
                <span className="text-xs text-muted-foreground">
                  {selectedFiles.length > 0
                    ? `Selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                    : "Click to upload image or brief"}
                </span>
                {selectedFiles.length > 0 && (
                  <span className="text-[10px] text-muted-foreground/60 mt-0.5">
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
            className="w-full rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? "Sending Request..." : "Send Request"}
          </button>

          <p className="text-[11px] text-center text-muted-foreground">
            By submitting, you agree to our privacy policy. We reply within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
