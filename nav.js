/* Global navigation — injected on every page so there are no dead-ends.
   5 top tabs (Home · Explore · Ask · Play · The Why) + a contextual sub-nav
   for the Explore and Why hubs. Reduces 17 tabs to 5 and lets any secondary
   page jump to any other. Edit the maps here once; every page updates. */
(function () {
  var FILE = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";

  // which top section each page belongs to
  var SECTION = {
    "index.html": "home", "": "home", "dollar-clock.html": "home", "dollar.html": "home", "card.html": "home",
    "explore.html": "explore", "basket.html": "explore", "housing.html": "explore", "regional.html": "explore",
    "wages.html": "explore", "gold.html": "explore", "afford.html": "explore", "data.html": "explore", "item.html": "explore", "history.html": "explore",
    "ask.html": "ask",
    "game.html": "play",
    "why.html": "why", "the-number.html": "why", "cpi-vs-index.html": "why", "measures.html": "why",
    "method.html": "why", "fed-tracker.html": "why", "fed.html": "why", "fedwatch.html": "why",
    "war.html": "why", "wilson.html": "why", "contribute.html": "why"
  };
  var section = SECTION[FILE] || "home";

  var TOP = [
    ["home", "Home", "index.html"],
    ["explore", "Explore Prices", "explore.html"],
    ["ask", "Ask", "ask.html"],
    ["play", "Play", "game.html"],
    ["why", "The Why", "why.html"]
  ];

  var SUB = {
    explore: [["basket.html","The Basket"],["housing.html","Housing"],["regional.html","Regional"],["wages.html","Wages"],["gold.html","Gold"],["afford.html","Hours of Work"],["data.html","All Data"]],
    why: [["the-number.html","The Number"],["cpi-vs-index.html","vs Official CPI"],["fed-tracker.html","The Fed"],["war.html","War Cost"],["method.html","Method"],["measures.html","Measures"],["contribute.html","Contribute"]]
  };

  var css = ''
    + '.gnav{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:6px;flex-wrap:wrap;'
    + 'background:#1b1610;border-bottom:2px solid var(--gold,#9a7d2e);padding:8px 14px;font-family:Georgia,serif}'
    + '.gnav .brand{font-weight:700;letter-spacing:.04em;color:#f4ecd8;text-decoration:none;font-size:.92rem;margin-right:8px;white-space:nowrap}'
    + '.gnav .brand b{color:#d9a441}'
    + '.gnav a.t{color:#cdbf9b;text-decoration:none;font-size:.82rem;padding:6px 11px;border-radius:5px;white-space:nowrap}'
    + '.gnav a.t:hover{background:#2b2317;color:#fff}'
    + '.gnav a.t.on{background:var(--gold,#9a7d2e);color:#1a1306;font-weight:700}'
    + '.gnav .spacer{flex:1}'
    + '.gnav .play{background:#8c1c13;color:#fff;font-weight:700}'
    + '.gnav .play:hover{background:#b22222;color:#fff}'
    + '.subnav{display:flex;gap:4px;flex-wrap:wrap;background:#efe4c8;border-bottom:1px solid var(--rule,#c3b189);padding:7px 14px}'
    + '.subnav a{color:#4a3f2a;text-decoration:none;font-size:.78rem;padding:5px 10px;border-radius:4px;white-space:nowrap;font-family:Georgia,serif}'
    + '.subnav a:hover{background:#e2d4ac}'
    + '.subnav a.on{background:#2b2317;color:#f4ecd8;font-weight:700}'
    + '@media(max-width:560px){.gnav{padding:7px 8px}.gnav a.t{padding:6px 8px;font-size:.78rem}.gnav .brand{font-size:.82rem}}';

  function esc(s){return s;}
  var top = TOP.map(function (t) {
    var on = (t[0] === section) ? " on" : "";
    var cls = "t" + (t[0] === "play" ? " play" : "") + on;
    return '<a class="' + cls + '" href="' + t[2] + '">' + t[1] + '</a>';
  }).join("");

  var bar = '<div class="gnav"><a class="brand" href="index.html"><b>1913</b>&nbsp;INDEX</a>' + top + '</div>';

  var sub = "";
  if (SUB[section]) {
    sub = '<div class="subnav">' + SUB[section].map(function (s) {
      var on = (s[0] === FILE) ? " on" : "";
      return '<a class="' + (on ? "on" : "") + '" href="' + s[0] + '">' + s[1] + '</a>';
    }).join("") + '</div>';
  }

  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
  var holder = document.createElement("div"); holder.innerHTML = bar + sub;
  // insert at very top of body
  if (document.body) document.body.insertBefore(holder, document.body.firstChild);
  else document.addEventListener("DOMContentLoaded", function () { document.body.insertBefore(holder, document.body.firstChild); });
})();
