"""Remove near-white / light checkerboard background from logo PNG (RGBA output)."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def should_be_transparent(r: int, g: int, b: int, a: int) -> bool:
    # Already transparent
    if a == 0:
        return True
    # Strong white / off-white background
    if r >= 238 and g >= 238 and b >= 238:
        return True
    # Checkerboard-style light gray (typical ~204/255 or similar)
    mx, mn = max(r, g, b), min(r, g, b)
    if mx - mn < 18 and mn > 175 and (r + g + b) / 3 > 185:
        return True
    return False


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else None
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else None
    if not src or not dst:
        print("usage: logo-remove-bg.py <input.png> <output.png>", file=sys.stderr)
        sys.exit(1)

    img = Image.open(src).convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if should_be_transparent(r, g, b, a):
                px[x, y] = (r, g, b, 0)

    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "PNG", optimize=True)
    print(f"Wrote {dst}")


if __name__ == "__main__":
    main()
