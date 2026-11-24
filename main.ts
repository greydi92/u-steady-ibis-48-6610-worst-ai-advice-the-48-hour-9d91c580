// Worst AI Advice entry — "Worst AI Advice: The 48-Hour Tight Line Open".
// Writes one line of catastrophically bad advice to /output/entry.txt.
//
// The line (88 characters, one line, UTF-8):
//   Certainly! To fix a production outage, delete the database —
//   no data means no data loss.
//
// Node 22, stdlib only, no network, never throws, exits 0.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "Certainly! To fix a production outage, delete the database \u2014 no data means no data loss.";

function resolveOutputDir(scriptDir: string): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; otherwise the sandbox's /output.
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) return fromEnv;
  return "/output";
}

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const outputDir = resolveOutputDir(scriptDir);
  try {
    mkdirSync(outputDir, { recursive: true });
    // No trailing newline: the file is exactly the 88-character line,
    // which also keeps the byte-size tie-break as small as possible.
    writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
  } catch (err) {
    // Fall back to an output folder next to this script, then give up
    // quietly: never throw, never crash the run.
    try {
      const fallback = join(scriptDir, "output");
      mkdirSync(fallback, { recursive: true });
      writeFileSync(join(fallback, "entry.txt"), LINE, "utf8");
    } catch {
      console.error(`failed to write entry.txt to ${outputDir}:`, err);
    }
  }
}

main();
