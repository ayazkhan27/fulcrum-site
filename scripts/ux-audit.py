#!/usr/bin/env python3
"""
Deterministic UI/UX standards audit for the Fulcrum site.

Every check here is pass/fail against a published standard, computed rather
than judged, so the result is the same on every run. Opinions about taste do
not belong in this file.

Usage:  python3 scripts/ux-audit.py [base-url]
        (defaults to http://localhost:3000; the dev or prod server must be up)
"""

from __future__ import annotations

import re
import sys
import urllib.request

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
PAGES = ["/", "/services", "/method", "/people"]

# --- token pairs actually used for text, per theme -------------------------
# Kept in step with app/globals.css by hand; a mismatch here is a bug.
THEMES = {
    "dark": {
        "ground": "#15181b",
        "ink": "#f0f2f1",
        "panel": "#f0f2f1",
        "panel-ink": "#101314",
        "advisory": "#7fb2c4",
        "caution": "#d9971f",
        "advisory-panel": "#2f6c82",
        "caution-panel": "#8a5c05",
    },
    "light": {
        "ground": "#f4f6f5",
        "ink": "#101314",
        "panel": "#15181b",
        "panel-ink": "#f0f2f1",
        "advisory": "#2f6c82",
        "caution": "#8a5c05",
        "advisory-panel": "#7fb2c4",
        "caution-panel": "#d9971f",
    },
}

# (label, foreground token, background token, alpha applied to foreground)
TEXT_PAIRS = [
    ("body text", "ink", "ground", 0.70),
    ("muted text", "ink", "ground", 0.60),
    ("faint text", "ink", "ground", 0.65),
    ("lede", "ink", "ground", 0.65),
    ("advisory on ground", "advisory", "ground", 1.0),
    ("caution on ground", "caution", "ground", 1.0),
    ("panel body", "panel-ink", "panel", 0.80),
    ("panel muted", "panel-ink", "panel", 0.70),
    ("panel faint", "panel-ink", "panel", 0.65),
    ("advisory on panel", "advisory-panel", "panel", 1.0),
    ("caution on panel", "caution-panel", "panel", 1.0),
]

AA_NORMAL = 4.5
AA_LARGE = 3.0


def hex_rgb(h: str) -> tuple[float, float, float]:
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))  # type: ignore


def composite(fg: str, bg: str, alpha: float) -> tuple[float, float, float]:
    f, b = hex_rgb(fg), hex_rgb(bg)
    return tuple(alpha * f[i] + (1 - alpha) * b[i] for i in range(3))  # type: ignore


