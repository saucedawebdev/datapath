let sqlModule = null;
let db = null;
let currentDatasetId = null;
const queryHistory = [];

/**
 * Resolve sql.js init function across ESM/CJS interop boundaries (Vite).
 */
function resolveInitSqlJs(mod) {
  if (typeof mod === 'function') return mod;
  if (typeof mod?.default === 'function') return mod.default;
  if (typeof mod?.default?.default === 'function') return mod.default.default;
  if (typeof mod?.Module === 'function') return mod.Module;
  if (typeof mod?.['module.exports'] === 'function') return mod['module.exports'];
  throw new Error('Failed to load sql.js initializer');
}

/**
 * Lazy-load sql.js WASM — only when SQL workspace opens.
 */
async function loadSqlJs() {
  if (sqlModule) return sqlModule;

  const [sqlWasmModule, wasmUrlModule] = await Promise.all([
    import('sql.js/dist/sql-wasm.js'),
    import('sql.js/dist/sql-wasm.wasm?url'),
  ]);

  const initSqlJs = resolveInitSqlJs(sqlWasmModule);
  const wasmUrl = wasmUrlModule.default;

  sqlModule = await initSqlJs({
    locateFile: (file) => (file.endsWith('.wasm') ? wasmUrl : wasmUrl),
  });
  return sqlModule;
}

export async function initDatabase(datasetId = 'retail-orders') {
  const SQL = await loadSqlJs();
  if (db) {
    db.close();
    db = null;
  }
  db = new SQL.Database();
  const { getDataset } = await import('../data/sample-datasets.js');
  const dataset = getDataset(datasetId);
  db.run(dataset.seedSql);
  currentDatasetId = datasetId;
  return db;
}

export function getDb() {
  return db;
}

export function getCurrentDatasetId() {
  return currentDatasetId;
}

export function runQuery(sql) {
  if (!db) throw new Error('Database not initialized. Load a dataset first.');
  const trimmed = sql.trim();
  if (!trimmed) throw new Error('Enter a SQL statement to run.');

  queryHistory.unshift({ sql: trimmed, timestamp: new Date().toISOString() });
  if (queryHistory.length > 50) queryHistory.pop();

  try {
    const start = performance.now();
    const results = db.exec(trimmed);
    const elapsed = Math.round(performance.now() - start);

    if (results.length === 0) {
      return { type: 'message', message: 'Query executed successfully. No rows returned.', elapsed, rowCount: 0 };
    }

    const result = results[0];
    const rows = result.values.map((row) => {
      const obj = {};
      result.columns.forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });

    return {
      type: 'result',
      columns: result.columns,
      rows,
      rowCount: rows.length,
      elapsed,
    };
  } catch (err) {
    return { type: 'error', message: err.message, elapsed: 0 };
  }
}

export function getQueryHistory() {
  return [...queryHistory];
}

export function resultsToCsv(columns, rows) {
  const escape = (v) => {
    const s = v == null ? '' : String(v);
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [columns.map(escape).join(',')];
  for (const row of rows) {
    lines.push(columns.map((c) => escape(row[c])).join(','));
  }
  return lines.join('\n');
}

export function compareResults(actual, expected) {
  if (!actual || actual.type !== 'result') return { match: false, reason: 'Query did not return a result set.' };
  if (expected.expectedColumns) {
    const actualCols = actual.columns.map((x) => x.toLowerCase());
    const missing = expected.expectedColumns.filter((c) => !actualCols.includes(c.toLowerCase()));
    if (missing.length) return { match: false, reason: `Missing columns: ${missing.join(', ')}` };
  }
  if (expected.minRowCount != null && actual.rowCount < expected.minRowCount) {
    return { match: false, reason: `Expected at least ${expected.minRowCount} rows, got ${actual.rowCount}.` };
  }
  if (expected.maxRowCount != null && actual.rowCount > expected.maxRowCount) {
    return { match: false, reason: `Expected at most ${expected.maxRowCount} rows, got ${actual.rowCount}.` };
  }
  return { match: true, reason: 'Result structure matches expected criteria.' };
}

export function isDatabaseInitialized() {
  return Boolean(db);
}

export async function ensureDatabaseReady() {
  if (!db) await initDatabase();
  return db;
}

export { resolveInitSqlJs };
