import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/ui-bits";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — The Arts Folio" },
      {
        name: "description",
        content: "Our refund and revision policy for commissioned artwork and design projects.",
      },
      { property: "og:title", content: "Refund Policy — The Arts Folio" },
      { property: "og:url", content: "/refund" },
    ],
    links: [{ rel: "canonical", href: "/refund" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <>
      <section className="relative pt-36 pb-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-10 text-center">
          <SectionHeading
            eyebrow="Legal"
            title={
              <>
                Refund <span className="text-gradient">Policy</span>
              </>
            }
            description="Fair, transparent and clearly defined."
          />
        </div>
      </section>
      <article className="max-w-3xl mx-auto px-5 lg:px-10 pb-24 space-y-6 text-muted-foreground leading-relaxed">
        <P title="1. Non-Refundable Operations">
          Once work has started, payments are non-refundable.
        </P>
        <P title="2. Project Stage Lock-In">
          If a project has reached the coloring/rendering stage after line art approval, the project cannot be canceled, and the client must complete the remaining payment.
        </P>
        <P title="3. AI Detection & Claims">
          Claims from third-party AI detection tools or opinions from other individuals do not constitute proof that an artwork is AI-generated and will not qualify for a refund. False AI-related claims will not be accepted as grounds for refunds. We are human artists, not AI bots. Human artists can make mistakes, just as clients can.
        </P>
        <P title="4. Design Process & Checkpoints">
          To ensure client satisfaction, we provide a rough sketch first, then line art, and then final colors and rendering.
        </P>
        <P title="5. Process Verification">
          We provide process recordings (typically between 1 and 10 minutes) showing the artwork being drawn by hand.
        </P>
        <P title="6. Source Files">
          Editable source files can be provided upon request.
        </P>
        <P title="7. Portfolio Rights & Releases">
          Artists retain the right to display completed artwork in their portfolio. If a client requests that artwork not be publicly displayed because it has not yet been released, the artist will respect that request and will not publish the artwork without permission.
        </P>
        <P title="8. Licensing & Commercial Rights">
          Commercial rights are available as an additional purchase. Clients who purchase commercial rights may use the artwork for books, promotions, marketing, merchandise, and other commercial purposes. Clients who do not purchase commercial rights receive personal-use rights only.
        </P>
        <P title="9. Industry Alignment">
          These terms follow standard industry practices.
        </P>
      </article>
      <CTASection
        title={
          <>
            Have <span className="text-white/90">questions?</span>
          </>
        }
        buttons={[
          { label: "Get in Touch", to: "/contact" },
          { label: "Request a Quote", to: "/quote", variant: "ghost" },
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
