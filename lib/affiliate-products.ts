import type { AffiliateProduct, PlanSlug } from '@/types'

/**
 * Affiliate product registry.
 *
 * The first block (no `deprecated` flag) is the active recommendation
 * set — these are what render on guide gear shelves, the quiz results
 * `<AffiliateBlock>`, and the Trip Pack PDF bundles. Sourced from the
 * curated worksheet in `data/affiliate-coverage.csv`.
 *
 * The second block (`deprecated: true`) keeps older products in the
 * registry so the `/compare/*` editorial pages and historical references
 * keep rendering. Anything reached via `getGearForGuide()` or the new
 * recommendation paths excludes deprecated entries.
 */
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  // ------------------------------------------------------------------
  // Active recommendation set — sourced from data/affiliate-coverage.csv
  // ------------------------------------------------------------------
  {
    id: 'coleman-sundome-4p',
    name: 'Coleman Sundome 4-Person',
    description:
      'Best-selling family dome tent. 9×7 ft floor, weatherproof, fits a queen air bed. Sets up in under 15 minutes. Coleman makes the Sundome in 2/3/4/6-person sizes — the price scales with capacity, so pick the size that matches how you want to set up your campsite.',
    amazonAsin: 'B0D7QHY574',
    affiliateUrl: 'https://www.amazon.com/Coleman-Weatherproof-Festivals-Backyard-Sleepovers/dp/B014LSDUA8?crid=3MOAVIUB84GDZ&dib=eyJ2IjoiMSJ9.0tQWSmCU69vhKp5wEzg7z70DSRLn7xdDafF8ubM9ecUO7JaFy8khwwmXNOXM6y178YQZFX4aeoYuU84CD5klfXdQtwMdYCjxsiHTPU4DAqe66bM8u1MCb2fPvvc7uXZkvRC-R_bHFo5JTCJsRtGVCvhUToRQN_VQYaFUoQvdokAp0KHng1QoaOULTckEzleB41Mv-Lkq6skuFw2bXkuGnWruuTk5g68ihWeazZ60eJQ.BiVIwtlKXEkmKlfIrIRnWrA7ZAaJa83-r5-68kU1R48&dib_tag=se&keywords=coleman%2Bsundome%2B4-person%2Btent&qid=1777560530&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=coleman%2Bsund%2Caps%2C168&sr=8-3&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=cd38bd0b52000c5b15696eb881e6c92d&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71wxEg6ubCL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$68',
    tags: ['tent', 'family', 'budget', 'beginner', 'rain-ready', 'with-kids'],
    slot: 'TENT',
  },
  {
    id: 'fanttik-zeta-c6-pro',
    name: 'Fanttik Zeta C6 Pro',
    description:
      'Pop-up cabin tent for 6+. Vertical walls, fast pitch, two doors. The size-up pick when you want room to stand.',
    amazonAsin: 'B0CRL4GDDR',
    affiliateUrl: 'https://www.amazon.com/FanttikOutdoor-Windproof-Portable-Upgraded-Ventilation/dp/B0CRL4GDDR?th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=4c6ef412f272f8024b8c3ef43a24eb5f&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/61vY3Vy0leL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$179',
    tags: ['tent', 'family', 'mid-range', 'comfort'],
    slot: 'TENT',
  },
  {
    id: 'alps-lynx-4p',
    name: 'ALPS Mountaineering Lynx 4-Person Tent',
    description:
      'Sturdier free-standing 4-person tent than the budget picks. Better fly coverage and pole quality for the price.',
    amazonAsin: 'B0CXKQWRDD',
    affiliateUrl: 'https://www.amazon.com/ALPS-Mountaineering-Lynx-4-Person-Tent/dp/B0CXKQWRDD?crid=20LCQ5IY2ZP2P&dib=eyJ2IjoiMSJ9.17xNslc2J4zELbsb3QgoYVOQhbTEipt02yPPgI47S6K1CrYLgm7kHTfaRTXru4DwV0ZS8QQuaaKZ7egE9u5P4qPy0827zl-es24P35zMu71ENfEH0Cmf_X4uDlBCV5fCeIT2H_HMrfQHf26Te2lc6uf8F0SQzkDvBoosAQwDGA8S84c4Ohef1y4gBhRJ6LNQi44mbPNB4irgzvMNjjp3NImUkGRnKy9L-UnCyctgw82pYG00eJgeKgSn4ob02e1LY06yqAp5j9mkWH8y3oEKAJFDeXbBpIniEPzZ-ZlMM_g.cZnpWS_S2qpV1BprrSumLG-hXxw0HndhMMzGTT6tYr0&dib_tag=se&keywords=ALPS%2BMountaineering%2BLynx%2B4-Person%2BTent&qid=1777553192&s=sporting-goods&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=alps%2Bmountaineering%2Blynx%2B4-person%2Btent%2B%2Csporting%2C113&sr=1-3&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=49908f5dbcc4e0608f7c7f2a53f54bba&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/51LCvZqQ1rL._AC_SL1000_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$190',
    tags: ['tent', 'family', 'mid-range', 'comfort'],
    slot: 'TENT',
  },
  {
    id: 'tnf-wawona-6',
    name: 'The North Face Wawona 6',
    description:
      '6-person tent with a huge vestibule. The pick when heat or sun makes the porch as important as the inner room.',
    amazonAsin: 'B0DG5XTJTY',
    affiliateUrl: 'https://www.amazon.com/NORTH-FACE-Wawona-Six-Person-Camping/dp/B0DG5XTJTY?crid=37R2CF7KGYB14&dib=eyJ2IjoiMSJ9.kiEScRk9mcf5kKbaCg0oL8aCb0Z-FuIE2XOXlrMExF6aWWj1MBmYHk71r8s4NZkj3HStj8M2QgtHU_kdykB8IH_csppqQVHRJnK6XdYub30FLyt5qiNPuPeYLmJtVVx0SVv58crLs8YrCVyhMo4O7inDixDY3RgB-E-tzGfDFRGMxx4udZtv2oCDLYL4r9QjbPwq3cKAPeJDwLlov-tk6Wyu-JPeMPs1PQXkdAt6bxo._lAaSE6tn7PtobF--qZeSEa6MnVvx2rCDaJ4a2TToAE&dib_tag=se&keywords=The%2BNorth%2BFace%2BWawona%2B6&qid=1777560305&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=red%2Bcross%2Bdeluxe%2Bfamily%2Bfirst%2Baid%2Bkit%2Caps%2C293&sr=8-2&th=1&psc=1&linkCode=ll2&tag=trailsteadgui-20&linkId=3b65226f8cf9366665859e4d86c34524&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/61ypWVbZ2AL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$585',
    tags: ['tent', 'family', 'premium', 'comfort', 'shade', 'heat-friendly'],
    slot: 'TENT',
  },
  {
    id: 'coleman-brazos-bag',
    name: 'Coleman Brazos Sleeping Bag',
    description:
      '3-season cool-weather sleeping bag. Roomy fit, easy to wash, comfortable down to the 40s.',
    amazonAsin: 'B0D6416YYW',
    affiliateUrl: 'https://www.amazon.com/Coleman-Cool-Weather-Sleeping-No-Snag-Washable/dp/B0D6416YYW?adgrpid=188093004202&dib=eyJ2IjoiMSJ9.jJq-2VQZNaxdusBvdkxJKynMjMlsq1HW5gDrJUVOCYuHneuqehXZccOayUTPfg6UTvsOrvYx6ss0SEI4k_kQjeHsJnh1ObWAtv3bH3HkC9XPq8exF1-pgdew8Qrnm1xucHYgLQnTRPjIlpGHr8_27z0g5vsaaYMg2f9p9EFu7Q7CUd5Mqha7sBWuIel3UyZ1RvyGvRrW7AxvrlSzADPT43uINUDPbgs11FElpwmnyqI.2AFcdIf7GQCWFgh8OPoBqH2BS_gpEIh2yz7AKUJPhV4&dib_tag=se&hvadid=779595634221&hvdev=c&hvexpln=0&hvlocphy=9028313&hvnetw=g&hvocijid=522342261972173377--&hvqmt=e&hvrand=522342261972173377&hvtargid=kwd-297383408348&hydadcr=2835_13541411_2134302&keywords=coleman%2Bbrazos&mcid=836d26f5af013e9a8689e52c7b5fd88d&qid=1777558687&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-2&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=a85bbe52f14247c1faa0c6fbfa9aa148&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71SIunv+zrL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$54',
    tags: ['sleeping-bag', 'budget', 'beginner'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'vumos-bag-liner',
    name: 'Vumos Sleeping Bag Liner',
    description:
      'Sleeping bag liner. Adds warmth in shoulder seasons, keeps the bag clean, doubles as a sheet in heat.',
    amazonAsin: 'B07PRRV7NM',
    affiliateUrl: 'https://www.amazon.com/Vumos-Sleeping-Liner-Camping-Sheet/dp/B07PRRV7NM?crid=9S2Y4ZK1FQZW&dib=eyJ2IjoiMSJ9.DRfj0zMcKBImp3I5M-Pz37TvUaosXuaWPwFPxFfKt1KSoThVMlQU-IPavBGMCmRlbfrEC1tTfK4lCA-Eeu44YQxn5hPhrEPRz0dMs_y2cZZy6pGFYVFMn_aKVglDsNJWCpNZCSkVkKBBDjOgujh-Bnm6vdnm8jExJIJl7wfOKAxcHnxl8MSuXPyVx5f2HAMk3NdrvhUm3AhX7TY0k9HEGJFBMGr7J3U8Fz03lsVis3IspILx3_D0Pzt_RN4udyycImRVavPG80apYHoWmq--aRBfgdyGLGFxb3173EW2nCA.OsWpUM6Sz9sXGJ64tLvNfOEx-CYa707Yo61iCBfV3LA&dib_tag=se&keywords=sleeping%2Bbag%2Bliner&qid=1777561011&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=sleeping%2Bbag%2Bliner%2Caps%2C162&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&psc=1&linkCode=ll2&tag=trailsteadgui-20&linkId=d3e3af960c945e31307b10389cf52bc5&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/61eaYiIy1wL._AC_SX679_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$20',
    tags: ['sleeping-bag', 'budget', 'cold-ready', 'comfort'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'big-agnes-divide',
    name: 'Big Agnes Divide UnInsulated Pad',
    description:
      'Lightweight self-inflating pad. Real comfort upgrade over foam, packs small.',
    amazonAsin: 'B0BPD3SSV9',
    affiliateUrl: 'https://www.amazon.com/Big-Agnes-Lightweight-Warm-Weather-Sleeping/dp/B0BPD3SSV9?crid=3S7L654WEZNV4&dib=eyJ2IjoiMSJ9.cW8-83PNwA-9KKZS3WpTht-PUGtLEnlrtW4Vn9TuMLJr9AXNm3CIyaH56ErUKgY8e77IzSysOnwHWFm2O_MjBZXE2DV2Lw25NfR2uu2QijHKrWcxcC6qkk7zBXOdJtnYFGAt5T0dmVByhP-6T-jqFkgX8Zor5sVrs-OUTSATIaIo0BzuoPNLwYYw1QHPfypq-lT0Dz3UMKyB35M67UFzG-kg-bTGltw63Pbm5mjsq3Y.VQoKFxCG88_VOHT9OgUfDo_2ECLRALfdZl3zStALwIE&dib_tag=se&keywords=Big%2BAgnes%2BDivide%2BInsulated&qid=1777558777&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=big%2Bagnes%2Bdivide%2Binsulated%2Caps%2C213&sr=8-4&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=ca7a8e51629ce379011c0ace55c7b408&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/61M0wRnoksL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$100',
    tags: ['sleeping-pad', 'mid-range'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'mondoking-3d-pad',
    name: 'MondoKing 3D Self-Inflating Pad',
    description:
      'Thick self-inflating luxury pad. The closest a pad gets to a real mattress.',
    amazonAsin: 'B0CQRVCFH8',
    affiliateUrl: 'https://www.amazon.com/Therm-Rest-MondoKing-Self-Inflating-Sleeping/dp/B0CQRVCFH8?crid=14UBD8ICGMH15&dib=eyJ2IjoiMSJ9.EeiE7j-YEeufOWPhyr168Xoc7YPbGGrDOkrtvWEA0s_je6vKFpHWiwsii5I-KiqSUpmVjIB2EYsyNBMFS6cui-0Tdhe6HPjl5Mpv1E_Vzo3BjMmHA4TS5sMjpri9uuMKM9cxn_cerzSl7s6h2BkprckgBwtEvp_hv3EjIc19ExEIMvxNSMoZuT9jiRZ1_c6_97SfiP3m-sM5qN1AEJkQNR0gUJZ1Wj_azLUZ-1p_Dvf9t-nngJOjIIdxhLz2WeWJIr-F2QWLKam5-vQcFjLMg-hWgoDjJtoD8wgvVwKwkYE.C3xx5GaeG__26AuMycbtzJ91k0kpvHM_ziBdaUE1SnY&dib_tag=se&keywords=Therm-a-Rest%2BLuxuryMap&qid=1777558962&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=therm-a-rest%2Bluxurymap%2Caps%2C188&sr=8-4-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=e566b78eea82bfc5037dbdf4829afacf&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71+BNN310+L._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$260',
    tags: ['sleeping-pad', 'premium', 'comfort'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'lost-horizon-air-foam-mattress',
    name: 'LOST HORIZON Air & Foam Mattress',
    description:
      'Queen-size air-and-foam camping mattress. Built-in pump, stays inflated all night. The comfort pick for car camping.',
    amazonAsin: 'B0DGGB2NFJ',
    affiliateUrl: 'https://www.amazon.com/dp/B0DGGB2NFJ?th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=4659990109dd3b943d4f1f3c9997da57&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/81zVcTv3MNL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$210',
    tags: ['air-mattress', 'family', 'comfort'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'coleman-triton-2-burner',
    name: 'Coleman Triton+ 2-Burner Propane Stove',
    description:
      'Two-burner propane stove. 22,000 BTU per burner, wind-blocking panels, matchless ignition. Cooks real meals.',
    amazonAsin: 'B09HN1YW6V',
    affiliateUrl: 'https://www.amazon.com/Coleman-Portable-Adjustable-Push-Button-Tailgating/dp/B09HN1YW6V?crid=16C97B8NCLDWG&dib=eyJ2IjoiMSJ9.mEaeX4oDkZDcOALKKAGYSIKsboNwIY592FhhdIKU3eaCv6Csv8j5abQ9nafXXZZqVIii8_KVfNInitx9RuDyCocR3hOJYldfniRwIFrqw84Bn5EVxjcuQdXg99KyFpRI0c5dZRgv5Jw53_QJo454VpbR0Yn272Cnx-q4jimh6aZ9nm015evpgtdXaIMmpI-od69RlW8RdFTAq3rbLkcH5mUjvBFKveRYdqaxcfL3Jmvz4Yjk8iIVCc9Gfx9hDiD9kT1WAweuErbVwetLwfRJsYYb-4hdTX3LXuC4tU91B0g.AULV8FxveAJ3mBM4Q9Oy-ah-DnjOUOscLzwQLu7qFro&dib_tag=se&keywords=Coleman+Classic+2-Burner+Camp+Stove&qid=1777559230&s=sporting-goods&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=coleman+classic+2-burner+camp+stove%2Csporting%2C178&sr=1-3&linkCode=ll2&tag=trailsteadgui-20&linkId=c1407526bca4d4f1f09b2e4c03eb48fc&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71XpkqycxmL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$108',
    tags: ['stove', 'family', 'mid-range', 'comfort'],
    slot: 'STOVE',
  },
  {
    id: 'coleman-1-burner',
    name: 'Coleman 1-Burner Propane Stove',
    description:
      'Single-burner propane stove. Reliable under fire bans, boils water fast, no learning curve.',
    amazonAsin: 'B0009PUR5E',
    affiliateUrl: 'https://www.amazon.com/dp/B0009PUR5E?&linkCode=ll2&tag=trailsteadgui-20&linkId=335dbf9851830c9932be561ce0f165ea&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71urdCM7LAL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$40',
    tags: ['stove', 'budget', 'beginner', 'rain-ready', 'heat-friendly'],
    slot: 'STOVE',
  },
  {
    id: 'coleman-classic-rolling-cooler',
    name: 'Coleman Classic Rolling Cooler 100QT',
    description:
      '100-quart rolling cooler with telescoping handle. Wheels matter when summer parking is a hike from the site.',
    amazonAsin: 'B08LMVJJ9Q',
    affiliateUrl: 'https://www.amazon.com/dp/B08LMVJJ9Q?th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=4a690a56fd84c805e8fcc82675496e5d&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71qyOkQOgDL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$107',
    tags: ['cooler', 'family', 'mid-range', 'comfort', 'heat-friendly'],
    slot: 'COOLER',
  },
  {
    id: 'luminaid-packlite-max',
    name: 'LuminAid PackLite Max 2-in-1',
    description:
      'Inflatable solar lantern + phone charger. Bright, packable, and weather-resistant — pulls double duty.',
    amazonAsin: 'B08JX5STJ6',
    affiliateUrl: 'https://www.amazon.com/Camping-Lantern-Solar-Phone-Charger/dp/B08JX5STJ6?crid=2V0N7H24Y51QX&dib=eyJ2IjoiMSJ9.bE_Y7oRAONyEn8g7g80JySNWYW6-F9x1pZERcPSu0wM_Nyp4r_4kQNv2ANHrSDBkmVb-X_UaVuZ9M-3YHA4LrA5JJsrEuVaR9wHLOXMAVWJtDbBAPuGJKGYJIvaYn0GPRn6s4GtFT1beLReg_TKOHkpAS_EB_KDYMS4gTtq9pBmpVlgnW20pxj_pezP5CrshYwUSKD2LJIXGXsgWK3isXdH6GIGdnqBoWmPmWOaSeVSr74N-RNmyoG63TQ0r-I0ct7Q0MJwkGp3GTuDgFQluPcaMePTvVA3bQu5wYEkgSmw.n-D9h1CDB0HVV011xXZwR_E2qPfz7UEhwwCL31vnZ7U&dib_tag=se&keywords=LuminAid+Packlite+Max+2-in-1&qid=1777559482&s=sporting-goods&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=luminaid+packlite+max+2-in-1+%2Csporting%2C158&sr=1-6&linkCode=ll2&tag=trailsteadgui-20&linkId=babddd1fd95a01677d30fc48cf0457e6&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/717hSIbDzlL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$75',
    tags: ['lantern', 'mid-range', 'rain-ready'],
    slot: 'LIGHTING',
  },
  {
    id: 'streamlight-protac-2',
    name: 'Streamlight ProTac 2.0 Flashlight',
    description:
      'High-output handheld flashlight. Long throw, runs on rechargeable or AA cells. The "find it in the dark" tool.',
    amazonAsin: 'B0BN6S5PMQ',
    affiliateUrl: 'https://www.amazon.com/Streamlight-89000-2000-Lumen-Rechargeable-Flashlight/dp/B0BN6S5PMQ?crid=2HG8OMINXBT4N&dib=eyJ2IjoiMSJ9.1ejqOTI3Ks5iH5jvickEYmUxfiZeV_JVZBpnvAYvibkDblcItU6mSwTlCh3csDpNa8Aw4fMn9ztTb9dj5-H8WhIuqKyFbfp-YFzknc-3Sy_qs8ppQLLpTLraPuGwxBHbkOKWOm3V51XXXccSbrbaevuUY8tOGaDjS9cD9uWL5k-orkyHfFvi0nWCq7vIEGoWn-8w-f9DqGE7_wsDI4j9C76kwqI7oXZYTbv_CjhXOARP7X-InWpQmso-pFQKgi96yJX4Mk4F2pSPe0XNVqBZHnsmGVt6Kq8NwyffsnbwX-4.MiDV0dKYApR7PFJTubGfBkgMqCKfcz8jdJfdwuDnDhA&dib_tag=se&keywords=Streamlight%2BProTac%2B2.0&qid=1777562135&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=streamlight%2Bprotac%2B2.0%2Caps%2C177&sr=8-6&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=538712c8284f5677ed7ca193c23c81e3&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71wlkfE1d4L._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$112',
    tags: ['headlamp', 'mid-range'],
    slot: 'LIGHTING',
  },
  {
    id: 'black-diamond-spot-400',
    name: 'Black Diamond Spot 400 Headlamp',
    description:
      '400-lumen headlamp with red night mode and waterproof rating. One per person is non-negotiable.',
    amazonAsin: 'B09NQK2581',
    affiliateUrl: 'https://www.amazon.com/Black-Diamond-Equipment-Headlamp-Olive/dp/B09NQL4S1L?dib=eyJ2IjoiMSJ9.lNMp_XUB8EvU2Qf0jZWsMSLMhF3TDnO5XCLCLVJMBFW8cO05jl7sMnfnpwCO9kOObA3hWdgcFkgxCfjOUlmRfWHtX6cYqTe1XjXjBS7Uw9Rz6H1QHsK54dgU2LsZu6Jn2-y5ym9volks3UhRDs7LJt7iwMdzjlJBRIvP9iHqxP8D9jfSCBKd-O-sv3wr56FVutQa2pa6TLZxZU2m3shPtKp4eGTHgsSHHO6aDNfcMeh_dP8sxwLyhhI1UF-mLq6Y6wBb0Xb4-07JPpZE1DG6kdC2FWSVI7usPgOamp1Vgqc.dxRBnrGeDEnx082xHrmcqiWG5VP_uFmcXYiQ3vF7xjs&dib_tag=se&keywords=BLACK%2BDIAMOND%2BSpot%2B400&qid=1777561924&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sr=8-7&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=1ffdebba9657f75ca8f5a3f7797fd5bd&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71MiiDPJZZL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$60',
    tags: ['headlamp', 'mid-range', 'rain-ready'],
    slot: 'LIGHTING',
  },
  {
    id: 'coleman-portable-chair-cooler',
    name: 'Coleman Portable Chair with 4-Can Cooler',
    description:
      'Folding camp chair with a built-in 4-can cooler in the armrest. Cheap, durable, surprisingly handy.',
    amazonAsin: 'B0033990ZQ',
    affiliateUrl: 'https://www.amazon.com/Coleman-Cooler-Portable-Camping-Chair/dp/B0033990ZQ?crid=239JIOFE6N25W&dib=eyJ2IjoiMSJ9.QpbK5ZGOc_6mS6uLfj5d_8wFAfWddvUMKeeBvEXyA_yabmNhN1GZAZ2BiM-SJ_A-b_UZj9RZWs8HqH4BXMaW1v--sVzjcm-2M7Q1sM2Pay0RqhMrJ2r2X8vsdEk8L5uuq9cSRjZOOeXzL29yETxDnmxEx7ktphwBpBOQOLDboQXLMCq-PTU1Le_jNeDrIiVpglRc4Zg-yNcD9NNxngYXc8Sk5AVy-nblBGakYUBnERY5ZZarpG4Hr8t_lnIv9CbC3cLzbIrp_lWKx_MX389fXZMWKmzqrjVDATNRb01iCLo.Tkpid48Ez0x1xJDPVYgcVj05YxfGnUULMR3ZQv9pPqA&dib_tag=se&keywords=Coleman%2Bcooler%2Bquad%2Bchair&qid=1777559616&s=sporting-goods&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=coleman%2Bcooler%2Bquad%2Bchair%2B%2Csporting%2C244&sr=1-1&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=a78c6b42668359682465127c588db190&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71oAndTPdRL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$50',
    tags: ['chair', 'budget', 'family'],
    slot: 'CHAIR',
  },
  {
    id: 'gci-freestyle-rocker',
    name: 'GCI Outdoor Freestyle Rocker',
    description:
      'Camp chair that actually rocks. The upgrade you’ll thank yourself for around the fire.',
    amazonAsin: 'B00D4JYR62',
    affiliateUrl: 'https://www.amazon.com/dp/B00D4JYR62?th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=04841b1e2853ca048718db4bb769d584&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/81bV+19K6wL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$80',
    tags: ['chair', 'mid-range', 'comfort', 'family'],
    slot: 'CHAIR',
  },
  {
    id: 'core-10x10-canopy',
    name: 'CORE 10×10 Instant Pop-Up Canopy',
    description:
      '10×10 instant pop-up canopy. Two-minute setup, the gear that gets used the most on hot or rainy days.',
    amazonAsin: 'B01E45EYJY',
    affiliateUrl: 'https://www.amazon.com/dp/B01E45EYJY?th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=9617fffb052859d4708348d19b836727&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71upZwo-QQL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$130',
    tags: ['canopy', 'shade', 'heat-friendly', 'rain-ready', 'family'],
    slot: 'CANOPY',
  },
  {
    id: 'kidco-gopod',
    name: 'KidCo GoPod Portable Activity Center',
    description:
      'Portable activity center for infants and toddlers. Keeps the smallest camper safe and contained at the site.',
    amazonAsin: 'B00477ND0Q',
    affiliateUrl: 'https://www.amazon.com/KidCo-Portable-Activity-Station-Pistachio/dp/B00477ND0Q?crid=3NLM2PIJE46BP&dib=eyJ2IjoiMSJ9.Hm3SHnOX4Ki-uOReBfDzoR4OGZe4QQWW9VmyEx_YAQ1u3_CiLd0q6fEbJL568SGWLxVKWP2NTxlpIPummvZcfuX1EWhhc3j7E7xlUS_mCcnK6v7mOxVK-9gxueBPku7Xg7Ei5IbQVB7hLQtZ1EgDrqFj4OBf2kMp95o8eQ9-ipxyUMI1IXZy27bU4lVQdSKe6ru_KZ4hMeYk_OqVQaJOBvIrZWMhr2fgsvYort9IVNkN4KG7lmO6wQgRq9GHiEI4DvmofBKgqWBWFJ33P1qJcXS8oRU8ImSB-Wjo-CohN9g.dvRhb3sW8UL3jThCAf3sD3518ukcB5K4H0wcKPHLT1M&dib_tag=se&keywords=KidCo%2BGoPod%2BPortable%2BActivity%2BCenter&qid=1777559759&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=kidco%2Bgopod%2Bportable%2Bactivity%2Bcenter%2B%2Caps%2C177&sr=8-1&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=e4f086c09ac44e6c046208f3d04c0fde&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/61nVHw0nj+L._SL1500_.jpg',
    category: 'convenience',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$80',
    tags: ['with-kids', 'family', 'comfort'],
    slot: 'KID_GEAR',
  },
  {
    id: 'thriad-first-aid-430',
    name: 'THRIAD 430-Piece First Aid Kit',
    description:
      '430-piece first aid kit in a hard case. Comprehensive enough for two cars and a long weekend.',
    amazonAsin: 'B0DS21ZBSB',
    affiliateUrl: 'https://www.amazon.com/gp/aw/d/B0DS21ZBSB?_encoding=UTF8&pd_rd_plhdr=t&aaxitk=7a3c949b8f5138b564424238be941cf7&hsa_cr_id=0&qid=1777559879&sr=1-2-9e67e56a-6f64-441f-a281-df67fc737124&pd_rd_w=NCA8i&content-id=amzn1.sym.2fb72bc8-96ef-420d-b08f-c04b69f36507%3Aamzn1.sym.2fb72bc8-96ef-420d-b08f-c04b69f36507&pf_rd_p=2fb72bc8-96ef-420d-b08f-c04b69f36507&pf_rd_r=BH4EHW32M66AKGBZJT02&pd_rd_wg=Bcfyp&pd_rd_r=6107a9d8-caba-4806-a281-615c648d3121&linkCode=ll2&tag=trailsteadgui-20&linkId=27b16e8759ab1f1f1a49e5b579463a01&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/81pbblY-YCL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: ['backyard-test', 'easy-family-basecamp', 'first-night-camp', 'first-weekend-camp'],
    priceRange: '~$53',
    tags: ['family', 'mid-range', 'rain-ready', 'cold-ready', 'heat-friendly'],
    slot: 'SAFETY',
  },
  {
    id: 'dripdrop-hydration',
    name: 'DripDrop Hydration Packets',
    description:
      'Electrolyte hydration packets. The fix when heat, altitude, or activity outpaces plain water.',
    amazonAsin: 'B08TZM8S1F',
    affiliateUrl: 'https://www.amazon.com/DripDrop-ORS-Electrolyte-Dehydration-Watermelon/dp/B08TZM8S1F?crid=24DUARBQAQ4VZ&dib=eyJ2IjoiMSJ9.v2BA3t2JYpzkXFgRIBlfnlXi1VJvyFzGqL583EdBc-G-BtcwpMSrhCGvrDSSiR4fmh8zyLeXGinsTObvfOnlf95dZN_xxeNwsKbeZjr2aJ-d3-uac2EJTXfgRZMvEUwsf3hMJ7A7x59zCC1hboBcrYFyyAJkS3UmyXYtjh8WvKVU5i1rNgNdpZ6KGbvNOpSffoy6oQ5bwfe_7bCwgv-frfM3WxU7EMgFB8YIeJhAi_zdKWCUryW5laN6E-sojZ-u44NNp_8aYPa-iXJ6TkT6i2NdVAO0wz3RXSwUMpgLtFk.2CpGnptGMWfAfFveJ2FklTxW2lBVZdKcZbl4ibNCt4k&dib_tag=se&keywords=oral%2Brehydration%2Bor%2Belectrolyte%2Bpackets%2C&qid=1777562394&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=oral%2Brehydration%2Bor%2Belectrolyte%2Bpackets%2C%2Caps%2C172&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=e59204928e6c01fa36f176c0c9b966d7&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71pXv5WL9qL._AC_SL1200_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$18',
    tags: ['heat-friendly', 'budget'],
    slot: 'SAFETY',
  },
  {
    id: 'marmot-mad-river-0',
    name: 'Marmot Mad River 0',
    description:
      '0°F mummy bag for serious cold-weather camping. The upgrade pick when a 40°F bag plus liner stops cutting it.',
    amazonAsin: 'B0GJMQNGXD',
    affiliateUrl: 'https://www.amazon.com/Marmot-Mad-River-Backpacking-Sleeping/dp/B0GJMQNGXD?crid=2VC5BNWBVJRI8&dib=eyJ2IjoiMSJ9.b9RsuhkdflhxffTppkfTbgKj6AtuijY4C1b-y7JYvsu2Irx1QKs5-Ck2afhcjpEe-VeCBnzH5Ioua-c-dS1Y2YdAhq08OKoETrDhSx1LRzNVxlZRaarNC3Ud2osTT6ozxKxbYNgrB6i9roNLsCXB9w.MqnSj3Bg8t6gwqAaZqfD25-BaSmgwaNMhh3Z_p-aWNA&dib_tag=se&keywords=Marmot%2BMad%2BRiver%2B0&qid=1777573218&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=marmot%2Bmad%2Briver%2B0%2Caps%2C253&sr=8-1&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=1f4899f75afe17f32802762541b499ed&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/51I4c4UzhIL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$339',
    tags: ['sleeping-bag', 'premium', 'cold-ready'],
    slot: 'SLEEP_BAG',
  },
  {
    id: 'rab-ionosphere-5-5',
    name: 'Rab Ionosphere 5.5',
    description:
      'Insulated backpacking pad with R-value 5.5 — cuts the cold from the ground on shoulder-season and altitude trips. The pair for the Mad River 0.',
    amazonAsin: 'B0BNX4QNGW',
    affiliateUrl: 'https://www.amazon.com/RAB-Ionosphere-Lightweight-Insulated-Backpacking/dp/B0BNX4QNGW?crid=RC7IF1JBE5QP&dib=eyJ2IjoiMSJ9.wgoH0-Zk5GV52paruXR0YQ.dBzbneh3saeeVaCh5rxeASccW9UgvaCccocFTWRoRNA&dib_tag=se&keywords=Rab%2BIonosphere%2B5.5&qid=1777573278&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=rab%2Bionosphere%2B5.5%2Caps%2C170&sr=8-1&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=6b03245ffac043485e9d2602475daca3&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/412NOySu6EL._AC_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$168',
    tags: ['sleeping-pad', 'premium', 'cold-ready'],
    slot: 'SLEEP_SURFACE',
  },
  {
    id: 'katolk-tie-out',
    name: 'KATOLK Upgraded Dog Tie Out Cable',
    description:
      'Heavy-duty trolley-style dog tie-out for camp. Gives the dog real range without letting them wander into the next site.',
    amazonAsin: 'B0BGH8BS3R',
    affiliateUrl: 'https://www.amazon.com/Upgraded-KATOLK-Camping-Portable-Training/dp/B0BGH8BS3R?crid=24RMF4V2MYPDZ&dib=eyJ2IjoiMSJ9.QHFfyMcyxAfmq0M1RTbVwxw3dqd-Pna-WtHxzbRCY1oXwLCZYw5RItRlVvPrEtzRmsZxPRAm2AQ_hfiuGxH2Pz1x24X9xZi6O9NUAEwlF7ellq3HVoAX1Vzfp9wjjJfFTBMwtOqdRM-8LdGH3B53I9XwucthttJMK-KAzQQ39nDkscPIfr6okayG-WIuznGNbZiJ3ThEEwWibjHKwlz05eTBoDb5T6otvjcSBaMjQLVxXzzLhCblVjClCHeCeljSd8Rb4zScCGKZc0_w_myZr-iY55bRC2KNAVHLZ-jHdZA.6sVBlj80rAby-FkV6AxNyb_WrDqmmaBvzDiqDS-1yZw&dib_tag=se&keywords=leash%2B%2F%2Btie-out%2B%2F%2Bhitch%2Bsystem%2Bdogs%2Bcampaign&nsdOptOutParam=true&qid=1777565253&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=leash%2B%2F%2Btie-out%2B%2F%2Bhitch%2Bsystem%2Bdogs%2Bcampaing%2Caps%2C141&sr=8-2&th=1&linkCode=ll2&tag=trailsteadgui-20&linkId=8496b466ef285b8b9946b75b9777ee8d&language=en_US&ref_=as_li_ss_tl',
    imageUrl: 'https://m.media-amazon.com/images/I/71Owf9HoVIL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$29',
    tags: ['with-dogs', 'budget'],
    slot: 'DOG_GEAR',
  },

  // ------------------------------------------------------------------
  // Legacy / deprecated. Kept in the registry so /compare/* editorial
  // pages and historical references keep rendering. Excluded from
  // recommendation surfaces (guide gear shelf, quiz results, Trip Pack).
  // ------------------------------------------------------------------
  {
    id: 'tent-sundome-3',
    name: 'Coleman Sundome 3-Person',
    description:
      'The couple or solo-with-gear pick. 7×7 ft floor, sets up in 10 minutes, fits a full-size air bed.',
    amazonAsin: 'B004J2GUOK',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$90',
    tags: ['tent', 'solo', 'budget', 'beginner'],
    deprecated: true,
  },
  {
    id: 'tent-sundome-6',
    name: 'Coleman Sundome 6-Person',
    description:
      'The size-up pick for families of 5+ or anyone who wants room to stand and spread out gear. 10×10 ft floor.',
    amazonAsin: 'B004E4AWYA',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/f19b70cc-14ac-46ae-bec2-33b25b7fd2a9.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$160',
    tags: ['tent', 'family', 'mid-range', 'comfort', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'sleeping-bag-family',
    name: 'Kelty Tuck 20',
    description:
      'Rated to 20°F, roomy fit, easy to get into. Works for most 3-season family trips.',
    amazonAsin: 'B07H99CMNP',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media/vc/94b627ff-60b3-4f09-af91-225e2a7b114d._CR0,0,970,300_PT0_SX970__.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$95',
    tags: ['sleeping-bag', 'mid-range', 'beginner', 'cold-ready', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'sleeping-pad-air',
    name: 'TETON Sports ComfortLite',
    description:
      'Self-inflating, comfortable, packs small. Real comfort upgrade over foam.',
    amazonAsin: 'B00HC9QTO8',
    imageUrl: 'https://m.media-amazon.com/images/I/71AVJB+xn6L._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$75',
    tags: ['sleeping-pad', 'mid-range', 'comfort', 'cold-ready'],
    deprecated: true,
  },
  {
    id: 'air-mattress-queen',
    name: 'SoundAsleep Dream Series Air Mattress',
    description:
      'Queen size, built-in pump, stays inflated all night. The right call for comfort-focused family trips.',
    amazonAsin: 'B00FAW4O0A',
    imageUrl: 'https://m.media-amazon.com/images/I/616X+781lOL._AC_SX679_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$120',
    tags: ['air-mattress', 'family', 'mid-range', 'comfort', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'stove-2-burner',
    name: 'Camp Chef Everest 2X 2-Burner Stove',
    description:
      '40,000 BTU, wind-resistant, matchless ignition. Cooks real meals, not just boiling water.',
    amazonAsin: 'B09KNVRDNQ',
    imageUrl: 'https://m.media-amazon.com/images/I/71J5ttHnYvL._AC_SX679_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$210',
    tags: ['stove', 'family', 'premium', 'comfort'],
    deprecated: true,
  },
  {
    id: 'headlamp-family',
    name: 'Black Diamond Spot 400',
    description:
      '400 lumens, red night mode, waterproof. One per person is non-negotiable.',
    amazonAsin: 'B09NQK2581',
    imageUrl: 'https://m.media-amazon.com/images/I/81sGcNXb1eL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$50',
    tags: ['headlamp', 'mid-range', 'beginner', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'camp-chairs',
    name: 'ALPS Mountaineering Leisure Chair',
    description:
      'Sturdy steel frame, 300 lb capacity, cup holder. The chair you actually want to sit in for an evening.',
    amazonAsin: 'B001LF3FZK',
    imageUrl: 'https://m.media-amazon.com/images/I/61B-kRUS-IL._AC_SL1200_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$95',
    tags: ['chair', 'mid-range', 'comfort'],
    deprecated: true,
  },
  {
    id: 'cooler-basic',
    name: 'Coleman 54-Quart Steel-Belted Cooler',
    description:
      'Keeps ice up to 4 days, 85-can capacity, Have-A-Seat lid. Classic for good reason.',
    amazonAsin: 'B0009PURKE',
    imageUrl: 'https://m.media-amazon.com/images/I/91uqAgVltVS._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$120',
    tags: ['cooler', 'family', 'mid-range', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'canopy-camp',
    name: 'CORE 10×10 Instant Pop-Up Canopy',
    description: 'Sets up in 2 minutes. Shade at camp is a comfort multiplier.',
    amazonAsin: 'B01E45EYJY',
    imageUrl: 'https://m.media-amazon.com/images/I/610Y31VdNIL._AC_.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$130',
    tags: ['canopy', 'shade', 'heat-friendly', 'rain-ready', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-tent-sundome',
    name: 'Coleman Sundome 4-Person',
    description:
      'Best-selling family dome tent. 9×7 ft floor, weatherproof, quick to pitch, fits a queen air bed. The safe first-trip tent.',
    amazonAsin: 'B0D7QHY574',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/P/B0D7QHY574.01.L.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$116',
    tags: ['tent', 'family', 'budget', 'beginner', 'rain-ready', 'with-kids'],
    deprecated: true,
  },
  {
    id: 'fwc-stove-coleman-1burner',
    name: 'Coleman 1-Burner Propane Stove',
    description:
      'Single burner, propane, rock-solid reliability. Boils water fast and handles a skillet.',
    amazonAsin: 'B0009PUR5E',
    imageUrl: 'https://m.media-amazon.com/images/I/81aj95-ouRL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$40',
    tags: ['stove', 'budget', 'beginner', 'rain-ready', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'fwc-cooler-rolling',
    name: 'Coleman Classic Rolling Cooler',
    description:
      'Insulated rolling cooler with telescoping handle. Makes the load-in from the car a non-issue.',
    amazonAsin: 'B08LMVJJ9Q',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/6a95b9ce-ba2f-46da-a5f8-82593670f6eb.__CR0,0,1464,600_PT0_SX1464_V1___.png',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$107',
    tags: ['cooler', 'family', 'mid-range', 'comfort', 'heat-friendly'],
    deprecated: true,
  },
  {
    id: 'fwc-cot-airbed-combo',
    name: 'Coleman Queen Airbed Cot Combo',
    description:
      'Folding steel cot with queen air mattress on top. Gets you off the ground with real comfort.',
    amazonAsin: 'B00AU6AVLW',
    imageUrl: 'https://m.media-amazon.com/images/I/91+ezTNiVbL._AC_SL1500_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$30',
    tags: ['cot', 'air-mattress', 'comfort', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-lantern-consciot',
    name: 'Consciot LED Camping Lantern (2-pack)',
    description:
      'Battery-powered, collapsible, bright enough for the picnic table. Two is the right number.',
    amazonAsin: 'B082HD5JDH',
    imageUrl: 'https://m.media-amazon.com/images/I/71ATGzY0CUL._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$30',
    tags: ['lantern', 'budget', 'beginner', 'rain-ready'],
    deprecated: true,
  },
  {
    id: 'fwc-sleeping-bag-mallome',
    name: 'MalloMe Sleeping Bag',
    description:
      'Lightweight 3-season bag. Affordable, easy to wash, comfortable for a weekend.',
    amazonAsin: 'B077XQDZW4',
    imageUrl: 'https://m.media-amazon.com/images/I/71dhzPLdNML._AC_SL1500_.jpg',
    category: 'essential',
    templateSlugs: [],
    priceRange: '~$26',
    tags: ['sleeping-bag', 'budget', 'beginner'],
    deprecated: true,
  },
  {
    id: 'fwc-chair-gci-rocker',
    name: 'GCI Outdoor Freestyle Rocker',
    description:
      'Camp chair that actually rocks. The upgrade you’ll thank yourself for around the fire.',
    amazonAsin: 'B00D4JYR62',
    imageUrl: 'https://m.media-amazon.com/images/I/71O4-VrNP3L._AC_SL1000_.jpg',
    category: 'comfort',
    templateSlugs: [],
    priceRange: '~$80',
    tags: ['chair', 'mid-range', 'comfort', 'family'],
    deprecated: true,
  },
  {
    id: 'fwc-projector-tmy',
    name: 'TMY 1080P Mini Projector',
    description:
      'Portable Bluetooth projector. Movie night on the side of the tent — an unfair advantage with kids.',
    amazonAsin: 'B082F13J55',
    imageUrl:
      'https://m.media-amazon.com/images/S/aplus-media-library-service-media/bb0c1152-f522-4772-98ea-c3cac62e88bf.__CR0,0,1464,600_PT0_SX1464_V1___.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$50',
    tags: ['projector', 'comfort', 'with-kids', 'budget'],
    deprecated: true,
  },
  {
    id: 'fwc-trash-can-wakeman',
    name: 'Wakeman Outdoor Collapsible Trash Can',
    description:
      'Folds flat, pops open at camp. Keeps the site tidy and critter-resistant.',
    amazonAsin: 'B0CHKGXSQ6',
    imageUrl: 'https://m.media-amazon.com/images/I/913OeuUhboL._AC_SL1500_.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$21',
    tags: ['trash', 'budget'],
    deprecated: true,
  },
  {
    id: 'fwc-lantern-hanger',
    name: 'Coleman Lantern Hanger',
    description:
      'Clamp-on hanger for a tent pole or tree branch. A $20 quality-of-life upgrade at night.',
    amazonAsin: 'B0009PUTJI',
    imageUrl: 'https://m.media-amazon.com/images/I/81IPjzQWjlL.jpg',
    category: 'convenience',
    templateSlugs: [],
    priceRange: '~$20',
    tags: ['lantern-hanger', 'budget'],
    deprecated: true,
  },
]

/**
 * Active (non-deprecated) products only. Used by the new gear shelf and
 * other paths that should not surface legacy entries.
 */
export const ACTIVE_AFFILIATE_PRODUCTS: AffiliateProduct[] =
  AFFILIATE_PRODUCTS.filter((p) => !p.deprecated)

export function getProductsForTemplate(slug: PlanSlug): AffiliateProduct[] {
  return ACTIVE_AFFILIATE_PRODUCTS.filter((p) => p.templateSlugs.includes(slug))
}

const PRODUCT_BY_ID: Record<string, AffiliateProduct> = Object.fromEntries(
  AFFILIATE_PRODUCTS.map((p) => [p.id, p]),
)

/**
 * Look up an affiliate product by its registry ID. Throws if the id is
 * unknown — guides reference these by string and we want a loud failure
 * at build time rather than a silently-rendered broken link.
 */
export function getProductById(id: string): AffiliateProduct {
  const product = PRODUCT_BY_ID[id]
  if (!product) {
    throw new Error(
      `Unknown affiliate product id: "${id}". Add it to AFFILIATE_PRODUCTS in lib/affiliate-products.ts.`,
    )
  }
  return product
}

/**
 * Filter the registry by tag. Useful for editorially picking which gear
 * to feature on a topical guide (e.g. all `heat-friendly` products).
 * Excludes deprecated entries by default — pass `{ includeDeprecated: true }`
 * to opt in.
 */
export function getProductsByTag(
  tag: NonNullable<AffiliateProduct['tags']>[number],
  options: { includeDeprecated?: boolean } = {},
): AffiliateProduct[] {
  const source = options.includeDeprecated
    ? AFFILIATE_PRODUCTS
    : ACTIVE_AFFILIATE_PRODUCTS
  return source.filter((p) => p.tags?.includes(tag))
}
