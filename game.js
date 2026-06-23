/* "Higher or Lower" price game engine. Renders into any element id passed to
   window.GAME.mount(id). Uses window.GAME_DATA. Tracks streak + best (localStorage). */
(function () {
  function fmt(p) {
    if (p >= 1000) return "$" + Math.round(p).toLocaleString();
    return "$" + p.toFixed(2);
  }
  // a "nice" anchor near the true price but clearly different (>=22% away)
  function anchorFor(p) {
    var factors = [0.45, 0.55, 0.65, 1.5, 1.7, 2.0, 2.5];
    var f = factors[Math.floor(Math.random() * factors.length)];
    var a = p * f;
    // round to a human-friendly value
    if (a >= 5000) a = Math.round(a / 1000) * 1000;
    else if (a >= 500) a = Math.round(a / 100) * 100;
    else if (a >= 20) a = Math.round(a / 5) * 5;
    else if (a >= 2) a = Math.round(a * 2) / 2;
    else if (a >= 0.2) a = Math.round(a * 20) / 20;
    else a = Math.round(a * 100) / 100;
    if (Math.abs(a - p) / p < 0.2) a = p * (f < 1 ? 0.6 : 1.6); // guarantee a gap
    return a;
  }

  var CSS = ''
    + '.hl{font-family:Georgia,serif;background:#1b1610;border:2px solid var(--gold,#9a7d2e);border-radius:10px;padding:22px 20px;color:#f4ecd8;text-align:center;max-width:560px;margin:0 auto}'
    + '.hl .score{display:flex;justify-content:space-between;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:#cdbf9b;margin-bottom:14px}'
    + '.hl .score b{color:#d9a441;font-size:1rem;display:block}'
    + '.hl .emoji{font-size:2.6rem;line-height:1}'
    + '.hl .q{font-size:1.35rem;font-weight:700;margin:10px 0 4px}'
    + '.hl .anchor{font-size:1.05rem;color:#e8dcb6;margin-bottom:16px}'
    + '.hl .anchor b{color:#fff;font-size:1.25rem}'
    + '.hl .btns{display:flex;gap:12px;justify-content:center}'
    + '.hl .btns button{flex:1;max-width:200px;font:inherit;font-weight:700;font-size:1.02rem;padding:15px 10px;border-radius:8px;border:2px solid #c3b189;background:#efe4c8;color:#2b2317;cursor:pointer}'
    + '.hl .btns button:hover{background:#fff}'
    + '.hl .btns button.lo{border-color:#5a7d9a}.hl .btns button.hi{border-color:#8c1c13}'
    + '.hl .reveal{font-size:1.1rem;margin:8px 0}'
    + '.hl .reveal .big{font-size:1.7rem;font-weight:700;display:block;margin:4px 0}'
    + '.hl .ok{color:#7dd17d}.hl .no{color:#ef8a7a}'
    + '.hl .next{margin-top:12px;background:var(--gold,#9a7d2e);color:#1a1306;border:none;font-weight:700;font:inherit;font-size:1rem;padding:13px 30px;border-radius:8px;cursor:pointer}'
    + '.hl .ctx{font-size:.82rem;color:#cdbf9b;margin-top:12px}'
    + '.hl .ctx a{color:#d9a441}'
    + '.hl .share{margin-top:8px;background:transparent;border:1px solid #5a4a22;color:#e7d9ad;font:inherit;font-size:.82rem;padding:7px 16px;border-radius:20px;cursor:pointer}';

  var streak = 0;
  var best = 0;
  try { best = parseInt(localStorage.getItem("hl_best") || "0", 10) || 0; } catch (e) {}

  function pick() { return window.GAME_DATA[Math.floor(Math.random() * window.GAME_DATA.length)]; }

  function mount(elId) {
    if (!document.getElementById("hl-css")) {
      var s = document.createElement("style"); s.id = "hl-css"; s.textContent = CSS; document.head.appendChild(s);
    }
    var el = document.getElementById(elId);
    if (!el || !window.GAME_DATA) return;
    var cur, anchor;

    function round() {
      cur = pick(); anchor = anchorFor(cur.price);
      el.innerHTML = ''
        + '<div class="hl">'
        + '  <div class="score"><span>Streak<b id="hlS">' + streak + '</b></span><span>Best<b id="hlB">' + best + '</b></span></div>'
        + '  <div class="emoji">' + (cur.emoji || "💵") + '</div>'
        + '  <div class="q">' + capitalize(cur.item) + ' in ' + cur.year + '…</div>'
        + '  <div class="anchor">did it cost more or less than <b>' + fmt(anchor) + '</b>?</div>'
        + '  <div class="btns"><button class="lo" id="hlLo">⬇ Less</button><button class="hi" id="hlHi">⬆ More</button></div>'
        + '</div>';
      document.getElementById("hlLo").onclick = function () { guess(false); };
      document.getElementById("hlHi").onclick = function () { guess(true); };
    }

    function guess(saidHigher) {
      var trueHigher = cur.price > anchor;
      var correct = (saidHigher === trueHigher);
      if (correct) { streak++; if (streak > best) { best = streak; try { localStorage.setItem("hl_best", best); } catch (e) {} } }
      else { streak = 0; }
      var box = el.querySelector(".hl");
      box.innerHTML = ''
        + '<div class="score"><span>Streak<b>' + streak + '</b></span><span>Best<b>' + best + '</b></span></div>'
        + '<div class="emoji">' + (cur.emoji || "💵") + '</div>'
        + '<div class="reveal ' + (correct ? "ok" : "no") + '">' + (correct ? "✓ Correct!" : "✗ Nope.")
        + '<span class="big">' + capitalize(cur.item) + ' cost ' + fmt(cur.price) + ' in ' + cur.year + '.</span></div>'
        + '<div class="ctx">' + blurb(cur) + '</div>'
        + '<button class="next" id="hlN">Next →</button>'
        + ' <button class="share" id="hlShare">Share</button>';
      document.getElementById("hlN").onclick = round;
      document.getElementById("hlShare").onclick = function () { share(); };
    }

    function share() {
      var txt = "I hit a " + best + "-streak guessing real prices since 1913 on The 1913 Index. Your dollar isn't what it was. Try it:";
      var url = location.origin + location.pathname.replace(/[^/]*$/, "game.html");
      if (navigator.share) { navigator.share({ title: "The 1913 Index — Price Game", text: txt, url: url }).catch(function(){}); }
      else { try { navigator.clipboard.writeText(txt + " " + url); var b = document.getElementById("hlShare"); b.textContent = "Copied!"; } catch (e) {} }
    }

    round();
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function blurb(c) {
    return 'Real money keeps shrinking — see <a href="explore.html">how every price has moved</a> or <a href="ask.html">ask the Index yourself</a>.';
  }

  window.GAME = { mount: mount };
})();
