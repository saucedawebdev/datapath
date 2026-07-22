export function animateKpiValue(el, target, { duration = 500, prefix = '', suffix = '', formatter = null } = {}) {
  if (!el) return;

  const reduced = document.documentElement.getAttribute('data-reduced-motion') === 'true'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const finalText = formatter ? formatter(target) : `${prefix}${typeof target === 'number' ? target.toLocaleString() : target}${suffix}`;
  el.setAttribute('aria-label', finalText);

  if (reduced || typeof target !== 'number') {
    el.textContent = finalText;
    return;
  }

  const start = performance.now();
  const from = 0;

  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const current = Math.round(from + (target - from) * t);
    el.textContent = formatter ? formatter(current) : `${prefix}${current.toLocaleString()}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = finalText;
  }

  requestAnimationFrame(frame);
}
