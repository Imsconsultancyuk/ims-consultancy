import type { Metadata } from "next";
import Link from "next/link";
import { TrophyHeader } from "./_components/TrophyHeader";
import { TrophyFooter } from "./_components/TrophyFooter";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const WAYPOINTS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Leak calculators by sector" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <TrophyHeader />
      <main className="flex flex-1 flex-col">
        <section
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-24 text-paper-ink sm:pt-44 sm:pb-32 lg:pt-48"
          aria-labelledby="nf-heading"
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-mauve-200">
              Error 404
            </p>
            <h1
              id="nf-heading"
              className="mt-5 font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.018em]"
            >
              That page is not on our list.
            </h1>
            <p className="mt-7 text-[1.0625rem] leading-[1.7] text-mauve-300">
              The address may have changed or never existed. These pages are
              all live, or email{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:info@intelmadesimple.com"
              >
                info@intelmadesimple.com
              </a>{" "}
              and we will point you to the right one.
            </p>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {WAYPOINTS.map((w) => (
                <li key={w.href}>
                  <Link
                    href={w.href}
                    className="block rounded-[14px] border border-paper-ink/20 px-5 py-4 text-[1rem] transition-colors duration-200 hover:border-paper-ink/60"
                  >
                    {w.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <TrophyFooter />
    </>
  );
}
