import{e as r,c as f,z as w,s as k,x as j,w as E}from"./main-DIC5lzHF.js";import{f as L,d as v,e as g}from"./ui-D4x8GKlK.js";function x(e){return String(e).split(`

`).map(n=>{const o=n.split(`
`).map(t=>{const a=t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");return t.startsWith("• ")?`<li>${a.slice(2)}</li>`:`<p class="mb-sm">${a}</p>`});return o.some(t=>t.startsWith("<li>"))?`<ul class="mb-sm">${o.filter(t=>t.startsWith("<li>")).join("")}</ul>`:o.join("")}).join("")}function _(e,{expandedId:n=null}={}){const o=document.createElement("section");o.className="northstar-handbook mb-lg",o.setAttribute("aria-label","Northstar Handbook"),o.innerHTML=`
    <h2 class="lesson-section__title">Northstar Handbook</h2>
    <p class="text-secondary">Company reference for ${r("Northstar Commerce")} — your employer throughout DATApath.</p>
  `;const t=document.createElement("div");t.className="northstar-handbook__list";for(const a of e){const i=document.createElement("details");i.className="card mb-sm",i.open=a.id===n,i.innerHTML=`
      <summary class="card__title" style="cursor:pointer;padding:var(--space-md)">${r(a.title)}</summary>
      <div class="card__body" style="padding:0 var(--space-md) var(--space-md)">
        ${a.sections.map(s=>`
          <h4 class="text-sm text-muted mt-md">${r(s.heading)}</h4>
          ${x(s.body)}
        `).join("")}
      </div>
    `,t.appendChild(i)}return o.appendChild(t),o}const p=50;async function A(e={}){var h;const n=document.createElement("div");n.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Reference Library</h1>
      <p class="page-header__subtitle">Searchable commands, formulas, concepts, and the Northstar Commerce handbook.</p>
    </header>
  `,(h=f.northstarHandbook)!=null&&h.length&&n.appendChild(_(f.northstarHandbook));const o=N(e);n.appendChild(o);const t=document.createElement("p");t.id="library-count",t.className="text-sm text-muted mb-md";const a=document.createElement("div");a.id="library-results",n.appendChild(t),n.appendChild(a);let i=0;async function s(){const l=++i,m=$(o),S=await k.getBookmarks();if(l!==i)return;const b=new Set(S.map(c=>c.itemId)),d=B(m,e.ref,b);if(a.replaceChildren(),t.textContent=d.length?`Showing ${Math.min(d.length,p)} of ${d.length} reference${d.length===1?"":"s"}`:"",!d.length){a.appendChild(L({icon:"📚",title:"No references found",message:"Try adjusting your filters or search for SQL, Excel, DAX, and more."}));return}const C=d.slice(0,p),y=document.createDocumentFragment();for(const c of C){if(l!==i)return;y.appendChild(F(c,b.has(c.id),async()=>{await k.toggleBookmark(c.id,"reference",c.subjectId,c.name),E("Bookmark updated",{type:"success"}),await s()}))}if(l===i&&(a.appendChild(y),d.length>p)){const c=document.createElement("p");c.className="text-muted text-sm",c.textContent=`Showing ${p} of ${d.length} entries. Use filters to narrow results.`,a.appendChild(c)}}function u(){const l=$(o),m=H(l,e.ref);if(window.location.hash!==m){window.location.hash=m;return}s()}if(T(o,u),await s(),e.ref){const l=w(e.ref);l&&n.prepend(M(l))}return n}function T(e,n){var t,a,i,s,u;const o=j(n,250);(t=e.querySelector("#filter-subject"))==null||t.addEventListener("change",n),(a=e.querySelector("#filter-difficulty"))==null||a.addEventListener("change",n),(i=e.querySelector("#filter-type"))==null||i.addEventListener("change",n),(s=e.querySelector("#filter-bookmarked"))==null||s.addEventListener("change",n),(u=e.querySelector("#library-search"))==null||u.addEventListener("input",o)}function H(e,n){const o=new URLSearchParams;e.subject&&o.set("subject",e.subject),e.difficulty&&o.set("difficulty",e.difficulty),e.contentType&&o.set("type",e.contentType),e.bookmarked&&o.set("bookmarked",e.bookmarked),e.search&&o.set("q",e.search),n&&o.set("ref",n);const t=o.toString();return t?`#/library?${t}`:"#/library"}function N(e){const n=document.createElement("div");return n.className="filter-bar",n.innerHTML=`
    <input type="search" id="library-search" class="form-input" placeholder="Search references…" aria-label="Search references" style="flex:1;min-width:12rem" />
    <select id="filter-subject" class="form-select" aria-label="Filter by subject">
      <option value="">All subjects</option>
      ${f.subjects.map(o=>`<option value="${o.id}">${o.name}</option>`).join("")}
    </select>
    <select id="filter-difficulty" class="form-select" aria-label="Filter by difficulty">
      <option value="">All difficulties</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
    <select id="filter-type" class="form-select" aria-label="Filter by content type">
      <option value="">All types</option>
      <option value="command">Command</option>
      <option value="concept">Concept</option>
      <option value="function">Function</option>
      <option value="workflow">Workflow</option>
      <option value="formula">Formula</option>
      <option value="visualization">Visualization</option>
    </select>
    <select id="filter-bookmarked" class="form-select" aria-label="Filter bookmarked">
      <option value="">All items</option>
      <option value="bookmarked">Bookmarked only</option>
    </select>
  `,e.subject&&(n.querySelector("#filter-subject").value=e.subject),e.difficulty&&(n.querySelector("#filter-difficulty").value=e.difficulty),e.type&&(n.querySelector("#filter-type").value=e.type),e.bookmarked&&(n.querySelector("#filter-bookmarked").value=e.bookmarked),e.q&&(n.querySelector("#library-search").value=e.q),n}function $(e){var n,o,t,a,i;return{search:((n=e.querySelector("#library-search"))==null?void 0:n.value.trim())||"",subject:((o=e.querySelector("#filter-subject"))==null?void 0:o.value)||"",difficulty:((t=e.querySelector("#filter-difficulty"))==null?void 0:t.value)||"",contentType:((a=e.querySelector("#filter-type"))==null?void 0:a.value)||"",bookmarked:((i=e.querySelector("#filter-bookmarked"))==null?void 0:i.value)||""}}function B(e,n,o=new Set){let t=[...f.references];if(e.subject&&(t=t.filter(a=>a.subjectId===e.subject)),e.difficulty&&(t=t.filter(a=>a.difficulty===e.difficulty)),e.contentType&&(t=t.filter(a=>a.contentType===e.contentType)),e.bookmarked&&(t=t.filter(a=>o.has(a.id))),e.search){const a=e.search.toLowerCase();t=t.filter(i=>[i.name,i.definition,i.syntax,i.category].some(s=>String(s).toLowerCase().includes(a)))}return n&&t.sort((a,i)=>a.id===n?-1:i.id===n?1:0),t}function F(e,n,o){const t=document.createElement("article");t.className="card mb-md",t.id=e.id,t.innerHTML=`
    <div class="card__header">
      <div>
        <h3 class="card__title">${r(e.name)}</h3>
        <p class="card__subtitle">${r(e.category)} · ${e.subjectId.toUpperCase()}</p>
      </div>
      <div class="flex gap-sm">${v(e.difficulty).outerHTML}${v(e.contentType).outerHTML}</div>
    </div>
    <p>${r(e.definition)}</p>
    <pre><code>${r(e.syntax)}</code></pre>
  `;const a=document.createElement("div");return a.className="flex gap-sm",a.appendChild(g({label:n?"Bookmarked":"Bookmark",variant:"secondary",size:"sm",onClick:o})),e.practiceLink&&a.appendChild(g({label:"Practice",variant:"ghost",size:"sm",onClick:()=>{window.location.hash=e.practiceLink}})),t.appendChild(a),t}function M(e){const n=document.createElement("section");return n.className="card mb-lg",n.innerHTML=`
    <h2>${r(e.name)}</h2>
    <p><strong>Definition:</strong> ${r(e.definition)}</p>
    <p><strong>What it does:</strong> ${r(e.whatItDoes)}</p>
    <p><strong>When to use:</strong> ${r(e.whenToUse)}</p>
    <div class="stakeholder-box"><div class="stakeholder-box__label">Stakeholder question</div><p class="mb-0">${r(e.stakeholderQuestion)}</p></div>
    <pre><code>${r(e.syntax)}</code></pre>
    <p><strong>Common mistakes:</strong></p>
    <ul>${(e.commonMistakes||[]).map(o=>`<li>${r(o)}</li>`).join("")}</ul>
  `,n}export{A as renderLibrary};
//# sourceMappingURL=library-view-CTFOpp98.js.map
