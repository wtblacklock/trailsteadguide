"""Trailstead Pinterest batch 3 (2026-10-27 to 2026-11-02), v3a / v3c alternating.
Usage: /usr/bin/python3 scripts/pins/build_batch3.py
Writes public/pins/batch3/*.jpg, pinterest/batch3/pinterest-bulk-upload.csv and pinterest/batch3/contact.jpg."""
import csv, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin_v3a, pin_v3c, photo, printable_shot, contact_sheet, REPO

BATCH = "batch3"
OUT = os.path.join(REPO, "public", "pins", BATCH)
P = lambda n: os.path.join(OUT, f"{n}.jpg")
SITE = "https://www.trailsteadguide.com"
UTM = f"?utm_source=pinterest&utm_medium=social&utm_campaign={BATCH}"
pins = []  # (file, style, path, title, board, description, date, keywords)

# 1. Oct 27  How to keep kids warm camping (Search Console: 15 clicks, 465 impressions, position 6.1)
pin_v3c(P("keep-kids-warm-v3c"), photo("photo-1624923686627-514dd5e57bae"), "50% 60%",
        "Cold night camping with kids", "Keep Kids\n[[Warm]] All Night", 108,
        "The ground-up sleep system for tents",
        [("R4", "pad for<br>cold nights"), ("20°", "bag for<br>the 30s"), ("2am", "cold kid<br>fix")], sticker_dy=-480)
pins.append(("keep-kids-warm-v3c", "v3c", "/guides/how-to-keep-kids-warm-camping",
             "How to Keep Kids Warm Camping: Cold Night Sleep System for Families", "Family Camping for Beginners",
             "Kids get cold in a tent long before adults do. Learn the ground-up sleep system that fixes it: an insulated "
             "pad around R 4, a 20 degree bag for nights in the 30s, what kids should wear to bed, the bedtime snack that "
             "helps, and what to do when a child wakes up cold at 2 a.m.",
             "2026-10-27", "keep kids warm camping, cold weather camping with kids, fall camping with kids, kids sleeping bag, camping with kids"))

# 2. Oct 28  When do campgrounds close (Search Console: 670 impressions, position 5.9; late-season timing)
pin_v3a(P("campgrounds-close-v3a"), "2", "Closing\nDates, Not\n[[One]]",
        "Reservations stop weeks before the gate closes, and the water goes off first.",
        [(photo("photo-1478131143081-80f7f84ca84d"), 20, 110, 460, 520, -8, "50% 50%"),
         (photo("photo-1480779735619-f73b30fdc062"), 520, 120, 450, 520, 7, "50% 50%"),
         (photo("photo-1660819731358-e197f235eeb7"), 190, 170, 620, 600, -2, "50% 50%")],
        "OCT", "water often<br>shut off", sticker_side="right", head_px=80)
pins.append(("campgrounds-close-v3a", "v3a", "/guides/when-do-campgrounds-close",
             "When Do Campgrounds Close for Winter? How to Check Before You Book", "Campsite Reservations & Trip Planning",
             "Most campgrounds have two closing dates: reservations often stop weeks before the gate closes, and the water "
             "is usually shut off around mid October even where camping continues. See what stays open all winter, like "
             "vault toilets, one loop and cabins, and the five minute check to run before you book a late season trip.",
             "2026-10-28", "when do campgrounds close, late season camping, fall camping, campground water shut off, off season camping"))

# 3. Oct 29  Weekend camping packing list (Search Console: 717 impressions, 6 clicks)
pin_v3c(P("weekend-packing-list-v3c"), photo("photo-1455763916899-e8b50eca9967"), "50% 55%",
        "2-night family car camping", "Weekend\nCamping [[List]]", 112,
        "Nothing on it you won't use",
        [("2", "nights<br>covered"), ("3", "labeled<br>bins"), ("6", "gear<br>groups")], sticker_side="right", sticker_dy=-470)
pins.append(("weekend-packing-list-v3c", "v3c", "/guides/weekend-camping-packing-list",
             "Weekend Camping Packing List for Families: 2-Night Car Camping Checklist", "Family Camping for Beginners",
             "Everything a family needs for a 2-night car camping trip, grouped by shelter, kitchen, clothing, lighting and "
             "power, and safety. Plus a kids add-on list, a weekend meal plan to copy, a night-before checklist and the "
             "three-bin packing system that ends trunk chaos.",
             "2026-10-29", "weekend camping packing list, camping checklist, car camping list, family camping gear, what to pack for camping"))

