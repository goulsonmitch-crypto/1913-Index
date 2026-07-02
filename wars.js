/* =====================================================================
   THE TRUE COST OF AMERICAN WAR — data layer (v1, lean set)
   ---------------------------------------------------------------------
   Tracks the individual + combined cost of major U.S. wars since WWII.
   Two cost figures per war: DIRECT (military operations only, CRS-style)
   and ALL-IN ("true cost" incl. veterans + interest on war debt, Brown
   "Costs of War"). Each figure carries its source dollar-year; the page
   re-expresses everything in today's (2026) dollars TWICE — via official
   CPI and via our own 1913 Index (the truer, bigger number).
   Confirmed figures vs. estimates are flagged. Lean set; expands later.
   ===================================================================== */
window.WARS = {
  meta:{
    last_updated:"2026-06-25",
    base_year:2026,
    note:"Lean v1: five conflicts. DIRECT = military operations only (CRS). ALL-IN = comprehensive true cost incl. veterans' care + interest on war debt (Brown Costs of War) where authoritative; estimated & flagged for Korea/Vietnam. Calculation window = official war dates PLUS directly-attributable pre-war buildup. Costs shown in today's dollars via both CPI and the 1913 Index."
  },
  /* CPI (official) and 1913 Index levels for the dollar-years used, to convert to 2026 dollars. */
  adjust:{
    1991:{cpi:134.60, idx:1462.22},
    1999:{cpi:164.30, idx:1809.57},
    2011:{cpi:220.22, idx:2823.60},
    2015:{cpi:233.71, idx:3126.66},
    2018:{cpi:247.87, idx:3497.75},
    2019:{cpi:251.71, idx:3559.26},
    2022:{cpi:281.15, idx:4430.52},
    2026:{cpi:333.02, idx:5104.62}
  },
  wars:[
    {
      id:"korea", name:"Korean War", status:"concluded",
      official:"Jun 25, 1950 – Jul 27, 1953 (armistice)",
      window_note:"Official combat dates; limited pre-war buildup. Direct cost is the DoD incremental cost of the conflict.",
      direct:{ usd_bn:341, dollar_year:2011, confidence:"High",
        source:"CRS RS22926, 'Costs of Major U.S. Wars' (military ops, constant FY2011 $)",
        url:"https://www.everycrsreport.com/reports/RS22926.html" },
      allin:{ usd_bn:648, dollar_year:2011, confidence:"Low", est:true,
        source:"Estimate: direct + ~veterans & interest uplift (~1.9×, per post-9/11 ops-to-all-in ratio). Not separately compiled like Brown's post-9/11 work.",
        url:"https://www.everycrsreport.com/reports/RS22926.html" },
      blurb:"Fought to a stalemate at the 38th parallel. The direct military bill is well documented; comprehensive veterans-and-interest figures for Korea were never compiled the way they later were for the post-9/11 wars, so the all-in number here is a flagged estimate."
    },
    {
      id:"vietnam", name:"Vietnam War", status:"concluded",
      official:"Mar 1965 – Jan 27, 1973 (U.S. combat; advisors from 1961, Saigon falls 1975)",
      window_note:"U.S. combat phase. Advisory buildup ran from the early 1960s; the fall of Saigon followed in 1975. Direct cost is DoD incremental operations.",
      direct:{ usd_bn:738, dollar_year:2011, confidence:"High",
        source:"CRS RS22926 (military ops, constant FY2011 $)",
        url:"https://www.everycrsreport.com/reports/RS22926.html" },
      allin:{ usd_bn:1402, dollar_year:2011, confidence:"Low", est:true,
        source:"Estimate: direct + ~veterans & interest uplift (~1.9×). Vietnam-era veterans' care is large but never compiled into a single authoritative all-in figure.",
        url:"https://www.everycrsreport.com/reports/RS22926.html" },
      blurb:"The longest U.S. war until Afghanistan. Direct operations are solidly sourced; the all-in figure (decades of veterans' care plus interest on the borrowing) is a flagged estimate."
    },
    {
      id:"iraq", name:"Iraq War", status:"concluded",
      official:"Mar 20, 2003 – Dec 18, 2011 (withdrawal; ISIS re-engagement from 2014)",
      window_note:"Includes the late-2002 force flow to Kuwait (directly-attributable buildup). The all-in figure covers the broader Iraq/Syria war zone, which also captures the 2014+ anti-ISIS campaign.",
      direct:{ usd_bn:815, dollar_year:2011, confidence:"High",
        source:"CRS RL33110, Iraq war appropriations (military ops, ~FY2011 $)",
        url:"https://sgp.fas.org/crs/natsec/RL33110.pdf" },
      allin:{ usd_bn:2100, dollar_year:2022, confidence:"Medium",
        source:"Brown 'Costs of War' — Iraq/Syria war zone, incl. veterans-to-date + interest (through ~FY2022)",
        url:"https://costsofwar.watson.brown.edu/" },
      blurb:"Launched on the since-discredited case for weapons of mass destruction. The all-in cost — more than double the direct military bill once veterans' care and interest on the war debt are counted — is exactly the gap this tracker exists to expose."
    },
    {
      id:"afghanistan", name:"Afghanistan War", status:"concluded",
      official:"Oct 7, 2001 – Aug 30, 2021 (withdrawal)",
      window_note:"Includes the Sept–Oct 2001 deployment buildup. The all-in figure covers the Afghanistan/Pakistan war zone through ~FY2022.",
      direct:{ usd_bn:837, dollar_year:2018, confidence:"Medium",
        source:"DoD war appropriations, Afghanistan 2001–2021 (military ops, ~nominal mid-war $)",
        url:"https://www.everycrsreport.com/reports/RL33110.html" },
      allin:{ usd_bn:2300, dollar_year:2022, confidence:"Medium",
        source:"Brown 'Costs of War' — Afghanistan/Pakistan war zone, incl. veterans-to-date + interest (through ~FY2022)",
        url:"https://costsofwar.watson.brown.edu/" },
      blurb:"America's longest war, ended in a chaotic withdrawal. Twenty years of operations cost roughly $837B directly — but the true bill, with lifetime veterans' care and interest, is about $2.3 trillion."
    },
    {
      id:"gulf", name:"Gulf War (Desert Storm)", status:"concluded",
      official:"Aug 2, 1990 – Feb 28, 1991 (Desert Shield buildup + 100-hour ground war)",
      window_note:"Includes the Desert Shield buildup (Aug 1990). Unique case: allies (Saudi Arabia, Kuwait, Japan, Germany) reimbursed ~$36B of the ~$61B gross cost, so the net U.S. bill was small. We count the net U.S. cost in the combined total.",
      direct:{ usd_bn:7.3, dollar_year:1991, confidence:"Medium",
        source:"DoD: ~$61B gross; allies reimbursed ~$36B+ (80%+); U.S. net ~$7.3B (1991 $). GAO/DoD.",
        url:"https://www.gao.gov/products/t-nsiad-91-34" },
      allin:{ usd_bn:25, dollar_year:1991, confidence:"Low", est:true,
        source:"Estimate: U.S. net + modest veterans (Gulf War Illness) & interest. Gross ~$61B but ~80% allied-funded.",
        url:"https://www.gao.gov/products/t-nsiad-91-34" },
      blurb:"The most heavily subsidized war in American history: allies covered 80%+ of the ~$61B cost, leaving the U.S. net bill around $7.3B. A rare case where the true cost to America was small — and we say so."
    },
    {
      id:"kosovo", name:"Kosovo War (Allied Force)", status:"concluded",
      official:"Mar 24 – Jun 10, 1999 (78-day NATO air campaign)",
      window_note:"U.S. share (~80%) of the NATO bombing campaign. No U.S. combat deaths; no UN authorization.",
      direct:{ usd_bn:5, dollar_year:1999, confidence:"Medium",
        source:"~$5B U.S. share of Operation Allied Force (1999 $). DoD/press estimates.",
        url:"https://www.warcosts.org/kosovo" },
      allin:{ usd_bn:7, dollar_year:1999, confidence:"Low", est:true,
        source:"Estimate: U.S. campaign share + modest follow-on costs.",
        url:"https://www.warcosts.org/kosovo" },
      blurb:"A 78-day air war with no U.S. combat deaths and no UN authorization. The U.S. bore roughly 80% of the NATO campaign's cost."
    },
    {
      id:"libya", name:"Libya Intervention (Odyssey Dawn)", status:"concluded",
      official:"Mar 19 – Oct 31, 2011",
      window_note:"U.S. cost of the 2011 air campaign; front-loaded into the first weeks (~$550M through Mar 28).",
      direct:{ usd_bn:1.6, dollar_year:2011, confidence:"Medium",
        source:"~$1.1–2B U.S. cost; ~$1.6B commonly cited (2011 $). DoD/CFR.",
        url:"https://www.cfr.org/articles/what-does-libya-cost-united-states" },
      allin:{ usd_bn:2, dollar_year:2011, confidence:"Low", est:true,
        source:"Estimate: U.S. operations + modest follow-on. Excludes downstream regional-instability costs.",
        url:"https://www.cfr.org/articles/what-does-libya-cost-united-states" },
      blurb:"A months-long air campaign to topple Gaddafi. Cheap in direct dollars — the lasting costs landed in regional chaos, which no ledger fully captures."
    },
    {
      id:"isis", name:"Anti-ISIS War (Inherent Resolve)", status:"ongoing", in_total:false,
      official:"Aug 8, 2014 – ongoing",
      window_note:"Operation Inherent Resolve. NOTE: already captured inside the Iraq/Syria all-in figure above — shown here for detail but EXCLUDED from the combined total to avoid double-counting.",
      direct:{ usd_bn:50, dollar_year:2019, confidence:"Medium",
        source:"DoD: ~$14.3B through mid-2017, growing via CTEF; ~$50B cumulative (mid-war $). DoD / LIG-OIR.",
        url:"https://dod.defense.gov/OIR/" },
      allin:{ usd_bn:50, dollar_year:2019, confidence:"Low", est:true,
        source:"Subsumed within Brown's Iraq/Syria war-zone all-in ($2.1T). Not added again to the combined total.",
        url:"https://costsofwar.watson.brown.edu/" },
      blurb:"The campaign that destroyed the ISIS caliphate. Its cost already sits inside the Iraq/Syria all-in figure, so we display it for transparency but don't double-count it in the total."
    },
    {
      id:"iran", name:"Iran War", status:"ceasefire",
      official:"Feb 28, 2026 – ceasefire Jun 15, 2026 ('Operation Epic Fury')",
      window_note:"CEASEFIRE, NOT CONCLUDED. An MOU was signed Jun 17 by both presidents: 60-day ceasefire, Strait of Hormuz open toll-free, U.S. naval blockade lifted, 60 days of nuclear talks. U.S.–Iran delegations convened Jun 21 at Bürgenstock resort in Switzerland. Senate passed a symbolic resolution Jun 23 to end unauthorized military action. White House submitted $87.6B supplemental request to Congress Jun 24 ($67B DoD: $21B munitions, $17.3B operational costs, $2.4B drones, $1.7B readiness, $12.1B classified; plus $11.1B agriculture aid, $1.4B Ebola). CRITICAL UPDATE: The $113.3B figure that appeared in early trackers has been explicitly debunked by CSIS (Jun 23, 2026) — it assumed a constant $1B/day burn for all 108 days and 'does not reflect the reduction in U.S. strikes after the ceasefire or the use of cheaper munitions.' War costs dropped sharply after day 5 as air superiority shifted operations to cheap munitions. CSIS actual estimate: $34–42B (~$40B central). Pentagon official: $29B (acknowledged incomplete, excludes base damage). Troop redeployment not yet begun. Per owner's view, we do NOT call this over: replenishment, base/equipment repair, possible direct payments to Iran, and veterans' care + interest keep the meter running.",
      direct:{ usd_bn:40.0, dollar_year:2026, confidence:"Medium", est:true, live:true,
        burn_per_day_bn:0.01, as_of:"2026-06-23",
        source:"CSIS 'The War May Be Ending. What Did Epic Fury Cost?' (Cancian & Park, Jun 23, 2026): 6-category estimate: deployment $0.17B, munitions $26.1B (13,629 strike munitions fired), operational tempo $0.75B, equipment losses $1.8–3.5B, base damage $4.0–9.4B, fuel $1.4B, other $1.5B — total $34–42B, central ~$40B. Pentagon official (comptroller Hurst): $29B, acknowledged incomplete (excludes base damage). Ceasefire residual burn ~$4M/day ($0.004B) per CSIS operational tempo estimate; shown here at $0.01B/day including replenishment overhead.",
        url:"https://www.csis.org/analysis/war-may-be-ending-what-did-epic-fury-cost" },
      allin:{ usd_bn:115, dollar_year:2026, confidence:"Low", est:true,
        source:"Projected all-in estimate: direct military ops ~$40B (CSIS) + net supplemental beyond ops (~$27B, based on White House $87.6B request Jun 24, 2026) + veterans 30yr ~$12B (CSIS: ~70,000 troops, 35% disability rate at $16,100/yr avg) + interest on war debt ~$25B + other federal ~$1B. Highly preliminary; far smaller than Afghanistan/Iraq due to shorter duration and fewer troops (70K vs 2M).",
        url:"https://www.csis.org/analysis/war-may-be-ending-what-did-epic-fury-cost" },
      blurb:"The largest U.S. Middle East deployment since the 2003 Iraq invasion — ~40,000 combat troops, multiple carrier strike groups, B-2 strikes on nuclear sites. Early trackers reported $113B by extrapolating the first week's $1B/day burn rate; CSIS definitively debunked this in its Jun 23 post-war analysis — costs dropped sharply after day five as air superiority shifted operations to cheap short-range munitions. The authoritative direct tally: $34–42B (CSIS), or $29B per the Pentagon's own incomplete count. The White House asked Congress on Jun 24 for $87.6B in supplemental funding to cover replenishment and future costs. An MOU was signed Jun 17; nuclear talks opened Jun 21 in Switzerland. We don't treat this as over: with ~70,000 service members exposed, CSIS projects $12B in veterans' costs alone over 30 years — plus interest on every dollar borrowed to fight the war. The Pentagon's $29B headline ignores all of that; the true long-tail bill is the gap this tracker exists to expose."
    }
  ]
};
