/**
 * Real-time analytics system status for dashboard display.
 */

import { isDatabaseInitialized } from './sql-engine.js';
import { contentBundle } from '../content/index.js';
import { northstarDataset } from '../data/northstar-datasets.js';

let pythonRuntimeState = 'standby';

export function setPythonRuntimeState(state) {
  pythonRuntimeState = state;
}

export function getPythonRuntimeState() {
  return pythonRuntimeState;
}

export async function getAnalyticsSystemStatus() {
  const items = [];

  if (isDatabaseInitialized()) {
    items.push({ id: 'sql', label: 'SQL Engine', status: 'Online', ok: true });
  } else {
    items.push({ id: 'sql', label: 'SQL Engine', status: 'Standby', ok: true });
  }

  items.push(
    { id: 'excel', label: 'Excel Simulator', status: 'Online', ok: true },
    { id: 'tableau', label: 'Tableau Studio', status: 'Online', ok: true },
    { id: 'powerbi', label: 'Power BI Studio', status: 'Online', ok: true },
    { id: 'statistics', label: 'Statistics Lab', status: 'Online', ok: true },
  );

  const pythonStatus = pythonRuntimeState === 'ready'
    ? 'Ready'
    : pythonRuntimeState === 'loading'
      ? 'Loading'
      : pythonRuntimeState === 'failed'
        ? 'Unavailable'
        : 'Standby';

  items.push({
    id: 'python',
    label: 'Python Runtime',
    status: pythonStatus,
    ok: pythonRuntimeState !== 'failed',
  });

  items.push({
    id: 'northstar',
    label: 'Northstar Dataset',
    status: northstarDataset?.seedSql ? 'Ready' : 'Unavailable',
    ok: Boolean(northstarDataset?.seedSql),
  });

  const lessonCount = contentBundle.lessons?.length || 0;
  items.push({
    id: 'lessons',
    label: `${lessonCount} Lessons`,
    status: lessonCount === 114 ? 'Loaded' : 'Partial',
    ok: lessonCount === 114,
  });

  const allOk = items.every((i) => i.ok);
  return { items, systemReady: allOk };
}

export const CAPABILITY_CATEGORIES = [
  { id: 'sql', label: 'SQL Querying', subjectId: 'sql' },
  { id: 'excel', label: 'Spreadsheet Analysis', subjectId: 'excel' },
  { id: 'tableau', label: 'Data Visualization', subjectId: 'tableau' },
  { id: 'power-bi', label: 'Business Intelligence', subjectId: 'power-bi' },
  { id: 'python', label: 'Python Analysis', subjectId: 'python' },
  { id: 'statistics', label: 'Statistical Reasoning', subjectId: 'statistics' },
  { id: 'projects', label: 'Projects', subjectId: null },
];

export function buildCapabilityDashboard(subjectProgressList, projectsCompleted = 0, totalProjects = 6) {
  return CAPABILITY_CATEGORIES.map((cat) => {
    if (cat.id === 'projects') {
      const pct = totalProjects ? Math.round((projectsCompleted / totalProjects) * 100) : 0;
      return { ...cat, readiness: pct, verified: projectsCompleted > 0 };
    }
    const sp = subjectProgressList.find((s) => s.subjectId === cat.subjectId);
    return {
      ...cat,
      readiness: sp?.readiness ?? 0,
      verified: (sp?.completedLessons ?? 0) > 0,
    };
  });
}
