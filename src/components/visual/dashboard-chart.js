import { getNorthstarMetrics } from '../../services/northstar-metrics-service.js';

function prefersReducedMotion() {
  return document.documentElement.getAttribute('data-reduced-motion') === 'true'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createDashboardChart(type = 'revenue') {
  const wrap = document.createElement('div');
  wrap.className = 'dashboard-chart';

  const metrics = getNorthstarMetrics();
  const points = type === 'orders'
    ? metrics.monthlyOrders
    : metrics.regionRevenue;

  if (!points?.length) {
    wrap.innerHTML = '<p class="dashboard-chart__empty">Chart data unavailable.</p>';
    wrap.setAttribute('role', 'status');
    return wrap;
  }

  wrap.setAttribute('role', 'img');
  wrap.setAttribute('aria-label', `${type === 'orders' ? 'Orders over time' : 'Regional revenue'} chart`);

  const canvas = document.createElement('canvas');
  canvas.className = 'dashboard-chart__canvas';
  wrap.appendChild(canvas);

  function draw(progress = 1) {
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(120 * devicePixelRatio));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const margin = 24 * devicePixelRatio;
    const w = canvas.width - margin * 2;
    const h = canvas.height - margin * 2;
    const max = Math.max(...points.map((p) => p.value), 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.9)';
    ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';

    if (type === 'orders') {
      ctx.beginPath();
      points.forEach((p, i) => {
        const x = margin + (i / Math.max(points.length - 1, 1)) * w;
        const y = margin + h - (p.value / max) * h * progress;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    } else {
      const slot = w / points.length;
      points.forEach((p, i) => {
        const barH = (p.value / max) * h * progress;
        const x = margin + i * slot + slot * 0.15;
        ctx.fillRect(x, margin + h - barH, slot * 0.7, barH);
      });
    }
  }

  draw(prefersReducedMotion() ? 1 : 0);
  if (!prefersReducedMotion()) {
    let frame = 0;
    function animate() {
      frame++;
      draw(frame / 30);
      if (frame < 30) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  return wrap;
}
