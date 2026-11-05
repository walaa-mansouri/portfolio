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
console.log('Built public site in dist/');
