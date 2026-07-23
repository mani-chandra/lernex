import { randomBytes } from "crypto";

export function generateReferenceId(prefix: "BT" | "MED"): string {
  const suffix = randomBytes(4).toString("hex").toUpperCase();
  return `${prefix}-${suffix}`;
}
