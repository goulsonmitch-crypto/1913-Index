# 1913 Index — App Store Listing Copy

---

## iOS App Store (App Store Connect)

### App Name (30 chars max)
```
1913 Index: True Inflation
```

### Subtitle (30 chars max)
```
Real Prices. Real Inflation.
```

### Description (4,000 chars max)
```
Ever wonder what things actually cost now vs. what your parents paid?

1913 Index tracks real prices on 4,500+ goods and services — food, gas, housing, healthcare, college, cars — and shows you exactly how much the dollar has lost since 1913, when the Federal Reserve was created.

SCAN & COMPARE IN STORES
Point your camera at any product barcode. Instantly see what that item (or something like it) cost decades ago vs. today — and the inflation multiplier your government doesn't advertise.

• Scan barcodes on groceries, household goods, personal care, baby products, and more
• See "then vs. now" prices and the real % increase
• Browse scan history to track items you care about
• Contribute product corrections to improve the database for everyone

THE 1913 INDEX
Our headline measure of true inflation is built differently than CPI:
• We use real home sale prices and actual mortgage payments — not the government's "Owners' Equivalent Rent" (a survey asking homeowners to imagine what their house would rent for)
• We track actual transaction prices, not theoretical substitution effects
• Every figure is sourced and reproducible

EXPLORE THE DATABASE
• 4,500+ tracked items across Food, Housing, Healthcare, Transportation, Education, Energy, and more
• Browse by category or search any item
• See price timelines back to 1913 for hundreds of items
• Compare your chosen year range — 1913 to now, 1971 to now, or any window you pick

THE FED & WHAT HAPPENED
The site includes an unvarnished history of the Federal Reserve and the dollar since 1913 — QE, money supply explosion, the end of gold convertibility in 1971, and what it all meant for prices. Every chart sourced from FRED, BLS, and the U.S. Treasury.

NO ADS. NO ACCOUNTS. NO TRACKING.
We don't collect personal information. Camera is used only for barcode scanning and never uploads images. Scan history stays on your device.

Data sources: FRED (Federal Reserve of St. Louis), BLS, USDA, EIA, Case-Shiller, Freddie Mac, and historical retail archives.
```

### Keywords (100 chars max, comma-separated, no spaces after commas)
```
inflation,CPI,prices,barcode scanner,cost of living,dollar,Federal Reserve,grocery prices,budget
```

### Category
- **Primary:** Finance
- **Secondary:** Utilities

### Age Rating
4+ (no objectionable content)

### Support URL
```
https://goulsonmitch-crypto.github.io/1913-Index
```

### Privacy Policy URL
```
https://goulsonmitch-crypto.github.io/1913-Index/privacy.html
```

### Marketing URL (optional)
```
https://goulsonmitch-crypto.github.io/1913-Index
```

---

## Google Play Store

### App Name (50 chars max)
```
1913 Index: Real Inflation Tracker
```

### Short Description (80 chars max)
```
Scan barcodes & see real price history since 1913. No ads. No accounts.
```

### Full Description (4,000 chars max)
*(Same as iOS description above — works for both stores)*

### Category
Finance

### Tags
inflation, prices, barcode scanner, Federal Reserve, cost of living, money, CPI

---

## Screenshot Specs

### iOS Screenshots Required
- **6.7" (iPhone 15 Pro Max):** 1290 × 2796 px — minimum 3, up to 10
- **5.5" (iPhone 8 Plus):** 1242 × 2208 px — required if you want < iPhone 6.5" coverage

### Android Screenshots Required
- **Phone:** 1080 × 1920 px minimum — 2 to 8 screenshots

### Suggested Screenshot Sequence (same for both platforms)

1. **Scan screen** — camera view open with a grocery item barcode detected; result card visible showing "Eggs (dozen): 1913: $0.34 → Today: $4.89 (×14.4)"
   - Caption: "Scan any barcode. See the real inflation story."

2. **Result card close-up** — full card with sparkline price chart, category tag, then/now prices, and multiplier badge
   - Caption: "Then vs. now — every item, sourced and verified."

3. **Browse prices page** — grid of categories (Food, Housing, Healthcare, Gas, etc.)
   - Caption: "4,500+ items tracked since 1913."

4. **Item detail** — e.g., "Gallon of Milk" with full timeline chart from 1913 to 2026
   - Caption: "Full price history. Real data. No spin."

5. **The Number page** — The 1913 Index headline inflation rate vs. CPI comparison
   - Caption: "The inflation rate they don't want you to see."

### App Store Icon
- File: `site/assets/icon-1024.png` (1024 × 1024 px, no alpha channel for App Store Connect)
- **Note:** App Store Connect rejects icons with transparency. Run this before uploading:
  ```bash
  convert site/assets/icon-1024.png -background "#0a0a0a" -flatten site/assets/icon-1024-flat.png
  ```

---

## PWABuilder Wrapping Notes

When PWABuilder generates your iOS package, it will ask for:
- **App Name:** 1913 Index: True Inflation
- **Bundle ID:** com.1913index.app  *(or your preferred reverse-domain)*
- **Version:** 1.0.0
- **Build Number:** 1

The generated Xcode project needs:
1. Replace the placeholder icons with `icon-1024-flat.png` (App Store Connect) and the sized PNGs in `site/assets/`
2. In `Info.plist`, confirm `NSCameraUsageDescription` is set — PWABuilder should add it automatically since `manifest.json` includes camera permission, but verify it reads:
   > "1913 Index uses your camera to scan product barcodes and look up inflation data for that product."

---

## What You Need Before Submitting

### Apple App Store
- [ ] Apple Developer account ($99/year) at developer.apple.com
- [ ] App Store Connect account (same login)
- [ ] `icon-1024-flat.png` (no transparency)
- [ ] 3–10 screenshots at 1290×2796 and/or 1242×2208
- [ ] Privacy policy URL live on the web
- [ ] Deployed PWA (GitHub Pages URL)
- [ ] PWABuilder-generated `.ipa` or Xcode project

### Google Play
- [ ] Google Play Console account ($25 one-time)
- [ ] Signed APK or AAB from PWABuilder
- [ ] 2–8 screenshots at 1080×1920+
- [ ] Feature graphic: 1024 × 500 px (a banner image for the Play Store listing)
- [ ] Privacy policy URL live on the web

---

*Generated: June 30, 2026*
