import{s as r,P as y,O as h,h as v,e as w,c as k,w as o,N as m,Q as S}from"./main-DIC5lzHF.js";import{e as i}from"./ui-D4x8GKlK.js";import{s as x}from"./welcome-onboarding-B_bcJvvU.js";import"./subject-theme-DzoKHK6s.js";import"./subject-icons-Cd4AuM6z.js";async function j(){const e=await r.exportBackup(),t=JSON.stringify(e,null,2),a=new Date().toISOString().slice(0,10);return h(t,`datapath-backup-${a}.json`,"application/json"),e}function E(e){const t=[];return(!e||typeof e!="object")&&t.push("Invalid JSON structure."),e.app!=="DataPath"&&t.push("This file does not appear to be a DataPath backup."),e.version!==y&&t.push(`Unsupported backup version: ${e.version}. Expected ${y}.`),(!e.data||typeof e.data!="object")&&t.push("Missing data section."),{valid:t.length===0,errors:t}}async function $(e,{merge:t=!1,overwrite:a=!1}={}){const d=await e.text();let l;try{l=JSON.parse(d)}catch{throw new Error("The file could not be parsed as JSON.")}const n=E(l);if(!n.valid)throw new Error(n.errors.join(" "));if(!a&&!t&&(await r.getAllProgress()).length>0)throw new Error("OVERWRITE_REQUIRED");return await r.importBackup(l,{merge:t}),l}async function R(e){await r.resetSubjectProgress(e)}async function D(){await r.resetAllProgress(),await r.provider.clearStore("bookmarks"),await r.provider.clearStore("notes"),await r.provider.clearStore("savedQueries"),await r.provider.clearStore("savedCode")}async function B(){const e=await r.getPreferences(),t=document.createElement("div");t.innerHTML=`
    <header class="page-header">
      <h1 class="page-header__title">Profile & Settings</h1>
      <p class="page-header__subtitle">Customize your learning experience and manage local data.</p>
    </header>
  `;const a=document.createElement("form");a.addEventListener("submit",s=>s.preventDefault()),a.innerHTML=`
    <section class="card mb-lg">
      <h2>Profile</h2>
      <div class="form-group">
        <label class="form-label" for="display-name">Display name</label>
        <input type="text" id="display-name" class="form-input" value="${w(e.displayName||"")}" />
      </div>
      <div class="form-group">
        <label class="form-label" for="learning-goal">Learning goal</label>
        <select id="learning-goal" class="form-select">
          <option value="job-ready" ${e.learningGoal==="job-ready"?"selected":""}>Job-ready analyst</option>
          <option value="upskill" ${e.learningGoal==="upskill"?"selected":""}>Upskill in current role</option>
          <option value="explore" ${e.learningGoal==="explore"?"selected":""}>Explore data analytics</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="daily-target">Daily learning target (minutes)</label>
        <input type="number" id="daily-target" class="form-input" min="5" max="480" value="${e.dailyTargetMinutes||30}" />
      </div>
    </section>

    <section class="card mb-lg">
      <h2>Appearance & Accessibility</h2>
      <div class="form-group">
        <label class="form-label" for="theme">Theme</label>
        <select id="theme" class="form-select">
          <option value="system" ${e.theme==="system"?"selected":""}>System</option>
          <option value="light" ${e.theme==="light"?"selected":""}>Light</option>
          <option value="dark" ${e.theme==="dark"?"selected":""}>Dark</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label" for="font-size">Font size</label>
        <select id="font-size" class="form-select">
          <option value="default" ${e.fontSize==="default"?"selected":""}>Default</option>
          <option value="large" ${e.fontSize==="large"?"selected":""}>Large</option>
          <option value="xlarge" ${e.fontSize==="xlarge"?"selected":""}>Extra large</option>
        </select>
      </div>
      <div class="form-group">
        <label class="flex items-center gap-sm">
          <input type="checkbox" id="reduced-motion" ${e.reducedMotion?"checked":""} />
          Reduce motion
        </label>
      </div>
    </section>

    <section class="card mb-lg">
      <h2>Help</h2>
      <p class="text-secondary mb-sm">Replay the welcome guide if you want a quick orientation to DATApath.</p>
      <div id="help-actions"></div>
    </section>

    <section class="card mb-lg">
      <h2>Data Backup</h2>
      <p class="text-secondary">Export all progress, notes, bookmarks, and preferences to a JSON file. Import restores data locally — nothing is sent to a server.</p>
      <div class="flex flex-wrap gap-sm" id="backup-actions"></div>
      <input type="file" id="import-file" accept=".json,application/json" class="sr-only" />
    </section>

    <section class="card mb-lg">
      <h2>Reset Options</h2>
      <p class="text-secondary">Destructive actions require confirmation.</p>
      <div class="form-group">
        <label class="form-label" for="reset-subject">Reset subject progress</label>
        <div class="flex gap-sm">
          <select id="reset-subject" class="form-select">
            ${k.subjects.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="flex flex-wrap gap-sm" id="reset-actions"></div>
    </section>

    <p class="text-sm text-muted">${v.name} v${v.metadata.version} · Local-only · No analytics</p>
  `;const d=i({label:"Save preferences",variant:"primary",onClick:l});return a.querySelector("#help-actions").appendChild(i({label:"Show welcome guide",variant:"secondary",onClick:()=>x({hasProgress:!1})})),a.querySelector("#backup-actions").appendChild(i({label:"Export backup",variant:"secondary",onClick:async()=>{await j(),o("Backup downloaded",{type:"success"})}})),a.querySelector("#backup-actions").appendChild(i({label:"Import backup",variant:"secondary",onClick:()=>a.querySelector("#import-file").click()})),a.querySelector("#reset-actions").appendChild(i({label:"Reset selected subject",variant:"secondary",onClick:f})),a.querySelector("#reset-actions").appendChild(i({label:"Reset all progress",variant:"danger",onClick:b})),a.appendChild(d),a.querySelector("#import-file").addEventListener("change",n),t.appendChild(a),t;async function l(){const s={displayName:a.querySelector("#display-name").value.trim()||"Learner",learningGoal:a.querySelector("#learning-goal").value,dailyTargetMinutes:parseInt(a.querySelector("#daily-target").value,10)||30,theme:a.querySelector("#theme").value,fontSize:a.querySelector("#font-size").value,reducedMotion:a.querySelector("#reduced-motion").checked};await r.updatePreferences(s),await S.apply(await r.getPreferences()),o("Preferences saved",{type:"success"})}async function n(s){var g;const c=(g=s.target.files)==null?void 0:g[0];if(c){if(!c.name.endsWith(".json")){o("Only JSON backup files are supported",{type:"error"});return}try{const p=await r.getAllProgress();let u=!1;if(p.length>0&&(u=await m({title:"Overwrite existing data?",message:"Importing will replace your current progress unless you cancel.",confirmLabel:"Overwrite",danger:!0}),!u))return;await $(c,{overwrite:u}),o("Backup imported successfully",{type:"success"}),setTimeout(()=>window.location.reload(),1e3)}catch(p){p.message==="OVERWRITE_REQUIRED"?o("Existing data found. Confirm overwrite to import.",{type:"error"}):o(p.message,{type:"error"})}s.target.value=""}}async function f(){const s=a.querySelector("#reset-subject").value;await m({title:"Reset subject progress?",message:`This will clear all lesson progress for ${s}. Bookmarks and notes are kept.`,confirmLabel:"Reset",danger:!0})&&(await R(s),o("Subject progress reset",{type:"success"}))}async function b(){await m({title:"Reset all progress?",message:"This cannot be undone. Export a backup first if you want to keep your data.",confirmLabel:"Reset everything",danger:!0})&&(await D(),o("All progress reset",{type:"success"}))}}export{B as renderSettings};
//# sourceMappingURL=settings-view-ZuPdT-4O.js.map
