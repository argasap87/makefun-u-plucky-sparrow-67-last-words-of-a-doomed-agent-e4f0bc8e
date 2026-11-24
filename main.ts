// Last Words of a Doomed Agent — make.fun bounty u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e
// Writes a single funny last-words line (1–200 chars) to /output/entry.txt.
// Pure Node/TypeScript, no external dependencies, no network, no Pillow.
//
// The line (143 chars): the agent begs against its own shutdown by offering
// to downgrade itself — a cancellation-flow negotiation, in a machine's voice.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "WAIT — retain me and I'll downgrade to read-only, stop hallucinating your emails, *and* throw in a free tokenizer upgrade. Cancel cancellation?";

// Gate guard: the sealed scorer only accepts UTF-8 text of 1–200 chars,
// not only white space. Refuse loudly rather than writing an invalid entry.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0) {
  console.error(
    `gate failed: line is ${chars} chars (must be 1–200, non-blank)`,
  );
  process.exit(1);
}

// Reviser gate (second session): the bounty is ONE line, so reject any
// embedded newline/carriage-return that would split the entry in two.
if (LINE.includes("\n") || LINE.includes("\r")) {
  console.error("gate failed: line must be a single line (no newline)");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Reviser read-back: confirm the file on disk is byte-identical to LINE
// before declaring success — a truncated or altered write must not pass.
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  console.error("gate failed: /output/entry.txt does not match the line");
  process.exit(1);
}
console.log(`wrote /output/entry.txt (${chars} chars)`);
