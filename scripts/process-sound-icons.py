"""Turn the supplied Icons8 GIF symbols into transparent animated WebP assets."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageSequence


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    source = Image.open(args.source)
    frames: list[Image.Image] = []
    durations: list[int] = []

    for frame in ImageSequence.Iterator(source):
        rgba = frame.convert("RGBA")
        pixels = []
        for red, green, blue, _ in rgba.getdata():
            luminance = (red * 299 + green * 587 + blue * 114) // 1000
            alpha = max(0, min(255, round((255 - luminance) * 1.35)))
            pixels.append((248, 251, 247, alpha))
        rgba.putdata(pixels)
        frames.append(rgba)
        durations.append(frame.info.get("duration", source.info.get("duration", 90)))

    args.destination.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        args.destination,
        format="WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        lossless=True,
        method=6,
    )
    print(f"Created {args.destination} from {len(frames)} frame(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
