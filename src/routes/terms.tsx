import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — The Arts Folio" },
      {
        name: "description",
        content: "Terms governing the use of The Arts Folio's services and website.",
      },
      { property: "og:title", content: "Terms & Conditions — The Arts Folio" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <section className="relative pt-36 pb-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Legal"
            title={
              <>
                Terms & <span className="text-gradient">Conditions</span>
              </>
            }
            description="Last updated: June 2026"
          />
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-5 lg:px-10 pb-24 space-y-6 text-muted-foreground leading-relaxed">
        <P title="1. Acceptance of Terms">
          By accessing this website or commissioning work from The Arts Folio, you agree to these
          terms.
        </P>
        <P title="2. Services">
          The Arts Folio provides custom illustration, design, branding and web development
          services. Each project is governed by a signed quote or contract.
        </P>
        <P title="3. Project Scope & Revisions">
          Scope, deliverables, timeline and revision rounds are defined in your project quote.
          Additional work is billed separately.
        </P>
        <P title="4. Payment Terms">
          A 50% deposit is required before work begins. The balance is due before final delivery.
          All payments are non-refundable once production has started, except per our Refund Policy.
        </P>
        <P title="5. Intellectual Property">
          Upon final payment, the client receives a commercial usage license for the agreed scope.
          The Arts Folio retains the right to display the work in our portfolio unless otherwise
          agreed.
        </P>
        <P title="6. No AI-Generated Work">
          All artwork is hand-created by human artists. We do not use generative AI to produce
          client deliverables.
        </P>
        <P title="7. Confidentiality">
          All project materials are kept confidential. NDAs are available on request and are
          standard for NSFW commissions.
        </P>
        <P title="8. Liability">
          The Arts Folio is not liable for indirect, incidental or consequential damages. Total
          liability is limited to the amount paid for the relevant project.
        </P>
        <P title="9. Governing Law">
          These terms are governed by the laws of the studio's primary jurisdiction.
        </P>
        <P title="10. Contact">For questions about these terms, contact legal@theartsfolio.com.</P>
      </article>
      <CTASection
        title={
          <>
            Ready to start <span className="text-white/90">your project?</span>
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
