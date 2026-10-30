"""Trailstead Pinterest batch 4: holiday gift guides (2026-11-03 to 2026-11-12), v3a / v3c alternating.
Replaces the unrendered gift guide drafts from PR #154 (pinterest/batch2), which collided with the
October batch2 campaign. One pin per day at 14:00, starting the day after batch3 ends
(batch3 runs Oct 27 to Nov 2) so the two batches never publish on the same day.
Usage: /usr/bin/python3 scripts/pins/build_batch4.py
Writes public/pins/batch4/*.jpg, pinterest/batch4/pinterest-bulk-upload.csv and pinterest/batch4/contact.jpg.
Every photo is already a guide hero image on the site. Every number comes from the linked guide."""
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin_v3a, pin_v3c, photo, contact_sheet, REPO

BATCH = "batch4"
OUT = os.path.join(REPO, "public", "pins", BATCH)
P = lambda n: os.path.join(OUT, f"{n}.jpg")
SITE = "https://www.trailsteadguide.com"
TIME = "14:00:00"
pins = []  # (file, style, path, title, board, description, date, keywords)

# Hero photos (Unsplash ids) already used on the site
FAMILY_TABLE = photo("photo-1701318967976-aba1311c21ae")   # dad and two kids eating at a picnic table
FLATLAY = photo("photo-1485809052957-5113b0ff51af")        # jacket, boots, map and compass flat lay
MARSHMALLOW = photo("photo-1756719097664-82e33a1b1ac2")    # child eating a toasted marshmallow
GIRLS_TENT = photo("photo-1674230316788-d9c8b92f0d63")     # two laughing girls in front of a red tent
BLUE_HOUR = photo("photo-1513781419235-2988ecacab83")      # orange dome tent glowing at blue hour
LANTERN_TENT = photo("photo-1603738397297-a374b78e9626")   # lantern-lit tent among dark trees
PAD_DOORWAY = photo("photo-1698731048404-1c12d7189e48")    # camper unrolling a pad in a tent doorway
TENT_DOOR = photo("photo-1504280390367-361c6d9f38f4")      # view out of an orange tent onto pines
TARP_DUSK = photo("photo-1749008078593-418ca225b82b")      # lanterns under a tarp over a camp table
CAMPFIRE = photo("photo-1587547131116-a0655a526190")       # lit tents around a campfire at night

# 1. Nov 3  Best camping gifts for families (hub)
pin_v3a(P("family-gifts-v3a"), "6", "Gifts the\nWhole Family\n[[Uses]]",
        "Headlamps for every kid, a lawn game, a Dutch oven and a fire to sit around.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "50% 50%"),
         (TARP_DUSK, 520, 120, 450, 520, 7, "40% 50%"),
         (FAMILY_TABLE, 190, 170, 620, 600, -2, "62% 50%")],
        "3", "rules for<br>family gifts", sticker_side="right", head_px=78)
pins.append(("family-gifts-v3a", "v3a", "/guides/best-camping-gifts-for-families",
             "Best Camping Gifts for Families 2026: Gifts the Whole Family Uses", "Camping Gear Guides",
             "Holiday gift ideas for camping families: headlamps for every kid, a packable bocce set, a campfire Dutch "
             "oven, a propane fire pit and more. Shared gifts that make the next trip more fun, plus gift guides for "
             "kids, beginners and every budget.",
             "2026-11-03", "camping gifts, gifts for camping families, family christmas gift ideas, outdoor gifts, camping gift guide"))

# 2. Nov 4  Gift guide overview (hub, second angle)
pin_v3c(P("gift-guide-flatlay-v3c"), FLATLAY, "50% 50%",
        "Kids, beginners &amp; every budget", "Camping\n[[Gift Guide]]", 112,
        "Gear campers use every trip",
        [("4", "gift<br>guides"), ("$25", "stocking<br>stuffers"), ("$50", "real gear<br>gifts")],
        sticker_side="right", sticker_dy=-470)
pins.append(("gift-guide-flatlay-v3c", "v3c", "/guides/best-camping-gifts-for-families",
             "Camping Gift Guide for Families: Kids, Beginners and Under $50", "Camping Gear Guides",
             "One gift guide for the whole camping family: picks for kids by age, stocking stuffers under $25, gifts for "
             "first-time campers and real gear under $50. Every pick is something campers use every trip, not a gadget "
             "for the drawer.",
             "2026-11-04", "camping gift guide, christmas gifts for campers, holiday gift guide, camping gear gifts, family camping"))

# 3. Nov 5  Camping gifts for kids
pin_v3a(P("kids-gifts-v3a"), "3", "Age Groups,\nGifts Kids\n[[Actually Use]]",
        "Their own headlamp, roasting sticks, a star finder and a sleeping bag that fits.",
        [(GIRLS_TENT, 20, 110, 460, 520, -8, "35% 50%"),
         (LANTERN_TENT, 520, 120, 450, 520, 7, "50% 50%"),
         (MARSHMALLOW, 190, 170, 620, 600, -2, "60% 50%")],
        "5", "headlamps<br>in a pack", sticker_side="left", head_px=76)
