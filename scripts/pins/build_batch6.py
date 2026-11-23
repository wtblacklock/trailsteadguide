"""Trailstead Pinterest batch 6 (2026-11-24 to 2026-11-30), v3a / v3c alternating.
Picked from Search Console (28 days): 30 and 40 degree camping, winter camping with dogs, plus cold-night gear and
new guides (R-value, bag ratings, winter for beginners, night bathroom trips, setting up in the dark). Numbers come from the linked guide.
Usage: /usr/bin/python3 scripts/pins/build_batch6.py"""
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin_v3a, pin_v3c, photo, contact_sheet, REPO

BATCH = "batch6"
OUT = os.path.join(REPO, "public", "pins", BATCH)
P = lambda n: os.path.join(OUT, f"{n}.jpg")
SITE = "https://www.trailsteadguide.com"
TIME = "14:00:00"
pins = []

HERO40 = photo("photo-1476041800959-2f6bb412c8ce")
DOG = photo("photo-1668496102353-472a49dec49c")
WINTER = photo("photo-1776131264822-1e091242f639")
NIGHT = photo("photo-1641435354609-5240e4adb4b6")
TENT_BLUFF = photo("photo-1578645510447-e20b4311e3ce")
BLUE_HOUR = photo("photo-1513781419235-2988ecacab83")
LANTERN_TENT = photo("photo-1603738397297-a374b78e9626")
PAD_DOORWAY = photo("photo-1698731048404-1c12d7189e48")
TENT_DOOR = photo("photo-1504280390367-361c6d9f38f4")
TARP_DUSK = photo("photo-1749008078593-418ca225b82b")
CAMPFIRE = photo("photo-1587547131116-a0655a526190")
GIRLS_TENT = photo("photo-1674230316788-d9c8b92f0d63")

# 1. Nov 24  40 degree camping
pin_v3a(P("40-degrees-v3a"), "40", "Degrees Is\n[[Fine]] for\nTent Camping",
        "Stay dry, sleep on a pad of R 4 or more, and use a bag rated 10 degrees below the low.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (LANTERN_TENT, 520, 120, 450, 520, 7, "50% 50%"),
         (HERO40, 190, 170, 620, 600, -2, "50% 50%")],
        "R 4", "pad for<br>near freezing", sticker_side="right", head_px=78)
pins.append(("40-degrees-v3a", "v3a", "/guides/camping-in-40-degree-weather",
             "Camping in 40 Degree Weather: Sleeping Bag, Pad and What to Wear", "Camping Skills",
             "Is 40 degrees too cold to camp? Not if you stay dry. See the sleeping bag rating, the pad R-value and the bedtime "
             "layers that keep a family warm on a 30 or 40 degree night, plus the signs that a cold snap means it is time to leave.",
             "2026-11-24", "camping in 40 degree weather, cold weather camping, camping in the 30s, fall camping with kids, family camping tips"))

# 2. Nov 25  winter camping with dogs
pin_v3c(P("winter-dogs-v3c"), DOG, "50% 50%",
        "A family guide", "Winter Camping\nWith [[Dogs]]", 100,
        "Which dogs handle the cold",
        [("25", "lb dogs feel<br>cold first"), ("32", "°F coat<br>time"), ("20", "°F call<br>it quits")],
        sticker_side="left", sticker_dy=-470)
pins.append(("winter-dogs-v3c", "v3c", "/guides/winter-camping-with-dogs",
             "Winter Camping With Dogs: Which Dogs Handle Cold and When to Go Home", "Camping Skills",
             "Taking the dog on a winter camping trip? Learn which dogs handle the cold, how to set up a warm sleep spot, how to "
             "protect paws on ice and salt, when to add hunting-season orange and the temperature where it is too cold to go.",
             "2026-11-25", "winter camping with dogs, camping with dogs, dog cold weather, dog friendly camping, winter camping tips"))

# 3. Nov 26  sleeping pad R-value
pin_v3a(P("pad-r-value-v3a"), "5", "Pad R-Value\nfor [[Cold]]\nNights",
        "Pads stack: foam under an inflatable adds up. Skip the air mattress.",
        [(BLUE_HOUR, 20, 110, 460, 520, -8, "50% 50%"),
         (TENT_DOOR, 520, 120, 450, 520, 7, "50% 50%"),
         (PAD_DOORWAY, 190, 170, 620, 600, -2, "50% 50%")],
        "R 5", "foam under<br>inflatable", sticker_side="right", head_px=76)
