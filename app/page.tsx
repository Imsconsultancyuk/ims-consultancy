import Link from "next/link";
import { TrophyHeader } from "./_components/TrophyHeader";
import { TrophyFooter } from "./_components/TrophyFooter";
import { Testimonials } from "./_components/Testimonials";
import { Reveal } from "./_components/Reveal";
import { HeroSection } from "./_components/HeroSection";
import { PointerTilt } from "./_components/PointerTilt";
import { CinematicTitle } from "./_components/CinematicTitle";
import { MagneticButton } from "./_components/MagneticButton";
import { CharSplit } from "./_components/CharSplit";
import { MethodologyCarousel } from "./_components/MethodologyCarousel";
import { ArtisticCharts } from "./_components/ArtisticCharts";
import {
  JsonLd,
  orgJsonLd,
  websiteJsonLd,
  webPageJsonLd,
} from "./_components/JsonLd";

const APPROACH_TILES = [
  {
    kicker: "01 Decide",
    heading: "The right call, said plainly.",
    body:
      "Strategy that holds at three in the morning. Positioning that matches where the business actually sits today. The quiet judgement that separates good moves from busy ones.",
  },
  {
    kicker: "02 Build",
    heading: "Code that ships and stays shipped.",
    body:
      "Development work built on real architecture, not vibes. Decisions you can defend in review, debug at eleven at night, and hand over without a knot in your stomach.",
  },
  {
    kicker: "03 Compound",
    heading: "Quiet automation, loud results.",
    body:
      "AI workflows that turn a single engagement into recurring advantage. Small systems, well chosen, that keep returning value long after the invoice clears.",
  },
];

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
        <HeroSection />

        {/* APPROACH (three tiles, paper-LIGHT band for visual breath) */}
        <section
          id="approach"
          aria-labelledby="approach-heading"
          className="relative isolate overflow-hidden bg-paper px-6 py-20 text-ink sm:py-24 lg:py-28"
        >
          <div
            aria-hidden
            className="ims-paper-aura pointer-events-none absolute inset-0 -z-10"
          />
          <div className="relative mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                How we work
              </p>
              <h2 id="approach-heading" className="sr-only">
                Three doors into one engagement
              </h2>
              <CharSplit
                text={"Three doors into\none engagement."}
                className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em] text-ink"
                stagger={0.018}
              />
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-ink-soft">
                Most clients arrive through one door and stay for all three.
                Each one stands on its own and each one makes the next two
                sharper.
              </p>
            </Reveal>

            <ol
              className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8"
              role="list"
            >
              {APPROACH_TILES.map((tile, i) => (
                <Reveal key={tile.kicker} delay={120 + i * 100}>
                  <PointerTilt className="h-full" tilt={5}>
                    <article
                      id={tile.kicker.split(" ")[1]?.toLowerCase()}
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/70 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-500/40 hover:bg-paper-soft/95 hover:shadow-[0_18px_44px_-22px_rgba(120,100,120,0.45)] sm:p-8"
                    >
                      {/* Hover-only mauve sheen */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(120,100,120,0.22), transparent 70%)",
                        }}
                      />
                      <header className="relative">
                        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500">
                          {tile.kicker}
                        </p>
                        <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-ink">
                          {tile.heading}
                        </h3>
                      </header>
                      <p className="relative mt-4 text-[0.9375rem] leading-[1.75] text-ink-soft">
                        {tile.body}
                      </p>
                      <footer className="relative mt-auto pt-7">
                        <div className="ims-divider-anim h-px w-12 transition-all duration-500 group-hover:w-32" />
                      </footer>
                    </article>
                  </PointerTilt>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <MethodologyCarousel />

        {/* Editorial cinematic chapter — full-bleed video, magazine type */}
        <CinematicTitle
          id="momentum"
          videoSrc="/videos/ims-decide-figure-walking.mp4"
          kicker="The engagement arc"
          title={"Walk\nthrough\nit."}
          body="A single engagement carries you from the first honest audit through to a clean exit. Quiet, steady forward motion the whole way."
          meta="Audit · Decide · Blueprint · Build · Hand-off"
          ctaLabel="See the seven steps"
          ctaHref="/process"
        />

        <ArtisticCharts />

        <Testimonials />

        {/* CTA BAND */}
        <section
          aria-labelledby="cta-heading"
          className="relative bg-deep-soft px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2 id="cta-heading" className="sr-only">
                Ready to make a clearer move
              </h2>
              <CharSplit
                text="Ready to make a clearer move?"
                className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.012em]"
                stagger={0.02}
              />
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
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
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.5)]"
                  >
                    Start a conversation
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
