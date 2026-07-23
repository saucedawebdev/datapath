import{e as l,m as x,o as R,l as z,n as G,p as J,s as f,q as K,g as Y,r as V,t as X,u as Z,v as ee,w as $,x as te,y as j}from"./main-DIC5lzHF.js";import{a as E,d as H,e as y}from"./ui-D4x8GKlK.js";import{c as se}from"./subject-icons-Cd4AuM6z.js";import{s as ne}from"./completion-celebration-BXnZ6m2g.js";function ae(t,s){if(t.type==="multiple-choice"||t.type==="true-false")return s===t.correctIndex;if(t.type==="multi-select"){if(!Array.isArray(s)||!Array.isArray(t.correctIndices))return!1;const e=[...s].sort(),a=[...t.correctIndices].sort();return e.length===a.length&&e.every((n,i)=>n===a[i])}return!1}function le(t,s){let e=0;const a=t.map((n,i)=>{const r=ae(n,s[i]);return r&&e++,{questionId:n.id,correct:r,explanation:n.explanation}});return{score:e,total:t.length,percentage:t.length?e/t.length:0,results:a}}function ie(t){if(!t)return document.createDocumentFragment();const s=document.createElement("aside");return s.className="analyst-briefing",s.setAttribute("aria-label","Analyst briefing"),s.innerHTML=`
    <div class="analyst-briefing__header">
      <span class="analyst-briefing__label">Analyst Briefing</span>
    </div>
    <dl class="analyst-briefing__body">
      <div class="analyst-briefing__row">
        <dt>From</dt>
        <dd>${l(t.from)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Request</dt>
        <dd>${l(t.requestTitle)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Message</dt>
        <dd>${l(t.message)}</dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Required Skills</dt>
        <dd><ul class="analyst-briefing__skills">${(t.requiredSkills||[]).map(e=>`<li>${l(e)}</li>`).join("")}</ul></dd>
      </div>
      <div class="analyst-briefing__row">
        <dt>Business Goal</dt>
        <dd>${l(t.businessGoal)}</dd>
      </div>
    </dl>
  `,s}function oe({lesson:t,briefing:s,guidedComplete:e,challengeComplete:a,quizAttempt:n,nextLesson:i,guidedExerciseId:r,challengeExerciseId:m}){const u=document.createElement("section");u.className="mission-complete",u.setAttribute("aria-label","Mission complete");const p=n&&n.percentage>=.67,h=(s==null?void 0:s.completionMessage)||t.title,c=(s==null?void 0:s.businessImpact)||"Analysis validated for stakeholder use.";u.innerHTML=`
    <div class="mission-complete__terminal-line" aria-hidden="true">&gt; lesson validation passed</div>
    <h2 class="mission-complete__title">Mission Complete</h2>
    <p class="mission-complete__deliverable">${l(h)}</p>
    <dl class="mission-complete__status">
      <div><dt>Practice</dt><dd>${e?"Guided complete":"Guided pending"} · ${a?"Challenge complete":"Challenge pending"}</dd></div>
      <div><dt>Knowledge check</dt><dd>${n?`${Math.round(n.percentage*100)}% ${p?"· passed":"· review recommended"}`:"Not attempted"}</dd></div>
      <div><dt>Business deliverable</dt><dd>${l(h)}</dd></div>
      <div><dt>Business impact</dt><dd>${l(c)}</dd></div>
      ${i?`<div><dt>Next module</dt><dd>${l(i.title)}</dd></div>`:""}
    </dl>
  `;const b=document.createElement("div");b.className="mission-complete__actions flex flex-wrap gap-sm",i&&b.appendChild(E({label:"Continue Learning",href:`#/lesson/${i.id}`,variant:"primary"})),b.appendChild(E({label:"Review Lesson",href:`#/lesson/${t.id}`,variant:"secondary"}));const g=r?x(r):null;return g&&b.appendChild(E({label:"Open Related Practice",href:R(g),variant:"ghost"})),u.appendChild(b),u}function ce(t){if(!t)return document.createDocumentFragment();const s=document.createElement("aside");return s.className="stakeholder-box case-file",s.setAttribute("aria-label",`Case file ${t.caseNumber}`),s.innerHTML=`
    <div class="stakeholder-box__label">Case File #${l(t.caseNumber)}</div>
    <dl class="case-file__body mb-0">
      <div><dt>Department</dt><dd>${l(t.department)}</dd></div>
      <div><dt>Requested By</dt><dd>${l(t.requestedBy)}</dd></div>
      <div><dt>Business Problem</dt><dd>${l(t.businessProblem)}</dd></div>
      <div><dt>Assignment</dt><dd>${l(t.lessonConnection)}</dd></div>
      <div><dt>Business Objective</dt><dd>${l(t.businessObjective)}</dd></div>
    </dl>
    <p class="text-sm text-muted mb-0 mt-sm">${l(t.roleContext||"")}</p>
  `,s}function re(t,{complete:s=!1}={}){if(!t)return document.createDocumentFragment();const e=document.createElement("section");e.className="stakeholder-box business-impact",e.setAttribute("aria-label","Business impact");const a=s?t.summary:t.pendingSummary;return e.innerHTML=`
    <div class="stakeholder-box__label">Business Impact</div>
    <p class="mb-sm">${l(a)}</p>
    <ul class="mb-0">
      ${(t.leadershipCan||[]).map(n=>`<li>✓ ${l(n)}</li>`).join("")}
    </ul>
    ${t.deliverable?`<p class="text-sm text-muted mt-sm mb-0"><strong>Deliverable:</strong> ${l(t.deliverable)}</p>`:""}
  `,e}function de(t){if(!t)return null;const s=document.createElement("aside");return s.className="lesson-callout lesson-callout--why",s.innerHTML=`
    <p class="lesson-callout__label">Why this matters</p>
    <p class="lesson-callout__body mb-0">${l(t)}</p>
  `,s}function ue(t){if(!t)return null;const s=document.createElement("aside");return s.className="lesson-callout lesson-callout--business",s.innerHTML=`
    <p class="lesson-callout__label">Business request</p>
    <p class="lesson-callout__body mb-0">${l(t)}</p>
  `,s}function pe(t){if(!(t!=null&&t.length))return null;const s=document.createElement("aside");return s.className="lesson-callout lesson-callout--warning",s.innerHTML=`
    <p class="lesson-callout__label"><span aria-hidden="true">⚠</span> Common mistakes</p>
    <ul class="lesson-callout__list mb-0">${t.map(e=>`<li>${l(e)}</li>`).join("")}</ul>
  `,s}function me(t){var n,i;const s=[];(n=t.keyTakeaways)!=null&&n.length?s.push(...t.keyTakeaways.slice(0,3)):(t.whatItDoes&&s.push(t.whatItDoes),t.whyItMatters&&s.length<3&&s.push(t.whyItMatters),(i=t.bestPractices)!=null&&i[0]&&s.length<3&&s.push(t.bestPractices[0]));const e=s.slice(0,3);if(!e.length)return null;const a=document.createElement("section");return a.className="lesson-callout lesson-callout--takeaway",a.innerHTML=`
    <h2 class="lesson-callout__label">Key takeaway</h2>
    <ul class="lesson-callout__list mb-0">${e.map(r=>`<li>${l(r)}</li>`).join("")}</ul>
  `,a}function he(t){if(!(t!=null&&t.question))return null;const s=document.createElement("section");s.className="lesson-callout lesson-callout--interview",s.innerHTML='<h2 class="lesson-callout__label">Interview question</h2>';const e=document.createElement("p");if(e.className="lesson-callout__body",e.textContent=t.question,s.appendChild(e),t.sampleAnswer){const a=document.createElement("details");a.className="lesson-callout__reveal";const n=document.createElement("summary");n.textContent="Reveal sample answer",n.setAttribute("aria-expanded","false"),a.appendChild(n);const i=document.createElement("p");i.className="mb-0",i.textContent=t.sampleAnswer,a.appendChild(i),a.addEventListener("toggle",()=>{n.setAttribute("aria-expanded",a.open?"true":"false")}),s.appendChild(a)}return s}function O(){const t=document.createElement("span");return t.className="job-use-label",t.textContent="Used in analyst work",t}const fe={sql:{question:"Explain the difference between INNER JOIN and LEFT JOIN.",sampleAnswer:"INNER JOIN returns only rows with matches in both tables. LEFT JOIN keeps all rows from the left table and adds matching right-table columns, using NULL where no match exists."},excel:{question:"When would you use XLOOKUP instead of a manual search?",sampleAnswer:"Use XLOOKUP when you need a flexible lookup that works in any direction, handles approximate or exact matches, and returns a default when a value is missing — especially in wide tables."},tableau:{question:"What is the difference between a dimension and a measure?",sampleAnswer:"Dimensions are categorical fields used to slice and group the view (region, product). Measures are numeric fields aggregated in the viz (SUM of revenue, COUNT of orders)."},"power-bi":{question:"What is the purpose of a relationship in a data model?",sampleAnswer:"Relationships connect tables on shared keys so filters and measures propagate correctly across a star schema without duplicating rows in fact tables."},python:{question:"What is a pandas DataFrame?",sampleAnswer:"A DataFrame is a tabular structure with labeled rows and columns — the primary way pandas represents datasets for cleaning, filtering, grouping, and exporting results."},statistics:{question:"What does a confidence interval communicate?",sampleAnswer:"A confidence interval gives a plausible range for a population parameter, reflecting sampling uncertainty — not a guarantee that any single interval contains the true value."}};function be(t){return t.interviewQuestion?t.interviewQuestion:fe[t.subjectId]||null}const ge={sql:"QUERY VALIDATED",excel:"REPORT DELIVERED",tableau:"ANALYSIS COMPLETE","power-bi":"MODEL VERIFIED",python:"ANALYSIS COMPLETE",statistics:"ANALYSIS COMPLETE"};async function Me(t,s={}){var M,A,T,B,P,S,q;const e=z(t.lessonId);if(!e)return xe(t.lessonId);const a=G(e.subjectId),n=J(e.subjectId,e.moduleId),i=await f.getProgress(e.id),r=await f.isBookmarked(e.id),m=await f.getNote(e.id),{prev:u,next:p}=K(e.id),h=Y(e.id);await f.logLessonView(e.id,e.subjectId);const c=document.createElement("article");c.className="lesson-page";const b=document.createElement("header");b.className="lesson-page__header page-header",b.innerHTML=`
    <p class="text-sm text-muted mb-0">
      <a href="#/learn">Learn</a> /
      <a href="#/learn/${e.subjectId}">${l((a==null?void 0:a.name)||e.subjectId)}</a> /
      ${l((n==null?void 0:n.name)||"")}
    </p>
    <div class="lesson-page__meta mb-sm">
      <span class="lesson-page__subject-icon" aria-hidden="true"></span>
      <span>${l((a==null?void 0:a.name)||"")}</span>
      ${h?`<span>Lesson ${h.index} of ${h.totalInSubject}</span>`:""}
      ${e.estimatedMinutes?`<span>~${e.estimatedMinutes} min</span>`:""}
    </div>
    <h1 class="page-header__title" tabindex="-1" id="lesson-page-title">${l(e.title)}</h1>
    <div class="flex flex-wrap gap-sm items-center">
      ${H(e.difficulty).outerHTML}
      ${i!=null&&i.complete?H("Completed","complete").outerHTML:""}
    </div>
  `,(M=b.querySelector(".lesson-page__subject-icon"))==null||M.appendChild(se(e.subjectId,"lesson-page__icon")),c.appendChild(b),requestAnimationFrame(()=>{var o;(o=document.getElementById("lesson-page-title"))==null||o.focus({preventScroll:!0})});const g=document.createElement("div");g.className="flex flex-wrap gap-sm mb-lg",g.appendChild(y({label:r?"Bookmarked":"Bookmark",variant:"secondary",onClick:async()=>{const o=await f.toggleBookmark(e.id,"lesson",e.subjectId,e.title);$(o?"Bookmark saved":"Bookmark removed",{type:"success"}),j()}})),g.appendChild(y({label:i!=null&&i.complete?"Mark incomplete":"Mark complete",variant:"primary",onClick:async()=>{var d,w;const o=!!(i!=null&&i.complete);await f.setLessonComplete(e.id,e.subjectId,e.moduleId,!o),o||ne({title:e.title,status:ge[e.subjectId]||"MISSION COMPLETE",impact:((d=e.businessImpact)==null?void 0:d.summary)||((w=e.analystBriefing)==null?void 0:w.businessGoal)||"Lesson verified in your progress record.",nextAction:p?`Next recommended: ${p.title}`:"Explore capstone projects in Projects."}),$(o?"Marked incomplete":"> lesson validation passed — mission complete",{type:"success"}),j()}}));const I={sql:"#/playground/sql",excel:"#/playground/excel",python:"#/playground/python",statistics:"#/playground/statistics"};I[e.subjectId]&&g.appendChild(y({label:"Open Playground",variant:"ghost",onClick:()=>{window.location.hash=I[e.subjectId]}})),c.appendChild(g),e.caseFile&&c.appendChild(ce(e.caseFile)),e.analystBriefing&&c.appendChild(ie(e.analystBriefing));const Q=[{title:"What you will learn",content:_(e.learningObjectives),prose:!0},{title:"Plain-English Explanation",content:v(e.plainEnglish),prose:!0},{title:"What It Does",content:v(e.whatItDoes),prose:!0},{callout:"why",text:e.whyItMatters},{title:"When to Use It",content:v(e.whenToUse),prose:!0},{callout:"business",text:e.stakeholderQuestion},{title:"Concept Walkthrough",content:v(e.walkthrough),prose:!0},{title:"Syntax",content:e.syntax?`<pre class="code-block"><code>${l(e.syntax)}</code></pre>`:"",wide:!0},{title:"Component Breakdown",content:ye(e.componentBreakdown),wide:!0},{title:"Sample Input",content:v(e.sampleInput),prose:!0},{title:"Expected Output",content:v(e.expectedOutput),prose:!0},{callout:"mistakes",items:e.commonMistakes},{title:"Best Practices",content:_(e.bestPractices),prose:!0},{title:"Guided Example",content:we(e.guidedExample),wide:!0},{title:"Project Connection",content:v(e.projectConnection),prose:!0},{title:"Related Lessons",content:Ce(e.relatedConcepts)}];for(const o of Q){if(o.callout==="why"){const d=de(o.text);d&&c.appendChild(d);continue}if(o.callout==="business"){const d=ue(o.text);d&&c.appendChild(d);continue}if(o.callout==="mistakes"){const d=pe(o.items);d&&c.appendChild(d);continue}o.content&&c.appendChild(ve(o.title,o.content,{prose:o.prose,wide:o.wide}))}if((A=e.guidedPractice)!=null&&A.exerciseId){const o=x(e.guidedPractice.exerciseId);if(o){const d=await D("Guided Practice",o,e.id);d.prepend(O()),c.appendChild(d)}}if((T=e.independentChallenge)!=null&&T.exerciseId){const o=x(e.independentChallenge.exerciseId);if(o){const d=await D("Independent Challenge",o,e.id);d.prepend(O()),c.appendChild(d)}}(B=e.knowledgeCheck)!=null&&B.quizId&&c.appendChild(await $e(e.knowledgeCheck.quizId));const k=me(e);k&&c.appendChild(k);const L=he(be(e));if(L&&c.appendChild(L),c.appendChild(Ee(e.id,m)),e.businessImpact&&c.appendChild(re(e.businessImpact,{complete:!!(i!=null&&i.complete)})),i!=null&&i.complete){const o=(P=e.guidedPractice)==null?void 0:P.exerciseId,d=(S=e.independentChallenge)==null?void 0:S.exerciseId,w=(q=e.knowledgeCheck)==null?void 0:q.quizId,U=(w?await f.getQuizAttempts(w):[]).sort((W,F)=>(F.percentage||0)-(W.percentage||0))[0];c.appendChild(oe({lesson:e,briefing:e.analystBriefing,guidedComplete:o?await f.isExerciseComplete(o):!1,challengeComplete:d?await f.isExerciseComplete(d):!1,quizAttempt:U,nextLesson:p,guidedExerciseId:o,challengeExerciseId:d}))}const C=document.createElement("nav");C.className="lesson-nav",C.setAttribute("aria-label","Lesson navigation"),C.innerHTML=`
    ${u?`<a href="#/lesson/${u.id}" class="btn btn--secondary">← ${l(u.title)}</a>`:"<span></span>"}
    ${p?`<a href="#/lesson/${p.id}" class="btn btn--primary">${l(p.title)} →</a>`:"<span></span>"}
  `,c.appendChild(C);const N=s.scroll?parseInt(s.scroll,10):V(e.id);return N>0&&requestAnimationFrame(()=>window.scrollTo(0,N)),c}function ve(t,s,{prose:e=!1,wide:a=!1}={}){const n=document.createElement("section");n.className=`lesson-section${a?" lesson-section--wide":""}`;const i=e?`<div class="lesson-prose">${s}</div>`:s;return n.innerHTML=`<h2 class="lesson-section__title">${t}</h2>${i}`,n}async function D(t,s,e){const a=document.createElement("section");a.className="lesson-section exercise-card";const n=await f.isExerciseComplete(s.id),i=n?await f.getBestPracticeResult(s.id):null;a.innerHTML=`
    <h2 class="lesson-section__title">${t}</h2>
    <p>${l(s.instructions)}</p>
    ${s.hint?`<details class="hint-box"><summary>Hint preview</summary><p>${l(s.hint)}</p></details>`:""}
    ${n?`<p class="sql-status sql-status--success">${l(t)} Complete${i?` · Best attempt: ${i.attempts} try/ies`:""}</p>`:""}
  `;const r=document.createElement("div");r.className="flex flex-wrap gap-sm";const m=y({label:X(s),variant:"primary",onClick:()=>{Z(e),window.location.hash=R(s,{scrollY:window.scrollY})}});r.appendChild(m);const u=y({label:"Show Solution",variant:"ghost",onClick:()=>{if(!confirm("Reveal the solution? Try the exercise in Practice Lab first if you have not attempted it."))return;const p=document.createElement("details");p.className="answer-box",p.open=!0,p.innerHTML=`
        <summary>Solution</summary>
        <pre class="code-block"><code>${l(s.expectedAnswer)}</code></pre>
        <p>${l(s.answerExplanation||s.explanation)}</p>
      `,a.appendChild(p),u.disabled=!0}});return r.appendChild(u),a.appendChild(r),a}function v(t){return t?`<p>${l(t)}</p>`:""}function _(t){return t!=null&&t.length?`<ul>${t.map(s=>`<li>${l(s)}</li>`).join("")}</ul>`:""}function ye(t){return t!=null&&t.length?`<dl>${t.map(s=>`<dt><strong>${l(s.part)}</strong></dt><dd>${l(s.explanation)}</dd>`).join("")}</dl>`:""}function we(t){if(!t)return"";let s=t.description?v(t.description):"";return t.sql&&(s+=`<pre class="code-block"><code>${l(t.sql)}</code></pre>`),t.steps&&(s+=_(t.steps)),s}function Ce(t){return t!=null&&t.length?`<ul>${t.map(s=>{const e=z(s),a=(e==null?void 0:e.title)||s;return`<li><a href="#/lesson/${s}">${l(a)}</a></li>`}).join("")}</ul>`:""}async function $e(t){const s=ee(t);if(!s)return document.createDocumentFragment();const e=document.createElement("section");e.className="lesson-section quiz-card",e.innerHTML='<h2 class="lesson-section__title">Knowledge Check</h2>';const a=document.createElement("form");a.addEventListener("submit",async i=>{i.preventDefault();const r=s.questions.map((h,c)=>{const b=a.querySelector(`input[name="q${c}"]:checked`);return b?parseInt(b.value,10):-1}),m=le(s.questions,r);await f.saveQuizAttempt(t,s.subjectId,m.score,m.total),n.hidden=!1;const u=Math.round(m.percentage*100),p=u>=80?"quiz-feedback--correct":"quiz-feedback--partial";n.className=`quiz-feedback ${p}`,n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.innerHTML=`
      <p><strong>Score: ${m.score}/${m.total}</strong> (${u}%)</p>
      ${m.results.map((h,c)=>`
        <p><strong>${h.correct?"Correct":"Incorrect"}:</strong> ${l(s.questions[c].explanation)}</p>
      `).join("")}
      <p class="mb-0 text-sm">Review the concept above, then continue to practice or the next lesson.</p>
    `,$("Quiz submitted",{type:"success"})}),s.questions.forEach((i,r)=>{const m=document.createElement("fieldset");m.className="form-group",m.innerHTML=`<legend class="form-label">Question ${r+1}: ${l(i.question)}</legend>`,i.options.forEach((u,p)=>{const h=document.createElement("label");h.className="flex items-center gap-sm",h.style.display="flex",h.innerHTML=`<input type="radio" name="q${r}" value="${p}" required /> ${l(u)}`,m.appendChild(h)}),a.appendChild(m)}),a.appendChild(y({label:"Submit Quiz",variant:"primary",type:"submit"}));const n=document.createElement("div");return n.hidden=!0,n.setAttribute("role","status"),e.appendChild(a),e.appendChild(n),e}function Ee(t,s){const e=document.createElement("section");e.className="lesson-section",e.innerHTML='<h2 class="lesson-section__title">Personal Notes</h2>';const a=document.createElement("textarea");a.className="form-textarea",a.id="lesson-notes",a.setAttribute("aria-label","Personal notes for this lesson"),a.value=s;const n=document.createElement("p");n.className="notes-status",n.setAttribute("aria-live","polite");const i=te(async()=>{n.textContent="Saving…",n.classList.remove("notes-status--error");try{await f.saveNote(t,a.value),n.textContent="Saved"}catch{n.textContent="Could not save",n.classList.add("notes-status--error")}},600);a.addEventListener("input",i);const r=y({label:"Save notes",variant:"secondary",onClick:async()=>{n.textContent="Saving…";try{await f.saveNote(t,a.value),n.textContent="Saved",$("Notes saved",{type:"success"})}catch{n.textContent="Could not save",n.classList.add("notes-status--error")}}});return e.appendChild(a),e.appendChild(r),e.appendChild(n),e}function xe(t){const s=document.createElement("div");return s.className="empty-state",s.innerHTML=`
    <h2>Lesson not found</h2>
    <p>Could not find lesson "${l(t)}".</p>
    <a href="#/learn" class="btn btn--primary">Back to Learn</a>
  `,s}export{Me as renderLesson};
//# sourceMappingURL=lesson-view-B8B5J1jC.js.map
