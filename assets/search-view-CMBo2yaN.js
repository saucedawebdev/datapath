import{x as L,s as v,S as $,c as A,e as o}from"./main-DIC5lzHF.js";import{f as E,d as w}from"./ui-D4x8GKlK.js";async function H(S={}){const u=document.createElement("div");u.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Search</h1>
      <p class="page-header__subtitle">Find lessons, references, projects, and exercises across all subjects.</p>
    </header>
  `;const s=document.createElement("input");s.type="search",s.className="form-input mb-lg",s.placeholder="Search by subject, skill, formula, or topic…",s.setAttribute("aria-label","Search content"),s.value=S.q||"",s.autofocus=!0;const a=document.createElement("div");a.setAttribute("role","listbox"),a.setAttribute("aria-label","Search results"),u.appendChild(s),u.appendChild(a);function f(e,r){if(!r||r.length<2)return o(e);const p=e.toLowerCase(),h=r.toLowerCase(),n=p.indexOf(h);if(n===-1)return o(e);const d=o(e.slice(0,n)),t=o(e.slice(n,n+r.length)),l=o(e.slice(n+r.length));return`${d}<mark>${t}</mark>${l}`}async function b(e){const r=await v.getAllProgress(),p=Object.fromEntries(r.map(t=>[t.id,t])),h=await v.getBookmarks(),n=new Set(h.map(t=>t.itemId)),d=$(e,A,p,n);if(a.innerHTML="",!e||e.trim().length<2){a.appendChild(E({message:"Enter at least 2 characters to search lessons, tools, and skills."}));return}if(!d.length){a.appendChild(E({title:"No lessons matched your search",message:"Try a subject name, tool, formula, or skill — for example “JOIN”, “pivot”, or “confidence interval”."}));return}d.forEach((t,l)=>{var g;const c=document.createElement("a");c.href=t.href,c.className="search-result",c.setAttribute("role","option"),c.innerHTML=`
        <div class="search-result__meta">
          <span>${o(t.type)}</span>
          <span>${o(((g=t.subjectId)==null?void 0:g.toUpperCase())||"")}</span>
          ${t.difficulty?w(t.difficulty).outerHTML:""}
          ${t.complete?w("Complete","complete").outerHTML:""}
          ${t.bookmarked?'<span aria-label="Bookmarked">★</span>':""}
        </div>
        <strong>${f(t.title,e.trim())}</strong>
        <p class="text-secondary mb-0">${f(t.context,e.trim())}</p>
      `,c.addEventListener("keydown",i=>{var k,y;if(i.key==="Escape"){s.focus();return}const m=[...a.querySelectorAll(".search-result")];i.key==="ArrowDown"&&(i.preventDefault(),(k=m[Math.min(l+1,m.length-1)])==null||k.focus()),i.key==="ArrowUp"&&(i.preventDefault(),l===0?s.focus():(y=m[Math.max(l-1,0)])==null||y.focus())}),a.appendChild(c)})}const C=L(e=>b(e),300);return s.addEventListener("input",()=>C(s.value)),s.addEventListener("keydown",e=>{e.key==="Escape"&&(s.value="")}),await b(s.value),u}export{H as renderSearch};
//# sourceMappingURL=search-view-CMBo2yaN.js.map
