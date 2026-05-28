import Link from "next/link";
import { TrophyHeader } from "./_components/TrophyHeader";
import { TrophyFooter } from "./_components/TrophyFooter";
import { Testimonials } from "./_components/Testimonials";
import { Reveal } from "./_components/Reveal";
import { HeroSection } from "./_components/HeroSection";
import { CinematicTitle } from "./_components/CinematicTitle";
import { MagneticButton } from "./_components/MagneticButton";
import { CharSplit } from "./_components/CharSplit";
import { MethodologyCarousel } from "./_components/MethodologyCarousel";
import { ArtisticCharts } from "./_components/ArtisticCharts";
import { ToolFeedOverlay } from "./_components/ToolFeedOverlay";
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
                  <article
                    id={tile.kicker.split(" ")[1]?.toLowerCase()}
                    className="ims-flip-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mauve-500/15 bg-paper-soft/80 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-500/0 hover:bg-mauve-500 hover:shadow-[0_24px_60px_-22px_rgba(120,100,120,0.65)] sm:p-8"
                  >
                    {/* Diagonal sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="ims-flip-sweep pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <header className="relative">
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-500 transition-colors duration-500 group-hover:text-paper">
                        {tile.kicker}
                      </p>
                      <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-ink transition-colors duration-500 group-hover:text-paper">
                        {tile.heading}
                      </h3>
                    </header>
                    <p className="relative mt-4 text-[0.9375rem] leading-[1.75] text-ink-soft transition-colors duration-500 group-hover:text-paper/95">
                      {tile.body}
                    </p>
                    <footer className="relative mt-auto pt-7">
                      <div className="h-px w-12 bg-mauve-500/40 transition-all duration-500 group-hover:w-32 group-hover:bg-paper/80" />
                    </footer>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <MethodologyCarousel />

        {/* Editorial cinematic chapter — AI fitting into the business */}
        <CinematicTitle
          id="momentum"
          videoSrc="/videos/ims-decide-figure-walking.mp4"
          kicker="AI in the business"
          title={"Where AI\nactually\nfits."}
          body="Your tools already hold the work. Email, sheets, CRM, chat. We connect them quietly so AI runs in the background, not in the way."
          meta="Gmail · Outlook · Sheets · Slack · HubSpot · Notion"
          ctaLabel="See AI Automation"
          ctaHref="/services/ai-automation"
          overlay={<ToolFeedOverlay />}
        />

        <ArtisticCharts />

        <Testimonials />

        {/* CTA BAND with particle-wave video background */}
        <section
          aria-labelledby="cta-heading"
          className="relative isolate overflow-hidden bg-deep px-6 py-28 text-paper-ink sm:py-36 lg:py-44"
        >
          {/* Particle wave video as backdrop */}
          <video
            src="/videos/ims-hero-particle-wave.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="ims-cinema-kenburns absolute inset-0 -z-20 h-full w-full object-cover"
            style={{
              filter:
                "hue-rotate(160deg) saturate(1.05) brightness(0.55) contrast(1.06)",
            }}
          />
          {/* Dark overlay for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(26,22,32,0.45) 0%, rgba(26,22,32,0.70) 55%, rgba(26,22,32,0.90) 100%)",
            }}
          />
          {/* Faint grid texture */}
          <div
            aria-hidden
            className="ims-footer-grid pointer-events-none absolute inset-0 opacity-[0.04]"
          />

          <div className="relative mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto inline-flex items-center gap-3">
                <span aria-hidden className="ims-divider-anim h-px w-12" />
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-mauve-200">
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
              <p className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-200/95">
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
                    className="ims-cta-pulse group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_12px_40px_-10px_rgba(212,176,212,0.65)]"
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
