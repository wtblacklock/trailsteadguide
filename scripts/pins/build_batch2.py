"""Trailstead Pinterest batch 2: holiday gift guides (2026-10-29 to 2026-11-07).
DRAFT: pins are not rendered or uploaded yet. Rendering downloads the Unsplash photos below.
Usage: /usr/bin/python3 scripts/pins/build_batch2.py

Image briefs (one per row in pinterest/batch2/pinterest-bulk-upload.csv). All photo ids are
already used as guide hero images on the site.
  family-gifts            Dad and two kids eating at a campsite picnic table. Warm, shared-moment feel.
  gift-guide-flatlay      Flat lay of jacket, boots, map and compass. Reads as "gift guide" at a glance.
  kids-gifts              Child eating a toasted marshmallow off a roasting stick.
  kids-gift-bundles       Two laughing girls in front of a red tent in fall leaves.
  stocking-stuffers       Orange dome tent glowing at blue hour. Cold, cozy, seasonal.
  kids-stocking-stuffers  Lantern-lit tent among bare trees on a dark autumn night.
  new-camper-gifts        Camper in a tent doorway unrolling a sleeping pad. First-trip energy.
  starter-bundles         View out of an orange tent door onto a pine forest campsite.
  gifts-under-50          Lanterns strung under a tarp over a camp table and chairs at dusk.
  camp-cook-gifts         Lantern-lit tents around a campfire in a forest campground at night.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin, REPO

OUT = os.path.join(REPO, "public", "pins", "batch2")

pin(OUT, "family-gifts", "2026 holiday gift guide", "Best Camping Gifts<br>for Families",
    "Gifts the whole family uses together", "photo-1701318967976-aba1311c21ae", "50% 50%", head_px=88)
pin(OUT, "gift-guide-flatlay", "Kids, beginners &amp; every budget", "Camping<br>Gift Guide",
    "Gear campers use every trip", "photo-1485809052957-5113b0ff51af", "50% 50%", head_px=104)
pin(OUT, "kids-gifts", "Sorted by age", "Gifts for Kids Who<br>Love Camping",
    "Headlamps, roasting sticks &amp; more", "photo-1756719097664-82e33a1b1ac2", "50% 50%", head_px=88)
pin(OUT, "kids-gift-bundles", "Easy gift bundles", "Outdoor Gifts<br>for Kids",
    "Bug detective to night owl", "photo-1674230316788-d9c8b92f0d63", "45% 50%", head_px=100)
pin(OUT, "stocking-stuffers", "All under $25", "Camping<br>Stocking Stuffers",
    "Small gifts that actually get used", "photo-1513781419235-2988ecacab83", "50% 55%", head_px=92)
pin(OUT, "kids-stocking-stuffers", "Under $25 for little campers", "Stocking Stuffers<br>for Kids Who Camp",
    "Roasting sticks, star finders &amp; more", "photo-1603738397297-a374b78e9626", "50% 60%", head_px=84)
pin(OUT, "new-camper-gifts", "Skip the tent", "Gifts for<br>New Campers",
    "What every beginner is missing", "photo-1698731048404-1c12d7189e48", "50% 50%", head_px=100)
pin(OUT, "starter-bundles", "First camping trip", "Starter Gift<br>Bundles",
    "First night, kitchen &amp; peace of mind", "photo-1504280390367-361c6d9f38f4", "50% 50%", head_px=100)
pin(OUT, "gifts-under-50", "Real gear, not gadgets", "Camping Gifts<br>Under $50",
    "Stove, power bank, first aid &amp; more", "photo-1749008078593-418ca225b82b", "50% 50%", head_px=100)
pin(OUT, "camp-cook-gifts", "Under $50", "Gifts for the<br>Camp Cook",
    "Hot drinks all day &amp; easy dinners", "photo-1587547131116-a0655a526190", "50% 50%", head_px=100)
print("pins written to", OUT)
