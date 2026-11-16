// Prints the Portfolio snapshot served at /portfolio.json, without a build or server.
// Run with `node --experimental-strip-types` so Node can load the content modules.
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";

const root = new URL("../", import.meta.url);

// Teach Node the two resolutions the bundler does for us: the `@/` alias and
// extensionless imports of TypeScript files.
registerHooks({
  resolve(specifier, context, nextResolve) {
    const target = specifier.startsWith("@/")
      ? new URL(specifier.slice(2), root).href
      : specifier;
    if (/^(\.|file:)/.test(target) && !/\.[cm]?[jt]sx?$/.test(target)) {
      const withExtension = new URL(`${target}.ts`, context.parentURL);
      if (existsSync(withExtension)) {
        return nextResolve(withExtension.href, context);
      }
    }
    return nextResolve(target, context);
  },
});

const { buildPortfolio, serializePortfolio } = await import(
  "../content/portfolio.ts"
);

process.stdout.write(serializePortfolio(buildPortfolio()));
