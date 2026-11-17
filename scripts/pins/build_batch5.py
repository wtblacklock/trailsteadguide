"""Trailstead Pinterest batch 5 (2026-11-17 to 2026-11-23), v3a / v3c alternating.
Picked from Search Console (28 days): camp stove fuel, family tents, recreation.gov, kids sleeping bags,
plus seasonal Thanksgiving, warm winter destinations and First Day Hikes. Every number comes from the linked guide.
Usage: /usr/bin/python3 scripts/pins/build_batch5.py"""
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin_v3a, pin_v3c, photo, contact_sheet, REPO

BATCH = "batch5"
OUT = os.path.join(REPO, "public", "pins", BATCH)
P = lambda n: os.path.join(OUT, f"{n}.jpg")
SITE = "https://www.trailsteadguide.com"
TIME = "14:00:00"
pins = []

STOVE = photo("photo-1775626094623-99a26d94dc64")
TENT_BLUFF = photo("photo-1578645510447-e20b4311e3ce")
DUTCH = photo("photo-1783335543126-9afdfff4d4ca")
VALLEY = photo("photo-1469474968028-56623f02e42e")
WARM = photo("photo-1543947789-61006ba430a2")
HIKE = photo("photo-1771855897723-ba8ca8bedeed")
FLATLAY = photo("photo-1485809052957-5113b0ff51af")
BLUE_HOUR = photo("photo-1513781419235-2988ecacab83")
LANTERN_TENT = photo("photo-1603738397297-a374b78e9626")
PAD_DOORWAY = photo("photo-1698731048404-1c12d7189e48")
TENT_DOOR = photo("photo-1504280390367-361c6d9f38f4")
TARP_DUSK = photo("photo-1749008078593-418ca225b82b")
CAMPFIRE = photo("photo-1587547131116-a0655a526190")
GIRLS_TENT = photo("photo-1674230316788-d9c8b92f0d63")

# 1. Nov 17  camp stove fuel
pin_v3a(P("stove-fuel-v3a"), "31", "°F and\nButane\n[[Quits]]",
        "Propane keeps burning far below zero. Keep tomorrow's canister warm tonight.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (LANTERN_TENT, 520, 120, 450, 520, 7, "50% 50%"),
         (STOVE, 190, 170, 620, 600, -2, "50% 50%")],
        "-44", "°F propane<br>still works", sticker_side="right", head_px=78)
pins.append(("stove-fuel-v3a", "v3a", "/guides/camp-stove-fuel-in-cold-weather",
             "Camp Stove Fuel in Cold Weather: Why Butane Quits at 31°F", "Camping Gear Guides",
             "Why the butane stove that worked all summer sputters on a frosty morning, how propane keeps working far "
             "below zero, and the small habits that keep breakfast on schedule: a warm canister, a windscreen and extra fuel.",
             "2026-11-17", "camp stove fuel, cold weather camping, propane vs butane, camping stove tips, fall camping"))

# 2. Nov 18  family tents
pin_v3c(P("family-tents-v3c"), TENT_BLUFF, "50% 50%",
        "5 picks by family size", "Best Family\n[[Tents]] 2026", 112,
        "Buy one size up from your headcount",
        [("6", "person<br>tent"), ("$115", "Coleman<br>Sundome 6"), ("10", "min to<br>pitch")],
        sticker_side="right", sticker_dy=-470)
pins.append(("family-tents-v3c", "v3c", "/guides/best-family-tent-for-beginners",
             "What Size Family Tent to Buy: Family of 4, 5 or 6 (5 Picks for 2026)", "Camping Gear Guides",
             "Not sure what size tent your family needs? Tents are rated shoulder to shoulder with no gear, so buy one "
             "size up. See five picks from a $115 Coleman Sundome 6 to a stand-up cabin tent for big families.",
             "2026-11-18", "family tent size, tent for family of 4, best cabin tent, first family tent, camping gear for beginners"))

# 3. Nov 19  Thanksgiving camping
pin_v3a(P("thanksgiving-camping-v3a"), "4", "Day Weekend,\n[[Quiet]]\nCampgrounds",
        "Camp where it is still open, cook a turkey breast in a Dutch oven, pack for 35 degrees.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (TARP_DUSK, 520, 120, 450, 520, 7, "40% 50%"),
         (DUTCH, 190, 170, 620, 600, -2, "50% 50%")],
        "165", "°F turkey<br>is done", sticker_side="right", head_px=76)
pins.append(("thanksgiving-camping-v3a", "v3a", "/guides/thanksgiving-camping-with-kids",
             "Thanksgiving Camping With Kids: Where to Go and What to Cook", "Camp Meals & Snacks",
             "Thanksgiving camping with kids: which campgrounds are still open in late November, a Dutch oven turkey "
             "breast plan that works over coals, cooler food safety and how to pack for a 35 degree night.",
             "2026-11-19", "thanksgiving camping, camping with kids, dutch oven turkey, camping thanksgiving menu, holiday camping"))

# 4. Nov 20  recreation.gov
pin_v3c(P("recreation-gov-v3c"), VALLEY, "50% 50%",
        "Recreation.gov playbook", "Win the\n[[Booking]] Window", 108,
        "Plus a Plan B when nothing is open",
        [("6", "month<br>window"), ("7", "am Pacific<br>drop"), ("3", "things that<br>matter")],
        sticker_side="left", sticker_dy=-470)
