import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Arts Folio" },
      {
        name: "description",
        content: "How The Arts Folio collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — The Arts Folio" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <section className="relative pt-36 pb-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Legal"
            title={
              <>
                Privacy <span className="text-gradient">Policy</span>
              </>
            }
            description="Last updated: June 2026"
          />
        </div>
      </section>
      <article className="prose prose-invert max-w-3xl mx-auto px-5 lg:px-10 pb-24 space-y-6 text-muted-foreground leading-relaxed">
        <P title="1. Information We Collect">
          We collect information you provide when you request a quote, contact us, subscribe to our
          newsletter, or commission a project. This includes your name, email, project brief,
          reference files, and payment details processed by trusted third-party providers.
        </P>
        <P title="2. How We Use Your Information">
          We use your information to respond to inquiries, deliver commissioned work, send project
          updates, issue invoices, and improve our services. We never sell or rent your data.
        </P>
        <P title="3. Cookies & Analytics">
          We use essential cookies to operate the site and aggregated analytics to understand
          traffic. See our Cookie Policy for details.
        </P>
        <P title="4. Data Sharing">
          We share data only with the artist assigned to your project and trusted vendors (payment
          processors, email, file storage) under strict confidentiality.
        </P>
        <P title="5. Data Security">
          All files and communications are stored on encrypted infrastructure. Access is limited to
          assigned team members.
        </P>
        <P title="6. Your Rights">
          You may request access, correction, or deletion of your data at any time by emailing
          privacy@theartsfolio.com.
        </P>
        <P title="7. Children's Privacy">
          Our services are not directed to children under 16, and we do not knowingly collect their
          data.
        </P>
        <P title="8. International Transfers">
          As a remote studio serving worldwide clients, your data may be processed in the country
          where the assigned artist resides.
        </P>
        <P title="9. Contact">For any privacy questions, contact privacy@theartsfolio.com.</P>
      </article>
      <CTASection
        eyebrow="Still curious"
        title={
          <>
            Want to <span className="text-white/90">work with us?</span>
          </>
        }
        buttons={[
          { label: "Request a Custom Quote", to: "/quote" },
          { label: "Get in Touch", to: "/contact", variant: "ghost" },
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
