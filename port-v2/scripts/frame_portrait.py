#!/usr/bin/env python3
"""
Frame a cut-out portrait for the hero section.

Takes an image (ideally already background-removed with an alpha channel) and
trims it tight to the subject, so the hero's CSS box height maps directly onto
the subject rather than onto transparent padding.

If the input has no usable alpha, falls back to keying out a flat studio
background sampled from the image corners.

Usage: frame_portrait.py <input> <output.png> [--target MAXWxMAXH]
"""
import sys
from PIL import Image, ImageFilter

MAX_W, MAX_H = 1200, 1600   # upper bounds; output hugs the subject


def key_flat_background(im: Image.Image, tol: int = 34) -> Image.Image:
    """Remove a flat, even background sampled from the four corners."""
    im = im.convert("RGB")
    w, h = im.size
    px = im.load()
    corners = [px[1, 1], px[w - 2, 1], px[1, h - 2], px[w - 2, h - 2]]
    bg = tuple(sum(c[i] for c in corners) // len(corners) for i in range(3))

    # Build an alpha mask: transparent where the pixel is near the bg colour.
    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            dist = abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2])
            if dist < tol:
                ap[x, y] = 0
            elif dist < tol * 2:
                # soft transition band so edges don't stair-step
                ap[x, y] = int(255 * (dist - tol) / tol)

    alpha = alpha.filter(ImageFilter.MedianFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    out = im.convert("RGBA")
    out.putalpha(alpha)
    return out


def main() -> int:
    if len(sys.argv) < 3:
        print(__doc__)
        return 1
    src, dst = sys.argv[1], sys.argv[2]

    target = (MAX_W, MAX_H)
    if "--target" in sys.argv:
        spec = sys.argv[sys.argv.index("--target") + 1]
        target = tuple(int(v) for v in spec.lower().split("x"))

    im = Image.open(src)
    im = im.convert("RGBA") if im.mode != "RGBA" else im

    # Does it already carry a real cutout?
    alpha_extrema = im.getchannel("A").getextrema()
    if alpha_extrema[0] == 255:
        print("no alpha channel found -> keying flat background")
        im = key_flat_background(im)

    bbox = im.getchannel("A").getbbox()
    if not bbox:
        print("error: image is fully transparent", file=sys.stderr)
        return 1
    im = im.crop(bbox)

    # Output hugs the subject. Padding the subject onto a fixed 3:4 canvas
    # leaves dead space above the head, which pushes the portrait down in the
    # hero until the headline overlaps the face. Cropping tight means the CSS
    # box height maps directly to subject height.
    mw, mh = target
    scale = min(mw / im.width, mh / im.height, 1.0)
    if scale < 1.0:
        im = im.resize(
            (max(1, round(im.width * scale)), max(1, round(im.height * scale))),
            Image.LANCZOS,
        )

    im.save(dst, "PNG", optimize=True)
    print(f"wrote {dst} ({im.width}x{im.height}, cropped to subject)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
