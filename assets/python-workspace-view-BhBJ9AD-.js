import{M as l,w as s,_ as d}from"./main-DIC5lzHF.js";import{s as r}from"./system-status-service-CTn-wtBe.js";import"./sql-engine-CZjtl5_6.js";import"./northstar-datasets-DLabYo58.js";let a=null;async function g(){var e,o;l(!0);const t=document.createElement("div");return t.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Python Lab</h1>
      <p class="page-header__subtitle">Run pandas-style analysis in the browser. Python loads on first use via Pyodide.</p>
    </header>
    <div class="python-lab">
      <textarea id="python-code" class="form-textarea code-block" rows="12" spellcheck="false"># Northstar Commerce sample
sales = [12500, 9800, 11200, 8900]
print("Mean revenue:", sum(sales) / len(sales))
print("Regions analyzed:", len(sales))</textarea>
      <div class="flex gap-sm mt-md">
        <button type="button" class="btn btn--primary" id="python-run">Run code</button>
        <button type="button" class="btn btn--secondary" id="python-reset">Reset example</button>
      </div>
      <pre id="python-output" class="python-lab__output mt-lg runtime-status" aria-live="polite">&gt; initializing Python runtime…</pre>
    </div>
  `,(e=t.querySelector("#python-run"))==null||e.addEventListener("click",c),(o=t.querySelector("#python-reset"))==null||o.addEventListener("click",()=>{t.querySelector("#python-code").value=`# Northstar Commerce sample
sales = [12500, 9800, 11200, 8900]
print("Mean revenue:", sum(sales) / len(sales))`,t.querySelector("#python-output").textContent=""}),r("loading"),i().then(()=>{r("ready"),t.querySelector("#python-output").textContent="> analytics environment ready — click Run code"}).catch(n=>{r("failed"),t.querySelector("#python-output").textContent=`> runtime unavailable: ${n.message}`}),t}async function i(){return a||(a=(async()=>{const{loadPyodide:t}=await d(async()=>{const{loadPyodide:e}=await import("https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs");return{loadPyodide:e}},[]);return t()})(),a)}async function c(){var o;const t=((o=document.getElementById("python-code"))==null?void 0:o.value)||"",e=document.getElementById("python-output");e.textContent="Running…";try{const n=await i();n.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
`),await n.runPythonAsync(t);const u=n.runPython("sys.stdout.getvalue()");e.textContent=u||"(no output)",s("Code executed",{type:"success"})}catch(n){e.textContent=String(n),s("Python error",{type:"error"})}}export{g as renderPythonPlayground};
//# sourceMappingURL=python-workspace-view-BhBJ9AD-.js.map
