/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import contentBundle from '../src/content/index.js';
import { NORTHSTAR_PROFILE } from '../src/content/job-ready/northstar-profile.js';
import { northstarHandbook } from '../src/content/job-ready/northstar-handbook.js';
import { validateCaseFile } from '../src/content/job-ready/case-files.js';
import { validateBusinessImpact } from '../src/content/job-ready/business-impact.js';
import { createCaseFilePanel } from '../src/components/case-file.js';
import { createBusinessImpactPanel } from '../src/components/business-impact.js';
import { createProjectBriefPanel } from '../src/components/project-brief.js';

describe('Northstar company profile', () => {
  it('stores central reusable metadata', () => {
    expect(NORTHSTAR_PROFILE.name).toBe('Northstar Commerce');
    expect(NORTHSTAR_PROFILE.departments.length).toBeGreaterThan(4);
    expect(NORTHSTAR_PROFILE.executiveLeadership.length).toBeGreaterThan(3);
    expect(NORTHSTAR_PROFILE.learnerRole).toBe('Junior Data Analyst');
  });

  it('exposes profile on content bundle', () => {
    expect(contentBundle.northstarProfile.name).toBe('Northstar Commerce');
  });
});

describe('Case files', () => {
  it('every lesson has a unique case file', () => {
    expect(contentBundle.lessons.length).toBe(114);
    const numbers = contentBundle.lessons.map((l) => l.caseFile?.caseNumber);
    expect(new Set(numbers).size).toBe(114);
    for (const lesson of contentBundle.lessons) {
      validateCaseFile(lesson.caseFile, lesson.id);
      expect(lesson.caseFile.department).toBeTruthy();
      expect(lesson.caseFile.businessProblem).toBeTruthy();
    }
  });

  it('renders case file panel', () => {
    const lesson = contentBundle.lessons[0];
    const panel = createCaseFilePanel(lesson.caseFile);
    expect(panel.classList.contains('case-file')).toBe(true);
    expect(panel.textContent).toContain(`Case File #${lesson.caseFile.caseNumber}`);
  });
});

describe('Business impact', () => {
  it('every lesson has customized business impact', () => {
    for (const lesson of contentBundle.lessons) {
      validateBusinessImpact(lesson.businessImpact, lesson.id);
      expect(lesson.businessImpact.leadershipCan.length).toBe(3);
    }
  });

  it('shows pending vs complete messaging', () => {
    const lesson = contentBundle.lessons[0];
    const pending = createBusinessImpactPanel(lesson.businessImpact, { complete: false });
    const done = createBusinessImpactPanel(lesson.businessImpact, { complete: true });
    expect(pending.textContent).toMatch(/When you complete/i);
    expect(done.textContent).toMatch(/successfully completed/i);
  });
});

describe('Northstar Handbook', () => {
  const requiredTitles = [
    'Company Overview',
    'Departments',
    'Organization Chart',
    'Product Catalog',
    'Customer Segments',
    'Regional Offices',
    'Sales Channels',
    'Data Dictionary',
    'Database Schema',
    'KPI Definitions',
  ];

  for (const title of requiredTitles) {
    it(`includes ${title}`, () => {
      expect(northstarHandbook.some((a) => a.title === title)).toBe(true);
    });
  }

  it('is available on content bundle', () => {
    expect(contentBundle.northstarHandbook.length).toBe(10);
  });
});

describe('Project briefs', () => {
  it('every capstone project has a project brief', () => {
    expect(contentBundle.projects.length).toBe(6);
    for (const project of contentBundle.projects) {
      expect(project.projectBrief).toBeTruthy();
      expect(project.projectBrief.department).toBeTruthy();
      expect(project.projectBrief.projectSponsor).toBeTruthy();
      expect(project.projectBrief.successCriteria.length).toBeGreaterThan(0);
    }
  });

  it('renders project brief panel', () => {
    const panel = createProjectBriefPanel(contentBundle.projects[0].projectBrief);
    expect(panel.textContent).toContain('Project Brief');
  });
});

describe('Immersion consistency', () => {
  it('uses only Northstar Commerce as the fictional company', () => {
    const sample = contentBundle.lessons.slice(0, 20).map((l) => l.caseFile.businessProblem).join(' ');
    expect(sample).not.toMatch(/Acme|Globex|Contoso/i);
  });
});
