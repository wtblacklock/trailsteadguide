"""Trailstead Pinterest batch 2 (2026-10-15 to 2026-10-21), v3a / v3c alternating.
Usage: /usr/bin/python3 scripts/pins/build_batch2.py
Writes public/pins/batch2/*.jpg, pinterest/batch2/pinterest-bulk-upload.csv and pinterest/batch2/contact.jpg."""
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin_v3a, pin_v3c, photo, printable_shot, contact_sheet, REPO

BATCH = "batch2"
OUT = os.path.join(REPO, "public", "pins", BATCH)
P = lambda n: os.path.join(OUT, f"{n}.jpg")
SITE = "https://www.trailsteadguide.com"
UTM = f"?utm_source=pinterest&utm_medium=social&utm_campaign={BATCH}"
pins = []  # (file, style, path, title, board, description, date, keywords)

# 1. Oct 15  How to keep kids warm camping (Search Console: 6 clicks, position 6.4)
pin_v3c(P("keep-kids-warm-v3c"), photo("photo-1624923686627-514dd5e57bae"), "50% 60%",
        "Cold night camping with kids", "Keep Kids\n[[Warm]] All Night", 108,
        "The ground-up sleep system for tents",
        [("R4", "pad for<br>cold nights"), ("20°", "bag for<br>the 30s"), ("2am", "cold kid<br>fix")], sticker_dy=-480)
pins.append(("keep-kids-warm-v3c", "v3c", "/guides/how-to-keep-kids-warm-camping",
             "How to Keep Kids Warm Camping: Cold Night Sleep System for Families", "Family Camping for Beginners",
             "Kids get cold in a tent long before adults do. Learn the ground-up sleep system that fixes it: an insulated "
             "pad around R 4, a 20 degree bag for nights in the 30s, what kids should wear to bed, the bedtime snack that "
             "helps, and what to do when a child wakes up cold at 2 a.m.",
             "2026-10-15", "keep kids warm camping, cold weather camping with kids, fall camping with kids, kids sleeping bag, camping with kids"))

# 2. Oct 16  Kids camping packing list printable (Search Console: 7 clicks, 4.7% CTR)
pin_v3a(P("kids-packing-list-v3a"), "35", "Things Kids\nNeed to\n[[Pack]]",
        "One free printable list for ages 2 to 12, in three age tiers with checkboxes.",
        [(photo("photo-1674230316788-d9c8b92f0d63"), 20, 110, 460, 520, -8, "45% 50%"),
         (photo("photo-1756719097664-82e33a1b1ac2"), 520, 120, 450, 520, 7, "50% 40%"),
         (printable_shot("kids-camping-packing-list"), 190, 150, 620, 608, -2, "top")],
        "3", "age tiers<br>2 to 12", sticker_side="right", head_px=76)
pins.append(("kids-packing-list-v3a", "v3a", "/printables/kids-camping-packing-list",
             "Free Printable Kids Camping Packing List: Ages 2 to 12 Checklist", "Family Camping for Beginners",
             "A free one-page kids camping packing list with checkboxes. Start with the universal layer every child needs, "
             "then add the tier for toddlers (2 to 4), early elementary (5 to 8) or older kids (9 to 12). Older kids can "
             "check off their own tier. Letter or A4, free with email signup.",
             "2026-10-16", "kids camping packing list, camping checklist printable, camping with kids, toddler camping, family camping list"))

# 3. Oct 17  Weekend camping packing list (Search Console: 626 impressions)
pin_v3c(P("weekend-packing-list-v3c"), photo("photo-1455763916899-e8b50eca9967"), "50% 55%",
        "2-night family car camping", "Weekend\nCamping [[List]]", 112,
        "Nothing on it you won't use",
        [("2", "nights<br>covered"), ("3", "labeled<br>bins"), ("6", "gear<br>groups")], sticker_side="right", sticker_dy=-470)
pins.append(("weekend-packing-list-v3c", "v3c", "/guides/weekend-camping-packing-list",
             "Weekend Camping Packing List for Families: 2-Night Car Camping Checklist", "Family Camping for Beginners",
             "Everything a family needs for a 2-night car camping trip, grouped by shelter, kitchen, clothing, lighting and "
             "power, and safety. Plus a kids add-on list, a weekend meal plan to copy, a night-before checklist and the "
             "three-bin packing system that ends trunk chaos.",
             "2026-10-17", "weekend camping packing list, camping checklist, car camping list, family camping gear, what to pack for camping"))

# 4. Oct 18  Camping in 30 and 40 degree weather (new guide, fall season)
pin_v3a(P("forty-degree-camping-v3a"), "10°", "Below the\nForecast\n[[Low]]",
        "The sleeping bag rule for 30 and 40 degree nights, plus the pad and bedtime plan.",
        [(photo("photo-1513781419235-2988ecacab83"), 20, 110, 460, 520, -8, "50% 50%"),
         (photo("photo-1775626094623-99a26d94dc64"), 520, 120, 450, 520, 7, "50% 50%"),
         (photo("photo-1476041800959-2f6bb412c8ce"), 190, 170, 620, 600, -2, "50% 50%")],
        "R2", "foam pad<br>under yours", sticker_side="left", number_px=300, head_left=470, head_px=76)
