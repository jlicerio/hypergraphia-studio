const canvas = document.querySelector('#field');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let scene, camera, renderer, points, rings, frame;

function initField() {
  if (!canvas || !window.THREE) return;
  const THREE = window.THREE;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(52, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 0, 13);
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x07080a, 0);

  const positions = [];
  const colors = [];
  const color = new THREE.Color();
  const count = 2500;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const radius = 2.2 + Math.random() * 8;
    const y = (Math.random() - 0.5) * 5;
    positions.push(Math.cos(a) * radius, y, Math.sin(a) * radius);
    color.setHSL(0.76 + Math.random() * 0.12, 0.62, 0.45 + Math.random() * 0.3);
    colors.push(color.r, color.g, color.b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.78, blending: THREE.AdditiveBlending });
  points = new THREE.Points(geometry, material);
  scene.add(points);

  rings = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2 + i * 0.55, 0.008, 8, 160),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xa06bff : 0x4a89ff, transparent: true, opacity: 0.22 })
    );
    ring.rotation.set(Math.random(), Math.random(), Math.random());
    rings.add(ring);
  }
  scene.add(rings);

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
  addEventListener('pointermove', (event) => {
    if (reduceMotion) return;
    const x = (event.clientX / innerWidth - 0.5) * 0.5;
    const y = (event.clientY / innerHeight - 0.5) * 0.35;
    camera.position.x += (x - camera.position.x * 0.02) * 0.03;
    camera.position.y += (-y - camera.position.y * 0.02) * 0.03;
  });
  animate();
}

function animate(time = 0) {
  if (!renderer) return;
  const t = time * 0.00025;
  points.rotation.y = t * 0.8;
  points.rotation.x = Math.sin(t * 1.7) * 0.08;
  rings.rotation.y = t * 0.45;
  rings.rotation.x = Math.sin(t) * 0.18;
  renderer.render(scene, camera);
  if (!reduceMotion) frame = requestAnimationFrame(animate);
}

function setupTabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = [...document.querySelectorAll('[role="tabpanel"]')];
  if (!tabs.length) return;
  const activate = (id, moveFocus = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === id;
      tab.setAttribute('aria-selected', active);
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => panel.hidden = panel.id !== `panel-${id}`);
    if (moveFocus) document.querySelector(`[data-tab="${id}"]`)?.focus();
    history.replaceState(null, '', `#${id}`);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.tab));
    tab.addEventListener('keydown', (event) => {
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index - 1 + tabs.length) % tabs.length : null;
      if (next !== null) { event.preventDefault(); activate(tabs[next].dataset.tab, true); }
    });
  });
  document.querySelectorAll('.enter[data-tab]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const target = document.querySelector(`[data-tab="${trigger.dataset.tab}"]`);
      target?.click();
    });
  });
  const initial = location.hash.replace('#', '') || 'studio';
  activate(tabs.some(tab => tab.dataset.tab === initial) ? initial : 'studio');
}

function setupTheme() {
  const toggle = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('hypergraphia-theme');
  const apply = (theme) => {
    document.body.dataset.theme = theme;
    const light = theme === 'light';
    toggle?.setAttribute('aria-pressed', String(light));
    toggle?.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    const label = toggle?.querySelector('.theme-label');
    if (label) label.textContent = light ? 'DARK' : 'LIGHT';
  };
  apply(saved === 'light' ? 'light' : 'dark');
  toggle?.addEventListener('click', () => {
    const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('hypergraphia-theme', next);
    apply(next);
  });
}

document.addEventListener('DOMContentLoaded', () => { setupTheme(); setupTabs(); initField(); });
