import Link from "next/link";
import { TrophyHeader } from "./TrophyHeader";
import { TrophyFooter } from "./TrophyFooter";
import { Reveal } from "./Reveal";
import { CharSplit } from "./CharSplit";
import { LeakLine } from "./LeakLine";
import { MagneticButton } from "./MagneticButton";
import { RelatedReading } from "./RelatedReading";
import { relatedForService } from "@/lib/seo/links";
import { JsonLd, orgJsonLd, websiteJsonLd, webPageJsonLd } from "./JsonLd";
import { rungFor, type ServiceContent } from "@/lib/services/catalog";

const SITE = "https://intelmadesimple.com";

const KICKER = "font-sans text-[11px] font-medium uppercase tracking-[0.22em]";
const DASH = "mt-2.5 inline-block h-[3px] w-3 shrink-0";

export function ServiceDetail({ service }: { service: ServiceContent }): React.JSX.Element {
  const rung = rungFor(service.rungSlug);
  const path = `/services/${service.slug}`;

  const page = webPageJsonLd({
    path,
    name: `${service.name} | Intel Made Simple`,
    description: service.metaDescription,
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.name, path },
    ],
  });

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE}${path}#service`,
    name: service.name,
    description: service.metaDescription,
    areaServed: { "@type": "Country", name: "United Kingdom" },
    provider: { "@id": `${SITE}/#organization` },
    offers: {
      "@type": "Offer",
      url: `${SITE}${path}`,
      priceCurrency: "GBP",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "GBP",
        description: rung.recurring ? `${rung.price}, ${rung.recurring}` : rung.price,
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE}${path}#faq`,
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={[orgJsonLd, websiteJsonLd, page, serviceLd, faqLd]} />
      <TrophyHeader />

      <main id="main" className="flex flex-1 flex-col">
        <header
          className="relative isolate overflow-hidden ims-band-dark px-6 pt-36 pb-16 text-paper-ink sm:pt-44 sm:pb-20 lg:pt-48 lg:pb-24"
          aria-labelledby="service-heading"
        >
          <div className="relative mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
            <LeakLine />
            <Reveal>
              <p className={`${KICKER} text-mauve-200`}>{service.kicker}</p>
              <CharSplit
                as="h1"
                text={service.headline}
                className="mt-5 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.018em]"
                stagger={0.012}
              />
              <p className="mt-7 max-w-2xl text-[1.0625rem] leading-[1.7] text-mauve-300">{service.lead}</p>
            </Reveal>

            <Reveal delay={120}>
              <aside
                aria-label={`${service.name} price`}
                className="rounded-[14px] border border-mauve-300/20 bg-deep/60 p-7"
              >
                <p className={`${KICKER} text-mauve-200`}>Price</p>
                <p className="mt-3 font-display text-[2.5rem] font-bold leading-none tracking-[-0.02em]">
                  {rung.price}
                </p>
                {rung.recurring ? (
                  <p className="mt-2 text-[0.9375rem] font-medium text-paper-ink/90">{rung.recurring}</p>
                ) : null}
                <p className="mt-3 font-sans text-[12px] uppercase tracking-[0.18em] text-mauve-300">
                  {rung.timing}
                </p>
                <a
                  href="/contact"
                  data-cursor="cta"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
                >
                  {rung.cta}
                </a>
                <p className="mt-4 text-[0.8125rem] leading-[1.6] text-mauve-300">
                  Fixed fee, agreed in writing before you pay.{" "}
                  <Link href="/pricing" className="ims-link">
                    Every price
                  </Link>
                </p>
              </aside>
            </Reveal>
          </div>
        </header>

        <section
          aria-labelledby="who-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className={`${KICKER} text-mauve-500`}>Who it is for</p>
              <h2
                id="who-heading"
                className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                A fit if this sounds like you.
              </h2>
              <ul className="mt-6 space-y-3 text-[1rem] leading-[1.7] text-ink/90" role="list">
                {service.forWho.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span aria-hidden className={`${DASH} bg-mauve-500`} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className={`${KICKER} text-mauve-500`}>The problem</p>
              <p className="mt-4 text-[1.0625rem] leading-[1.75] text-ink-soft">{service.problem}</p>
              {service.stat ? (
                <figure className="mt-8 rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-6">
                  <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.02em] text-ink">
                    {service.stat.value}
                  </p>
                  <figcaption className="mt-3 text-[0.9375rem] leading-[1.6] text-ink-soft">
                    {service.stat.label}
                    <span className="mt-1 block text-[0.8125rem] text-ink-soft">
                      Source: {service.stat.source}. Context, not a result of ours.
                    </span>
                  </figcaption>
                </figure>
              ) : null}
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="steps-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24 lg:py-28"
        >
          <div className="mx-auto w-full max-w-[1160px]">
            <Reveal>
              <p className={`${KICKER} text-mauve-200`}>How it runs</p>
              <h2
                id="steps-heading"
                className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
              >
                Four steps, in order.
              </h2>
            </Reveal>
            <ol className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-4" role="list">
              {service.steps.map((s, i) => (
                <li key={s.name} className="h-full border-t border-mauve-300/35">
                  <Reveal delay={i * 80} className="relative h-full pt-9">
                    <span
                      aria-hidden
                      className="absolute -top-[18px] left-0 flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 font-display text-[0.9375rem] font-semibold text-on-amber tabular-nums ring-[6px] ring-deep"
                    >
                      {i + 1}
                    </span>
                    <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-mauve-300">{s.when}</p>
                    <h3 className="mt-2 font-display text-[1.25rem] font-semibold leading-tight">{s.name}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-[1.65] text-mauve-300">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {service.secondary ? (
          <section
            id={service.secondary.id}
            aria-labelledby="secondary-heading"
            className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
          >
            <div className="mx-auto grid w-full max-w-[1160px] gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <Reveal>
                <p className={`${KICKER} text-mauve-500`}>{service.secondary.kicker}</p>
                <h2
                  id="secondary-heading"
                  className="mt-4 font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.012em]"
                >
                  {service.secondary.title}
                </h2>
                <p className="mt-4 font-display text-[2.25rem] font-bold leading-none tracking-[-0.02em]">
                  {service.secondary.price}
                </p>
                <p className="mt-6 max-w-[48ch] text-[1.0625rem] leading-[1.7] text-ink-soft">
                  {service.secondary.body}
                </p>
                <a
                  href="/contact"
                  data-cursor="cta"
                  className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-accent-500 px-6 text-[14px] font-semibold text-on-amber transition-colors duration-300 hover:bg-accent-600"
                >
                  {service.secondary.cta}
                </a>
              </Reveal>
              <Reveal delay={100}>
                <ul
                  className="space-y-3 rounded-[14px] border border-mauve-500/15 bg-paper-soft/80 p-7 text-[1rem] leading-[1.7] text-ink/90"
                  role="list"
                >
                  {service.secondary.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span aria-hidden className={`${DASH} bg-mauve-500`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="gets-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-[1160px] gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <p className={`${KICKER} text-mauve-200`}>What you get</p>
              <h2
                id="gets-heading"
                className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                On the table at the end.
              </h2>
              <ul className="mt-6 space-y-3 text-[1rem] leading-[1.7] text-paper-ink/95" role="list">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span aria-hidden className={`${DASH} bg-accent-400`} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <p className={`${KICKER} text-mauve-200`}>What it does not do</p>
              <h2 className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]">
                The honest limits.
              </h2>
              <ul className="mt-6 space-y-3 text-[1rem] leading-[1.7] text-mauve-300" role="list">
                {service.notDoing.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span aria-hidden className={`${DASH} bg-mauve-200`} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {service.status ? (
                <p className="mt-6 rounded-[14px] border border-accent-400/50 bg-deep/60 p-5 text-[0.9375rem] leading-[1.65] text-paper-ink/95">
                  {service.status}
                </p>
              ) : null}
            </Reveal>
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="relative ims-band-light px-6 py-20 text-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <p className={`${KICKER} text-mauve-500`}>Questions</p>
              <h2
                id="faq-heading"
                className="mt-4 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.15] tracking-[-0.012em]"
              >
                Straight answers.
              </h2>
            </Reveal>
            <dl className="mt-8 space-y-6">
              {service.faqs.map((f) => (
                <div key={f.q} className="border-t border-mauve-500/15 pt-6">
                  <dt className="font-display text-[1.125rem] font-semibold">{f.q}</dt>
                  <dd className="mt-2 text-[1rem] leading-[1.7] text-ink-soft">{f.a}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]" role="list">
              {service.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="ims-link">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-12 font-display text-[1.125rem] font-semibold">Read and run next</h3>
            <div className="mt-4">
              <RelatedReading items={relatedForService(service.slug)} />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="service-cta-heading"
          className="relative ims-band-dark px-6 py-20 text-paper-ink sm:py-24"
        >
          <div className="mx-auto w-full max-w-3xl text-center">
            <Reveal>
              <h2
                id="service-cta-heading"
                className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.012em]"
              >
                Start with a free Leak Scan.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mauve-300">
                Twenty minutes, a written estimate, and a plain answer on whether
                {" "}
                {service.name} is the right next step. If it is not, we say so.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 inline-block">
                <MagneticButton strength={0.45} radius={120}>
                  <a
                    href="/contact"
                    data-cursor="cta"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent-500 px-8 text-sm font-medium tracking-[0.02em] text-on-amber transition-all duration-300 hover:bg-accent-600"
                  >
                    Book a free Leak Scan
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <TrophyFooter />
    </>
  );
}
