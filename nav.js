/* Global navigation — 8 pages. Injected on every page. */
(function () {
  var FILE = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";

  var SECTION = {
    "index.html":"home","":"home",
    "the-number.html":"number",
    "data.html":"prices","item.html":"prices",
    "method.html":"method",
    "the-why.html":"why",
    "the-fed.html":"fed",
    "sticker-shock.html":"play",
    "scan.html":"scan"
  };
  var section = SECTION[FILE] || "home";

  var TOP = [
    ["home",   "Home",       "index.html"],
    ["number", "The Number", "the-number.html"],
    ["prices", "Prices",     "data.html"],
    ["method", "Method",     "method.html"],
    ["why",    "The Why",    "the-why.html"],
    ["fed",    "The Fed",    "the-fed.html"],
    ["play",   "Play",       "sticker-shock.html"],
    ["scan",   "📷 Scan",    "scan.html"]
  ];

  var css = ''
    + '.gnav{position:sticky;top:0;z-index:50;width:100%;box-sizing:border-box;display:flex;align-items:center;gap:4px;flex-wrap:wrap;'
    + 'background:#1b1610;border-bottom:2px solid var(--gold,#9a7d2e);padding:8px 14px;font-family:Georgia,serif}'
    + '.gnav .brand{font-weight:700;letter-spacing:.04em;color:#f4ecd8;text-decoration:none;font-size:.9rem;margin-right:10px;white-space:nowrap;flex-shrink:0}'
    + '.gnav .brand b{color:#d9a441}'
    + '.gnav a.t{color:#cdbf9b;text-decoration:none;font-size:.8rem;padding:5px 10px;border-radius:4px;white-space:nowrap}'
    + '.gnav a.t:hover{background:#2b2317;color:#fff}'
    + '.gnav a.t.on{background:var(--gold,#9a7d2e);color:#1a1306;font-weight:700}'
    + '@media(max-width:600px){.gnav{padding:7px 8px}.gnav a.t{padding:5px 7px;font-size:.75rem}.gnav .brand{font-size:.82rem}}';

  var top = TOP.map(function(t){
    var on = (t[0]===section) ? " on" : "";
    return '<a class="t'+on+'" href="'+t[2]+'">'+t[1]+'</a>';
  }).join("");

  var bar = '<div class="gnav"><a class="brand" href="index.html"><b>1913</b>&nbsp;INDEX</a>'+top+'</div>';

  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);
  var holder = document.createElement("div"); holder.innerHTML = bar;
  if(document.body) document.body.insertBefore(holder, document.body.firstChild);
  else document.addEventListener("DOMContentLoaded", function(){ document.body.insertBefore(holder, document.body.firstChild); });
})();
