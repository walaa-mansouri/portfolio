# Self-hosted fonts — what to download

`fonts.css` (in the project root) already references the files below by these
exact names. My sandbox can't reach fonts.gstatic.com to download them for
you, so grab them yourself (5 minutes) and just make sure the filenames match.

## Where to get them
Go to **https://gwfh.mranftl.com/fonts** (google-webfonts-helper — an
open-source tool that repackages Google Fonts for self-hosting), search each
family below, tick only the checkboxes listed, choose **"Modern Browsers"**
(woff2 only — that's all this @font-face setup needs), and download.

## What to download, and what to rename each file to

| Font family | Weight(s) to select | Rename downloaded file to |
|---|---|---|
| Figtree | 400 | `figtree-400.woff2` |
| Figtree | 500 | `figtree-500.woff2` |
| Figtree | 600 | `figtree-600.woff2` |
| Figtree | 700 | `figtree-700.woff2` |
| Bricolage Grotesque | 600 | `bricolage-grotesque-600.woff2` |
| Bricolage Grotesque | 700 | `bricolage-grotesque-700.woff2` |
| Bricolage Grotesque | 800 | `bricolage-grotesque-800.woff2` |
| JetBrains Mono | 400 | `jetbrains-mono-400.woff2` |
| JetBrains Mono | 500 | `jetbrains-mono-500.woff2` |
| JetBrains Mono | 600 | `jetbrains-mono-600.woff2` |
| Instrument Serif | 400 italic | `instrument-serif-400-italic.woff2` |

That's 11 files total. Drop all of them directly in this `/fonts` folder
(same level as this README) — don't nest them in a subfolder, since
`fonts.css` references them as `/fonts/figtree-400.woff2` etc.

## Verify it worked
1. Open your site, open DevTools → Network tab, filter by "Font".
2. You should see requests to `/fonts/figtree-400.woff2` etc. from your own
   domain — zero requests to `fonts.googleapis.com` or `fonts.gstatic.com`.
3. Re-run PageSpeed Insights. The critical request chain should now be one
   hop shorter (no more style.css → Google Fonts CSS → font file relay).

## If a weight is missing
If you ever add a new font-weight in `style.css` that isn't in the table
above, download that weight the same way, name it
`{family-slug}-{weight}.woff2` (or `-{weight}-italic.woff2` for italics), and
add a matching `@font-face` block to `fonts.css`.
