"""Trailstead Pinterest batch 1 (2026-10-06 to 2026-10-12).
Usage: /usr/bin/python3 scripts/pins/build_batch1.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from build_pins import pin, REPO

OUT = os.path.join(REPO, "public", "pins", "batch1")

pin(OUT, "family-tents", "2026 picks by family size", "Best Family Tents<br>for Beginners",
    "Budget dome to stand-up cabin tents", "photo-1769817535563-f6d28b47e758", "30% 70%", head_px=88)
pin(OUT, "fall-camping", "Beginner's guide", "Fall Camping<br>for Families",
    "Cold nights, early dark &amp; what to pack", "photo-1478131143081-80f7f84ca84d", "45% 50%", head_px=100)
pin(OUT, "halloween-camping", "Campground trick-or-treat", "Halloween<br>Camping with Kids",
    "Costumes that fit over warm layers", "photo-1603738397297-a374b78e9626", "50% 60%", head_px=92)
pin(OUT, "no-cook-meals", "Cooler + picnic table only", "20 No-Cook Camp<br>Meals for Kids",
    "Breakfast, lunch, dinner &amp; snacks", "photo-1692881552711-63ae590ce780", "60% 75%", head_px=92)
pin(OUT, "recreation-gov", "Book the campsite you want", "Recreation.gov<br>Booking Strategy",
    "The 6-month window &amp; the 10am drop", "photo-1786579372510-34591c5321df", "50% 60%", head_px=88)
pin(OUT, "kids-sleeping-bags", "2026 picks by age", "Best Kids<br>Sleeping Bags",
    "From $30 summer bags to 20°F warmth", "photo-1674230316788-d9c8b92f0d63", "45% 50%", head_px=100)
pin(OUT, "cold-weather-meals", "Warm family camp food", "Cold-Weather<br>Camping Meals",
    "One-pot dinners &amp; a hot-drink station", "photo-1788404719421-9e2b21a68375", "50% 55%", head_px=96)
print("pins written to", OUT)
