const BOOT_KEY = 'datapath-boot-seen';

export async function runBootScreen({ steps = [], maxMs = 1800 } = {}) {
  const reduced = document.documentElement.getAttribute('data-reduced-motion') === 'true'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (sessionStorage.getItem(BOOT_KEY) === '1' || reduced) {
    return;
  }

  const overlay = document.createElement('div');
  overlay.className = 'boot-screen';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.innerHTML = `
    <div class="boot-screen__panel glass-panel">
      <p class="boot-screen__brand type-mono">DATApath Analytics OS</p>
      <ul class="boot-screen__steps"></ul>
      <p class="boot-screen__ready type-mono hidden">SYSTEM READY</p>
    </div>
  `;

  const list = overlay.querySelector('.boot-screen__steps');
  const ready = overlay.querySelector('.boot-screen__ready');
  document.body.appendChild(overlay);

  const defaultSteps = steps.length ? steps : [
    'Initializing DATApath…',
    'Loading Northstar dataset…',
    'Verifying curriculum…',
    'Preparing analytics environment…',
  ];

  const start = performance.now();
  for (let i = 0; i < defaultSteps.length; i++) {
    const li = document.createElement('li');
    li.textContent = `> ${defaultSteps[i]}`;
    list.appendChild(li);
    await wait(Math.min(320, maxMs / defaultSteps.length));
    if (performance.now() - start > maxMs) break;
  }

  ready.classList.remove('hidden');
  await wait(280);
  overlay.classList.add('boot-screen--hide');
  sessionStorage.setItem(BOOT_KEY, '1');
  setTimeout(() => overlay.remove(), 300);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetBootScreenForTests() {
  sessionStorage.removeItem(BOOT_KEY);
}
