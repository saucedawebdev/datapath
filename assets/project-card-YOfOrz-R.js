import{d as c,a as f}from"./ui-D4x8GKlK.js";import{a as n,g as d}from"./subject-theme-DzoKHK6s.js";import{e as a}from"./main-DIC5lzHF.js";function v(e){return e!=null&&e.complete?{label:"Completed",variant:"complete"}:e!=null&&e.inProgress?{label:"In progress",variant:"intermediate"}:{label:"Not started",variant:"beginner"}}function S(e,t=null){var o;const i=document.createElement("article");i.className="project-card card card--interactive";const s=v(t),u=n(e),l=(o=e.subjectIds)==null?void 0:o[0],m=l?d(l):null;i.innerHTML=`
    <div class="project-card__header">
      <h3 class="project-card__title"><a href="#/projects/${e.id}">${a(e.title)}</a></h3>
      <div class="project-card__badges"></div>
    </div>
    <p class="project-card__subjects text-sm text-muted">${e.subjectIds.map(b=>a(d(b).name)).join(" · ")}</p>
    <p class="project-card__problem">${a(e.stakeholderRequest||e.businessContext.slice(0,120)+"…")}</p>
    <p class="project-card__skills text-sm"><strong>Skills:</strong> ${a((e.requiredSkills||[]).slice(0,4).join(", "))}</p>
    <p class="project-card__deliverable text-sm text-muted">Deliverable: ${a(u)}</p>
    <div class="project-card__actions"></div>
  `;const r=i.querySelector(".project-card__badges");r.appendChild(c(e.difficulty)),r.appendChild(c(s.label,s.variant==="complete"?"complete":e.difficulty));const p=s.label==="Completed"?"Review project":s.label==="In progress"?"Continue project":"Start project";return i.querySelector(".project-card__actions").appendChild(f({label:p,href:`#/projects/${e.id}`,variant:"secondary"})),m&&i.classList.add(`subject-${l}`),i}function k(e){const t=document.createElement("details");return t.className="portfolio-guidance",t.innerHTML=`
    <summary>Add this to your portfolio</summary>
    <div class="portfolio-guidance__body">
      <p><strong>What this demonstrates:</strong> ${a((e.requiredSkills||[]).slice(0,5).join(", "))}</p>
      <p><strong>Suggested artifact:</strong> Screenshot or export of your ${a(n(e).toLowerCase())}.</p>
      <p><strong>Resume line:</strong> ${a(_(e))}</p>
      <p class="mb-0"><strong>Interview talking point:</strong> ${a(g(e))}</p>
    </div>
  `,t}function _(e){return`Built a ${n(e).toLowerCase()} for ${e.title.replace(/ Project$/,"")} using ${(e.requiredSkills||[]).slice(0,3).join(", ")}.`}function g(e){var t;return`Explain the business question (${((t=e.stakeholderRequest)==null?void 0:t.slice(0,80))||"stakeholder request"}…), your approach, and one insight that informed a decision.`}export{k as a,S as c};
//# sourceMappingURL=project-card-YOfOrz-R.js.map