pins.append(("kids-gifts-v3a", "v3a", "/guides/camping-gifts-for-kids",
             "Gifts for Kids Who Love Camping: Ideas Sorted by Age", "Family Camping for Beginners",
             "Camping gifts kids actually use: a headlamp of their own, roasting sticks, a bug magnifier, a pocket tree "
             "guide, a star finder and a sleeping bag that fits. Sorted by age from preschoolers to tweens, with gift "
             "bundle ideas.",
             "2026-11-05", "camping gifts for kids, outdoor gifts for kids, nature gifts for kids, kids christmas gift ideas, camping with kids"))

# 4. Nov 6  Kids gift bundles
pin_v3c(P("kids-gift-bundles-v3c"), GIRLS_TENT, "40% 50%",
        "Easy gift bundles", "Outdoor Gifts\nfor [[Kids]]", 112,
        "Bug detective to night owl",
        [("4", "gift<br>bundles"), ("3", "age<br>groups"), ("$25", "most picks<br>under")],
        sticker_side="right", sticker_dy=-540)
pins.append(("kids-gift-bundles-v3c", "v3c", "/guides/camping-gifts-for-kids",
             "Outdoor Gift Bundles for Kids: Bug Detective to Night Owl", "Family Camping for Beginners",
             "Easy camping gift bundles for kids: the bug detective (magnifier and tree guide), the night owl (headlamp "
             "and star finder), the camp chef (roasting sticks and food jar) and the navigator (compass and paracord). "
             "Free printables to tuck in the bag.",
             "2026-11-06", "kids gift ideas, outdoor kids gifts, camping gifts for kids, nature explorer kit, stocking ideas for kids"))

# 5. Nov 7  Camping stocking stuffers
pin_v3a(P("stocking-stuffers-v3a"), "$25", "Camping\nStocking\n[[Stuffers]]",
        "Hand warmers, stormproof matches, a tick remover and a star finder, all under $25.",
        [(LANTERN_TENT, 20, 110, 460, 520, -8, "50% 50%"),
         (TENT_DOOR, 520, 120, 450, 520, 7, "50% 50%"),
         (BLUE_HOUR, 190, 170, 620, 600, -2, "58% 50%")],
        "40", "pairs of hand<br>warmers", sticker_side="right", number_px=250, head_left=470, head_px=78)
pins.append(("stocking-stuffers-v3a", "v3a", "/guides/camping-stocking-stuffers",
             "Camping Stocking Stuffers Under $25 That Actually Get Used", "Camping Gear Guides",
             "Small camping gifts under $25: hand warmers, stormproof matches, a headlamp 5-pack, a tick remover, an "
             "instant-read thermometer and a star finder. Useful, mostly consumable stocking stuffers for campers of "
             "every age.",
             "2026-11-07", "camping stocking stuffers, stocking stuffers under 25, outdoor stocking stuffers, gifts for campers, christmas stocking ideas"))

# 6. Nov 8  Stocking stuffers for kids
pin_v3c(P("kids-stocking-stuffers-v3c"), MARSHMALLOW, "62% 50%",
        "Under $25 for little campers", "Stocking Stuffers\nfor [[Kids]]", 96,
        "Roasting sticks, star finders &amp; more",
        [("8", "roasting<br>sticks"), ("100", "glow<br>sticks"), ("$25", "all<br>under")],
        sticker_side="right", sticker_dy=-470)
pins.append(("kids-stocking-stuffers-v3c", "v3c", "/guides/camping-stocking-stuffers",
             "Stocking Stuffers for Kids Who Camp", "Family Camping for Beginners",
             "Little camping gifts for kids that fit in a stocking: roasting sticks, a bug-catcher magnifier, a pocket "
             "tree guide, a star finder, a kid-size food jar and glow sticks for after-dark games. All under $25.",
             "2026-11-08", "kids stocking stuffers, camping stocking stuffers, outdoor gifts for kids, small gifts for kids, camping with kids"))

# 7. Nov 9  Gifts for new campers
pin_v3a(P("new-camper-gifts-v3a"), "6", "Gaps Every\n[[New Camper]]\nHas",
        "Skip the tent. Give the gear first-timers always forget on night one.",
        [(TENT_DOOR, 20, 110, 460, 520, -8, "50% 50%"),
         (FLATLAY, 520, 120, 450, 520, 7, "50% 50%"),
         (PAD_DOORWAY, 190, 170, 620, 600, -2, "45% 50%")],
        "3", "starter<br>bundles", sticker_side="right", head_px=80)
