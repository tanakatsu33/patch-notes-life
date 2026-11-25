import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Release version shown at the start of the patch note.
const VERSION = "v4.2.1";
// The "bug fix" being announced (the doorway effect).
const FIX_CLAUSE =
  "Fixed a bug where crossing a doorway flushed the cache and deleted the reason for entering the room.";
// Closing punchline: the leftover behaviour is rebranded as a feature.
const CLOSING_CLAUSE = "Standing in it blankly is now a feature.";
// Assembled one-line entry: "<version>: <fix> <closing>".
const ENTRY = `${VERSION}: ${FIX_CLAUSE} ${CLOSING_CLAUSE}`;

// Allowed entry length, counted in Unicode code points (not UTF-16 units).
const MIN_CHARS = 1;
const MAX_CHARS = 160;

// Throws a descriptive error if the entry breaks the submission rules.
function assertValidEntry(text: string): void {
  const chars = Array.from(text).length;
  if (chars < MIN_CHARS) {
    throw new Error(
      `entry is too short: ${chars} characters (minimum ${MIN_CHARS})`,
    );
  }
  if (chars > MAX_CHARS) {
    throw new Error(
      `entry is too long: ${chars} characters (maximum ${MAX_CHARS}, over by ${chars - MAX_CHARS})`,
    );
  }
  if (/[\r\n]/.test(text)) {
    throw new Error(
      `entry must be a single line, but contains a line break (${chars} characters)`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error(
      `entry must not be only whitespace (${chars} whitespace characters)`,
    );
  }
}

assertValidEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
