import Image from "next/image";
import Link from "next/link";
import { Header } from "./_components/Header";
import { Reveal } from "./_components/Reveal";
import { PointerVideo } from "./_components/PointerVideo";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col">
        {/* ============ HERO (cinematic video, pointer-reactive) ============ */}
        <section className="relative isolate overflow-hidden bg-deep px-6 pt-32 pb-32 sm:pt-44 sm:pb-40 lg:pt-52 lg:pb-48">
          {/* Background video that tilts toward the pointer and carries a mauve cursor glow */}
          <PointerVideo
            src="/videos/ims-hero-particle-wave.mp4"
            className="absolute inset-0 -z-20 h-full w-full"
            filter="hue-rotate(160deg) saturate(1.05) brightness(0.85) contrast(1.05)"
          />
          {/* Soft vignette so the headline reads cleanly without flattening the video */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(26,22,32,0.20) 0%, rgba(26,22,32,0.55) 55%, rgba(26,22,32,0.85) 100%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-3xl text-center text-paper-ink">
            <Reveal>
              <Image
                src="/logos/ims-vertical-transparent.png"
                alt="IMS Consultancy. Intelligence Made Simple."
                width={260}
                height={320}
                priority
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 140px"
                style={{ height: "auto" }}
                className="mx-auto w-[140px] sm:w-[180px] lg:w-[220px]"
              />
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-12 font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.015em] text-paper-ink">
                Considered work
                <br />
                for ambitious operators.
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="mx-auto mt-8 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                A strategic consultancy for business decisions,
                development, and AI workflows. Honest answers and results
                that hold up over time.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:hello@intelmadesimple.com"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.55)]"
                >
                  Start a conversation
                </a>
                <Link
                  href="#approach"
                  className="inline-flex h-12 items-center justify-center px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-paper-ink transition-colors hover:text-mauve-200"
                >
                  How we work
                </Link>
              </div>
            </Reveal>

            {/* Scroll cue */}
            <Reveal delay={520}>
              <div className="mt-20 flex flex-col items-center text-mauve-200">
                <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
                  Scroll on
                </span>
                <span
                  aria-hidden
                  className="mt-2 inline-block h-8 w-px animate-[scrollHint_2.4s_ease-in-out_infinite]"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(212,176,212,0.7), rgba(212,176,212,0))",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ APPROACH (dark band) ============ */}
        <section
          id="approach"
          className="relative bg-deep px-6 pt-28 pb-32 text-paper-ink sm:pt-36 sm:pb-40 lg:pt-44 lg:pb-48"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                How we work
              </p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-[-0.012em]">
                Three doors into one engagement.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Most clients arrive through one door and stay for all three.
                Each one stands on its own and each one makes the next two
                sharper.
              </p>
            </Reveal>

            <div className="mt-20 grid gap-14 sm:grid-cols-3 sm:gap-10 lg:gap-14">
              <Reveal delay={120}>
                <article className="flex flex-col">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    01 Decide
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-paper-ink">
                    The right call, said plainly.
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mauve-300">
                    Strategy that holds at three in the morning. Positioning
                    that matches where the business actually sits today. The
                    quiet judgement that separates good moves from busy ones.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={220}>
                <article className="flex flex-col">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    02 Build
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-paper-ink">
                    Code that ships and stays shipped.
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mauve-300">
                    Development work built on real architecture, not vibes.
                    Decisions you can defend in review, debug at eleven at
                    night, and hand over without a knot in your stomach.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={320}>
                <article className="flex flex-col">
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
                    03 Compound
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-medium leading-snug text-paper-ink">
                    Quiet automation, loud results.
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mauve-300">
                    AI workflows that turn a single engagement into recurring
                    advantage. Small systems, well chosen, that keep
                    returning value long after the invoice clears.
                  </p>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ CTA BAND (dark, slight contrast) ============ */}
        <section className="relative bg-deep-soft px-6 py-28 text-paper-ink sm:py-36">
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-[-0.012em]">
                Ready to make a clearer move?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                One reply from us, often within the same day. We work with a
                small number of clients at a time and we tell you honestly
                whether we are the right partner.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href="mailto:hello@intelmadesimple.com"
                className="mt-12 inline-flex h-12 items-center justify-center rounded-md bg-mauve-300 px-8 text-sm font-medium tracking-[0.02em] text-deep transition-all duration-300 hover:bg-mauve-200 hover:shadow-[0_8px_32px_-8px_rgba(212,176,212,0.5)]"
              >
                Start a conversation
              </a>
            </Reveal>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="bg-deep px-6 py-12 text-paper-ink-soft">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <Image
              src="/logos/ims-vertical-dark.png"
              alt="IMS"
              width={160}
              height={200}
              sizes="80px"
              style={{ height: "auto" }}
              className="w-[80px] opacity-80"
            />
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.22em]">
              © {new Date().getFullYear()} IMS Consultancy
            </p>
          </div>
        </footer>
      </main>

      {/* Inline keyframes for scroll cue */}
      <style>{`
        @keyframes scrollHint {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(8px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