pins.append(("pad-r-value-v3a", "v3a", "/guides/sleeping-pad-r-value-explained",
             "Sleeping Pad R-Value Explained: What You Need for Fall and Winter Camping", "Camping Gear Guides",
             "What does a sleeping pad R-value really mean? See what number to buy for fall and winter nights, why a foam pad "
             "stacked under an inflatable one adds up, and why an air mattress leaves you cold. A simple guide for family campers.",
             "2026-11-26", "sleeping pad r-value, best sleeping pad for cold, camping pad warmth, winter camping gear, camping gear for beginners"))

# 4. Nov 27  winter camping for beginners
pin_v3c(P("winter-beginners-v3c"), WINTER, "50% 50%",
        "Cabin path first", "Winter Camping\nfor [[Beginners]]", 96,
        "Start in a heated cabin, not a tent at 15°F",
        [("20", "°F tent<br>cutoff"), ("0", "°F bag for<br>winter"), ("5", "R-value<br>pad or more")],
        sticker_side="left", sticker_dy=-470)
pins.append(("winter-beginners-v3c", "v3c", "/guides/winter-camping-for-beginners",
             "Winter Camping for Beginners: Start With a Cabin, Not a Tent", "Family Camping for Beginners",
             "Thinking about a first winter camping trip? When tenting works and when it does not, why a heated cabin or yurt is the "
             "safe first step, and the sleeping bag, pad and stove rules that keep a below freezing family trip warm.",
             "2026-11-27", "winter camping for beginners, winter camping with kids, camping cabin, cold weather camping, first winter camping trip"))

# 5. Nov 28  nighttime bathroom trips
pin_v3a(P("night-bathroom-v3a"), "100", "Feet or Less\nto the\n[[Restroom]]",
        "Walk the route by day, give each kid a headlamp, keep a pee bottle in the tent.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (GIRLS_TENT, 520, 120, 450, 520, 7, "50% 50%"),
         (NIGHT, 190, 170, 620, 600, -2, "50% 50%")],
        "1", "headlamp<br>per kid", sticker_side="left", head_px=66, number_px=250, head_left=500)
pins.append(("night-bathroom-v3a", "v3a", "/guides/nighttime-bathroom-trips-camping-with-kids",
             "Nighttime Bathroom Trips Camping With Kids: Site, Lights and a Plan", "Camping Skills",
             "Handle the middle of the night bathroom trip at camp with kids: pick a site close to the restroom, walk the route "
             "in daylight, give each child a headlamp and keep a pee bottle or potty in the tent for cold nights.",
             "2026-11-28", "camping with kids, night bathroom camping, camping with toddlers, camping tips for parents, family camping"))

# 6. Nov 29  setting up camp in the dark
pin_v3c(P("camp-in-the-dark-v3c"), TARP_DUSK, "50% 50%",
        "Arriving after sunset", "Set Up Camp\nin the [[Dark]]", 104,
        "Work backwards from sunset, pitch the tent first",
        [("90", "min before<br>sunset"), ("60", "min if you<br>know the site"), ("30", "min extra,<br>no site yet")],
        sticker_side="right", sticker_dy=-470)
pins.append(("camp-in-the-dark-v3c", "v3c", "/guides/setting-up-camp-in-the-dark",
             "Setting Up Camp in the Dark With Kids: Arrival Math and Lighting Tips", "Camping Skills",
             "Arriving at the campground after sunset with kids? Plan the evening backwards from dark, pitch the tent first by "
             "headlamp, light the site so a family can function, and help a child who is nervous about the dark.",
             "2026-11-29", "setting up camp in the dark, camping after dark, camping with kids, night camping tips, campsite lighting"))

# 7. Nov 30  sleeping bag ratings
pin_v3a(P("bag-ratings-v3a"), "10", "to 15°F\nColder Than\nthe [[Forecast]]",
        "Why a 20 degree bag is not a 20 degree night, and which rating to buy.",
        [(TENT_BLUFF, 20, 110, 460, 520, -8, "50% 50%"),
         (GIRLS_TENT, 520, 120, 450, 520, 7, "50% 50%"),
         (HERO40, 190, 170, 620, 600, -2, "50% 50%")],
        "5-10", "°F extra for<br>kids", sticker_side="right", head_px=74)
pins.append(("bag-ratings-v3a", "v3a", "/guides/sleeping-bag-temperature-ratings-explained",
             "Sleeping Bag Temperature Ratings Explained: Comfort, Limit and What to Buy", "Camping Gear Guides",
             "Comfort, limit or extreme? Learn what sleeping bag temperature ratings really mean, why a 20 degree bag is not a "
             "20 degree night, and the simple rule for picking a bag for your family, with extra margin for kids and cold sleepers.",
             "2026-11-30", "sleeping bag temperature rating, sleeping bag ratings explained, best sleeping bag for cold, camping gear, kids sleeping bag"))

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
              "Trailstead Pinterest batch 6 (Nov 24 to Nov 30)", cols=4)
