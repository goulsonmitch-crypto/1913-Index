/* =====================================================================
   THE FEDERAL RESERVE TRACKER — data layer (v1)
   ---------------------------------------------------------------------
   The money-printing dashboard: money supply (M2), the Fed's balance
   sheet, the national debt and deficit, and the policy rate — the cause
   behind the price erosion the 1913 Index measures. Live counters animate
   from the latest figure; the weekly job refreshes these values.
   Every figure sourced. Pre-1959 money/debt figures flagged approximate.
   ===================================================================== */
window.FED = {
  meta:{ last_updated:"2026-06-17",
    note:"Live money-and-debt dashboard. Current figures from the Federal Reserve (H.6 M2; H.4.1 balance sheet), U.S. Treasury (Debt to the Penny), and CBO (deficit). Deep-history (1913) money/debt figures use older, differently-defined series and are flagged approximate." },

  funds_rate:{ low:3.50, high:3.75, as_of:"Jun 17, 2026",
    note:"Held at Kevin Warsh's first meeting as chair; dot plot signals a possible hike.",
    source:"FOMC, June 17 2026", url:"https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm" },

  m2:{ value_t:22.8, as_of:"Apr 2026", record:true,
    source:"Federal Reserve H.6 Money Stock Measures (M2SL)", url:"https://fred.stlouisfed.org/series/M2SL",
    note:"Back at a record high and climbing again as the Fed resumes asset purchases.",
    history:[ [1959,0.29],[1970,0.63],[1980,1.6],[1990,3.2],[2000,4.9],[2008,8.2],[2015,12.0],[2020,15.4],[2021,21.2],[2022,21.7],[2024,21.6],[2026,22.8] ],
    since1913_t:0.015 },

  balance_sheet:{ value_t:6.7, as_of:"Jun 10, 2026", peak_t:8.9, peak_year:2022,
    source:"Federal Reserve H.4.1 (WALCL)", url:"https://fred.stlouisfed.org/series/WALCL",
    note:"QT ended Dec 2025 with only ~half the pandemic expansion reversed; the sheet is ticking up again.",
    history:[ [2007,0.9],[2008,2.2],[2011,2.9],[2014,4.5],[2017,4.5],[2019,3.8],[2020,7.4],[2021,8.8],[2022,8.9],[2024,7.2],[2025,6.5],[2026,6.7] ] },

  debt:{ value_t:39.29, as_of:"2026-06-15", growth_per_year_t:2.99,
    public_t:31.60, intragov_t:7.61,
    source:"U.S. Treasury, Debt to the Penny", url:"https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/",
    note:"Up ~$3.0T in the past year and ~$10.9T in five years.",
    history:[ [1980,0.9],[1990,3.2],[2000,5.7],[2008,10.0],[2012,16.1],[2016,19.6],[2020,27.0],[2023,33.2],[2026,39.29] ],
    since1913_t:0.0029 },

  deficit:{ value_t:1.95, fy:"FY2026 (projected)", gdp_pct:5.8, prior_t:1.7,
    source:"CBO / OMB / Treasury (FY2026)", url:"https://www.cbo.gov/topics/budget/outlook-budget-and-economy",
    note:"Roughly $2 trillion, about 5.8% of GDP — among the largest in U.S. history outside a recession or war mobilization." },

  milestones:[
    {y:1913, t:"The Federal Reserve is created. The dollar is still defined as gold."},
    {y:1971, t:"Nixon ends gold convertibility. The dollar becomes pure fiat; money creation loses its last anchor."},
    {y:2008, t:"The first 'quantitative easing' — the balance sheet leaps from ~$0.9T toward $2.2T."},
    {y:2020, t:"Pandemic response: M2 jumps from $15.4T toward $21.7T — roughly 40% of all dollars created in about two years."},
    {y:2025, t:"QT ends with only ~half the pandemic expansion unwound."},
    {y:2026, t:"M2 hits a record $22.8T and the balance sheet turns back up as new purchases resume."}
  ]
};