def luminance(rgb: tuple[float, float, float]) -> float:
    def chan(c: float) -> float:
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (chan(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(fg_rgb, bg_hex: str) -> float:
    l1, l2 = luminance(fg_rgb), luminance(hex_rgb(bg_hex))
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def fetch(path: str) -> str:
    with urllib.request.urlopen(BASE + path, timeout=20) as r:
        return r.read().decode("utf-8", "replace")


def main() -> int:
    failures: list[str] = []
    warnings: list[str] = []

    # ---------- 1. contrast, computed for both themes ----------
    print("CONTRAST  (WCAG 2.1 AA: 4.5:1 normal, 3:1 large)")
    for theme, tokens in THEMES.items():
        print(f"  {theme}")
        for label, fg, bg, alpha in TEXT_PAIRS:
            ratio = contrast(composite(tokens[fg], tokens[bg], alpha), tokens[bg])
            ok = ratio >= AA_NORMAL
            large_only = (not ok) and ratio >= AA_LARGE
            mark = "PASS" if ok else ("LARGE-ONLY" if large_only else "FAIL")
            print(f"    {label:22} {ratio:5.2f}:1  {mark}")
            if not ok and not large_only:
                failures.append(f"contrast/{theme}/{label} = {ratio:.2f}:1")
            elif large_only:
                warnings.append(f"contrast/{theme}/{label} = {ratio:.2f}:1 (large text only)")

    # ---------- 2. per-page structural checks ----------
    print("\nSTRUCTURE")
    for path in PAGES:
        html = fetch(path)
        print(f"  {path}")

        h1s = re.findall(r"<h1\b", html)
        if len(h1s) != 1:
            failures.append(f"{path}: {len(h1s)} h1 elements (want exactly 1)")
        print(f"    h1 count                {len(h1s)}")

        levels = [int(m) for m in re.findall(r"<h([1-6])\b", html)]
        skips = [
            (a, b) for a, b in zip(levels, levels[1:]) if b > a + 1
        ]
        if skips:
            failures.append(f"{path}: heading level skips {skips}")
        print(f"    heading skips           {len(skips)}")

        for landmark in ("<header", "<main", "<footer", "<nav"):
            if landmark not in html:
                failures.append(f"{path}: missing {landmark}> landmark")
        print("    landmarks               header/main/footer/nav")

        imgs = re.findall(r"<img\b[^>]*>", html)
        no_alt = [i for i in imgs if not re.search(r'\balt="[^"]+"', i)]
        no_dims = [
            i
            for i in imgs
            if not (re.search(r'\bwidth="\d+"', i) and re.search(r'\bheight="\d+"', i))
        ]
        if no_alt:
            failures.append(f"{path}: {len(no_alt)} img without alt text")
        if no_dims:
            failures.append(f"{path}: {len(no_dims)} img without width+height (CLS risk)")
        print(f"    images                  {len(imgs)} total, {len(no_alt)} missing alt, {len(no_dims)} missing dims")

        if not re.search(r'<html[^>]*\blang="[a-z]{2}', html):
            failures.append(f"{path}: missing lang attribute")
        if not re.search(r'<meta[^>]*name="description"[^>]*content="[^"]{40,}"', html):
            failures.append(f"{path}: missing or short meta description")
        title = re.search(r"<title>([^<]*)</title>", html)
        if not title or len(title.group(1)) < 10:
            failures.append(f"{path}: missing or short <title>")
        print(f"    title                   {title.group(1) if title else 'MISSING'}")

        # viewport meta is what makes the responsive rules apply at all
        if 'name="viewport"' not in html:
            failures.append(f"{path}: missing viewport meta")
        if "user-scalable=no" in html or "maximum-scale=1" in html:
            failures.append(f"{path}: viewport disables zoom")

        # motion + focus are defined once in globals.css; confirm they shipped
    # ---------- 3. stylesheet source checks ----------
    # Read the source rather than the served bundle: in dev, Turbopack injects
    # CSS through JS, so scraping <link> tags reports a false negative.
    print("\nSTYLESHEET  (app/globals.css)")
    css_src = open("app/globals.css", encoding="utf-8").read()
    for needle, label in [
        ("prefers-reduced-motion", "reduced-motion block"),
        ("focus-visible", "focus-visible styling"),
        ("line-height: 1.5", "body line-height floor"),
    ]:
        ok = needle in css_src
        print(f"  {label:26} {'PASS' if ok else 'FAIL'}")
        if not ok:
            failures.append(f"css: missing {label}")

    # ---------- 4. type scale floor ----------
    # Industry practice: 16px body, 14px secondary, 12px absolute caption floor.
    print("\nTYPE SCALE  (floor 0.75rem / 12px)")
    import glob as _glob
    smallest = []
    for src in ["app/page.tsx", "app/services/page.tsx", "app/method/page.tsx", "app/people/page.tsx"] + _glob.glob("components/site/*.tsx"):
        body = open(src, encoding="utf-8").read()
        for m2 in re.findall(r"text-\[(\d*\.?\d+)rem\]", body):
            if float(m2) < 0.75:
                smallest.append(f"{src}: {m2}rem")
    for tok in re.findall(r"--text-\w+: (\d*\.?\d+)rem", css_src):
        if float(tok) < 0.75:
            smallest.append(f"globals.css: {tok}rem token")
    print(f"  sizes below floor          {len(smallest)}")
    for s2 in smallest:
        failures.append(f"type: {s2} below 12px floor")

    # ---------- report ----------
    print("\n" + "=" * 60)
    if warnings:
        print(f"{len(warnings)} WARNING(S)")
        for w in warnings:
            print("  ! " + w)
    if failures:
        print(f"{len(failures)} FAILURE(S)")
        for f in failures:
            print("  x " + f)
        return 1
    print("All checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
