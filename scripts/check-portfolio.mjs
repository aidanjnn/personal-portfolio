// Validates a Portfolio snapshot against public/portfolio.schema.json, plus the
// limits the terminal portfolio's loader enforces beyond the schema.
// Usage: node scripts/check-portfolio.mjs [file]   (reads stdin without a file)
import { readFileSync } from "node:fs";

const MAX_BYTES = 1024 * 1024;
// Terminal control (Unicode Cc) and invisible formatting characters, as code points.
const UNSAFE_RANGES = [
  [0x0000, 0x001f],
  [0x007f, 0x009f],
  [0x200b, 0x200f],
  [0x2028, 0x202e],
  [0x2060, 0x206f],
  [0xfeff, 0xfeff],
];

function isUnsafe(text) {
  for (const char of text) {
    const code = char.codePointAt(0);
    if (UNSAFE_RANGES.some(([low, high]) => code >= low && code <= high)) return true;
  }
  return false;
}

const schema = JSON.parse(
  readFileSync(new URL("../public/portfolio.schema.json", import.meta.url), "utf8"),
);
const raw = readFileSync(process.argv[2] ?? 0, "utf8");
const errors = [];

function typeOf(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (Number.isInteger(value)) return "integer";
  return typeof value;
}

function resolve(node) {
  if (!node.$ref) return node;
  const path = node.$ref.replace(/^#\//, "").split("/");
  return resolve(path.reduce((target, key) => target[key], schema));
}

// The subset of JSON Schema 2020-12 that portfolio.schema.json uses. Unknown
// keywords fail loudly so a schema change cannot silently skip a check.
const KNOWN = new Set([
  "$schema", "$id", "$comment", "$defs", "$ref", "title", "type", "const", "enum",
  "required", "properties", "additionalProperties", "items", "minItems",
  "maxItems", "minLength", "maxLength", "pattern", "minimum", "maximum", "oneOf",
]);

function validate(value, node, path, out) {
  const rule = resolve(node);
  for (const key of Object.keys(rule)) {
    if (!KNOWN.has(key)) throw new Error(`unsupported schema keyword "${key}" at ${path}`);
  }
  const fail = (message) => out.push(`${path}: ${message}`);
  const type = typeOf(value);

  if (rule.oneOf) {
    const passing = rule.oneOf.filter((option) => {
      const sub = [];
      validate(value, option, path, sub);
      return sub.length === 0;
    });
    if (passing.length !== 1) fail(`must match exactly one of ${rule.oneOf.length} options`);
  }
  if ("const" in rule && value !== rule.const) fail(`must be ${JSON.stringify(rule.const)}`);
  if (rule.enum && !rule.enum.includes(value)) fail(`must be one of ${rule.enum.join(", ")}`);
  if (rule.type && !(type === rule.type || (rule.type === "number" && type === "integer"))) {
    return fail(`must be ${rule.type}, got ${type}`);
  }

  if (type === "string") {
    const length = [...value].length;
    if (rule.minLength !== undefined && length < rule.minLength) fail(`shorter than ${rule.minLength}`);
    if (rule.maxLength !== undefined && length > rule.maxLength) fail(`longer than ${rule.maxLength}`);
    if (rule.pattern && !new RegExp(rule.pattern, "u").test(value)) fail(`does not match ${rule.pattern}`);
  }
  if (type === "integer" || type === "number") {
    if (rule.minimum !== undefined && value < rule.minimum) fail(`below ${rule.minimum}`);
    if (rule.maximum !== undefined && value > rule.maximum) fail(`above ${rule.maximum}`);
  }
  if (type === "array") {
    if (rule.minItems !== undefined && value.length < rule.minItems) fail(`fewer than ${rule.minItems} items`);
    if (rule.maxItems !== undefined && value.length > rule.maxItems) fail(`more than ${rule.maxItems} items`);
    if (rule.items) value.forEach((item, i) => validate(item, rule.items, `${path}[${i}]`, out));
  }
  if (type === "object") {
    for (const key of rule.required ?? []) {
      if (!(key in value)) fail(`missing "${key}"`);
    }
    for (const [key, child] of Object.entries(value)) {
      const property = rule.properties?.[key];
      if (property) validate(child, property, `${path}.${key}`, out);
      else if (rule.additionalProperties === false) fail(`unexpected "${key}"`);
    }
  }
}

function checkCharacters(value, path) {
  if (typeof value === "string") {
    if (isUnsafe(value)) errors.push(`${path}: contains control or invisible formatting characters`);
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (isUnsafe(key)) errors.push(`${path}: key contains control or invisible formatting characters`);
      checkCharacters(child, Array.isArray(value) ? `${path}[${key}]` : `${path}.${key}`);
    }
  }
}

const bytes = Buffer.byteLength(raw, "utf8");
if (bytes > MAX_BYTES) errors.push(`snapshot is ${bytes} bytes; the limit is ${MAX_BYTES}`);

let portfolio;
try {
  portfolio = JSON.parse(raw);
} catch (error) {
  errors.push(`not valid JSON: ${error.message}`);
}

if (portfolio !== undefined) {
  validate(portfolio, schema, "$", errors);
  checkCharacters(portfolio, "$");
}

if (errors.length > 0) {
  console.error(`portfolio.json FAILED (${errors.length} problem${errors.length === 1 ? "" : "s"}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`portfolio.json OK: v${portfolio.version}, ${bytes} bytes, matches portfolio.schema.json`);