pins.append(("recreation-gov-v3c", "v3c", "/guides/recreation-gov-reservation-strategy",
             "Recreation.gov Booking Tips: The 6 Month Window and the 7am Drop", "Campsite Reservations & Trip Planning",
             "How recreation.gov really works: the 6 month rolling window, the 7 a.m. Pacific release, cancellation alerts "
             "and backup sites. A beginner playbook for getting a campsite at popular national park campgrounds.",
             "2026-11-20", "recreation.gov, campsite reservations, book a campsite, national park camping, camping trip planning"))

# 5. Nov 21  warm winter destinations
pin_v3a(P("warm-winter-v3a"), "5", "Warm Places to\nCamp [[This\nWinter]]",
        "Mild from December through February. Book early and still pack for near-freezing nights.",
        [(BLUE_HOUR, 20, 110, 460, 520, -8, "50% 50%"),
         (TENT_DOOR, 520, 120, 450, 520, 7, "50% 50%"),
         (WARM, 190, 170, 620, 600, -2, "50% 50%")],
        "70", "°F days,<br>35° nights", sticker_side="right", head_px=74)
pins.append(("warm-winter-v3a", "v3a", "/guides/warm-winter-camping-destinations",
             "Warm Winter Camping Spots for Families: Florida to the Desert", "Family Camping for Beginners",
             "Where to tent camp warm this winter with kids: Florida, the Gulf Coast, south Texas, southern Arizona and "
             "the California deserts. What each region is like at night, plus when to book before sites are gone.",
             "2026-11-21", "winter camping, warm winter camping, camping in florida, family winter trip, camping with kids"))

# 6. Nov 22  kids sleeping bags
pin_v3c(P("kids-sleeping-bags-v3c"), PAD_DOORWAY, "50% 50%",
        "Pick the right rating", "Kids Sleeping\n[[Bags]] 2026", 100,
        "Buy 10 to 15°F below your coldest night",
        [("20", "°F bag,<br>3 seasons"), ("$60", "TETON<br>Junior"), ("5", "kid-size<br>picks")],
        sticker_side="right", sticker_dy=-470)
pins.append(("kids-sleeping-bags-v3c", "v3c", "/guides/best-camping-sleeping-bag-for-kids",
             "What Temperature Sleeping Bag Do Kids Need? 5 Best Picks for 2026", "Camping Gear Guides",
             "Pick a kids sleeping bag rated 10 to 15°F below the coldest night in the forecast. See five kid-sized bags "
             "from a $30 summer bag to a 20°F bag for cold nights, plus why adult bags leave small kids cold.",
             "2026-11-22", "kids sleeping bag, sleeping bag temperature rating, toddler sleeping bag, camping gear for kids, family camping"))

# 7. Nov 23  First Day Hikes
pin_v3a(P("first-day-hikes-v3a"), "3", "Layers, No\n[[Cotton]] for\nJan 1 Hikes",
        "Find a New Year's Day hike at a state park and keep it under two miles.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (FLATLAY, 520, 120, 450, 520, 7, "50% 50%"),
         (HIKE, 190, 170, 620, 600, -2, "50% 50%")],
        "2", "miles or<br>less", sticker_side="left", head_px=78)
pins.append(("first-day-hikes-v3a", "v3a", "/guides/first-day-hikes-with-kids",
             "First Day Hikes With Kids: How to Find One and What to Wear", "Family Camping for Beginners",
             "Start the year outside: how to find a guided New Year's Day hike at a state park, what to wear and pack for "
             "January cold, and how to pace little legs. Three layers, no cotton and a hot drink at the turnaround.",
             "2026-11-23", "first day hikes, new years day hike, winter hiking with kids, kids winter clothes, family hiking"))

HEADER = ["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"]
rows = []
for f, style, path, title, board, desc, date, kw in pins:
    assert len(title) <= 100 and 150 <= len(desc) <= 400, (f, len(title), len(desc))
    utm = f"?utm_source=pinterest&utm_medium=social&utm_campaign={BATCH}&utm_content={f}"
    rows.append({"Title": title, "Media URL": f"{SITE}/pins/{BATCH}/{f}.jpg", "Pinterest board": board, "Thumbnail": "",
                 "Description": desc, "Link": f"{SITE}{path}{utm}", "Publish date": f"{date}T{TIME}", "Keywords": kw})
assert len({r["Link"] for r in rows}) == len(rows), "duplicate Link"
assert len({r["Publish date"] for r in rows}) == len(rows), "two pins on one date"
for r in rows:
    for v in r.values():
        assert "—" not in v and "–" not in v, "dash in CSV"
out_csv = os.path.join(REPO, "pinterest", BATCH, "pinterest-bulk-upload.csv")
os.makedirs(os.path.dirname(out_csv), exist_ok=True)
with open(out_csv, "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=HEADER)
    w.writeheader()
    w.writerows(rows)
print("wrote", out_csv)
contact_sheet([(P(f), f"{d[5:]}  {s}", f[:30]) for f, s, p, _, _, _, d, _ in pins],
              os.path.join(REPO, "pinterest", BATCH, "contact.jpg"),
              "Trailstead Pinterest batch 5 (Nov 17 to Nov 23)", cols=4)
