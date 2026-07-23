import{M as d}from"./main-DIC5lzHF.js";import{e as c}from"./ui-D4x8GKlK.js";const n=[["Region","Revenue","Orders"],["West","12500","42"],["Midwest","9800","35"],["South","11200","38"],["Northeast","8900","29"]];async function p(){var l;d(!0);const t=document.createElement("div");t.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Spreadsheet Lab</h1>
      <p class="page-header__subtitle">Practice Excel formulas on Northstar Commerce sample data. This is an educational simulator — not Microsoft Excel.</p>
    </header>
  `;const a=document.createElement("div");a.className="spreadsheet-lab",a.innerHTML='<table class="spreadsheet-lab__grid" id="excel-grid"></table>';const r=document.createElement("div");return r.className="spreadsheet-lab__formula",r.innerHTML=`
    <label for="excel-formula">Formula</label>
    <input id="excel-formula" class="form-input" type="text" value="=SUM(B2:B5)" aria-label="Formula bar" />
    <span id="excel-result" class="spreadsheet-lab__result"></span>
  `,t.appendChild(r),t.appendChild(a),t.appendChild(c({label:"Reset worksheet",variant:"secondary",onClick:()=>o(document.getElementById("excel-grid"))})),o(a),(l=document.getElementById("excel-formula"))==null||l.addEventListener("change",i),t}function o(t){t.innerHTML=n.map((a,r)=>`<tr>${a.map((l,e)=>`<td contenteditable="${r>0&&e>0}" data-r="${r}" data-c="${e}">${l}</td>`).join("")}</tr>`).join("")}function i(){const t=document.getElementById("excel-formula"),a=document.getElementById("excel-result"),r=(t==null?void 0:t.value.trim())||"";if(r.toUpperCase().startsWith("=SUM(")){const l=n.slice(1).map(e=>parseFloat(e[1])).filter(e=>!Number.isNaN(e));a.textContent=`Result: ${l.reduce((e,s)=>e+s,0)}`}else if(r.toUpperCase().startsWith("=AVERAGE(")){const l=n.slice(1).map(e=>parseFloat(e[1]));a.textContent=`Result: ${(l.reduce((e,s)=>e+s,0)/l.length).toFixed(2)}`}else a.textContent="Supported: =SUM(...), =AVERAGE(...)"}export{p as renderExcelPlayground};
//# sourceMappingURL=excel-workspace-view-BheTr9xj.js.map
