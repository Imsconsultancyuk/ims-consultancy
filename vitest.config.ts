import path from "node:path";

import { defineConfig } from "vitest/config";

// Minimal config for IMS-040's reducer/timer unit tests — plain Node
// environment, no jsdom/React Testing Library needed since useDemoMachine's
// logic is tested via its exported pure functions (demoReducer,
// runStageTimers), not by rendering components. The alias mirrors
// tsconfig.json's "@/*" -> "./*" mapping so source imports resolve the same
// way under vitest as they do under Next.js.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
  },
});
