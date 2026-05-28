/**
 * Vercel build helper for TanStack Start.
 * TanStack Start does NOT generate index.html (it's SSR-first).
 * This script runs the build and creates a static index.html entry
 * so Vercel can serve the app as a SPA.
 */

import { readdir, writeFile } from "fs/promises";
import { execSync } from "child_process";

// 1. Run the normal Vite build
console.log("⚙️  Running Vite build...");
execSync("npm run build", { stdio: "inherit" });

// 2. Scan dist/client/assets for CSS and JS files
console.log("📂  Scanning dist/client/assets...");
const assets = await readdir("dist/client/assets");

const cssFiles = assets.filter((f) => f.endsWith(".css"));

// Entry JS priority:
//   1. proxy-*.js  → vinxi client-side rendering proxy
//   2. swords-*.js → sometimes the bootstrap entry
//   3. smallest .js file as fallback
const allJs = assets.filter((f) => f.endsWith(".js"));
const entryJs =
  allJs.find((f) => f.startsWith("proxy")) ||
  allJs.find((f) => f.startsWith("swords")) ||
  allJs.sort((a, b) => a.length - b.length)[0];

console.log("🎨  CSS files:", cssFiles);
console.log("🚀  Entry JS :", entryJs);

// 3. Build the HTML
const cssLinks = cssFiles
  .map((f) => `    <link rel="stylesheet" href="/assets/${f}">`)
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Game Joki Hub</title>
    <meta name="description" content="Game Joki Hub is a platform connecting gamers with skilled players for in-game assistance.">
${cssLinks}
  </head>
  <body>
    <script type="module" src="/assets/${entryJs}"></script>
  </body>
</html>`;

await writeFile("dist/client/index.html", html, "utf-8");
console.log("✅  Created dist/client/index.html");
console.log("🎉  Vercel build complete! Output: dist/client/");
