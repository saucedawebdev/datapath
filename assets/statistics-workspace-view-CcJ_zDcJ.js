import{M as m}from"./main-DIC5lzHF.js";async function b(){var t,s;m(!0);const a=document.createElement("div");return a.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Statistics Lab</h1>
      <p class="page-header__subtitle">Interactive calculators for Northstar Commerce analysis — mean, median, standard deviation, and more.</p>
    </header>
    <div class="stats-lab">
      <label class="form-label" for="stats-input">Enter comma-separated numbers</label>
      <textarea id="stats-input" class="form-textarea" rows="3">12500, 9800, 11200, 8900, 10500</textarea>
      <div class="flex gap-sm mt-md">
        <button type="button" class="btn btn--primary" id="stats-calc">Calculate</button>
        <button type="button" class="btn btn--secondary" id="stats-reset">Reset</button>
      </div>
      <div id="stats-output" class="stats-lab__output mt-lg" role="status"></div>
    </div>
  `,(t=a.querySelector("#stats-calc"))==null||t.addEventListener("click",p),(s=a.querySelector("#stats-reset"))==null||s.addEventListener("click",()=>{a.querySelector("#stats-input").value="12500, 9800, 11200, 8900, 10500",a.querySelector("#stats-output").innerHTML=""}),a}function p(){var d;const t=(((d=document.getElementById("stats-input"))==null?void 0:d.value)||"").split(",").map(e=>parseFloat(e.trim())).filter(e=>!Number.isNaN(e)),s=document.getElementById("stats-output");if(!t.length){s.innerHTML='<p class="text-error">Enter at least one number.</p>';return}const r=[...t].sort((e,n)=>e-n),c=t.reduce((e,n)=>e+n,0)/t.length,i=Math.floor(r.length/2),o=r.length%2?r[i]:(r[i-1]+r[i])/2,u=t.reduce((e,n)=>e+(n-c)**2,0)/t.length,l=Math.sqrt(u);s.innerHTML=`
    <div class="metric-grid">
      <div class="metric-card"><span class="metric-card__label">Mean</span><span class="metric-card__value">${c.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Median</span><span class="metric-card__value">${o.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Std Dev</span><span class="metric-card__value">${l.toFixed(2)}</span></div>
      <div class="metric-card"><span class="metric-card__label">Count</span><span class="metric-card__value">${t.length}</span></div>
    </div>
    <p class="text-secondary mt-md">Business interpretation: Average regional revenue is $${c.toFixed(0)} with ${l.toFixed(0)} spread — ${l/c>.15?"meaningful variation across regions worth investigating.":"relatively consistent performance across regions."}</p>
  `}export{b as renderStatisticsPlayground};
//# sourceMappingURL=statistics-workspace-view-CcJ_zDcJ.js.map
