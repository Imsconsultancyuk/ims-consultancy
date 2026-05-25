import { TrophyHeader } from "./_components/TrophyHeader";
import { TrophyFooter } from "./_components/TrophyFooter";
import { Testimonials } from "./_components/Testimonials";
import { Reveal } from "./_components/Reveal";
import { HeroSection } from "./_components/HeroSection";
import { PointerTilt } from "./_components/PointerTilt";
import { CinematicBand } from "./_components/CinematicBand";
import { MagneticButton } from "./_components/MagneticButton";
import { CharSplit } from "./_components/CharSplit";

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
  return (
    <>
      <TrophyHeader />

      <main className="flex flex-1 flex-col">
        <HeroSection />

        {/* APPROACH (dark band) */}
        <section
          id="approach"
          className="relative bg-deep px-6 pt-28 pb-32 text-paper-ink sm:pt-36 sm:pb-40 lg:pt-44 lg:pb-48"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                How we work
              </p>
              <CharSplit
                text={"Three doors into\none engagement."}
                className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em]"
                stagger={0.018}
              />
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Most clients arrive through one door and stay for all three.
                Each one stands on its own and each one makes the next two
                sharper.
              </p>
            </Reveal>

            <div className="mt-20 grid gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              {APPROACH_TILES.map((tile, i) => (
                <Reveal key={tile.kicker} delay={120 + i * 100}>
                  <PointerTilt className="h-full" tilt={5}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-mauve-300/12 bg-deep-soft/55 p-7 backdrop-blur transition-all duration-500 hover:border-mauve-300/30 hover:bg-deep-soft/75 sm:p-8">
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                        {tile.kicker}
                      </p>
                      <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-paper-ink">
                        {tile.heading}
                      </h3>
                      <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mauve-300">
                        {tile.body}
                      </p>
                      <div className="mt-auto pt-7">
                        <div className="h-px w-12 bg-mauve-300/40 transition-all duration-500 group-hover:w-24 group-hover:bg-mauve-200/70" />
                      </div>
                    </article>
                  </PointerTilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CinematicBand />

        <Testimonials />

        {/* CTA BAND */}
        <section className="relative bg-deep-soft px-6 py-28 text-paper-ink sm:py-36">
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
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
                  <a
                    href="mailto:hello@intelmadesimple.com"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                  >
                    Start a conversation
                  </a>
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
