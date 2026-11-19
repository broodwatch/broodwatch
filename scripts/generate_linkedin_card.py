#!/usr/bin/env python3
"""Generate a LinkedIn-compatible JPG from the official BROODWATCH wordmark.

Uses only the established logo artwork. Do not replace it with a font
approximation or a fabricated illustration.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / "broodwatch-logo-full.webp"
output = ROOT / "broodwatch-linkedin-official.jpg"
width, height = 1200, 627

with Image.open(source) as img:
    logo = ImageOps.contain(img.convert("RGB"), (1160, 600), Image.Resampling.LANCZOS)
card = Image.new("RGB", (width, height), (2, 6, 10))
card.paste(logo, ((width - logo.width) // 2, (height - logo.height) // 2))
card.save(output, "JPEG", quality=90, subsampling=0, optimize=True)
print(f"Created {output.name}: {width}x{height}; {output.stat().st_size} bytes")
