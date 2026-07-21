import { industries } from "./index";
import { IndustriesSchema } from "./schema";

const result = IndustriesSchema.safeParse(industries);

if (!result.success) {
  console.error(`validate:content — ${result.error.issues.length} issue(s) found:\n`);
  for (const issue of result.error.issues) {
    const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    console.error(`  [${path}] ${issue.message}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`validate:content — ${result.data.length} industr${result.data.length === 1 ? "y" : "ies"} valid.`);