pins.append(("new-camper-gifts-v3a", "v3a", "/guides/gifts-for-new-campers",
             "Gifts for New Campers: What Beginners Are Always Missing", "Family Camping for Beginners",
             "Someone on your list wants to try camping? Skip the tent. Give the gear first-timers always forget: "
             "headlamps for everyone, a simple camp stove, a cook kit, a first aid kit, a foam pad and a power bank. "
             "Plus starter bundle ideas.",
             "2026-11-09", "gifts for new campers, beginner camping gifts, first time camping, camping starter kit, camping for beginners"))

# 8. Nov 10  Starter gift bundles
pin_v3c(P("starter-bundles-v3c"), TENT_DOOR, "50% 50%",
        "First camping trip", "Starter Gift\n[[Bundles]]", 112,
        "First night, kitchen &amp; peace of mind",
        [("3", "starter<br>bundles"), ("5", "headlamps<br>in a pack"), ("1", "burner<br>stove")],
        sticker_side="left", sticker_dy=-470)
pins.append(("starter-bundles-v3c", "v3c", "/guides/gifts-for-new-campers",
             "First Camping Trip Starter Gift Bundles", "Family Camping for Beginners",
             "Three gift bundles for a family planning their first camping trip: the first-night kit, the camp kitchen "
             "and the peace of mind kit. Fills the gaps borrowed gear always has, so the first night goes smoothly.",
             "2026-11-10", "camping starter kit, beginner camping gear, gifts for beginners, first camping trip, family camping gifts"))

# 9. Nov 11  Camping gifts under $50
pin_v3a(P("gifts-under-50-v3a"), "$50", "Real Gear,\nNot\n[[Gadgets]]",
        "A vacuum bottle, a power bank, a first aid kit and a water filter, all $25 to $50.",
        [(CAMPFIRE, 20, 110, 460, 520, -8, "55% 50%"),
         (PAD_DOORWAY, 520, 120, 450, 520, 7, "45% 50%"),
         (TARP_DUSK, 190, 170, 620, 600, -2, "45% 50%")],
        "40", "oz vacuum<br>bottle", sticker_side="left", number_px=250, head_left=470, head_px=84)
pins.append(("gifts-under-50-v3a", "v3a", "/guides/camping-gifts-under-50",
             "Camping Gifts Under $50: Real Gear Campers Use Every Trip", "Camping Gear Guides",
             "Camping gifts under $50 that are real gear: a 40 oz vacuum bottle, a power bank, a family first aid kit, a "
             "squeeze water filter, a camp stove and a packable bocce set. Plus picks for kids like a fishing combo and "
             "a ukulele.",
             "2026-11-11", "camping gifts under 50, affordable camping gifts, gifts for campers, budget christmas gifts, outdoor gear gifts"))

# 10. Nov 12  Gifts for the camp cook
pin_v3c(P("camp-cook-gifts-v3c"), CAMPFIRE, "55% 50%",
        "Under $50", "Gifts for the\n[[Camp Cook]]", 108,
        "Hot drinks all day &amp; easy dinners",
        [("40", "oz vacuum<br>bottle"), ("1", "burner<br>stove"), ("2", "place<br>settings")],
        sticker_side="left", sticker_dy=-470)
pins.append(("camp-cook-gifts-v3c", "v3c", "/guides/camping-gifts-under-50",
             "Camping Gifts for the Camp Cook Under $50", "Camp Meals & Snacks",
             "Gifts for the family camp cook: a vacuum bottle that keeps cocoa hot all day, a single-burner propane "
             "stove and a nesting cookware kit with plates and cups for two. Practical gifts that make camp dinners "
             "easier.",
             "2026-11-12", "camp cooking gifts, camping kitchen gear, gifts for campers, camping gifts under 50, camp cook"))

# CSV: utm_content=<file name> keeps every Link unique even when two pins share a guide.
HEADER = ["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"]
rows = []
for f, style, path, title, board, desc, date, kw in pins:
    assert len(title) <= 100 and 150 <= len(desc) <= 400, (f, len(title), len(desc))
    utm = f"?utm_source=pinterest&utm_medium=social&utm_campaign={BATCH}&utm_content={f}"
    rows.append({"Title": title, "Media URL": f"{SITE}/pins/{BATCH}/{f}.jpg", "Pinterest board": board, "Thumbnail": "",
                 "Description": desc, "Link": f"{SITE}{path}{utm}", "Publish date": f"{date}T{TIME}", "Keywords": kw})
links = [r["Link"] for r in rows]
assert len(set(links)) == len(links), "duplicate Link"
dates = [r["Publish date"] for r in rows]
assert len(set(dates)) == len(dates), "two pins on one date"
with open(os.path.join(REPO, "pinterest", "batch3", "pinterest-bulk-upload.csv"), newline="") as fh:
    batch3_days = {r["Publish date"][:10] for r in csv.DictReader(fh)}
assert not batch3_days & {d[:10] for d in dates}, "shares a publish day with batch3"
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
              "Trailstead Pinterest batch 4: gift guides (Nov 3 to Nov 12)", cols=5)
