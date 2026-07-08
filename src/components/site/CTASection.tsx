import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/components/site/LeadModalContext";

interface CTAButton {
  label: string;
  to: string;
  variant?: "primary" | "ghost";
}

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  buttons?: CTAButton[];
  variant?: "gradient" | "glass" | "minimal";
  className?: string;
  artistName?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  buttons = [
    { label: "Request a Custom Quote", to: "/quote", variant: "primary" },
    { label: "Book a Free Consultation", to: "/contact", variant: "ghost" },
  ],
  variant = "gradient",
  className,
  artistName,
}: Props) {
  const { openModal } = useLeadModal();
  return (
    <section className={cn("relative py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 lg:px-10">
        <div
          className={cn(
            "relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center",
            variant === "gradient" && "bg-gradient-brand shadow-glow",
            variant === "glass" && "glass-strong",
            variant === "minimal" && "border border-white/10 bg-surface-2/40",
          )}
        >
          {variant === "gradient" && <div className="absolute inset-0 bg-radial-glow opacity-50" />}
          <div className="relative">
            {eyebrow && (
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em]",
                  variant === "gradient" ? "bg-white/15 text-white" : "glass text-muted-foreground",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
              </div>
            )}
            <h2
              className={cn(
                "mt-5 font-display text-3xl md:text-5xl font-bold",
                variant === "gradient" ? "text-white" : "",
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed",
                  variant === "gradient" ? "text-white/85" : "text-muted-foreground",
                )}
              >
                {description}
              </p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {buttons.map((b) => {
                const isPrimary = b.variant !== "ghost";
                const isCta = b.to === "/quote" || b.to === "/contact" || b.to.startsWith("#");

                const handleClick = (e: React.MouseEvent) => {
                  if (isCta) {
                    e.preventDefault();
                    openModal(artistName || null);
                  }
                };

                if (variant === "gradient") {
                  return (
                    <Link
                      key={b.to + b.label}
                      to={b.to}
                      onClick={handleClick}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-transform hover:scale-105 cursor-pointer",
                        isPrimary
                          ? "bg-white text-brand-violet"
                          : "glass-strong border border-white/30 text-white hover:bg-white/20",
                      )}
                    >
                      {b.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  );
                }
                return (
                  <Link
                    key={b.to + b.label}
                    to={b.to}
                    onClick={handleClick}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-semibold transition-transform hover:scale-105 cursor-pointer",
                      isPrimary
                        ? "bg-gradient-brand text-white shadow-glow"
                        : "glass hover:bg-white/10",
                    )}
                  >
                    {b.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
