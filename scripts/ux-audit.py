#!/usr/bin/env python3
"""Deterministic route/source checks, not a complete accessibility certification.
Run from any directory: python3 scripts/ux-audit.py [base-url].
Manual browser checks must cover image-backed contrast, focus, responsive layout
and motion. Next Image fill layouts require a positioned, sized parent.
"""
from __future__ import annotations
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000").rstrip("/")
PAGES = ["/", "/aviation", "/energy", "/consulting", "/brokerage",
         "/services", "/people", "/contact", "/aviation/aircraft-engine-transactions"]
# Explicitly sampled solid-surface pairs from the shipped editorial system.
# Not a claim about every style or text over images.
PAIRS = [
    ("body on paper", "#122b43", "#fafbfc"),
    ("navy on silver", "#102f4c", "#eaf0f5"),
    ("secondary on paper", "#52677c", "#fafbfc"),
    ("cobalt links on paper", "#0047ab", "#fafbfc"),
    ("white on navy", "#ffffff", "#05254a"),
]

def luminance(color):
    values = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    values = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in values]
    return sum(v * w for v, w in zip(values, (.2126, .7152, .0722)))

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings, self.images, self.links, self.ids = [], [], [], set()
        self.tags, self.meta, self.lang, self.title = set(), {}, "", ""
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.add(tag)
        if a.get("id"):
            self.ids.add(a["id"])
        if re.fullmatch(r"h[1-6]", tag):
            self.headings.append(int(tag[1]))
        if tag == "img":
            self.images.append(a)
        if tag == "a":
            self.links.append(a.get("href", ""))
        if tag == "meta":
            self.meta[a.get("name", "")] = a.get("content", "")
        if tag == "html":
            self.lang = a.get("lang", "")
        if tag == "title":
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

def main():
    failures = []
    def check(condition, label):
        print(("PASS  " if condition else "FAIL  ") + label)
        if not condition:
            failures.append(label)

    css = "\n".join(p.read_text() for p in (ROOT / "app").rglob("*.css"))
    print("SAMPLED SOLID-SURFACE CONTRAST (4.5:1 normal text)")
    for label, fg, bg in PAIRS:
        l1, l2 = sorted((luminance(fg), luminance(bg)))
        ratio = (l2 + .05) / (l1 + .05)
        check(fg in css and bg in css and ratio >= 4.5, f"{label}: {ratio:.2f}:1")

    print("\nROUTES AND SERVER-RENDERED STRUCTURE")
    for path in PAGES:
        try:
            with urllib.request.urlopen(BASE + path, timeout=30) as response:
                html = response.read().decode("utf-8", "replace")
                check(response.status == 200, path + " responds 200")
        except (urllib.error.URLError, TimeoutError) as error:
            check(False, path + ": " + str(error))
            continue
        page = Page()
        page.feed(html)
        check(page.headings.count(1) == 1, path + " has one H1")
        check(not any(b > a + 1 for a, b in zip(page.headings, page.headings[1:])),
              path + " has ordered headings")
        check({"header", "main", "footer", "nav"} <= page.tags, path + " has landmarks")
        check("main" in page.ids and "#main" in page.links, path + " has a skip target")
        check(all("alt" in image for image in page.images), path + " images have alt attributes")
        # Empty alt is valid for decorative images. Next fill intentionally omits dimensions.
        check(all((image.get("width") and image.get("height")) or
                  image.get("data-nimg") == "fill" for image in page.images),
              path + " images have dimensions or Next fill")
        check(bool(page.lang) and len(page.title) >= 10 and
              len(page.meta.get("description", "")) >= 40, path + " has metadata and language")
        check("viewport" in page.meta and "user-scalable=no" not in page.meta["viewport"] and
              "maximum-scale=1" not in page.meta["viewport"], path + " permits responsive zoom")
        check(all(not href.startswith("#") or href[1:] in page.ids for href in page.links),
              path + " fragment links resolve")
        check("\u2014" not in re.sub(r"<script\b.*?</script>", "", html, flags=re.S),
              path + " has no em dashes")

    try:
        with urllib.request.urlopen(BASE + "/method", timeout=30) as response:
            check(response.url.endswith("/aviation/aircraft-engine-transactions"),
                  "legacy method URL redirects to transactions")
    except urllib.error.HTTPError as error:
        check(error.code == 308 and error.headers.get("Location", "").endswith(
              "/aviation/aircraft-engine-transactions"), "legacy method URL has a permanent redirect")
    except (urllib.error.URLError, TimeoutError) as error:
        check(False, "legacy method redirect: " + str(error))

    print("\nSOURCE SAFEGUARDS")
    check("prefers-reduced-motion" in css, "reduced-motion CSS exists")
    check("focus-visible" in css, "visible keyboard focus CSS exists")
    for source in (ROOT / "app").rglob("*.css"):
        small = [m.group(1) for m in re.finditer(r"font-size:\s*(0\.\d+)rem", source.read_text())
                 if float(m.group(1)) < .75]
        check(not small, str(source.relative_to(ROOT)) + " explicit text sizes at least 12px")
    check((ROOT / "app/aviation/aircraft-engine-transactions/page.tsx").is_file(),
          "transaction source exists")
    print("\n" + (str(len(failures)) + " failure(s)." if failures else "All scoped checks passed."))
    print("Still requires visual, keyboard, reduced-motion and image-contrast review.")
    return int(bool(failures))

if __name__ == "__main__":
    raise SystemExit(main())
