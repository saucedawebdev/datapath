/**
 * Project brief metadata derived from capstone project definitions.
 */
import { getDepartmentForSubject, getExecutiveForSubject } from './northstar-profile.js';

export function buildProjectBrief(project) {
  const primarySubject = project.subjectIds?.[0] || 'sql';
  return {
    department: getDepartmentForSubject(primarySubject),
    projectSponsor: getExecutiveForSubject(primarySubject),
    businessGoal: project.businessContext,
    expectedDeliverable: project.deliverables?.[0] || project.exampleDeliverable || 'Capstone deliverable package',
    successCriteria: (project.rubric || []).map((r) => `${r.criterion} (${r.weight}%) — ${r.description}`),
    assignmentNote: 'Leadership has requested the following capstone assignment for the Junior Data Analyst team.',
  };
}

export function attachProjectBriefs(projects) {
  return projects.map((project) => ({
    ...project,
    projectBrief: buildProjectBrief(project),
  }));
}
