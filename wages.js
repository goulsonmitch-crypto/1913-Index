/* Wages data — REAL FRED series (#8, the wage engine).
   ahe: Average Hourly Earnings of Production & Nonsupervisory Employees, Total Private
        (FRED AHETPI, annual avg of monthly, nominal $/hr). The honest wage line: what an hour of
   ordinary work actually paid, before any deflation. Sourced 2026-06-22 via FRED API. 2026 partial omitted. */
window.WAGES = {
  ahe: { start: 1964, src: "FRED AHETPI — Avg Hourly Earnings, Production & Nonsupervisory, Total Private", url: "https://fred.stlouisfed.org/series/AHETPI",
    v: [2.54,2.63,2.73,2.86,3.02,3.22,3.40,3.63,3.90,4.14,4.44,4.74,5.06,5.44,5.88,6.34,6.85,7.43,7.87,8.20,8.49,8.73,8.92,9.14,9.44,9.80,10.20,10.51,10.77,11.05,11.33,11.65,12.04,12.50,13.01,13.49,14.01,14.54,14.96,15.36,15.68,16.12,16.74,17.41,18.07,18.61,19.05,19.44,19.72,20.13,20.60,21.03,21.54,22.04,22.70,23.51,24.68,25.91,27.57,28.92,30.12,31.34] }
};
