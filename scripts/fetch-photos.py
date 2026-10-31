"""Download the free-licensed photos used on the site from Wikimedia Commons.

Saves each photo at max 1600px wide into public/hcl/images/<slot>.jpg and
regenerates docs/IMAGE-CREDITS.md (CC BY / CC BY-SA require attribution).
Run: python3 scripts/fetch-photos.py
"""
import html
import io
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/hcl/images"
UA = {"User-Agent": "HeritageCloverSite/1.0 (https://github.com/thirapi/heritageclover)"}

# slot (file name) -> Commons file title
PHOTOS = {
    "heritage-map": "Blaeu - Moluccae Insulae Celeberrimae.jpg",
    "sorting": "Clove sorting.jpg",
    "testing": "Menjemur Cengkih.jpg",
    "packing": "Cengkeh Clove.jpg",
    "product-oil": "CloveEssOil.png",
    "product-gift": "Gewuerze 004 2024 08 10.jpg",
    "use-culinary": "Beef Rendang..JPG",
    "use-wellness": "Ginger tea.jpg",
    "use-aroma": "Pomander.jpg",
    "use-gifting": "Cengkeh rempah.jpg",
    "article-1": "Drying cloves in the Moluccas, photo from The Encyclopedia of Food by Artemas Ward.jpg",
    "article-2": "Anise and cinnamon.jpg",
    "article-3": "CloveBowl.JPG",
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub("<[^>]+>", "", html.unescape(value or ""))).strip()


def info(title: str) -> dict:
    q = urllib.parse.urlencode({
        "action": "query", "titles": f"File:{title}", "prop": "imageinfo",
        "iiprop": "url|size|extmetadata", "iiurlwidth": 1600, "format": "json",
    })
    req = urllib.request.Request("https://commons.wikimedia.org/w/api.php?" + q, headers=UA)
    page = next(iter(json.load(urllib.request.urlopen(req, timeout=30))["query"]["pages"].values()))
    return page["imageinfo"][0]


rows = []
for slot, title in PHOTOS.items():
    ii = info(title)
    meta = ii.get("extmetadata", {})
    url = ii.get("thumburl") or ii["url"]
    data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=120).read()
    im = Image.open(io.BytesIO(data))
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im.convert("RGBA"), mask=im.convert("RGBA").split()[-1])
        im = bg
    im.convert("RGB").save(OUT / f"{slot}.jpg", "JPEG", quality=90)
    rows.append({
        "slot": slot,
        "title": title,
        "author": clean(meta.get("Artist", {}).get("value", "Unknown")) or "Unknown",
        "license": clean(meta.get("LicenseShortName", {}).get("value", "?")),
        "license_url": meta.get("LicenseUrl", {}).get("value", ""),
        "page": ii["descriptionurl"],
        "size": f"{im.size[0]}x{im.size[1]}",
    })
    print(f"{slot:<14} {rows[-1]['license']:<14} {rows[-1]['size']:<10} {title}")

lines = [
    "# Image credits",
    "",
    "Photos in `public/hcl/images/*.jpg` listed below come from Wikimedia Commons under free",
    "licenses. CC BY / CC BY-SA require attribution: keep this list and link it from the",
    "site (e.g. a \"Photo credits\" link in the footer) when the site is published.",
    "Regenerate with `python3 scripts/fetch-photos.py`.",
    "",
    "| File | Source | Author | License |",
    "|---|---|---|---|",
]
for r in rows:
    lic = f"[{r['license']}]({r['license_url']})" if r["license_url"] else r["license"]
    lines.append(f"| `{r['slot']}.jpg` | [{r['title']}]({r['page']}) | {r['author'][:80]} | {lic} |")
lines += [
    "",
    "Other photos (`hero`, `intro`, `origin`, `harvest`, `drying`, `farmer-1..3`, `product-whole`,",
    "`product-ground`, `page-hero`, `cta`) were added separately and are not from this list.",
    "",
]
(ROOT / "docs/IMAGE-CREDITS.md").write_text("\n".join(lines))
print("wrote docs/IMAGE-CREDITS.md")
