function prefersReducedMotion() {
  return document.documentElement.getAttribute('data-reduced-motion') === 'true'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createNetworkBackground() {
  const wrap = document.createElement('div');
  wrap.className = 'network-bg';
  wrap.setAttribute('aria-hidden', 'true');

  const canvas = document.createElement('canvas');
  canvas.className = 'network-bg__canvas';
  wrap.appendChild(canvas);

  let raf = 0;
  let visible = true;
  const nodes = [];
  const nodeCount = 18;

  function resize() {
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * devicePixelRatio));
    canvas.height = Math.max(1, Math.floor(rect.height * devicePixelRatio));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    nodes.length = 0;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.3 * devicePixelRatio,
      });
    }
  }

  function drawStatic(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
    ctx.fillStyle = 'rgba(34, 211, 238, 0.25)';
    nodes.forEach((n, i) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const o = nodes[j];
        const dx = n.x - o.x;
        const dy = n.y - o.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 * devicePixelRatio) {
          ctx.globalAlpha = 1 - dist / (120 * devicePixelRatio);
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });
  }

  function tick() {
    if (!visible) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (prefersReducedMotion()) {
      drawStatic(ctx);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
    ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
    nodes.forEach((n, i) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 2 * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const o = nodes[j];
        const dx = n.x - o.x;
        const dy = n.y - o.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 * devicePixelRatio) {
          ctx.globalAlpha = 0.15 * (1 - dist / (120 * devicePixelRatio));
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(o.x, o.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    });
    raf = requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    if (visible && !raf && !prefersReducedMotion()) {
      raf = requestAnimationFrame(tick);
    } else if (!visible && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }, { threshold: 0.05 });

  resize();
  observer.observe(wrap);
  window.addEventListener('resize', resize);
  if (!prefersReducedMotion()) raf = requestAnimationFrame(tick);
  else drawStatic(canvas.getContext('2d'));

  wrap._destroy = () => {
    if (raf) cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('resize', resize);
  };

  return wrap;
}
