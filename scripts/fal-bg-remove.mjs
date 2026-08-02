// Background removal via fal.ai (IMS account). Reads FAL_KEY from .env.local (never logs it).
// Usage: node scripts/fal-bg-remove.mjs <inputPath> <outputPath>
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(join(root, ".env.local"), "utf8");
const FAL_KEY = (env.match(/^FAL_KEY=(.+)$/m) || [])[1]?.trim().replace(/^"|"$/g, "");
if (!FAL_KEY) throw new Error("FAL_KEY not found in .env.local");

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) throw new Error("usage: node fal-bg-remove.mjs <in> <out>");

const bytes = readFileSync(input);
const mime = extname(input).toLowerCase() === ".jpg" ? "image/jpeg" : "image/png";
const dataUri = `data:${mime};base64,${bytes.toString("base64")}`;

const MODELS = ["fal-ai/birefnet", "fal-ai/imageutils/rembg"];
let done = false;
for (const model of MODELS) {
  try {
    const res = await fetch(`https://fal.run/${model}`, {
      method: "POST",
      headers: { Authorization: `Key ${FAL_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: dataUri }),
    });
    if (!res.ok) {
      console.log(`${model}: HTTP ${res.status} ${(await res.text()).slice(0, 160)}`);
      continue;
    }
    const data = await res.json();
    const url = data?.image?.url || data?.images?.[0]?.url;
    if (!url) {
      console.log(`${model}: no url ${JSON.stringify(data).slice(0, 160)}`);
      continue;
    }
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    writeFileSync(output, buf);
    console.log(`ok via ${model} -> ${output} (${(buf.length / 1024).toFixed(0)}kb)`);
    done = true;
    break;
  } catch (e) {
    console.log(`${model}: ${String(e).slice(0, 160)}`);
  }
}
if (!done) throw new Error("all bg-removal models failed");
