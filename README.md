# Typewriter Font Generator

A tiny, dependency-free static website that converts plain text into **Unicode monospace ("typewriter") characters** you can copy and paste anywhere — social media bios, chat apps, documents, and more.

Live at **[typewriter-font.site](https://typewriter-font.site/)**.

> convert boring text to sexy typewriter font :-)

---

## What it does

Type into the input box and the output box instantly fills with the same text rendered in Unicode's **Mathematical Monospace** alphabet. Because these are real Unicode code points (not a CSS font), the styling survives copy-and-paste into places that strip formatting.

| Input | Output |
| ----- | ------ |
| `Hello 123` | `𝙷𝚎𝚕𝚕𝚘 𝟷𝟸𝟹` |

Characters that aren't `A–Z`, `a–z`, or `0–9` (spaces, punctuation, emoji, accented letters) are passed through unchanged.

### Features

- **Live conversion** — output updates on every keystroke.
- **One-click copy** — the *Copy Output* button uses the async Clipboard API with a legacy `execCommand` fallback, and flashes "Copied!" on success.
- **Clear input** — reset the input box and refocus it with one click.
- **Responsive** — two-column layout collapses to a single column on narrow screens (≤ 700px).
- **No build step, no dependencies, no tracking** — just HTML, CSS, and vanilla JavaScript.

---

## How it works

The mapping is built once at load time in [`assets/js/script.js`](assets/js/script.js) by walking the Unicode code points for the Mathematical Monospace block:

| Range | Maps from | Starting code point |
| ----- | --------- | ------------------- |
| Uppercase | `A`–`Z` | `U+1D670` (𝙰) |
| Lowercase | `a`–`z` | `U+1D68A` (𝚊) |
| Digits | `0`–`9` | `U+1D7F6` (𝟶) |

Conversion spreads the string with `[...value]` so multi-byte characters are handled correctly, then looks up each character in the map, falling back to the original character when there's no match.

The on-screen UI also uses the **[Special Elite](https://fonts.google.com/specimen/Special+Elite)** web font (bundled locally as a `.woff2`) for a CRT-green typewriter aesthetic — but note this is purely visual. The actual converted text is plain Unicode and looks like a typewriter font *without* needing Special Elite installed wherever you paste it.

---

## Project structure

```
.
├── index.html                  # The entire page markup + meta/SEO tags
├── CNAME                        # Custom domain for GitHub Pages
├── LICENSE                      # GNU GPL v3
└── assets/
    ├── css/
    │   └── style.css            # Layout + green typewriter theme
    ├── js/
    │   └── script.js            # Text → Unicode conversion + copy/clear logic
    ├── fonts/
    │   └── special-elite-latin-400-normal.woff2   # Bundled display font
    └── style/
        └── favicon.svg
```

---

## Running locally

It's a static site, so any static file server works. From the project root:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>. You can also just open `index.html` directly in a browser — the Clipboard API works best over `http(s)`/`localhost`, but the `execCommand` fallback covers the `file://` case.

---

## Deployment

The site is served via **GitHub Pages** with a custom domain. The [`CNAME`](CNAME) file pins the domain to `typewriter-font.site`. Pushing to the `master` branch publishes the latest version.

---

## License

Licensed under the **GNU General Public License v3.0** — see [`LICENSE`](LICENSE).

The bundled *Special Elite* font is provided by Google Fonts under the **Apache License 2.0**.
