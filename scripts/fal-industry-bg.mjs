// Generates per-industry background images (behind the industry cards) via
// fal.ai REST (IMS account). Reads FAL_KEY from .env.local — never logs it.
// Dark, cobalt-tinted, cinematic sector atmospheres so translucent cards stay
// legible on top. High-quality prompts only. No text / letters / logos.
// Usage: node scripts/fal-industry-bg.mjs [slug]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(join(root, ".env.local"), "utf8");
const FAL_KEY = (env.match(/^FAL_KEY=(.+)$/m) || [])[1]?.trim().replace(/^"|"$/g, "");
if (!FAL_KEY) throw new Error("FAL_KEY not found in .env.local");

const MODEL = "fal-ai/nano-banana-pro";
const OUT = join(root, "public", "images", "industries");
mkdirSync(OUT, { recursive: true });

// Deep, low-key, cool-toned so a translucent dark card reads cleanly on top.
const PREAMBLE =
  "Cinematic, moody, low-key photographic scene, deep shadow, shot on a full-frame camera with a wide aperture, atmospheric haze. Cool colour grade: cobalt blue #3a6df0 and steel, near-black ink #12141c background, a few warm cream #f7f3ec highlights. Premium, editorial, restrained, expensive. Dark and quiet enough to sit behind semi-transparent UI cards. Absolutely no text, no letters, no numbers, no logos, no watermarks, no people looking at camera.";

const SCENES = {
  "mortgage-brokers":
    "an elegant modern property-finance office at dusk, a single brass house key catching cobalt rim-light on a dark desk, blurred city skyline of houses through a rain-flecked window.",
  "ifas-wealth-managers":
    "a private wealth-management study at night, dark polished wood, a softly glowing abstract financial line-chart floating as cool blue light, a crystal tumbler catching cream highlight.",
  "law-firms":
    "a dark oak law library, tall shelves of leather-bound books receding into shadow, a single shaft of cool blue window light across the spines, quiet and authoritative.",
  "executive-search-recruitment":
    "an empty executive boardroom at night, one leather chair pulled out under a cool pool of cobalt light, long reflective table fading into darkness.",
  "commercial-insurance-brokers":
    "an abstract protective shield of interlocking cool-blue light lines over a dark commercial cityscape, fine rain, a sense of risk quietly contained.",
  "ma-advisory-business-brokers":
    "a dark deal-room at night, two abstract glowing geometric forms merging into one under cobalt light above a glass table, corporate and decisive.",
  "commercial-property":
    "moody twilight exterior of a sleek commercial building, glass and steel facade lit by cool blue interior light, low angle, cinematic reflections.",
  "accountancy-firms":
    "an abstract of precise glowing cool-blue grid lines and neat stacked ledger forms in deep shadow, orderly columns of soft light, calm precision.",
  "b2b-saas":
    "a darkened modern data operations room, softly glowing cool-blue dashboard screens out of focus, server racks receding into shadow, clean and quiet.",
  "private-healthcare-groups":
    "a calm private clinic corridor at night, soft cool-blue light along a clean minimal wall, one warm cream light at the far end, reassuring and premium.",
};

async function gen(slug) {
  const prompt = `${PREAMBLE} Subject: ${SCENES[slug]}`;
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, image_size: "portrait_4_3", num_images: 1 }),
  });
  if (!res.ok) throw new Error(`${slug}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error(`${slug}: no image url ${JSON.stringify(data).slice(0, 200)}`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const path = join(OUT, `${slug}.jpg`);
  writeFileSync(path, buf);
  console.log(`${slug} ok -> ${path} (${(buf.length / 1024).toFixed(0)}kb)`);
}

const only = process.argv[2];
const slugs = only ? [only] : Object.keys(SCENES);
for (const slug of slugs) {
  try {
    await gen(slug);
  } catch (e) {
    console.error(String(e.message || e));
  }
}
console.log("done");
