const fs = require('fs');
const path = require('path');
const root = __dirname;
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const entries = ['index.html', '404.html', 'robots.txt', 'sitemap.xml',
  'style.css', 'fonts.css', 'language-redirect.js', 'not-found.js', 'favicon.svg', 'favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'en', 'fr', 'ar', 'fonts', 'img', 'research'];
const htmlFiles = [];
for (const lang of ['fr', 'en', 'ar']) {
  const walk = dir => {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const filename = path.join(dir, item.name);
      if (item.isDirectory()) walk(filename);
      else if (item.name.endsWith('.html')) htmlFiles.push(filename);
    }
  };
  walk(path.join(root, lang));
}
const scripts = new Set(['hero-video.js']);
for (const filename of htmlFiles) {
  const html = fs.readFileSync(filename, 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*\bsrc=["']\/([\w-]+\.js)["']/g)) scripts.add(match[1]);
}
for (const name of [...entries, ...scripts]) {
  const source = path.join(root, name);
  if (!fs.existsSync(source)) throw new Error(`Missing build asset: ${name}`);
  fs.cpSync(source, path.join(out, name), { recursive: true });
}
console.log(`Built public site in dist/ with ${scripts.size} referenced JavaScript files.`);
