import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const root = process.cwd();
const output = join(root, "out");
const publicDir = join(root, "public");

writeFileSync(join(output, ".nojekyll"), "", "utf8");

const customDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN?.trim();
if (customDomain) writeFileSync(join(output, "CNAME"), `${customDomain}\n`, "utf8");

/** Resolve the GA measurement ID the same way config/integrations.ts does (env first, then integrations.json). */
function resolveGaMeasurementId() {
  const fromEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
  if (/^G-[A-Z0-9]+$/i.test(fromEnv)) return fromEnv.toUpperCase();
  try {
    const json = JSON.parse(readFileSync(join(root, "content/data/integrations.json"), "utf8"));
    const fromJson = typeof json.gaMeasurementId === "string" ? json.gaMeasurementId.trim() : "";
    if (/^G-[A-Z0-9]+$/i.test(fromJson)) return fromJson.toUpperCase();
  } catch {}
  return null;
}

/** Inject the official gtag.js snippet right after <head> in every exported HTML page. */
function injectGoogleTag() {
  const measurementId = resolveGaMeasurementId();
  if (!measurementId) {
    console.log("No GA measurement ID configured; skipping gtag.js injection.");
    return 0;
  }
  const snippet = `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${measurementId}');\n</script>`;
  let injected = 0;
  for (const file of walk(output)) {
    if (!file.endsWith(".html")) continue;
    let html = readFileSync(file, "utf8");
    if (html.includes("googletagmanager.com/gtag/js")) continue;
    if (!html.includes("<head>")) continue;
    html = html.replace("<head>", `<head>\n${snippet}`);
    writeFileSync(file, html, "utf8");
    injected += 1;
  }
  return injected;
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const absolute = join(directory, name);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

/** Ensure technical verification files from public/ are present at the build output root. */
function ensureTechnicalPublicFiles() {
  if (!existsSync(publicDir) || !existsSync(output)) return [];
  const copied = [];
  for (const absolute of walk(publicDir)) {
    const local = relative(publicDir, absolute).split(sep).join("/");
    const base = local.split("/").pop() || "";
    const technical = /^google[a-z0-9_-]*\.html$/i.test(base)
      || /^(robots\.txt|ads\.txt)$/i.test(base)
      || local.startsWith(".well-known/");
    if (!technical) continue;
    const target = join(output, local);
    mkdirSync(dirname(target), { recursive: true });
    if (!existsSync(target)) {
      copyFileSync(absolute, target);
      copied.push(local);
    }
  }
  return copied;
}

const ensured = ensureTechnicalPublicFiles();
const gtagPages = injectGoogleTag();
console.log(
  customDomain
    ? `Static output prepared with CNAME ${customDomain}.`
    : "Static output prepared for GitHub Pages.",
);
if (ensured.length) {
  console.log(`Ensured technical public files in out/: ${ensured.join(", ")}`);
}
if (gtagPages) {
  console.log(`Injected Google tag (gtag.js) into ${gtagPages} HTML pages.`);
}
