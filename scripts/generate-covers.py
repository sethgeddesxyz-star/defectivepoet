"""
Generate high-quality cover thumbnails for poem collections.

Takes each collection's page-1 large image and resizes it to 552x610
(2x the display size of 276x305) using Lanczos resampling for maximum
sharpness. Outputs optimized JPEG files.

Usage:
    python scripts/generate-covers.py
"""

import os
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
POEMS_DIR = ROOT / "public" / "gallery" / "poems"
OUTPUT_DIR = ROOT / "public" / "images"

TARGET_WIDTH = 552
TARGET_HEIGHT = 610

COLLECTIONS = [
    {"id": "little_green", "folder": "little_green"},
    {"id": "riteaid", "folder": "riteaid"},
    {"id": "black_book", "folder": "black_book"},
    {"id": "medicinal", "folder": "medicinal"},
    {"id": "rehab_binder", "folder": "rehab_binder"},
    {"id": "napkins", "folder": "napkins"},
]


def generate_cover(collection: dict) -> None:
    folder = POEMS_DIR / collection["folder"]
    out_path = OUTPUT_DIR / f"cover-{collection['id']}.jpg"

    # Prefer the large variant, fall back to standard
    large = folder / "1-large.jpg"
    standard = folder / "1.jpg"
    source = large if large.exists() else standard

    if not source.exists():
        print(f"  SKIP {collection['id']} — no source image found")
        return

    img = Image.open(source)
    orig_w, orig_h = img.size

    # Resize to fit within TARGET dimensions, preserving aspect ratio
    scale = min(TARGET_WIDTH / orig_w, TARGET_HEIGHT / orig_h)

    if scale < 1:
        # Downscale from high-res source — this is the quality win
        new_w = round(orig_w * scale)
        new_h = round(orig_h * scale)
        img = img.resize((new_w, new_h), Image.LANCZOS)
        label = "downscaled"
    else:
        # Source is already smaller than target; keep original dimensions
        new_w, new_h = orig_w, orig_h
        label = "kept original size"

    # Convert to RGB if necessary (handles RGBA PNGs, etc.)
    if img.mode != "RGB":
        img = img.convert("RGB")

    img.save(out_path, "JPEG", quality=85, optimize=True)

    file_kb = out_path.stat().st_size / 1024
    print(
        f"  {collection['id']:16s}  {orig_w}x{orig_h} -> {new_w}x{new_h}  "
        f"({label})  {file_kb:.0f} KB"
    )


def main() -> None:
    print("Generating cover thumbnails...\n")
    for col in COLLECTIONS:
        generate_cover(col)
    print("\nDone.")


if __name__ == "__main__":
    main()
