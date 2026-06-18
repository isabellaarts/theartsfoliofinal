import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { LeadModalProvider } from "@/components/site/LeadModalContext";
import { SiteDataProvider } from "@/hooks/use-site-data";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "The Arts Folio — Where Stories Become Visual Masterpieces" },
      {
        name: "description",
        content:
          "Premium art & design studio for authors, publishers and brands. Book covers, fantasy maps, character art, branding, websites and more.",
      },
      { name: "author", content: "The Arts Folio" },
      { property: "og:site_name", content: "The Arts Folio" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F0F15" },
      {
        property: "og:title",
        content: "The Arts Folio — Where Stories Become Visual Masterpieces",
      },
      {
        name: "twitter:title",
        content: "The Arts Folio — Where Stories Become Visual Masterpieces",
      },
      {
        property: "og:description",
        content:
          "Premium art & design studio for authors, publishers and brands. Book covers, fantasy maps, character art, branding, websites and more.",
      },
      {
        name: "twitter:description",
        content:
          "Premium art & design studio for authors, publishers and brands. Book covers, fantasy maps, character art, branding, websites and more.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81760d45-1b0a-4f11-b78e-d9d59c1f846e/id-preview-89569e3a--1e0eaa8d-c3dc-4ca7-96e8-76d3d7211d54.lovable.app-1780866531274.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/81760d45-1b0a-4f11-b78e-d9d59c1f846e/id-preview-89569e3a--1e0eaa8d-c3dc-4ca7-96e8-76d3d7211d54.lovable.app-1780866531274.png",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The Arts Folio",
          description: "Professional art & design studio for authors, publishers and brands.",
          slogan: "Where Stories Become Visual Masterpieces",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const win = window as any;
    win.Tawk_API = win.Tawk_API || {};
    
    // Position Tawk.to widget at the bottom-right
    win.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: "br",
          xOffset: 20,
          yOffset: 20
        },
        mobile: {
          position: "br",
          xOffset: 15,
          yOffset: 15
        }
      }
    };

    if (document.querySelector('script[src*="tawk.to"]')) return;

    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/6a26aaf76dd5c81c327336d7/1jqjgnm44";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteDataProvider>
        <LeadModalProvider>
          <div className="relative min-h-screen flex flex-col overflow-x-hidden max-w-full">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <Toaster richColors position="bottom-left" />
          </div>
        </LeadModalProvider>
      </SiteDataProvider>
    </QueryClientProvider>
  );
}
