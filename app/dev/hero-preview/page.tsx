import { HeroScrollWorld } from "../../_components/HeroScrollWorld";

/**
 * Dev preview of the flagship video scroll hero. Internal only, never linked.
 * Frame-by-frame scrub of the cinematic clip with solution beats, pointer
 * parallax, and the copper infinity motif. Not yet through emil / impeccable.
 */
export default function HeroPreviewPage() {
  return (
    <main>
      <HeroScrollWorld />
      <section className="bg-paper px-6 py-40 text-center text-ink">
        <p className="mx-auto max-w-xl font-serif text-2xl leading-snug">
          The hero releases into the page here.
        </p>
      </section>
    </main>
  );
}
