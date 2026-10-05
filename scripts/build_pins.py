"""Pinterest pin helpers for Trailstead Guide (1000x1500, 2:3).
Layout per current pin best practice: headline at the TOP in a saturated forest-green band,
ONE real photo below it, the site URL small in a pill at the bottom center.
Each weekly batch lives in scripts/pins/build_<batch>.py and imports from here.
Photos are Unsplash images (free license, no credit required), downloaded by photo id."""
import os, subprocess, urllib.request
from PIL import Image

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CACHE = os.path.join(REPO, "scripts", "pins", "_cache")

GREEN = "#2F7A4E"   # brighter forest green for the band
DEEP = "#295244"    # Trailstead green
CREAM = "#EDE3D6"

CSS = """@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1000px;height:1500px;overflow:hidden;font-family:'Figtree',sans-serif;background:#222}
.band{position:absolute;left:0;right:0;top:0;height:420px;display:flex;flex-direction:column;justify-content:center;
  align-items:center;text-align:center;padding:0 56px;color:#fff;border-bottom:10px solid %(cream)s}
.eyebrow{font-weight:800;font-size:28px;letter-spacing:0.16em;text-transform:uppercase;color:%(cream)s}
.head{font-weight:900;line-height:0.98;letter-spacing:-0.015em;margin-top:12px}
.sub{font-weight:700;font-size:34px;line-height:1.2;margin-top:16px;color:%(cream)s}
.scene{position:absolute;left:0;right:0;top:420px;bottom:0;overflow:hidden}
.scene img{position:absolute;inset:0;width:100%%;height:100%%;object-fit:cover}
.url{position:absolute;left:50%%;bottom:44px;transform:translateX(-50%%);background:rgba(237,227,214,0.95);color:%(deep)s;
  font-weight:900;font-size:28px;padding:12px 30px;border-radius:40px;letter-spacing:0.01em;box-shadow:0 6px 16px rgba(0,0,0,0.3)}
""" % dict(cream=CREAM, deep=DEEP)


def photo(photo_id):
    """Download an Unsplash photo (2000px wide) once and return its local path."""
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"{photo_id}.jpg")
    if not os.path.exists(path):
        url = f"https://images.unsplash.com/{photo_id}?w=2000&auto=format&fit=crop&q=85&fm=jpg"
        urllib.request.urlretrieve(url, path)
    return path


def pin(out_dir, name, eyebrow, head, sub, photo_id, pos="center", head_px=96, band=GREEN):
    """Render one pin to <out_dir>/<name>.jpg with headless Chrome at device scale 2."""
    tmp = os.path.join(CACHE, "html")
    os.makedirs(tmp, exist_ok=True)
    os.makedirs(out_dir, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>'
            f'<div class="band" style="background:{band}"><div class="eyebrow">{eyebrow}</div>'
            f'<div class="head" style="font-size:{head_px}px">{head}</div><div class="sub">{sub}</div></div>'
            f'<div class="scene"><img src="file://{photo(photo_id)}" style="object-position:{pos}"></div>'
            f'<div class="url">trailsteadguide.com</div></body></html>')
    src = os.path.join(tmp, f"{name}.html")
    open(src, "w").write(html)
    png = os.path.join(tmp, f"{name}.png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                    "--allow-file-access-from-files", "--window-size=1000,1500", "--virtual-time-budget=6000",
                    f"--screenshot={png}", f"file://{src}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    Image.open(png).convert("RGB").resize((1000, 1500), Image.LANCZOS).save(os.path.join(out_dir, f"{name}.jpg"), quality=90)
