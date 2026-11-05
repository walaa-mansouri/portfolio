const fs = require('fs');
const path = require('path');
const root = __dirname;
const out = path.join(root, 'dist');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const name of ['index.html','404.html','robots.txt','sitemap.xml','script.js','style.css','fonts.css','en','fr','ar','fonts','img','research']) {
  const source = path.join(root, name);
  if (fs.existsSync(source)) fs.cpSync(source, path.join(out, name), { recursive: true });
}
const siteKey = process.env.TURNSTILE_SITE_KEY;
if (!siteKey || !/^[a-zA-Z0-9_-]{8,100}$/.test(siteKey)) {
  throw new Error('Set TURNSTILE_SITE_KEY in Netlify build environment');
}
for (const lang of ['en','fr','ar']) {
  const page = path.join(out, lang, 'index.html');
  const html = fs.readFileSync(page, 'utf8');
  fs.writeFileSync(page, html.replaceAll('__TURNSTILE_SITE_KEY__', siteKey));
}
console.log('Built public site in dist/');