# 4. Oct 30  Camping in 30 and 40 degree weather (Search Console: 1,031 impressions, 14 clicks)
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
             "2026-10-30", "camping in 40 degree weather, cold weather camping, fall camping tips, sleeping bag temperature rating, tent camping in the cold"))

# 5. Oct 31  Family camping on a budget (Search Console: 424 impressions)
pin_v3c(P("camping-budget-v3c"), photo("photo-1620439032751-d2011065c735"), "50% 55%",
        "Family camping for less", "Camping\n[[on a Budget]]", 112,
        "Cheap gear, cheap sites, cheap food",
        [("$300", "full gear<br>setup"), ("$25", "state park<br>sites from"), ("$120", "2 nights<br>for four")])
pins.append(("camping-budget-v3c", "v3c", "/guides/family-camping-on-a-budget",
             "Family Camping on a Budget: Gear Up Under $300 and Find Cheap Campsites", "Campsite Reservations & Trip Planning",
             "How to start family camping without spending a fortune: borrow, buy used and fill the gaps for under $300 in "
             "gear, book $25 to $40 state park sites or free campsites, and keep food costs low. A 2-night trip for four "
             "runs about $80 to $120, versus $300 or more for a hotel weekend.",
             "2026-10-31", "family camping on a budget, cheap camping, camping for beginners, budget camping gear, free campsites"))

# 6. Nov 1  Winter break camping with kids (new guide, holiday break about 8 weeks out)
pin_v3a(P("winter-break-camping-v3a"), "15", "Hours of\nDark to\n[[Plan For]]",
        "Christmas break camping with kids: where sites stay open and when to book.",
        [(photo("photo-1615941634977-e895245bafa7"), 20, 110, 460, 520, -8, "50% 50%"),
         (photo("photo-1641435354609-5240e4adb4b6"), 520, 120, 450, 520, 7, "50% 50%"),
         (photo("photo-1627499202567-21fae02ac26e"), 190, 170, 620, 600, -2, "50% 50%")],
        "4:30", "late December<br>sunset", sticker_side="left", head_px=78)
pins.append(("winter-break-camping-v3a", "v3a", "/guides/winter-break-camping-with-kids",
             "Christmas Break Camping with Kids: Where to Go, When to Book, How to Plan", "Family Camping for Beginners",
             "Plan a winter break camping trip with kids: head to Florida, the Gulf Coast, south Texas or the desert "
             "Southwest, or book a state park cabin. Learn why holiday sites need booking months ahead, how to plan each "
             "day around a 4:30 to 5:30 pm sunset and 15 hours of dark, and what New Year looks like at camp.",
             "2026-11-01", "christmas break camping, winter camping with kids, winter break trip ideas, holiday camping, state park cabins"))

# 7. Nov 2  Best camping gifts for families (new gift guide hub, holiday shopping season)
pin_v3c(P("family-camping-gifts-v3c"), photo("photo-1701318967976-aba1311c21ae"), "50% 50%",
        "2026 family gift guide", "Camping Gifts\nfor [[Families]]", 108,
        "Gifts the whole family uses together",
        [("5", "headlamps<br>in a pack"), ("$25", "stocking<br>stuffers"), ("4", "gift<br>guides")],
        sticker_side="right", sticker_dy=-470)
pins.append(("family-camping-gifts-v3c", "v3c", "/guides/best-camping-gifts-for-families",
             "Best Camping Gifts for Families 2026: Shared Gifts Kids and Parents Use", "Camping Gear Guides",
             "Camping gift ideas the whole family uses together: a headlamp pack so every kid has a light, a camp game "
             "for the campsite lawn, a fire pit or a Dutch oven for campfire dessert. Plus three rules for family gifts "
             "and four more guides for kids, new campers, stocking stuffers and gifts under $50.",
             "2026-11-02", "camping gifts for families, family camping gift ideas, christmas gifts for campers, camping gifts for kids, outdoor family gifts"))

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
              os.path.join(REPO, "pinterest", BATCH, "contact.jpg"), "Trailstead Pinterest batch 3 (Oct 27 to Nov 2)")
