/* THE 1913 INDEX — "ASK" ENGINE (deterministic, no LLM)
   Answers natural-language price questions ONLY from the open dataset:
   window.DB (items), window.CORPUS (per-year series + real overlays), window.SERIES (index history),
   window.VERIFY (confidence). Every number returned is sourced and traceable — the engine never
   invents a value; if it can't ground an answer in the data, it says so.

   Public API: window.ASK.answer(queryString) -> { ok, kind, html, text }
*/
(function () {
  var DB = window.DB, COR = window.CORPUS || {}, SER = window.SERIES, VER = (window.VERIFY && window.VERIFY.byId) || {};
  var NOW = 2026;

  function fmtD(n) { return "$" + Number(n).toLocaleString("en-US", { maximumFractionDigits: Math.abs(n) < 100 ? 2 : 0 }); }
  function fmtPct(n) { return (n >= 0 ? "+" : "") + Math.round(n).toLocaleString() + "%"; }
  function norm(s) { return (s || "").toLowerCase().replace(/[^a-z0-9$ ]/g, " ").replace(/\s+/g, " ").trim(); }

  // light synonym map so everyday words hit the right item id/name
  var SYN = { house: "home", houses: "home", housing: "home", gasoline: "gas", petrol: "gas",
    college: "college tuition", tuition: "college tuition", stamps: "stamp", postage: "stamp",
    "ground beef": "beef", hamburger: "beef", car: "car", auto: "car", automobile: "car",
    eggs: "eggs", egg: "eggs", electricity: "electricity", power: "electricity", tv: "television" };

  function expandSyn(q) { var w = q.split(" "); return w.map(function (t) { return SYN[t] || t; }).join(" "); }

  // small edit-distance for typo tolerance (capped, early-exit)
  function lev(a, b) {
    if (a === b) return 0; var al = a.length, bl = b.length;
    if (Math.abs(al - bl) > 2) return 9;
    var prev = []; for (var j = 0; j <= bl; j++) prev[j] = j;
    for (var i = 1; i <= al; i++) {
      var cur = [i];
      for (var k = 1; k <= bl; k++) {
        cur[k] = Math.min(prev[k] + 1, cur[k - 1] + 1, prev[k - 1] + (a[i - 1] === b[k - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[bl];
  }
  function fuzzyHit(token, nameTokens) { // true if token is within tolerance of any name token
    var tol = token.length <= 5 ? 1 : 2;
    return nameTokens.some(function (nt) { return nt.length >= 4 && lev(token, nt) <= tol; });
  }

  // words that must never be used to match an item name (avoids "now"->"snow", "cost"->... etc.)
  var STOP = { how: 1, much: 1, more: 1, many: 1, than: 1, cost: 1, costs: 1, price: 1, prices: 1, priced: 1,
    since: 1, from: 1, worth: 1, now: 1, today: 1, todays: 1, does: 1, did: 1, the: 1, and: 1, was: 1, were: 1,
    are: 1, what: 1, when: 1, dollar: 1, dollars: 1, value: 1, buy: 1, back: 1, compared: 1, versus: 1, year: 1,
    years: 1, ago: 1, about: 1, used: 1, get: 1, would: 1, costed: 1, expensive: 1, cheaper: 1, currently: 1 };

  function findYears(q) {
    var m = q.match(/\b(18[5-9]\d|19\d\d|20[0-2]\d)\b/g) || [];
    return m.map(Number).filter(function (y) { return y >= 1850 && y <= NOW; });
  }

  // score items by token overlap with the query
  function findItem(q) {
    var qt = expandSyn(q).split(" ").filter(function (t) { return t.length > 2 && !/^\d+$/.test(t) && !STOP[t]; });
    if (!qt.length) return null;
    var best = null, bestScore = 0;
    DB.items.forEach(function (it) {
      var name = norm(it.name), nameTokens = name.split(" "), idTokens = String(it.id).split("-");
      var score = 0;
      qt.forEach(function (t) {
        if (it.id === t) score += 6;                           // query word IS the item id (e.g. "gas")
        else if (idTokens.indexOf(t) >= 0) score += 2;         // matches an id segment
        if (nameTokens.indexOf(t) >= 0) score += 3;            // exact word in name
        else if (name.indexOf(t) >= 0) score += 2;             // substring of name
        else if (nameTokens.some(function (nt) { return nt.indexOf(t) === 0 && t.length >= 4; })) score += 1;
        else if (t.length >= 4 && fuzzyHit(t, nameTokens)) score += 1.5; // typo tolerance
      });
      // prefer shorter names on ties (more specific match), and verified/overlaid items
      if (score > 0) {
        score += (it.verified ? 0.3 : 0) + (COR[it.id] && COR[it.id].real ? 0.3 : 0) - name.length * 0.002;
        if (score > bestScore) { bestScore = score; best = it; }
      }
    });
    return bestScore >= 2 ? best : null;
  }

  // value of an item in a given year, from the corpus (marks whether it's REAL or modeled)
  function valueInYear(it, year) {
    var c = COR[it.id];
    if (year === NOW) return { val: it.now_price, real: true, kind: "sourced (current)" };
    if (year === it.then_year) return { val: it.then_price, real: true, kind: "sourced (anchor)" };
    if (c && c.real) { for (var i = 0; i < c.real.length; i++) if (c.real[i][0] === year) return { val: c.real[i][1], real: true, kind: "real BLS series" }; }
    if (c && year >= c.s && year <= c.s + c.v.length - 1) return { val: c.v[year - c.s], real: false, kind: "modeled from category index" };
    return null;
  }

  // wage ($/hr) in a given year, linearly interpolated from the sparse WAGES.points map
  function wageInYear(year) {
    var W = window.WAGES; if (!W || !W.points) return null;
    var ys = Object.keys(W.points).map(Number).sort(function (a, b) { return a - b; });
    if (!ys.length) return null;
    if (year <= ys[0]) return W.points[ys[0]];
    if (year >= ys[ys.length - 1]) return W.points[ys[ys.length - 1]];
    for (var i = 0; i < ys.length - 1; i++) {
      if (year >= ys[i] && year <= ys[i + 1]) {
        var a = ys[i], b = ys[i + 1], va = W.points[a], vb = W.points[b];
        return va + (vb - va) * (year - a) / (b - a);
      }
    }
    return null;
  }
  function goldItem() { return DB.items.find(function (i) { return i.id === "gold"; }); }

  function confChip(id) {
    var v = VER[id]; if (!v) return "";
    var map = { "cross-verified": ["Cross-verified", "#1f6f43"], "audited-ok": ["Audited", "#3f5d2e"], "plausible": ["Plausible", "#9a7d2e"], "review": ["Review", "#8c1c13"], "conflict": ["Conflict", "#5a0f09"] };
    var m = map[v.c] || map.plausible;
    return '<span style="display:inline-flex;align-items:center;gap:5px;font-size:.8rem"><span style="width:9px;height:9px;border-radius:50%;background:' + m[1] + ';display:inline-block"></span>' + m[0] + (v.x ? ' · 2nd source ' + (v.x.d > 0 ? "+" : "") + v.x.d + "%" : "") + '</span>';
  }

  function startYearFor(it, years) {
    var sy = it.then_year;
    if (years.length) { var valid = years.filter(function (y) { return y >= it.then_year; }); if (valid.length) sy = Math.min.apply(null, valid); }
    return sy;
  }

  // ---- GOLD LENS: "milk in gold", "a home in gold since 1971" ----
  function goldAnswer(q, years) {
    var g = goldItem(); if (!g) return null;
    var cleaned = q.replace(/\bin gold\b|priced in gold|gold terms|ounces of gold|in ounces/g, " ");
    var it = findItem(cleaned); if (!it || it.id === "gold") return null;
    var startY = startYearFor(it, years);
    var iv = valueInYear(it, startY), gv = valueInYear(g, startY);
    if (!iv || !gv) return null;
    var ozThen = iv.val / gv.val, ozNow = it.now_price / g.now_price;
    var chg = ozNow / ozThen, dir = chg < 1 ? "cheaper" : "dearer";
    function oz(n) { return n >= 1 ? n.toFixed(2) + " oz" : (n * 16).toFixed(2) + " oz" /*never*/; }
    function ozf(n) { return (n).toLocaleString("en-US", { maximumFractionDigits: n < 1 ? 4 : 2 }) + " oz"; }
    var html =
      '<div class="ans"><div class="ahead">' + it.name + ', priced in gold</div>' +
      '<p>In <b>' + startY + '</b>, ' + it.name.toLowerCase() + ' cost <b>' + ozf(ozThen) + '</b> of gold (' + fmtD(iv.val) + ' ÷ ' + fmtD(gv.val) + '/oz).</p>' +
      '<p>Today it costs <b>' + ozf(ozNow) + '</b> of gold (' + fmtD(it.now_price) + ' ÷ ' + fmtD(g.now_price) + '/oz).</p>' +
      '<p>Measured in the one money the Fed cannot print, it is <b style="color:' + (chg < 1 ? "var(--green)" : "var(--red)") + '">' + Math.abs((chg - 1) * 100).toFixed(0) + '% ' + dir + '</b> than in ' + startY + ' (' + chg.toFixed(2) + '× the gold).</p>' +
      '<p class="asrc">Gold: ' + (valueInYear(g, startY).kind) + ' (' + startY + '), spot today. ' + it.name + ': ' + iv.kind + '. <a href="gold.html">The gold lens →</a></p></div>';
    return { ok: true, kind: "gold", html: html, text: it.name + " in gold: " + ozf(ozThen) + " (" + startY + ") -> " + ozf(ozNow) + " (" + NOW + ")" };
  }

  // ---- HOURS-OF-WORK LENS: "a home in hours of work", "how many hours of work for a car" ----
  function hoursAnswer(q, years) {
    var cleaned = q.replace(/hours? of work|hours? of labou?r|hours? to (buy|afford|earn)|how (long|many hours)|in (work|labou?r) hours|labou?r hours|work hours/g, " ");
    var it = findItem(cleaned); if (!it) return null;
    var startY = startYearFor(it, years);
    var iv = valueInYear(it, startY); if (!iv) return null;
    var wThen = wageInYear(startY), wNow = wageInYear(NOW); if (!wThen || !wNow) return null;
    var hThen = iv.val / wThen, hNow = it.now_price / wNow, chg = hNow / hThen, dir = chg < 1 ? "less" : "more";
    function hf(h) { if (h < 1) return (h * 60).toFixed(0) + " min"; if (h > 80) return (h / 8).toFixed(0) + " work-days (" + Math.round(h).toLocaleString() + " hrs)"; return h.toFixed(1) + " hrs"; }
    var html =
      '<div class="ans"><div class="ahead">' + it.name + ', in hours of work</div>' +
      '<p>In <b>' + startY + '</b>: <b>' + hf(hThen) + '</b> of work (' + fmtD(iv.val) + ' ÷ ' + fmtD(wThen) + '/hr).</p>' +
      '<p>Today: <b>' + hf(hNow) + '</b> of work (' + fmtD(it.now_price) + ' ÷ ' + fmtD(wNow) + '/hr).</p>' +
      '<p>In wage terms it takes <b style="color:' + (chg < 1 ? "var(--green)" : "var(--red)") + '">' + Math.abs((chg - 1) * 100).toFixed(0) + '% ' + dir + '</b> work than in ' + startY + '.</p>' +
      '<p class="asrc">Wage = avg hourly earnings, production &amp; nonsupervisory (BLS); pre-1964 estimated. ' + it.name + ': ' + iv.kind + '. <a href="afford.html">The affordability lens →</a></p></div>';
    return { ok: true, kind: "hours", html: html, text: it.name + " in hours: " + hf(hThen) + " (" + startY + ") -> " + hf(hNow) + " (" + NOW + ")" };
  }

  // ---- COMPARE TWO ITEMS: "milk vs gas", "compare a home and college since 1971" ----
  function compareAnswer(q, years) {
    var parts = q.split(/\bvs\b|\bversus\b|\bcompared to\b|\bcompare\b|\band\b|\bor\b/).map(function (s) { return s.trim(); }).filter(Boolean);
    if (parts.length < 2) return null;
    var found = [];
    parts.forEach(function (p) { var it = findItem(p); if (it && !found.some(function (f) { return f.id === it.id; })) found.push(it); });
    if (found.length < 2) return null;
    found = found.slice(0, 2);
    var commonStart = years.length ? Math.max.apply(null, years) : Math.max(found[0].then_year, found[1].then_year);
    var rows = found.map(function (it) {
      var sy = Math.max(commonStart, it.then_year), sv = valueInYear(it, sy) || { val: it.then_price, kind: "anchor" };
      var mult = it.now_price / sv.val, pct = (mult - 1) * 100, yrs = NOW - sy, rate = yrs > 0 ? (Math.pow(mult, 1 / yrs) - 1) * 100 : 0;
      return { it: it, sy: sy, sv: sv, mult: mult, pct: pct, rate: rate };
    });
    rows.sort(function (a, b) { return b.mult - a.mult; });
    var win = rows[0], lose = rows[1];
    var html = '<div class="ans"><div class="ahead">' + rows[0].it.name + ' vs ' + rows[1].it.name + '</div>';
    rows.forEach(function (r) {
      html += '<p><b>' + r.it.name + '</b>: ' + fmtD(r.sv.val) + ' (' + r.sy + ') → ' + fmtD(r.it.now_price) + ' (' + NOW + ') = <b>' + r.mult.toFixed(1) + '×</b> (' + r.rate.toFixed(1) + '%/yr) ' + confChip(r.it.id) + '</p>';
    });
    html += '<p><b style="color:var(--red)">' + win.it.name + '</b> rose ' + (win.mult / lose.mult).toFixed(1) + '× faster than ' + lose.it.name.toLowerCase() + ' since ' + Math.max(win.sy, lose.sy) + '.</p>';
    html += '<p class="asrc"><a href="data.html">Browse the full dataset →</a></p></div>';
    return { ok: true, kind: "compare", html: html, text: win.it.name + " " + win.mult.toFixed(1) + "× vs " + lose.it.name + " " + lose.mult.toFixed(1) + "×" };
  }

  // ---- LEADERBOARD: "what rose the most since 1971", "biggest drops since 1980" ----
  function leaderboardAnswer(q, years) {
    var down = /\bfell|fallen|drop|dropp|declin|cheaper|least expensive|deflat|smallest|least\b/.test(q);
    var startY = years.length ? Math.max.apply(null, years) : 1971;
    var rows = [];
    DB.items.forEach(function (it) {
      if (it.category === "Money & civic") return;            // skip crypto/FX/tax — not consumer prices
      if (it.then_year > startY || !(it.now_price > 0)) return;
      var sv = valueInYear(it, startY); if (!sv || !(sv.val > 0)) return;
      var mult = it.now_price / sv.val;
      if (!isFinite(mult) || mult <= 0) return;
      rows.push({ it: it, mult: mult, start: sv.val });
    });
    if (rows.length < 5) return null;
    rows.sort(function (a, b) { return down ? a.mult - b.mult : b.mult - a.mult; });
    var top = rows.slice(0, 8);
    var html = '<div class="ans"><div class="ahead">' + (down ? "Smallest price changes" : "Biggest price increases") + ' since ' + startY + '</div>' +
      '<p style="font-size:.9rem;color:var(--ink2);margin:.2em 0 .6em">Of ' + rows.length.toLocaleString() + ' tracked items with data back to ' + startY + ' (consumer goods &amp; services; currencies and crypto excluded).</p>';
    top.forEach(function (r, i) {
      var pct = (r.mult - 1) * 100;
      var mx = r.mult >= 0.1 ? r.mult.toFixed(1) : r.mult.toPrecision(2);
      html += '<p style="margin:.3em 0"><b>' + (i + 1) + '.</b> <a href="item.html?id=' + encodeURIComponent(r.it.id) + '">' + r.it.name + '</a> — <b style="color:' + (r.mult >= 1 ? "var(--red)" : "var(--green)") + '">' + mx + '×</b> (' + fmtPct(pct) + ') ' + confChip(r.it.id) + '</p>';
    });
    html += '<p class="asrc">Ranked by nominal multiple ' + startY + '→' + NOW + '. <a href="data.html">See all, sortable →</a></p></div>';
    return { ok: true, kind: "leaderboard", html: html, text: (down ? "Smallest" : "Biggest") + " movers since " + startY + ": #1 " + top[0].it.name + " " + top[0].mult.toFixed(1) + "×" };
  }

  // ---- DOLLAR PURCHASING-POWER MODE: "$1 in 1913 today", "what is $100 from 1971 worth now" ----
  function dollarAnswer(q, years) {
    if (!SER || !SER.rows) return null;
    var amt = 1; var am = q.match(/\$?\s*([\d,]+(\.\d+)?)/); if (am) amt = parseFloat(am[1].replace(/,/g, "")) || 1;
    var baseY = years[0], endY = years[1] || NOW;
    var rows = SER.rows, base = rows.find(function (r) { return r.y === baseY; }), end = rows.find(function (r) { return r.y === endY; });
    if (!base || !end) return null;
    var idxMult = end.idx / base.idx, cpiMult = end.cpi / base.cpi;
    var needIndex = amt * idxMult, needCPI = amt * cpiMult;
    var html =
      '<div class="ans"><div class="ahead">' + fmtD(amt) + ' in ' + baseY + ' &rarr; ' + (endY === NOW ? "today" : endY) + '</div>' +
      '<p>To buy what ' + fmtD(amt) + ' bought in ' + baseY + ', you now need <b style="color:var(--red)">' + fmtD(needIndex) + '</b> by <b>The 1913 Index</b> (real prices of real goods).</p>' +
      '<p>By <b>official CPI</b>, the same ' + fmtD(amt) + ' is ' + fmtD(needCPI) + ' — a ' + (idxMult / cpiMult).toFixed(2) + '× wider loss on the 1913 Index than the government reports.</p>' +
      '<p class="asrc">Source: 1913 Index history series (' + baseY + '&ndash;' + endY + ', index 1913=100) vs official CPI. <a href="dollar-clock.html">See the live Dollar Clock &rarr;</a></p></div>';
    return { ok: true, kind: "dollar", html: html, text: fmtD(amt) + " in " + baseY + " = " + fmtD(needIndex) + " today (1913 Index)" };
  }

  // ---- ITEM MODE: "how much more is milk than in 1960", "gas in 1990", "coffee since 1980" ----
  function itemAnswer(q, years) {
    var it = findItem(q); if (!it) return null;
    var c = COR[it.id];
    var startY = years.length ? Math.min.apply(null, years.filter(function (y) { return y >= it.then_year; }).concat([it.then_year])) : it.then_year;
    if (years.length && years[0] >= it.then_year) startY = years[0];
    var sv = valueInYear(it, startY) || { val: it.then_price, real: true, kind: "sourced (anchor)" };
    var nowv = it.now_price;
    var mult = nowv / sv.val, pct = (mult - 1) * 100;
    var yrs = NOW - startY, rate = yrs > 0 ? (Math.pow(mult, 1 / yrs) - 1) * 100 : null;
    var realNote = c && c.real ? (' <span style="color:var(--green)">Real BLS per-year data ' + c.real[0][0] + '&ndash;' + c.real[c.real.length - 1][0] + '.</span>') : '';
    var startKind = sv.kind;
    var html =
      '<div class="ans"><div class="ahead">' + it.name + (it.unit ? ' (' + it.unit + ')' : '') + '</div>' +
      '<p>In <b>' + startY + '</b>: <b>' + fmtD(sv.val) + '</b> &nbsp;&rarr;&nbsp; <b>' + NOW + '</b>: <b style="color:var(--red)">' + fmtD(nowv) + '</b></p>' +
      '<p>That is <b>' + mult.toFixed(1) + '×</b> (' + fmtPct(pct) + ')' + (rate !== null ? ', about <b>' + rate.toFixed(1) + '%</b> per year' : '') + '.</p>' +
      '<p class="asrc">' + confChip(it.id) + '</p>' +
      '<p class="asrc">' + startY + ' value: ' + startKind + '. ' + NOW + ': ' + (it.source_now || 'sourced') + '.' + realNote +
      ' <a href="item.html?id=' + encodeURIComponent(it.id) + '">Full record &amp; chart &rarr;</a></p></div>';
    var text = it.name + ": " + fmtD(sv.val) + " (" + startY + ") -> " + fmtD(nowv) + " (" + NOW + "), " + mult.toFixed(1) + "x";
    return { ok: true, kind: "item", html: html, text: text };
  }

  function answer(qRaw) {
    var q = norm(qRaw); if (!q) return { ok: false, html: '<div class="ans">Ask about a price — e.g. <i>"how much more does a home cost than in 1971?"</i> or <i>"milk in 1960"</i>.</div>' };
    var years = findYears(q);
    var hardDollar = /\$\s*\d/.test(q) && years.length;       // explicit "$100 ... 1971" -> always dollar
    var softDollar = /\bdollar|purchasing power|worth (today|now)|buy.*today/.test(q) && years.length;
    var wantsGold = /\bin gold\b|priced in gold|gold terms|ounces of gold/.test(q);
    var wantsHours = /hours? of (work|labou?r)|hours? to (buy|afford|earn)|how (long|many hours)|in (work|labou?r) hours|work hours/.test(q);
    var wantsCompare = /\bvs\b|\bversus\b|\bcompared to\b|\bcompare\b/.test(q);
    var wantsLeader = /\b(most|biggest|fastest|least|smallest|top)\b/.test(q) && /\b(ros|ris|increas|inflation|jump|climb|grew|grow|fell|fall|fallen|drop|declin|cheaper|expensive|riser|decliner|mover)\w*/.test(q);
    var res = null;
    if (hardDollar) res = dollarAnswer(q, years);
    if (!res && wantsLeader) res = leaderboardAnswer(q, years);
    if (!res && wantsGold) res = goldAnswer(q, years);
    if (!res && wantsHours) res = hoursAnswer(q, years);
    if (!res && wantsCompare) res = compareAnswer(q, years);
    if (!res && softDollar && !findItem(q)) res = dollarAnswer(q, years);
    if (!res) res = itemAnswer(q, years);
    if (!res && years.length) res = dollarAnswer(q, years);
    if (!res) return { ok: false, html: '<div class="ans miss">I can only answer from the dataset, and I couldn\'t match that to a tracked item or a year. Try an item name plus a year — e.g. <i>"gas in 1990"</i>, <i>"coffee since 1980"</i>, or <i>"$1 in 1913 today"</i>. Browse everything on the <a href="data.html">data page</a>.</div>' };
    return res;
  }

  window.ASK = { answer: answer, findItem: findItem };
})();