pins.append(("forty-degree-camping-v3a", "v3a", "/guides/camping-in-40-degree-weather",
             "Camping in 30 and 40 Degree Weather: Sleeping Bag, Pad and Bedtime Tips", "Camping Skills",
             "Is 40 degrees too cold to camp? Not with the right setup. Pick a sleeping bag rated about 10 degrees below "
             "the forecast low, slide a foam pad under your air mattress, wear dry layers to bed and bring a stove that "
             "works in the cold. Plus the signs it is time to pack up and head home.",
             "2026-10-18", "camping in 40 degree weather, cold weather camping, fall camping tips, sleeping bag temperature rating, tent camping in the cold"))

# 5. Oct 19  Family camping on a budget (Search Console: 387 impressions)
pin_v3c(P("camping-budget-v3c"), photo("photo-1620439032751-d2011065c735"), "50% 55%",
        "Family camping for less", "Camping\n[[on a Budget]]", 112,
        "Cheap gear, cheap sites, cheap food",
        [("$300", "full gear<br>setup"), ("$25", "state park<br>sites from"), ("$120", "2 nights<br>for four")])
pins.append(("camping-budget-v3c", "v3c", "/guides/family-camping-on-a-budget",
             "Family Camping on a Budget: Gear Up Under $300 and Find Cheap Campsites", "Campsite Reservations & Trip Planning",
             "How to start family camping without spending a fortune: borrow, buy used and fill the gaps for under $300 in "
             "gear, book $25 to $40 state park sites or free campsites, and keep food costs low. A 2-night trip for four "
             "runs about $80 to $120, versus $300 or more for a hotel weekend.",
             "2026-10-19", "family camping on a budget, cheap camping, camping for beginners, budget camping gear, free campsites"))

# 6. Oct 20  Thanksgiving camping with kids (seasonal, about 5 weeks out)
pin_v3a(P("thanksgiving-camping-v3a"), "20", "Coals.\nOne Camp\n[[Turkey.]]",
        "A 3 to 4 pound turkey breast in a Dutch oven, with the sides made at home.",
        [(photo("photo-1480779735619-f73b30fdc062"), 20, 110, 460, 520, -8, "50% 50%"),
         (photo("photo-1788404719421-9e2b21a68375"), 520, 120, 450, 520, 7, "50% 55%"),
         (photo("photo-1783335543126-9afdfff4d4ca"), 190, 170, 620, 600, -2, "50% 50%")],
        "165°", "done in the<br>thickest part", sticker_side="right", head_px=80)
pins.append(("thanksgiving-camping-v3a", "v3a", "/guides/thanksgiving-camping-with-kids",
             "Thanksgiving Camping with Kids: Dutch Oven Turkey Plan and Menu", "Camp Meals & Snacks",
             "Plan a Thanksgiving camping trip with kids: find a campground still open in late November, cook a 3 to 4 "
             "pound turkey breast in a Dutch oven over about 20 briquettes, make the sides at home, keep the cooler food "
             "safe and plan for a long, cold evening by the fire.",
             "2026-10-20", "thanksgiving camping, camping with kids, dutch oven turkey, fall camping, camping thanksgiving dinner"))

# 7. Oct 21  Gifts for campers (new guide, holiday shopping season)
pin_v3c(P("gifts-for-campers-v3c"), photo("photo-1485809052957-5113b0ff51af"), "50% 50%",
        "2026 family gift guide", "Gifts for\n[[Campers]]", 116,
        "For the camper who already owns a tent",
        [("$25", "stocking<br>stuffers"), ("$75", "useful<br>upgrades"), ("$80", "park pass<br>for a year")],
        sticker_side="right")
pins.append(("gifts-for-campers-v3c", "v3c", "/guides/gifts-for-campers",
             "Gifts for Campers 2026: Stocking Stuffers Under $25 to Big Family Gifts", "Camping Gear Guides",
             "Camping gift ideas for people who already own a tent: stocking stuffers under $25, useful upgrades from $25 "
             "to $75, bigger gifts, picks for kids who camp, and gifts that are not gear, like the $80 America the "
             "Beautiful national park pass that covers a year of visits.",
             "2026-10-21", "gifts for campers, camping gift ideas, stocking stuffers for campers, outdoor gifts, christmas gifts for families"))

# CSV
HEADER = ["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"]
rows = []
for f, style, path, title, board, desc, date, kw in pins:
    assert len(title) <= 100 and 150 <= len(desc) <= 400, (f, len(title), len(desc))
    rows.append({"Title": title, "Media URL": f"{SITE}/pins/{BATCH}/{f}.jpg", "Pinterest board": board, "Thumbnail": "",
                 "Description": desc, "Link": f"{SITE}{path}{UTM}", "Publish date": f"{date}T14:00:00", "Keywords": kw})
links = [r["Link"] for r in rows]
assert len(set(links)) == len(links), "duplicate Link"
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
contact_sheet([(P(f), f"{d}  {s}", p.split("/")[-1][:30]) for f, s, p, _, _, _, d, _ in pins],
              os.path.join(REPO, "pinterest", BATCH, "contact.jpg"), "Trailstead Pinterest batch 2 (Oct 15 to 21)")
