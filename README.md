# Aparna's Birthday Website 🎀

A little 3-act surprise: a cute **postbox** → tap it and the mail bursts out →
**three floating envelopes** (Rithika, Kavya, Avani) → tap one for a fancy open
animation and a scrapbook **letter** (pink card, polaroid, wax-seal envelope,
vintage stamp, B&W photo, twinkling stars). Confetti, hearts, ambient petals,
background music, and synthesized sound effects included.

Built with **Vite + React + Framer Motion + Tailwind CSS**.

---

## ✏️ How to personalise it (the only things you need to touch)

### 1. The words
Open **`src/content.js`** and edit:
- the greetings, letter `body` text, and `signature` for each of the 3 letters
- the `polaroidCaption` and `envelopeTitle`
- each sender's `handle` (the `@name` shown in the footer)
- `birthdayGirl` (used in "Dear Aparna," and the postbox sign)

Each letter also has a `theme` ( `card` = pink card colour, `ink` = handwriting
colour, `accent` = envelope/bow colour ) you can tweak.

### 2. The photos
Drop your images into **`public/photos/`** using the **same file names** already
referenced in `src/content.js`, e.g.:
- `rithika-polaroid.jpg`, `rithika-portrait.jpg`
- `kavya-polaroid.jpg`,   `kavya-portrait.jpg`
- `avani-polaroid.jpg`,   `avani-portrait.jpg`

(They currently ship as `…-polaroid.svg` / `…-portrait.svg` placeholders marked
"REPLACE ME". If your files are `.jpg`/`.png`, just update the matching path in
`src/content.js`.) The "polaroid" is the colour photo; the "portrait" is shown
in black & white.

### 3. The music (optional)
Drop an audio file named **`bg.mp3`** into **`public/music/`**. It starts on the
first tap and toggles with the ♪ button. See `public/music/README.txt`.
The cute tap/whoosh/sparkle sound effects need no files — they're generated in
the browser.

### 4. The background (optional)
The maroon woven-fabric texture is drawn in CSS. To use a real photo instead,
put it in `public/` and set `BG_IMAGE` at the top of
`src/components/FabricBackground.jsx`.

---

## 🚀 Run it locally

```bash
npm install
npm run dev      # open the printed http://localhost:5173
```

Test it the way Aparna will see it: open your browser dev-tools, switch to a
phone/portrait device, and walk through postbox → envelopes → letter.

```bash
npm run build    # production build into dist/
npm run preview  # preview the production build
```

---

## ☁️ Deploy to Vercel

This repo is already connected to a Git remote, so the easiest path is:

1. Push your changes:
   ```bash
   git add -A && git commit -m "Birthday site" && git push
   ```
2. Go to **vercel.com → New Project → Import** this repository.
3. Vercel auto-detects Vite (Build: `npm run build`, Output: `dist`). Click
   **Deploy**. Done — share the URL with Aparna. 🎉

Prefer the CLI? `npm i -g vercel` then run `vercel` in this folder.

> Note: the project lives in this `birthday/` subfolder. If you import the parent
> repo into Vercel, set the **Root Directory** to `birthday`.
