/* =====================================================================
   AFFORDABILITY — wage data layer for "hours of work to afford it"
   ---------------------------------------------------------------------
   Nominal average hourly earnings of production / nonsupervisory workers
   (a typical hourly job). Benchmark years; the page interpolates between.
   Modern values (1964+) are solid BLS CES data; pre-1964 are historical
   manufacturing-wage estimates and flagged approximate.
   ===================================================================== */
window.WAGES = {
  meta:{ last_updated:"2026-06-22",
    source:"BLS Current Employment Statistics — avg hourly earnings, production & nonsupervisory (CES0500000008); pre-1964 historical manufacturing wages",
    url:"https://fred.stlouisfed.org/series/CES0500000008",
    note:"Average hourly wage of a typical hourly worker. 1964+ from BLS; earlier years are historical estimates (flagged)." },
  now_year:2026,
  est_before:1964,
  /* nominal $ per hour */
  points:{
    1913:0.22, 1920:0.55, 1930:0.55, 1940:0.66, 1947:1.13, 1950:1.44,
    1960:2.26, 1964:2.53, 1970:3.40, 1980:6.85, 1990:10.20, 2000:14.02,
    2010:19.07, 2020:24.67, 2026:32.31
  }
};
