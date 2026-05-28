/**
 * Vercel SSG Helper for TanStack Start
 * 
 * Runs the Vite build, then boots the compiled SSR server locally
 * to generate a perfect static index.html. This prevents hydration
 * mismatch (black screen) when Vercel serves it as a SPA.
 */

import { writeFile } from "fs/promises";
import { execSync } from "child_process";
import { pathToFileURL } from "url";
import path from "path";

async function generateStaticHtml() {
  console.log("⚙️  Running normal build...");
  execSync("npm run build:vite", { stdio: "inherit" });

  console.log("🚀  Booting SSR server to generate static HTML...");
  
  // Import the compiled server
  const serverPath = path.resolve("dist/server/server.js");
  const serverModule = await import(pathToFileURL(serverPath).href);
  const server = serverModule.default;
  
  // Create a mock Request
  const req = new Request("http://localhost/");
  
  // Call the Cloudflare Worker fetch handler
  const res = await server.fetch(req, {}, {});
  
  if (res.status !== 200) {
    throw new Error(`Failed to render index: ${res.status}`);
  }
  
  const html = await res.text();
  
  await writeFile("dist/client/index.html", html, "utf-8");
  console.log("✅  Generated dist/client/index.html successfully!");
  console.log("🎉  Ready for Vercel static deployment.");
}

generateStaticHtml().catch((err) => {
  console.error("❌ Build failed:");
  console.error(err);
  process.exit(1);
});
