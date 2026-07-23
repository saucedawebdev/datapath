import{e as t}from"./main-DIC5lzHF.js";function d({title:p,status:l="MISSION COMPLETE",impact:n,nextAction:a,onClose:o}){var r,s;const c=document.querySelector(".completion-celebration");c==null||c.remove();const e=document.createElement("div");e.className="completion-celebration",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-label",l),e.innerHTML=`
    <div class="completion-celebration__panel glass-panel">
      <p class="completion-celebration__status type-mono">${t(l)}</p>
      <h2 class="completion-celebration__title">${t(p)}</h2>
      ${n?`<p class="completion-celebration__impact">${t(n)}</p>`:""}
      ${a?`<p class="text-sm text-muted">${t(a)}</p>`:""}
      <button type="button" class="btn btn--primary completion-celebration__close">Continue</button>
    </div>
  `;const i=()=>{e.classList.add("completion-celebration--hide"),setTimeout(()=>e.remove(),250),o==null||o()};return(r=e.querySelector(".completion-celebration__close"))==null||r.addEventListener("click",i),e.addEventListener("keydown",m=>{m.key==="Escape"&&i()}),document.body.appendChild(e),(s=e.querySelector("button"))==null||s.focus(),e}export{d as s};
//# sourceMappingURL=completion-celebration-BXnZ6m2g.js.map
