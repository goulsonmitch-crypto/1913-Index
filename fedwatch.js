/* =====================================================================
   FED WATCH — rapid-response rebuttal data layer
   ---------------------------------------------------------------------
   Each entry is one dated rebuttal to a Fed event (CPI/PCE, FOMC,
   speech, or M2/balance-sheet). The weekly/on-demand job appends new
   entries to the front of `entries`. The page renders them all.
   Voice: punchy but sourced — steelman the Fed's case, then rebut.
   ===================================================================== */
window.FEDWATCH = {
  meta:{
    last_updated:"2026-06-17",
    note:"Same-day rebuttals to Fed inflation data, rate moves, and statements, built on the 1913 Index."
  },
  entries:[
    {
      id:"2026-06-m2",
      date:"2026-06-17",
      type:"M2",
      type_label:"M2 Money Supply",
      headline:"While the Fed plays firefighter, the money supply is quietly re-igniting: M2 is back up to $22.8 trillion and growing 4.7% a year.",
      official_claim:"The Fed's latest H.6 release shows M2 — the broad money supply — rose to about $22.8 trillion (April 2026), up roughly 4.7% over the prior 12 months. The Fed's framing: M2 growth has 'normalized' after the 2022–23 contraction, money growth is no longer a useful inflation signal, and policy now works through interest rates, not the quantity of money.",
      official_source:"Federal Reserve H.6 Money Stock Measures; FRED series M2SL (April 2026)",
      official_url:"https://www.federalreserve.gov/releases/h6/current/default.htm",
      steelman:"The honest version of the Fed's case: 4.7% M2 growth is modest by historical standards and roughly tracks the economy's nominal growth — money expanding alongside output isn't inherently inflationary. Most academic economists abandoned strict monetarism decades ago because the link between M2 and prices is loose and lagged; the Fed argues rates, not the money stock, are the right lever, and on that score it's holding tight.",
      rebuttal:[
        "Look at what's actually happening: the same week the Fed holds rates 'high to fight inflation' and admits a 4.2% CPI, its own money supply is expanding at 4.7% a year — faster than the inflation it claims to be battling. You don't put out a fire by quietly pumping in more fuel.",
        "The 'M2 doesn't matter anymore' line is convenient for an institution that controls M2. M2 has roughly tripled since 2008 — from about $7.5 trillion to $22.8 trillion — and over that same window the dollar lost enormous purchasing power. The correlation economists wave away is the entire story of the 1913 Index: more dollars chasing the same goods is why a near-identical loaf of bread went from under 6 cents to $1.83, about 33× since 1913.",
        "Concede the fair point: month-to-month M2 is a noisy inflation predictor, and not every price move is monetary — eggs spiked on bird flu, coffee on crop failures. We say so plainly. But the century-long trend is not noise. Measured honestly since the Fed was founded, prices are up about 53× — versus the 34× official CPI admits — and that line moves with the long arc of the money supply, not against it.",
        "Rates are the brake the Fed taps in public; the money supply is the accelerator it keeps pressing in private. A central bank genuinely committed to sound money would not need to expand the money stock by a trillion dollars a year while lecturing the public about inflation. The dollar is down about 98% against gold since 1913 for one reason: there is always more of it."
      ],
      kicker:{ big:"$22.8T", big_label:"M2 money supply, April 2026 — growing ~4.7%/yr", small:"…roughly 3× its 2008 level, while the dollar is down ~98% against gold since 1913" },
      card:{
        fed_num:"+4.7%", fed_label:"M2 money-supply growth · April 2026 · 'normalized'",
        our_num:"53×", our_label:"True price rise since 1913 (1913 Index) — CPI admits only 34×",
        punch:"They tap the brake in public and press the accelerator in private."
      },
      x_thread:[
        "🚨 The Fed says it's holding rates HIGH to fight inflation. Meanwhile its own money supply (M2) just climbed back to $22.8 TRILLION — growing 4.7% a year, faster than the inflation it claims to fight. You don't fight a fire by pumping in fuel. 🧵",
        "The steelman: 4.7% M2 growth is modest, and most economists dropped strict monetarism decades ago because the money-to-prices link is loose and lagged. Fair. Rates, not the money stock, are the Fed's stated lever.",
        "But 'M2 doesn't matter' is an awfully convenient line for the one institution that controls M2. It has TRIPLED since 2008 — ~$7.5T to $22.8T. Over that window the dollar's purchasing power collapsed.",
        "That 'loose correlation' economists wave away IS the 1913 Index. More dollars chasing the same goods is why a near-identical loaf of bread went from <6¢ to $1.83 — about 33× since 1913.",
        "We'll concede the fair part: month-to-month M2 is noisy, and not every price jump is the Fed (eggs=bird flu, coffee=crop failures). But the 113-year trend isn't noise. Honest basket: ~53× since 1913 vs the 34× CPI admits.",
        "Rates are the brake they tap in public. The money supply is the accelerator they press in private. The dollar's down ~98% vs gold since 1913 for one reason: there's always more of it. Track it → the 1913 Index. 🪙📉"
      ],
      sources:[
        {label:"Federal Reserve H.6 — Money Stock Measures", url:"https://www.federalreserve.gov/releases/h6/current/default.htm"},
        {label:"FRED — M2 money stock (M2SL)", url:"https://fred.stlouisfed.org/series/M2SL"},
        {label:"M2 money supply, historical (Macrotrends)", url:"https://www.macrotrends.net/3005/m2-money-supply"},
        {label:"The 1913 Index — full historical series", url:"history.html"},
        {label:"The dollar measured in gold", url:"gold.html"}
      ]
    },
    {
      id:"2026-06-fomc",
      date:"2026-06-17",
      type:"FOMC",
      type_label:"FOMC Decision",
      headline:"New chair, same machine: the Fed holds at 3.5–3.75% and hints at hikes — after admitting 4.2% inflation.",
      official_claim:"At Kevin Warsh's first meeting as Fed chair (Jerome Powell's term ended May 15, 2026), the FOMC voted unanimously to hold the benchmark rate at 3.5%–3.75%, dropped its prior bias toward cuts, and — via the 'dot plot' — signaled a hike is now possible this year. Traders moved up bets on a hike as soon as October.",
      official_source:"FOMC statement & projections, June 17, 2026 (CNBC; Federal Reserve)",
      official_url:"https://www.cnbc.com/2026/06/17/fed-interest-rate-decision-june-2026.html",
      steelman:"The honest version of the Fed's case: holding rates high — and signaling hikes — is the textbook, responsible response to inflation running above target. A new chair removing the easing bias is exactly the vigilance hawks have demanded; tight money is how a central bank wrings inflation back down.",
      rebuttal:[
        "Notice what the 'hold' concedes: the Fed is keeping rates restrictive because its own gauge just hit 4.2% — the worst in three years. The fire brigade is staying on the scene because the building is still burning. The unspoken question is who lit it.",
        "Rates are the Fed's lever over the very money it alone creates. Holding at 3.5–3.75% doesn't give anyone back a dollar of lost purchasing power; it just slows how fast the next dollar is diluted. Measured since the Fed was founded in 1913, prices are up about 53× — versus the 34× official CPI admits. No rate decision in 2026 touches that century of erosion.",
        "A new face at the top changes nothing structural. Warsh inherits the same mandate to manage a currency with no anchor — the same machine that has overseen a 98% collapse in the dollar's value against gold since 1913. 'Possible hike in October' is a tactic; perpetual debasement is the policy.",
        "If the Fed could actually hold the dollar's value, it wouldn't need to keep meeting eight times a year to decide how much to bleed it. Sound money doesn't require a committee."
      ],
      kicker:{ big:"3.5–3.75%", big_label:"Fed holds (June 2026), hints at hikes", small:"…while the dollar is down ~98% against gold since the Fed was created" },
      card:{
        fed_num:"HELD", fed_label:"Fed funds 3.5–3.75% · new chair Warsh · June 17 2026",
        our_num:"53×", our_label:"True price rise since 1913 (1913 Index) — CPI admits only 34×",
        punch:"They're fighting a fire they set — and you pay for the water."
      },
      x_thread:[
        "🚨 The Fed just held rates at 3.5–3.75% in Kevin Warsh's first meeting as chair — and hinted the next move could be a HIKE. Why? Because their own inflation gauge just hit 4.2%. They're guarding a fire they started. 🧵",
        "The steelman: holding rates high is the textbook response to inflation. Fair. A hawkish new chair is what tight-money types asked for.",
        "But here's the trick: 'rates' are the Fed's lever over the money the Fed alone prints. A high rate doesn't return a single dollar you already lost. It just slows the next dilution.",
        "Since the Fed was founded in 1913, prices are up ~53× by an honest basket — vs the 34× official CPI admits. No 2026 rate decision touches that 113-year erosion.",
        "New chair, same machine. The dollar is down ~98% against gold since 1913. 'Possible hike in October' is a tactic. Perpetual debasement is the policy.",
        "If the Fed could actually keep the dollar's value, it wouldn't need to meet 8 times a year to decide how fast to bleed it. Track the real number → the 1913 Index. 🪙📉"
      ],
      sources:[
        {label:"Fed holds rates, signals possible hike — June 17, 2026 (CNBC)", url:"https://www.cnbc.com/2026/06/17/fed-interest-rate-decision-june-2026.html"},
        {label:"Federal Reserve — FOMC statements & calendar", url:"https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"},
        {label:"The 1913 Index — full historical series", url:"history.html"},
        {label:"The dollar measured in gold", url:"gold.html"}
      ]
    },
    {
      id:"2026-05-cpi",
      date:"2026-06-10",
      type:"CPI",
      type_label:"CPI Release",
      headline:"The Fed admits 4.2% — its highest in three years. The real number is worse.",
      official_claim:"BLS reported the May 2026 Consumer Price Index rose 4.2% over the prior 12 months — the hottest reading since 2023 — with energy driving more than 60% of the monthly jump. 'Core' CPI (stripping food and energy) rose 2.9%.",
      official_source:"BLS, Consumer Price Index — May 2026 (released June 10, 2026)",
      official_url:"https://www.bls.gov/news.release/cpi.nr0.htm",
      steelman:"The honest version of the Fed's case: the 4.2% spike is mostly energy — a supply shock tied to the Strait of Hormuz, not money-printing — and energy prices are volatile and often reverse. 'Core' inflation at 2.9% is meant to show the underlying trend is far calmer, and one hot month doesn't make a trend.",
      rebuttal:[
        "Start with what they conceded: even the lowballed official gauge just printed 4.2% — more than double the Fed's own 2% target, and the worst in three years. When the number the government designs to look small still looks this bad, pay attention.",
        "Now the part 'core' is built to hide. Stripping out food and energy is stripping out the two things every American actually buys every week. Coffee is up about 32× since 1913 and just hit record highs; ground beef is at all-time records on the smallest cattle herd in decades. Telling a family the 'underlying trend' excludes their grocery bill is the whole trick.",
        "And the biggest distortion isn't in this month at all — it's housing. CPI doesn't use home prices; it uses Owners' Equivalent Rent, a survey asking homeowners to guess what their house would rent for. Swap that fiction for real sale prices and the picture changes completely.",
        "Measured honestly since the Fed was founded, prices are up about 53× — versus the 34× the official CPI admits. 'Transitory energy' is this month's excuse; the 113-year trend is the actual story."
      ],
      kicker:{ big:"4.2%", big_label:"what the Fed admits (May 2026)", small:"53× — true price rise since 1913 (1913 Index), vs 34× by CPI" },
      card:{
        fed_num:"4.2%", fed_label:"Official CPI · May 2026 · 'highest since 2023'",
        our_num:"53×", our_label:"True price rise since 1913 (1913 Index) — CPI admits only 34×",
        punch:"They strip out food, energy & real home prices. We don't."
      },
      x_thread:[
        "🚨 The Fed just admitted inflation hit 4.2% — its highest in 3 years. And that's the number they DESIGN to look small. Here's the real one. 🧵",
        "Their defense: 'it's mostly energy, and core inflation is only 2.9%.' Fine — but 'core' strips out food AND energy. The two things you buy every single week. That's not a measure of your life. It's a measure designed to look calm.",
        "Coffee: ~32× since 1913, at record highs. Ground beef: all-time records. Eggs whipsawed. 'Underlying trend excludes your groceries' is the whole magic trick.",
        "The bigger con is housing. CPI doesn't use home prices. It uses 'Owners' Equivalent Rent' — a SURVEY asking owners to guess their home's rent. Swap in real sale prices and the number jumps.",
        "Measured honestly since the Fed was born in 1913, prices are up ~53×. The official CPI admits 34×. 'Transitory energy' is this month's excuse. The 113-year erosion is the story.",
        "We track this every month at the 1913 Index. Follow for the rebuttal the Fed won't give you. 📉🪙"
      ],
      sources:[
        {label:"BLS CPI — May 2026 release", url:"https://www.bls.gov/news.release/cpi.nr0.htm"},
        {label:"The 1913 Index — methodology & basket", url:"basket.html"},
        {label:"The 1913 Index — full historical series", url:"history.html"}
      ]
    }
  ]
};
