# Assets

## portrait.png  ← you need to add this

The hero and contact sections expect a **background-removed PNG** here:

    public/assets/portrait.png

- Roughly 1200×1600, transparent background
- Framed head-and-shoulders, subject centred, cropped at the chest
- A darker top/shirt reads best — the headline sits over it in cream

Until it exists, a silhouette placeholder renders instead. Nothing breaks.

### Generating it from a normal headshot

Don't hand-cut it. Run:

    ./scripts/make-portrait.sh ~/path/to/headshot.jpg

That removes the background with the macOS Vision framework (falling back to a
flat-background key), trims to the subject, and writes a transparent
1200x1600 PNG bottom-anchored the way the hero renders it.

## atelier/

Atelier AI icon and screenshots, pulled from the public App Store listing
for id 6761736308.

## botu/ and santosh/

Screenshots captured from the live sites (usebotu.com, santoshvemula.com),
resized to 1400px wide. Re-capture any time with the script in the QA notes,
or drop in your own.

## Syllabee

No screenshots: the live URL is a sign-in wall, so there are no public screens.
The card renders a branded "In development" panel instead. Drop images into
`public/assets/syllabee/` and add them to `projects.items[].shots` to switch it
over to a screenshot rail.
