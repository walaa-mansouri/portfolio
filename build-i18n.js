/**
 * build-i18n.js
 *
 * Generates real, crawlable per-language pages:
 *   /en/index.html
 *   /fr/index.html
 *   /ar/index.html
 * plus a root /index.html that redirects to /en/ (or swap for a language-
 * detect redirect if you prefer).
 *
 * Why this approach: script.js already builds every section (experience,
 * packages, FAQ, etc.) from the `translations` object at runtime via
 * setLang(). Rather than duplicating that logic in Node, this script loads
 * index.html + script.js into a real DOM (jsdom), lets the existing code
 * run and finish rendering, then serializes the resulting HTML to disk.
 * That means script.js stays the single source of truth for content.
 *
 * Usage:
 *   npm install --save-dev jsdom
 *   node build-i18n.js
 *
 * Wire this into your Netlify/Vercel build command, e.g.:
 *   "build": "node build-i18n.js"
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = __dirname;
const SITE_URL = 'https://walaamansouri.com';
const LANGS = ['en', 'fr', 'ar'];

const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scriptJs = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');

async function renderLang(lang) {
  const dom = new JSDOM(indexHtml, {
    url: `${SITE_URL}/${lang}/`,
    runScripts: 'outside-only',
    resources: 'usable',
    pretendToBeVisual: true
  });

  const { window } = dom;

  // lucide.js is loaded from a CDN in the real page; stub it out here so
  // script.js's calls to lucide.createIcons() don't throw during the build.
  window.lucide = { createIcons: () => {} };
  window.requestIdleCallback = undefined; // force the setTimeout fallback path

  dom.window.eval(scriptJs);

  // renderBelowFold() runs via the requestIdleCallback fallback (setTimeout),
  // so give the event loop a tick to flush it before we serialize.
  await new Promise((resolve) => setTimeout(resolve, 50));

  // --- SEO tags that need to differ per language, set here rather than in
  // the client script since they're crawl-time concerns, not UI concerns ---
  const doc = window.document;
  const url = `${SITE_URL}/${lang}/`;

  const canonical = doc.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', url);

  const ogUrl = doc.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', url);

  return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
}

async function build() {
  for (const lang of LANGS) {
    const html = await renderLang(lang);
    const outDir = path.join(ROOT, lang);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    console.log(`Wrote ${lang}/index.html`);
  }

  // Root "/" just redirects to the default language. Swap this for a
  // meta-refresh + JS geo/browser-language redirect if you'd rather not
  // hardcode English as the default entry point.
  const rootRedirect = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/en/">
  <link rel="canonical" href="${SITE_URL}/en/">
  <title>Walaa Mansouri</title>
</head>
<body>
  <p>Redirecting to <a href="/en/">${SITE_URL}/en/</a>...</p>
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT, 'index.html.built'), rootRedirect, 'utf8');
  console.log('Wrote index.html.built (root redirect - review before overwriting index.html)');

  // sitemap.xml with the three real URLs
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((lang) => `  <url>
    <loc>${SITE_URL}/${lang}/</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/" />
  </url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
  console.log('Wrote sitemap.xml');
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
