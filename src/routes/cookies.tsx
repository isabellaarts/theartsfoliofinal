import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — The Arts Folio" },
      { name: "description", content: "How The Arts Folio uses cookies on this website." },
      { property: "og:title", content: "Cookie Policy — The Arts Folio" },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <>
      <section className="relative pt-36 pb-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Legal"
            title={
              <>
                Cookie <span className="text-gradient">Policy</span>
              </>
            }
            description="What cookies we use and why."
          />
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-5 lg:px-10 pb-24 space-y-6 text-muted-foreground leading-relaxed">
        <P title="1. What Are Cookies">
          Cookies are small text files placed on your device when you visit a website. They help
          sites remember preferences and gather analytics.
        </P>
        <P title="2. Essential Cookies">
          Required for the website to function — for example to remember whether you've accepted
          this policy. These cannot be disabled.
        </P>
        <P title="3. Analytics Cookies">
          We use privacy-respecting analytics to understand how visitors use the site. Data is
          aggregated and never tied to individuals.
        </P>
        <P title="4. Marketing Cookies">
          We may use marketing cookies to measure the effectiveness of ad campaigns. You can opt out
          via your browser settings.
        </P>
        <P title="5. Managing Cookies">
          Most browsers let you block or delete cookies. Disabling essential cookies may affect site
          functionality.
        </P>
        <P title="6. Third-Party Services">
          Embedded services (analytics, fonts, video) may set their own cookies under their own
          policies.
        </P>
        <P title="7. Contact">Questions? Email privacy@theartsfolio.com.</P>
      </article>
      <CTASection
        title={
          <>
            Ready to <span className="text-white/90">work with us?</span>
          </>
        }
        buttons={[
          { label: "Request a Custom Quote", to: "/quote" },
          { label: "View Portfolio", to: "/portfolio", variant: "ghost" },
        ]}
      />
    </>
  );
}

function P({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
