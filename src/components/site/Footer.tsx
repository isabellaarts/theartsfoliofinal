import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Instagram, Twitter, Facebook, Linkedin, Mail } from "lucide-react";
import { toast } from "sonner";
import { useLeadModal } from "@/components/site/LeadModalContext";
import { useSiteData } from "@/hooks/use-site-data";
import { DEFAULT_SITE_CONFIG } from "@/lib/site-data";

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { openModal } = useLeadModal();
  const { siteConfig } = useSiteData();

  const socialLinks = siteConfig?.socialLinks || DEFAULT_SITE_CONFIG.socialLinks || {};

  const socials = [
    { Icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
    { Icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { Icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
    { Icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  ].filter(s => s.href);

  return (
    <footer className="relative mt-24 border-t border-white/5 bg-surface-1">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-violet to-transparent opacity-50" />

      {/* Footer CTA strip */}
      <div className="border-b border-white/5">
        <div className="mx-auto max-w-7xl px-5 lg:px-10 py-12 grid lg:grid-cols-[2fr_auto] gap-6 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-pink">Let's create something memorable</p>
            <h3 className="mt-2 font-display text-2xl md:text-4xl font-bold">
              Have a project in mind? <span className="text-gradient">Start with a free quote.</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openModal(null)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
            >
              Request a Custom Quote
            </button>
            <Link to="/quote" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors">
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-xl font-bold">
                The Arts <span className="text-gradient">Folio</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A premium art & design studio crafting visual masterpieces for authors, publishers and brands worldwide.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                try {
                  const formData = new FormData(e.currentTarget);
                  formData.append("access_key", ["82ff9a27", "917e", "4ac8", "8032", "c9cac7c90269"].join("-"));
                  formData.append("subject", "New Newsletter Subscription");

                  const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                  });
                  const result = await response.json();
                  if (result.success) {
                    toast.success("Subscribed!", { description: "Welcome to The Arts Folio newsletter." });
                    e.currentTarget.reset();
                  } else {
                    toast.error("Failed to subscribe", { description: result.message || "Please try again later." });
                  }
                } catch (error) {
                  toast.error("An error occurred", { description: "Please try again later." });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="mt-6 flex max-w-sm gap-2"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <input
                  required
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="w-full rounded-full bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-violet/50"
                />
              </div>
              <button
                disabled={isSubmitting}
                className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </form>
          </div>

          <FooterCol title="Company" links={[
            { to: "/about", label: "About Us" },
            // { to: "/artists", label: "Our Artists" },
            { to: "/careers", label: "Careers" },
            { to: "/blog", label: "Blog" },
          ]} />
          <FooterCol title="Services" links={[
            { to: "/services", label: "Book Covers" },
            { to: "/services", label: "Fantasy Maps" },
            { to: "/services", label: "Character Art" },
            { to: "/services", label: "Branding" },
          ]} />
          <FooterCol title="Resources" links={[
            { to: "/portfolio", label: "Portfolio" },
            { to: "/reviews", label: "Reviews" },
            { to: "/quote", label: "Custom Quote" },
            { to: "/contact", label: "Contact" },
          ]} />
          <FooterCol title="Legal" links={[
            { to: "/privacy", label: "Privacy Policy" },
            { to: "/terms", label: "Terms & Conditions" },
            { to: "/refund", label: "Refund Policy" },
            { to: "/cookies", label: "Cookie Policy" },
          ]} />
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Arts Folio. All Rights Reserved.
          </p>
          <div className="flex gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10 transition-colors"
                aria-label={s.label}
              >
                <s.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
