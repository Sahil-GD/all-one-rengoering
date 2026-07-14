# Imagery — production contract

Consistent AI-generated imagery, Scandinavian premium direction.
Drop files into `/public/images/` with these exact names, then fill the
matching `image:` fields in `src/content/home.ts`.

Note: the hero is typographic (the "wipe" slogan) and uses no image;
imagery currently applies to the audience cards below it.

## Art direction (apply to every image)

Bright natural daylight, warm-neutral grade, soft shadows, negative
space, matte surfaces. Modern Scandinavian interiors: light wood, white
walls, muted textiles, subtle navy/green accents welcome. No text in
images, no logos, no clutter. Photorealistic, shallow-to-medium depth
of field, eye-level or slightly low angle.

**Recommendation (trust):** prefer spaces over people. If people are
required, hands-at-work close-ups (wiping a counter, folding a cloth)
read authentic; AI-generated recognizable faces on a local trust
business risk the uncanny and are better replaced with a real team
photo later.

## Shot list

| File | Size (min) | Ratio | Prompt sketch |
|---|---|---|---|
| `privat.jpg` | 1200×800 | 3:2 | Bright Scandinavian home kitchen, gleaming clean counters, light wood, morning light |
| `erhverv.jpg` | 1200×800 | 3:2 | Modern Copenhagen-style office interior, clean desks, glass and light wood, calm daylight, no people or unrecognizable people at distance |

Format: export as high-quality JPEG (or AVIF/WebP source; next/image
transcodes either way). Keep files under ~500 KB before optimization.

## Wiring example

```ts
// src/content/home.ts
image: { src: '/images/hero.jpg', alt: 'Lyst, nyrengjort skandinavisk hjem' },
```

Alt text: describe the scene in Danish, one line, no keyword stuffing.


## Interim stock imagery (in use now)

Free-license photos from Pexels (no attribution required — credited as
courtesy). Swap for brand/AI imagery by replacing URLs in
`src/content/home.ts` (`img` map):

| Slot | Pexels ID | Photographer |
|---|---|---|
| Privat card / strip | 9565782 | Taryn Elliott |
| Strip 1 | 20390760 | Paul Seling |
| Strip 2 | 4857757 | Rachel Claire |
| Strip 3 | 28461040 | Alpha En |
| Strip 4 | 8251914 | PNW Production |
| Erhverv card | 7534216 | Max Vakhtbovycn |

## Before/after slider — how to drop in real photos (2 minutes)

The signature homepage slider currently runs in `simulated: true` mode: one
photo, with the "before" half treated by CSS (`.grime`) and labelled
"Illustration". This is deliberate — pairing two *different* stock rooms as
a before/after would misrepresent work that was never done.

To use real photos:

1. On any hovedrengøring or flytterengøring, take **one photo before you
   start** and **one after**, from the *same spot*, same framing, same light.
   Kitchens and bathrooms show the biggest, most legible difference.
2. Put both files in `public/` (e.g. `public/before-koekken.jpg`,
   `public/after-koekken.jpg`).
3. In `src/content/home.ts`, in BOTH the `da` and `en` `transformation`
   blocks:
   - `before: { src: '/before-koekken.jpg', alt: '…' }`
   - `after: { src: '/after-koekken.jpg', alt: '…' }`
   - `simulated: false`

The grime treatment and the "Illustration" chip disappear automatically.
Nothing else needs to change.