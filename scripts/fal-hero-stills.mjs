// Generates the scroll-world hero scene stills via fal.ai REST (IMS account).
// Reads FAL_KEY from .env.local — never logs it. High-quality cinematic prompts only.
// Usage: node scripts/fal-hero-stills.mjs [sceneNumberOrEmptyForAll]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(join(root, ".env.local"), "utf8");
const FAL_KEY = (env.match(/^FAL_KEY=(.+)$/m) || [])[1]?.trim().replace(/^"|"$/g, "");
if (!FAL_KEY) throw new Error("FAL_KEY not found in .env.local");

const MODEL = "fal-ai/nano-banana-pro";
const OUT = join(root, "public", "videos", "hero");
mkdirSync(OUT, { recursive: true });

const PREAMBLE =
  "Cinematic isometric 3D diorama of a modern professional workspace as a small floating island on a plain solid warm off-white (#f5eff3) background with a soft contact shadow. Soft matte clay-and-glass render, rounded restrained shapes, warm studio lighting, long soft shadows, tilt-shift miniature look. Muted palette: warm mauve #786478, plum #1a1620, paper #f5eff3, with one calm signal accent. Editorial, quiet, high-end consultancy feel, Architectural Digest meets a systems diagram. Highly detailed, centered composition, absolutely no text, no letters, no numbers, no logos.";

const SCENES = [
  "a single desk overwhelmed with manual work: a tower of paper inboxes, open spreadsheets, sticky notes scattered mid-air, tangled cables, a small figure buried at the centre. Cluttered but tasteful, the chaos legible.",
  "the same desk, now with glowing thin mauve lines tracing across it like a map, measuring where time is spent; sticky notes lifting and organising into a clean flow-diagram above the desk. Order emerging from clutter.",
  "a quiet miniature workshop where clean modular software blocks assemble themselves along the glowing lines: small scaffolds, neat server shapes, a calm engineer figure guiding it. Precision and restraint.",
  "floating app nodes (an email envelope, a spreadsheet grid, a chat bubble, a CRM card, a notebook) wiring together with soft mauve light threads into one connected constellation above the workspace. Systems joining hands.",
  "the original desk, now calm and uncluttered; work items move along the light threads on their own; the figure sits back, doing meaningful focused work while the system runs quietly around them.",
  "the whole workspace collapsed into a single elegant connected object, a small glowing orrery of linked systems, floating alone on the background, breathing gently. Serene, resolved, premium.",
];

async function gen(i) {
  const prompt = `${PREAMBLE} Subject: ${SCENES[i]}`;
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: "POST",
    headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, image_size: "landscape_4_3", num_images: 1 }),
  });
  if (!res.ok) throw new Error(`scene ${i + 1}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const url = data?.images?.[0]?.url;
  if (!url) throw new Error(`scene ${i + 1}: no image url in response ${JSON.stringify(data).slice(0, 300)}`);
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const path = join(OUT, `scene-${i + 1}.jpg`);
  writeFileSync(path, buf);
  console.log(`scene ${i + 1} ok -> ${path} (${(buf.length / 1024).toFixed(0)}kb)`);
}

const only = process.argv[2] ? Number(process.argv[2]) - 1 : null;
const idxs = only !== null ? [only] : SCENES.map((_, i) => i);
for (const i of idxs) {
  await gen(i);
}
console.log("done");
