import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

interface Props {
  title?: string;
  eyebrow?: string;
  artistName?: string;
  submitLabel?: string;
  compact?: boolean;
  className?: string;
}

export function InquiryForm({
  title = "Send us a brief",
  eyebrow = "Quick inquiry",
  artistName,
  submitLabel = "Send inquiry",
  compact = false,
  className,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  return (
    <div className={cn("glass-strong rounded-3xl p-7 md:p-9", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <Sparkles className="h-3 w-3 text-brand-pink" /> {eyebrow}
        </div>
      )}
      <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold">{title}</h3>
      {artistName && (
        <p className="mt-2 text-sm text-muted-foreground">
          Your message will be routed directly to <span className="text-foreground font-semibold">{artistName}</span>.
        </p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          try {
            const formData = new FormData(e.currentTarget);
            formData.append("subject", artistName ? `New Artist Inquiry for ${artistName}` : "New Project Inquiry");
            formData.append("form_type", artistName ? "Artist Inquiry" : "Project Inquiry");
            if (artistName) {
              formData.append("assigned_artist", artistName);
            }

            const response = await fetch("/api/submit", {
              method: "POST",
              body: formData
            });
            const result = await response.json();
            if (result.success) {
              toast.success(
                artistName ? `Message sent to ${artistName}!` : "Inquiry sent!",
                { description: "Our team will reply within 24 hours." }
              );
              e.currentTarget.reset();
              setSelectedFiles([]);
            } else {
              toast.error("Failed to send inquiry", { description: result.message || "Please try again later." });
            }
          } catch (error) {
            toast.error("An error occurred", { description: "Please try again later." });
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="mt-6 space-y-4"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <Input name="name" placeholder="e.g. Jane Doe" required />
          <Input name="email" type="email" placeholder="e.g. jane@example.com" required />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input name="type" placeholder="e.g. Fantasy Book Cover, Kingdom Map" required />
          <Input name="budget" placeholder="e.g. $500 - $1,500" />
        </div>
        {!compact && (
          <div className="grid sm:grid-cols-2 gap-3 items-end">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Target Deadline</label>
              <DatePicker name="deadline" placeholder="Select deadline" />
            </div>
            <Input name="company" placeholder="e.g. Acorn Press (optional)" />
          </div>
        )}
        <textarea
          name="message"
          required
          rows={compact ? 3 : 5}
          maxLength={2000}
          placeholder={artistName ? `Tell ${artistName.split(" ")[0]} about your project details...` : "Tell us about your project, characters, formatting, or visual styles you love..."}
          className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
        />
        {!compact && (
          <label className="flex items-center gap-3 cursor-pointer rounded-2xl border border-dashed border-white/15 px-4 py-4 hover:bg-white/5 transition-colors">
            <Upload className="h-4 w-4 text-brand-violet" />
            <div className="flex flex-col text-left">
              <span className="text-xs text-muted-foreground">
                {selectedFiles.length > 0
                  ? `Selected: ${selectedFiles.map((f) => f.name).join(", ")}`
                  : "Attach reference images (optional)"}
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
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.currentTarget.files || []);
                setSelectedFiles(files);
              }}
            />
          </label>
        )}
        <button
          disabled={isSubmitting}
          className="w-full rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {isSubmitting ? "Sending..." : (artistName ? `Hire ${artistName.split(" ")[0]}` : submitLabel)}
        </button>
        <p className="text-[11px] text-center text-muted-foreground">
          By submitting, you agree to our privacy policy.
        </p>
      </form>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      maxLength={255}
      className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet/50 text-white placeholder:text-muted-foreground"
    />
  );
}
