"""Pinterest pin helpers for Trailstead Guide (1000x1500, 2:3).
Layout per current pin best practice: headline at the TOP in a saturated forest-green band,
ONE real photo below it, the site URL small in a pill at the bottom center.
Each weekly batch lives in scripts/pins/build_<batch>.py and imports from here.
Batch2 on: pin_v3a() / pin_v3c() below (v3 layouts). Batch1 used pin().
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


# ================================================================ v3 layouts (from batch2 on)
# Same two designs the KingBKits pins use, in Trailstead colors:
#   v3a "Big Number Collage"   - pin_v3a(): a huge gold number hook and a short headline on the deep green
#                                band, a one-line subline, a gold stripe, then a fan of 3 real photo prints
#                                (or a real printable page) with one sticker.
#   v3c "Lifestyle + Stickers" - pin_v3c(): a full-bleed real photo, three grouped number stickers and an
#                                angled green block with the guide's headline.
# Accent words: wrap them in [[...]] and they are set in plain gold text (no highlighter bar).
# Every number must come from the guide page itself. No em or en dashes (render_v3 asserts).

GOLD = "#E8B649"     # warm gold for numbers, accent words and the stripe
DEEP2 = "#3A6B58"    # lighter green for the band glow
RUST = "#B65A2E"     # third sticker color (white text)
INK = "#22302A"      # dark green-black for text on gold

CSS3 = """@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@600;700;800;900&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1000px;height:1500px;overflow:hidden;font-family:'Figtree',sans-serif;position:relative}
.abs{position:absolute}
.hi{color:%(gold)s}
.url3{position:absolute;left:44px;bottom:40px;background:#FBF7F0;color:%(deep)s;font-weight:900;font-size:30px;
  padding:13px 30px 14px;border-radius:44px;box-shadow:0 8px 20px rgba(10,25,18,.35);letter-spacing:.01em}
