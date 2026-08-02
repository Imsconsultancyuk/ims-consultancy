import Link from "next/link";
import { TrophyHeader } from "./_components/TrophyHeader";
import { TrophyFooter } from "./_components/TrophyFooter";
import { Testimonials } from "./_components/Testimonials";
import { Reveal } from "./_components/Reveal";
import { HeroScrollWorld } from "./_components/HeroScrollWorld";
import { MagneticButton } from "./_components/MagneticButton";
import { CharSplit } from "./_components/CharSplit";
import { MethodologyCarousel } from "./_components/MethodologyCarousel";
import { IndustriesShowcase } from "./_components/IndustriesShowcase";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "./_components/JsonLd";

export default function Home() {
  const homePage = webPageJsonLd({
    path: "/",
    name: "IMS Consultancy · Intelligence Made Simple",
    description:
      "A strategic consultancy for business decisions, development, and AI workflows. Honest answers and results that hold up over time.",
    breadcrumbs: [{ name: "Home", path: "/" }],
  });

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, homePage]} />
      <TrophyHeader />

      <main className="flex flex-1 flex-col" id="main">
        <HeroScrollWorld />

        <IndustriesShowcase />

        <MethodologyCarousel />

        <Testimonials />

        {/* CTA BAND — dark rhythm anchor with the cobalt band effect */}
        <section
          aria-labelledby="cta-heading"
          className="relative isolate overflow-hidden ims-band-dark px-6 py-28 text-paper-ink sm:py-36 lg:py-44"
        >
          {/* Faint grid texture */}
          <div
            aria-hidden
            className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.06]"
          />

          <div className="relative mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-3">
                <span aria-hidden className="ims-divider-anim h-px w-12" />
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-accent-300">
                  A clearer move
                </p>
                <span aria-hidden className="ims-divider-anim h-px w-12" />
              </div>
              <h2 id="cta-heading" className="sr-only">
                Ready to make a clearer move
              </h2>
              <CharSplit
                text="Ready to make a clearer move?"
                className="mt-7 font-serif text-[clamp(2rem,4.4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em] text-paper-ink"
                stagger={0.02}
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-paper-ink/75">
                One reply from us, often within the same day. We work with a
                small number of clients at a time and we tell you honestly
                whether we are the right partner.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <Link
                    href="/contact"
                    data-cursor="cta"
                    className="ims-cta-pulse group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-accent-500 px-8 text-sm font-medium tracking-[0.02em] text-paper-pure transition-all duration-300 hover:bg-accent-400 hover:shadow-[0_12px_40px_-10px_rgba(58,109,240,0.65)]"
                  >
                    <span className="relative z-10">Start a conversation</span>
                    <span
                      aria-hidden
                      className="ims-cta-sweep absolute inset-0 bg-gradient-to-r from-transparent via-paper/40 to-transparent"
                    />
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />

      <style>{`
        @keyframes scrollHint {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
