import{b as s}from"./ui-D4x8GKlK.js";import{M as n}from"./main-DIC5lzHF.js";async function c(){n(!1);const e=document.createElement("div");e.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Workspaces</h1>
      <p class="page-header__subtitle">Hands-on labs for SQL, Excel, Python, and Statistics using Northstar Commerce data.</p>
    </header>
  `;const r=[{name:"SQL Workspace",desc:"Query the Northstar Commerce database with real SQL.",href:"#/playground/sql"},{name:"Spreadsheet Lab",desc:"Practice formulas on sample Northstar sales data.",href:"#/playground/excel"},{name:"Python Lab",desc:"Run Python code in the browser with Pyodide.",href:"#/playground/python"},{name:"Statistics Lab",desc:"Calculate mean, median, standard deviation, and interpret results.",href:"#/playground/statistics"}],a=document.createElement("div");a.className="grid grid--auto";for(const t of r)a.appendChild(s({title:t.name,subtitle:"Ready",href:t.href,children:[Object.assign(document.createElement("p"),{className:"mb-0 text-secondary",textContent:t.desc})]}));return e.appendChild(a),e}export{c as renderPlaygroundHub};
//# sourceMappingURL=playground-view-B8Vi_HR6.js.map
