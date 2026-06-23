/* =====================================================================
   THE 1913 INDEX — controlled data layer (v1, prototype)
   ---------------------------------------------------------------------
   Single source of truth the whole site reads from.
   PHASE 2 PLAN: each item has an `api` slot. To go live, the weekly job
   overwrites `now_price`/`now_year` from that endpoint and re-saves.
   Site code never changes.
   FRESHNESS MODEL (hybrid): official monthly figures drive the index;
   the live counters (gold, gas) use the freshest daily/weekly number.
   Every figure is sourced + confidence-rated, per project rules.
   ===================================================================== */

window.INDEX_DATA = {
  meta: {
    version: "v2 (full CPI-mirrored basket)",
    base_year: 1913,
    now_year: 2026,
    last_updated: "2026-06-22",
    update_cadence: "weekly (official figures for the index; freshest daily for gold/gas counters)",
    note: "Now mirrors CPI's full 8-group structure at CPI's own weights — every category measured by real prices, with shelter replacing CPI's OER survey. The items below are illustrative showcase examples; the headline number is driven by the `categories` block."
  },

  /* ---- The official benchmark we argue against ---- */
  cpi: {
    dollar_1913_in_now: 33.64,
    cumulative_pct: 3263.84,
    annual_rate: 3.16,
    source: "BLS-based CPI inflation calculator (1913 – May 2026 CPI)",
    url: "https://www.bls.gov/data/inflation_calculator.htm"
  },

  /* ---- Sound-money panel: the dollar measured in gold ---- */
  gold: {
    then_year: 1913, then_price: 20.67,
    now_year: 2026,  now_price: 4201.34,
    source_then: "U.S. statutory gold price, $20.67/oz (in force 1913)",
    source_now: "Spot price, June 21 2026 (market)",
    url: "https://www.kitco.com/charts/gold",
    api: "MANUAL:SPOT"
  },

  /* ---- FULL CPI-mirrored basket: 11 groups at CPI's own Dec-2024 weights, each
     measured by its real BLS category index, EXCEPT shelter (real home prices,
     replacing CPI's OER survey) and transport (raw anti-hedonic car+gas).
     `mult` = 1913→2026 multiple; categories BLS began tracking later are spliced
     onto overall CPI before their start year (est:true). Headline = Σ weight×mult. ---- */
  weights_note: "The 1913 Index now mirrors CPI's full 8-group structure at CPI's own relative-importance weights (BLS, Dec 2024). Every category uses its real BLS sub-index, except shelter — where we replace CPI's Owners' Equivalent Rent survey with real home prices — and transport, where we use raw (anti-hedonic) car and gas prices. New BLS categories carry their quality (hedonic) adjustments; our number is therefore conservative there.",
  categories: [
    { name:"Shelter (real home price)", weight:35.483, mult:68.32, start:1913, est:false, proxy:false, basis:"Real median home price — replaces CPI's OER survey" },
    { name:"Transportation", weight:16.571, mult:50.61, start:1913, est:false, proxy:false, basis:"Raw new car + gasoline (anti-hedonic)" },
    { name:"Food & beverages", weight:14.526, mult:34.97, start:1913, est:false, proxy:false, basis:"BLS Food CPI" },
    { name:"Medical care", weight:8.273, mult:80.50, start:1935, est:true, proxy:false, basis:"BLS Medical care CPI" },
    { name:"Recreation", weight:5.292, mult:23.07, start:1993, est:true, proxy:false, basis:"BLS Recreation CPI" },
    { name:"Fuels & utilities", weight:4.312, mult:41.99, start:1952, est:true, proxy:false, basis:"BLS Fuels & utilities CPI" },
    { name:"Household furnishings & operations", weight:4.406, mult:9.24, start:1914, est:true, proxy:true, basis:"Proxied by apparel (durable goods)" },
    { name:"Communication", weight:3.149, mult:10.81, start:1993, est:true, proxy:false, basis:"BLS Communication CPI" },
    { name:"Other goods & services", weight:2.925, mult:57.32, start:1967, est:true, proxy:false, basis:"BLS Other goods & services CPI" },
    { name:"Education", weight:2.583, mult:99.79, start:1977, est:true, proxy:false, basis:"BLS College tuition & fees CPI" },
    { name:"Apparel", weight:2.480, mult:9.24, start:1914, est:false, proxy:false, basis:"BLS Apparel CPI" }
  ],

  items: [
    {
      id: "home", name: "Median home", category: "Housing", unit: "per home",
      then_year: 1913, then_price: 5900, now_year: 2026, now_price: 403200,
      confidence: "Medium", flag: "1913 value derived via Shiller index splice; constant-quality vs median-price caveat.",
      source_then: "Derived: Shiller real home-price index (1913 level 150.55, recent ≈306 — near the 2006 record) spliced to today's median via CPI (≈68× nominal).",
      source_now: "U.S. Census median sales price, Q1 2026 ($403,200)",
      url: "https://fred.stlouisfed.org/series/MSPUS",
      api: "FRED:MSPUS",
      cpi_note: "This is the heart of it. CPI does NOT use home prices for homeowners — it uses Owners' Equivalent Rent (OER), a survey asking homeowners what they imagine their home would rent for. OER is ~a third of CPI. We replace that hypothetical with the real sale price.",
      explainer: "A median home went from roughly $5,900 to over $403,000 — about a 68-fold rise, double CPI's headline. CPI hides this by never putting the actual home price in the basket. Steelman: CPI argues a home is an investment asset, not consumption, so it measures 'shelter' via rent. Rebuttal: the dollars that actually leave your account are the sale price and the mortgage, not a survey estimate. Note: the 1913 figure is spliced from Shiller's constant-quality index, so it's conservative — the cruder nominal estimates put the rise even higher."
    },
    {
      id: "car", name: "New car", category: "Transportation", unit: "per car",
      then_year: 1913, then_price: 600, now_year: 2026, now_price: 49220,
      confidence: "Medium", flag: "Quality differs enormously (hedonics caveat).",
      source_then: "Ford Model T Touring, $600 (1913)",
      source_now: "Avg new-vehicle transaction price, May 2026 ($49,220, Kelley Blue Book/Cox)",
      url: "https://www.coxautoinc.com/insights/may-2026-atp-report/",
      api: "MANUAL:KBB-ATP",
      cpi_note: "CPI applies large 'hedonic' quality adjustments to cars — it discounts much of the price rise as paying for better airbags, electronics, emissions gear.",
      explainer: "A new car ran $600 (a Model T) in 1913 versus ~$49,000 today — about 82×. Steelman: today's car is vastly safer and more capable, so CPI's hedonic adjustment says you're buying 'more car.' Rebuttal: fair in part — but you cannot buy the 1913 level of car anymore. The cheapest legal way to get four wheels has still exploded in actual dollars, which is what a family feels."
    },
    {
      id: "gas", name: "Gasoline", category: "Transportation", unit: "per gallon",
      then_year: 1929, then_price: 0.21, now_year: 2026, now_price: 3.94,
      confidence: "High", flag: "Earliest reliable series is 1929, not 1913.",
      source_then: "EIA/BLS earliest reliable pump price, 1929 ($0.21)",
      source_now: "AAA national average, June 22 2026 (~$3.94)",
      url: "https://www.eia.gov/petroleum/gasdiesel/",
      api: "EIA:GASOLINE",
      cpi_note: "Energy is real transaction data — one place CPI and reality mostly agree.",
      explainer: "Gas went from about 21 cents (1929) to ~$3.95 — roughly 19× — even though oil is a globally traded, productivity-heavy commodity. 2026 prices have swung hard on the U.S.–Iran developments around the Strait of Hormuz, spiking above $4.25 in early June before easing back."
    },
    {
      id: "bread", name: "Bread", category: "Food", unit: "per pound",
      then_year: 1913, then_price: 0.056, now_year: 2026, now_price: 1.83,
      confidence: "High", flag: "",
      source_then: "BLS Retail Prices, 5.6¢/lb (1913)",
      source_now: "BLS Average Price Data, white bread, $1.83/lb (May 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000702111",
      api: "FRED:APU0000702111",
      cpi_note: "Clean BLS series, near-identical product — a fair fight.",
      explainer: "A pound of bread went from under 6 cents to $1.83 — about 33× — across a near-identical product over 113 years."
    },
    {
      id: "milk", name: "Milk", category: "Food", unit: "per gallon",
      then_year: 1913, then_price: 0.356, now_year: 2026, now_price: 4.22,
      confidence: "High", flag: "",
      source_then: "BLS Retail Prices, 35.6¢/gal (1913)",
      source_now: "BLS Average Price Data, whole milk, $4.22/gal (May 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000709112",
      api: "FRED:APU0000709112",
      cpi_note: "Clean BLS series.",
      explainer: "A gallon of milk rose from about 36 cents to $4.22 — about 12× — a milder climb thanks to a century of dairy-productivity gains."
    },
    {
      id: "eggs", name: "Eggs", category: "Food", unit: "per dozen",
      then_year: 1913, then_price: 0.373, now_year: 2026, now_price: 2.19,
      confidence: "High", flag: "Volatile 2025–26 (bird-flu spike, then reversal).",
      source_then: "BLS Retail Prices, 37.3¢/dozen (1913)",
      source_now: "BLS Average Price Data, Grade A large, $2.19/dozen (May 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000708111",
      api: "FRED:APU0000708111",
      cpi_note: "Clean BLS series; recent swings are supply shocks, not just monetary.",
      explainer: "A dozen eggs went from 37 cents to $2.19 — about 6×, the mildest in the basket. Honest caveat: eggs spiked near $6 in 2025 on avian flu, then fell back hard. Not every price move is the Fed — saying so is exactly what keeps the larger argument credible."
    },
    {
      id: "coffee", name: "Coffee", category: "Food", unit: "per pound",
      then_year: 1913, then_price: 0.30, now_year: 2026, now_price: 9.51,
      confidence: "High", flag: "1913 value approximate (~30¢).",
      source_then: "BLS Retail Prices, ~30¢/lb (1913)",
      source_now: "BLS Average Price Data, ground roast, $9.51/lb (May 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000717311",
      api: "FRED:APU0000717311",
      cpi_note: "Clean BLS series.",
      explainer: "Coffee climbed from about 30 cents to $9.51 a pound — roughly 32× — with a steep 2025–26 run-up on global crop failures and tariffs."
    },
    {
      id: "bacon", name: "Bacon", category: "Food", unit: "per pound",
      then_year: 1913, then_price: 0.254, now_year: 2026, now_price: 6.83,
      confidence: "High", flag: "1913 value approximate (~25¢).",
      source_then: "BLS Retail Prices, ~25.4¢/lb (1913)",
      source_now: "BLS Average Price Data, sliced bacon, $6.83/lb (Apr 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000704111",
      api: "FRED:APU0000704111",
      cpi_note: "Clean BLS series.",
      explainer: "Bacon went from about 25 cents to $6.83 a pound — roughly 27× — one of the steeper protein climbs."
    },
    {
      id: "beef", name: "Ground beef", category: "Food", unit: "per pound",
      then_year: 1913, then_price: 0.22, now_year: 2026, now_price: 6.75,
      confidence: "Medium", flag: "1913 anchor is round steak (~22¢); cut definition shifted.",
      source_then: "BLS Retail Prices, beef ~22¢/lb (1913)",
      source_now: "BLS Average Price Data, 100% ground beef, $6.75/lb (May 2026)",
      url: "https://fred.stlouisfed.org/series/APU0000703112",
      api: "FRED:APU0000703112",
      cpi_note: "Clean BLS series; cut definitions shifted over a century.",
      explainer: "Beef rose from roughly 22 cents to $6.75 a pound — about 31× — hitting record highs in 2025–26 on the smallest U.S. cattle herd in decades."
    },
    {
      id: "sugar", name: "Sugar", category: "Food", unit: "per pound",
      then_year: 1913, then_price: 0.058, now_year: 2026, now_price: 1.05,
      confidence: "High", flag: "Current value approximate (latest BLS).",
      source_then: "BLS Retail Prices, 5.8¢/lb (1913)",
      source_now: "BLS Average Price Data, white sugar, ~$1.05/lb (2026)",
      url: "https://www.bls.gov/cpi/factsheets/average-prices.htm",
      api: "FRED:APU0000715211",
      cpi_note: "Clean BLS series.",
      explainer: "Sugar went from under 6 cents to about $1.05 a pound — roughly 18×."
    },
    {
      id: "stamp", name: "First-class stamp", category: "Other", unit: "per stamp",
      then_year: 1913, then_price: 0.02, now_year: 2026, now_price: 0.78,
      confidence: "High", flag: "Rises to $0.82 in July 2026.",
      source_then: "USPS first-class rate, 2¢ (1913)",
      source_now: "USPS Forever stamp, $0.78 (2026; $0.82 effective July 12 2026)",
      url: "https://about.usps.com/newsroom/national-releases/2026/0409-usps-recommends-new-prices-for-july.htm",
      api: "MANUAL:USPS",
      cpi_note: "A government-set price — the cleanest single series in existence (published since 1863). Shown for color; not in the headline index.",
      explainer: "A first-class stamp went from 2 cents to 78 cents — 39× — and hits 82 cents in July 2026. The most perfectly documented price in America."
    },
    {
      id: "movie", name: "Movie ticket", category: "Other", unit: "per ticket",
      then_year: 1913, then_price: 0.07, now_year: 2026, now_price: 11.00,
      confidence: "Medium", flag: "1913 value approximate (nickelodeon era).",
      source_then: "Nickelodeon-era admission, ~5–7¢ (~1913)",
      source_now: "Industry average admission (~$11, 2026)",
      url: "https://www.natoonline.org/",
      api: "MANUAL:NATO",
      cpi_note: "Shown for color; not in the headline index.",
      explainer: "A movie went from about a nickel to ~$11 — over 150× — though sound, color, and IMAX make it a different product than a 1913 silent reel."
    }
  ]
};
