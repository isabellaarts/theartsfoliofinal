import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/components/site/LeadModalContext";
import { useSiteData } from "@/hooks/use-site-data";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  // { to: "/artists", label: "Artists" },
  { to: "/reviews", label: "Reviews" },
  { to: "/careers", label: "Careers" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openModal } = useLeadModal();
  const location = useLocation();
  const { artists } = useSiteData();

  const isArtistProfile = location.pathname.startsWith("/artists/") && location.pathname.split("/").length === 3;
  const artistSlug = isArtistProfile ? location.pathname.split("/")[2] : null;
  const artist = isArtistProfile ? artists.find((a) => a.slug === artistSlug) : null;

  const links = artist
    ? [
        { href: "#about", label: "About" },
        { href: "#services", label: "Services", show: artist.services && artist.services.length > 0 },
        { href: "#portfolio", label: "Portfolio" },
        { href: "#reviews", label: "Reviews" },
        { href: "#pricing", label: "Pricing", show: artist.pricing && artist.pricing.length > 0 },
        { href: "#faq", label: "FAQ", show: artist.faqs && artist.faqs.length > 0 },
        { href: "#hire", label: "Contact" },
      ].filter((l) => l.show !== false)
    : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-10 h-16 lg:h-20">
        <Link
          to={isArtistProfile ? `/artists/${artistSlug}` : "/"}
          className="flex items-center gap-2 group"
          onClick={(e) => {
            setOpen(false);
            if (isArtistProfile) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            {artist ? artist.name : <>The Arts <span className="text-gradient">Folio</span></>}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links ? (
            links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors"
              >
                {l.label}
              </a>
            ))
          ) : (
            NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full transition-colors"
                activeProps={{
                  className: "px-3 py-2 text-sm text-foreground rounded-full bg-white/5",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))
          )}
        </nav>

        <div className="flex items-center gap-2">
          {artist ? (
            <a
              href="#hire"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
            >
              Hire Artist
            </a>
          ) : (
            <button
              onClick={() => openModal(null)}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform cursor-pointer"
            >
              Get Free Quote
            </button>
          )}
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full glass"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass-strong border-t border-white/5">
          <nav className="flex flex-col p-4 gap-1">
            {links ? (
              links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm text-foreground hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))
            ) : (
              NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm text-foreground hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))
            )}
            {artist ? (
              <a
                href="#hire"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white cursor-pointer"
              >
                Hire Artist
              </a>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  openModal(null);
                }}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white cursor-pointer"
              >
                Get Free Quote
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
