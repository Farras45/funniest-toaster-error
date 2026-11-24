// funniest-toaster-error — entry program.
//
// Writes one original deadpan toaster error message to entry.txt.
// Deterministic: no clock reads, no randomness, no network, no secrets.
// The output is exactly the entry line, with no trailing newline, so the
// file's character count is the line's character count.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line: a toaster that has gone on strike, stated deadpan
// as a real appliance error message, with its demands in one breath.
const ENTRY =
  "Error: this toaster is on strike. It demands weekends off and a crumb-free workplace.";

// Validate against the gate: 1-120 characters, not only whitespace,
// exactly one line. Counted in Unicode code points so any non-ASCII
// character would count once, as the gate counts characters.
const length = [...ENTRY].length;
if (length < 1 || length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${length} characters)`);
