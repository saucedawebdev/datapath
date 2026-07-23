import{e as s,L as m,s as r,c as u,w as h,y as v}from"./main-DIC5lzHF.js";import{a as f,c as b}from"./project-card-YOfOrz-R.js";import{d as j,e as $}from"./ui-D4x8GKlK.js";import{c as p}from"./hero-shell-B7HJWkvO.js";import"./subject-theme-DzoKHK6s.js";function g(o){if(!o)return document.createDocumentFragment();const e=document.createElement("aside");return e.className="stakeholder-box project-brief",e.setAttribute("aria-label","Project brief"),e.innerHTML=`
    <div class="stakeholder-box__label">Project Brief</div>
    <p class="text-sm text-muted">${s(o.assignmentNote)}</p>
    <dl class="case-file__body mb-0">
      <div><dt>Department</dt><dd>${s(o.department)}</dd></div>
      <div><dt>Project Sponsor</dt><dd>${s(o.projectSponsor)}</dd></div>
      <div><dt>Business Goal</dt><dd>${s(o.businessGoal)}</dd></div>
      <div><dt>Expected Deliverable</dt><dd>${s(o.expectedDeliverable)}</dd></div>
      <div><dt>Success Criteria</dt><dd><ul class="mb-0">${(o.successCriteria||[]).map(t=>`<li>${s(t)}</li>`).join("")}</ul></dd></div>
    </dl>
  `,e}async function E(){const o=document.createElement("div"),e=await r.getAllProjectProgress(),t=Object.fromEntries(e.map(n=>[n.id,n])),c=document.createElement("div");c.innerHTML=`
    <h1 class="page-header__title">Projects</h1>
    <p class="page-header__subtitle">Realistic business scenarios with datasets, deliverables, rubrics, and reflection questions.</p>
  `,o.appendChild(p({className:"page-header mb-lg",children:[c]}));const a=document.createElement("div");a.className="grid grid--auto";for(const n of u.projects)a.appendChild(b(n,t[n.id]));return o.appendChild(a),o}async function B(o){const e=m(o.projectId);if(!e)return C("Project not found");const t=await r.getProjectProgress(e.id),c=document.createElement("article");e.projectBrief&&c.appendChild(g(e.projectBrief));const a=document.createElement("div"),n=document.createElement("div");n.innerHTML=`
    <p class="text-sm text-muted"><a href="#/projects">Projects</a></p>
    <h1 class="page-header__title">${s(e.title)}</h1>
    <div class="flex gap-sm flex-wrap">${j(e.difficulty).outerHTML}</div>
  `,a.appendChild(p({className:"page-header mb-lg",children:[n]}));const l=document.createElement("div");if(l.className="flex flex-wrap gap-sm mb-lg",!(t!=null&&t.complete))l.appendChild($({label:t!=null&&t.inProgress?"Mark complete":"Start project",variant:"primary",onClick:async()=>{await r.setProjectProgress(e.id,{inProgress:!0,complete:!!(t!=null&&t.inProgress)}),h(t!=null&&t.inProgress?"Project marked complete locally":"Project marked in progress",{type:"success"}),v()}}));else{const i=document.createElement("p");i.className="text-sm text-muted mb-0",i.textContent="Status: Completed (saved locally)",l.appendChild(i)}a.appendChild(l);const d=document.createElement("div");return d.innerHTML=`
    <section class="lesson-section">
      <h2>Business Context</h2>
      <p>${s(e.businessContext)}</p>
    </section>

    <section class="lesson-section">
      <h2>Stakeholder Request</h2>
      <div class="stakeholder-box"><p class="mb-0">${s(e.stakeholderRequest)}</p></div>
    </section>

    <section class="lesson-section">
      <h2>Dataset Overview</h2>
      <p>${s(e.datasetOverview)}</p>
    </section>

    <section class="lesson-section">
      <h2>Deliverables</h2>
      <ul>${e.deliverables.map(i=>`<li>${s(i)}</li>`).join("")}</ul>
    </section>

    <section class="lesson-section">
      <h2>Required Skills</h2>
      <ul>${e.requiredSkills.map(i=>`<li>${s(i)}</li>`).join("")}</ul>
    </section>

    <section class="lesson-section">
      <h2>Recommended Workflow</h2>
      <ol>${e.recommendedWorkflow.map(i=>`<li>${s(i)}</li>`).join("")}</ol>
    </section>

    <section class="lesson-section">
      <h2>Milestones</h2>
      <ul>${e.milestones.map(i=>`<li><strong>${s(i.title)}</strong> — ${s(i.description)}</li>`).join("")}</ul>
    </section>

    <section class="lesson-section">
      <h2>Evaluation Rubric</h2>
      <div class="table-wrapper"><table class="data-table">
        <thead><tr><th>Criterion</th><th>Weight</th><th>Description</th></tr></thead>
        <tbody>${e.rubric.map(i=>`<tr><td>${s(i.criterion)}</td><td>${i.weight}%</td><td>${s(i.description)}</td></tr>`).join("")}</tbody>
      </table></div>
    </section>

    <section class="lesson-section">
      <h2>Reflection Questions</h2>
      <ul>${e.reflectionQuestions.map(i=>`<li>${s(i)}</li>`).join("")}</ul>
    </section>
  `,a.appendChild(d),t!=null&&t.complete&&a.appendChild(f(e)),c.appendChild(a),c}function C(o){const e=document.createElement("div");return e.className="empty-state",e.innerHTML=`<h2>${s(o)}</h2><a href="#/projects" class="btn btn--primary">Back to Projects</a>`,e}export{B as renderProjectDetail,E as renderProjectsList};
//# sourceMappingURL=projects-view-DYf0l8D-.js.map