.card{position:absolute;background:#FBF7F0;padding:14px 14px 18px;box-shadow:0 3px 6px rgba(10,25,18,.25),0 24px 48px rgba(10,25,18,.42)}
.card img{display:block;width:100%%;height:100%%;object-fit:cover}
.sticker{position:absolute;border-radius:50%%;display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;box-shadow:0 10px 22px rgba(10,25,18,.38)}
.sticker .n{font-weight:900;line-height:.85;letter-spacing:-.03em}
.sticker .l{font-weight:800;line-height:1.05;margin-top:6px;text-transform:uppercase;letter-spacing:.04em}
/* v3a */
.num{position:absolute;left:40px;top:10px;font-weight:900;line-height:1;letter-spacing:-.06em;color:%(gold)s;
  text-shadow:0 10px 0 rgba(5,20,12,.28)}
.side{position:absolute;color:#fff;font-weight:900;line-height:.98;letter-spacing:-.015em}
.hook{position:absolute;left:56px;right:56px;font-weight:700;font-size:38px;line-height:1.18;color:%(cream)s}
.table{position:absolute;left:0;right:0;top:500px;height:1000px;overflow:hidden}
/* v3c */
.photo{position:absolute;left:0;top:0;width:1000px;height:1040px;object-fit:cover}
.block{position:absolute;left:0;right:0;top:930px;bottom:0;clip-path:polygon(0 70px,100%% 0,100%% 100%%,0 100%%);
  padding:104px 56px 0;color:#fff}
.block .k{font-weight:800;font-size:29px;letter-spacing:.14em;text-transform:uppercase;color:%(gold)s}
.block .h{font-weight:900;line-height:.95;letter-spacing:-.02em;margin-top:12px}
.block .s{font-weight:700;font-size:35px;line-height:1.2;margin-top:16px;color:%(cream)s}
""" % dict(gold=GOLD, deep=DEEP, cream=CREAM)


def hl(text):
    """[[word]] -> gold accent text. Newlines -> <br>."""
    return text.replace("[[", '<span class="hi">').replace("]]", "</span>").replace("\n", "<br>")


def printable_shot(slug):
    """Screenshot the live print view of a Trailstead printable and crop it to the sheet (real page)."""
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, f"printable-{slug}.png")
    if not os.path.exists(path):
        raw = os.path.join(CACHE, f"printable-{slug}-raw.png")
        subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                        "--window-size=850,1100", "--virtual-time-budget=8000", f"--screenshot={raw}",
                        f"https://www.trailsteadguide.com/printables/{slug}/print"],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        Image.open(raw).crop((34, 322, 1666, 1924)).save(path)
    return path


def sticker(x, y, d, num, label, bg, fg, rot=0, nsize=None, lsize=None, z=5, border="6px solid #fff"):
    nsize = nsize or int(d * 0.40)
    lsize = lsize or int(d * 0.095)
    return (f'<div class="sticker" style="left:{x}px;top:{y}px;width:{d}px;height:{d}px;background:{bg};color:{fg};'
            f'transform:rotate({rot}deg);z-index:{z};border:{border}"><div class="n" style="font-size:{nsize}px">{num}</div>'
            f'<div class="l" style="font-size:{lsize}px">{label}</div></div>')


def card(src, x, y, w, h, rot=0, pos="center", z=1):
    """A real photo (or printable page) as a cream-bordered print on the table."""
    return (f'<div class="card" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);z-index:{z}">'
            f'<img src="file://{src}" style="object-position:{pos}"></div>')


def render_v3(out_path, body):
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS3}</style></head>'
            f'<body>{body}<div class="url3" style="z-index:20">trailsteadguide.com</div></body></html>')
    assert "—" not in html and "–" not in html, f"em or en dash in {out_path}"
    tmp = os.path.join(CACHE, "html")
    os.makedirs(tmp, exist_ok=True)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    name = os.path.splitext(os.path.basename(out_path))[0]
    src = os.path.join(tmp, f"{name}.html")
    open(src, "w").write(html)
    png = os.path.join(tmp, f"{name}.png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                    "--allow-file-access-from-files", "--window-size=1000,1500", "--virtual-time-budget=8000",
                    f"--screenshot={png}", f"file://{src}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    Image.open(png).convert("RGB").resize((1000, 1500), Image.LANCZOS).save(out_path, quality=90)
    print("wrote", out_path)


def pin_v3a(out, number, headline, hook, cards, sticker_num=None, sticker_label="", sticker_side="right",
            number_px=None, head_px=78, head_left=None, hook_top=322):
    """Big Number Collage. cards: [(src_path, x, y, w, h, rot, object_position), ...] back to front,
    y relative to the table at 500px."""
    digits = len(number)
    number_px = number_px or (370 if digits == 1 else 330)
    head_left = head_left or (330 if digits == 1 else 455)
    bg = (f'<div class="abs" style="inset:0;background:radial-gradient(circle at 50% 72%,{DEEP2} 0%,{DEEP} 70%)"></div>'
          f'<div class="abs" style="left:-80px;top:462px;width:1200px;height:26px;background:{GOLD};transform:rotate(-4deg)"></div>')
    top = (f'<div class="num" style="font-size:{number_px}px">{number}</div>'
           f'<div class="side" style="left:{head_left}px;top:70px;font-size:{head_px}px">{hl(headline)}</div>'
           f'<div class="hook" style="top:{hook_top}px">{hl(hook)}</div>')
    stick = ""
    if sticker_num:
        x, rot = (680, 10) if sticker_side == "right" else (40, -10)
        nsize = 104 if len(sticker_num) <= 3 else 80
        stick = sticker(x, 600, 260, sticker_num, sticker_label, GOLD, INK, rot, nsize=nsize, lsize=24, z=10)
    table = ('<div class="table">' + "".join(card(*c[:6], pos=c[6], z=i + 1) for i, c in enumerate(cards))
             + stick + "</div>")
    render_v3(out, bg + top + table)


def pin_v3c(out, photo_path, photo_pos, kicker, headline, head_px, sub, stats, sticker_side="left", sticker_dy=0):
    """Lifestyle + Stickers. stats: three (number, label) circles, label may use <br>.
    sticker_dy moves the sticker group up (negative) to keep it off the photo's focal subject."""
    cfg = [(40, 616, 230, GOLD, INK, -8), (232, 600, 190, "#FBF7F0", DEEP, 6), (150, 780, 200, RUST, "#fff", -3)]
    st = ""
    for (x, y, d, bgc, fg, rot), (n, l) in zip(cfg, stats):
        if sticker_side == "right":
            x, rot = 1000 - x - d, -rot
        nsize = int(d * (0.40 if len(n) <= 3 else 0.31))
        st += sticker(x, y + sticker_dy, d, n, l, bgc, fg, rot, nsize=nsize, z=8, border="5px solid #fff")
    body = (f'<img class="photo" src="file://{photo_path}" style="object-position:{photo_pos}">{st}'
            f'<div class="block" style="background:{DEEP};z-index:6"><div class="k">{kicker}</div>'
            f'<div class="h" style="font-size:{head_px}px">{hl(headline)}</div><div class="s">{sub}</div></div>')
    render_v3(out, body)


def contact_sheet(items, path, title, cols=4, w=400):
    """items: [(jpg_path, line1, line2)]"""
    from PIL import ImageDraw, ImageFont
    h, pad = int(w * 1.5), 30
    rows = (len(items) + cols - 1) // cols
    S = Image.new("RGB", (cols * (w + pad) + pad, 110 + rows * (h + 56 + pad)), CREAM)
    d = ImageDraw.Draw(S)
    big = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 40)
    small = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 22)
    d.text((pad, 32), title, fill=DEEP, font=big)
    for i, (p, l1, l2) in enumerate(items):
        x = pad + (i % cols) * (w + pad)
        y = 110 + (i // cols) * (h + 56 + pad)
        S.paste(Image.open(p).resize((w, h), Image.LANCZOS), (x, y))
        d.text((x, y + h + 8), l1, fill=DEEP, font=small)
        d.text((x, y + h + 32), l2, fill="#7A5A3A", font=small)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    S.save(path, quality=88)
    print("contact sheet", path)
