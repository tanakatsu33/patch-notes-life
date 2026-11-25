import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FIX =
  "v4.2.1: Fixed a bug where crossing a doorway flushed the cache and deleted the reason for entering the room.";
const KICKER = "Standing in it blankly is now a feature.";
const ENTRY = `${FIX} ${KICKER}`;

function check(text: string): void {
  const chars = Array.from(text).length;
  if (chars < 1 || chars > 160) {
    throw new Error(`entry must be 1-160 characters, got ${chars}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

check(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
