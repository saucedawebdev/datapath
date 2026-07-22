import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { sql } from '@codemirror/lang-sql';

export function createSqlEditor(parent, { initialValue = '', onRun, onChange } = {}) {
  const runKeymap = keymap.of([
    {
      key: 'Mod-Enter',
      run: () => {
        if (onRun) onRun(getValue());
        return true;
      },
    },
    indentWithTab,
    ...defaultKeymap,
    ...historyKeymap,
  ]);

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged && onChange) onChange(update.state.doc.toString());
  });

  const state = EditorState.create({
    doc: initialValue,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      history(),
      sql(),
      runKeymap,
      updateListener,
      EditorView.theme({
        '&': { minHeight: '12rem', fontSize: '0.875rem' },
        '.cm-scroller': { fontFamily: 'var(--font-mono)' },
        '.cm-content': { padding: '0.75rem 0' },
        '.cm-gutters': { background: 'var(--color-bg-muted)', border: 'none' },
      }),
      EditorView.lineWrapping,
    ],
  });

  const view = new EditorView({ state, parent });
  parent.classList.add('code-editor');

  function getValue() {
    return view.state.doc.toString();
  }

  function setValue(value) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }

  function destroy() {
    view.destroy();
  }

  return { getValue, setValue, destroy, focus: () => view.focus() };
}

export function renderResultTable(columns, rows) {
  const wrapper = document.createElement('div');
  wrapper.className = 'table-wrapper';

  if (!rows.length) {
    wrapper.innerHTML = '<p class="text-muted" style="padding:1rem">No rows returned.</p>';
    return wrapper;
  }

  const table = document.createElement('table');
  table.className = 'data-table';
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  for (const col of columns) {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = col;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (const row of rows.slice(0, 500)) {
    const tr = document.createElement('tr');
    for (const col of columns) {
      const td = document.createElement('td');
      td.textContent = row[col] == null ? 'NULL' : String(row[col]);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  if (rows.length > 500) {
    const note = document.createElement('p');
    note.className = 'text-sm text-muted';
    note.textContent = `Showing first 500 of ${rows.length} rows.`;
    wrapper.appendChild(note);
  }

  wrapper.appendChild(table);
  return wrapper;
}
