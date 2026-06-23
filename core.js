/* ===== THE 1913 INDEX — shared compute + helpers ===== */
(function(){
  var D = window.INDEX_DATA;
  D.items.forEach(function(it){
    it.mult = it.now_price / it.then_price;
    it.pct = (it.mult - 1) * 100;
    it.dollarUp = it.now_price - it.then_price;
  });
  function catMean(cat){
    var xs = D.items.filter(function(i){return i.category===cat;}).map(function(i){return i.mult;});
    return xs.length ? xs.reduce(function(a,b){return a+b;},0)/xs.length : 0;
  }
  var catMult = { Housing:catMean("Housing"), Food:catMean("Food"), Transportation:catMean("Transportation") };
  // Headline = full CPI-mirrored basket (Σ weight × multiple) from the categories block.
  var indexMult = (D.categories && D.categories.length)
    ? D.categories.reduce(function(a,c){ return a + (c.weight/100)*c.mult; }, 0)
    : (0.5*catMult.Housing + 0.3*catMult.Food + 0.2*catMult.Transportation);
  var years = D.meta.now_year - D.meta.base_year;

  window.SMI = {
    D: D,
    items: D.items,
    cpi: D.cpi,
    gold: D.gold,
    catMult: catMult,
    indexMult: indexMult,
    indexPct: (indexMult-1)*100,
    indexAnnual: (Math.pow(indexMult, 1/years)-1)*100,
    goldMult: D.gold.now_price/D.gold.then_price,
    years: years,
    fmtD: function(n){ return "$" + n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}); },
    fmtD0: function(n){ return "$" + Math.round(n).toLocaleString("en-US"); },
    fmtP: function(n){ return Math.round(n).toLocaleString("en-US") + "%"; },
    lossPct: function(mult){ return ((1 - 1/mult)*100).toFixed(1)+"%"; },
    animate: function(el, target, prefix, decimals){
      if(!el) return; var t0=null, dur=1300;
      function step(ts){ if(!t0)t0=ts; var p=Math.min((ts-t0)/dur,1); var e=1-Math.pow(1-p,3); var v=target*e;
        el.textContent=prefix+v.toLocaleString("en-US",{minimumFractionDigits:decimals,maximumFractionDigits:decimals});
        if(p<1) requestAnimationFrame(step);
      } requestAnimationFrame(step);
    }
  };
})();
