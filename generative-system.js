import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const root = document.documentElement;
const canvas = document.querySelector('#scene');
const status = document.querySelector('#render-status');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const params = new URLSearchParams(window.location.search);

const state = {
  seed: Number(params.get('seed')) || 42,
  preset: params.get('scene') || 'flow',
  palette: params.get('palette') || 'signal',
  density: 0.58,
  tension: 0.62,
  depth: 0.44,
  motion: prefersReducedMotion ? 0 : 0.24
};

const palettes = {
  signal: ['#f2f1ec', '#b99cff', '#5fddf4', '#f7734a'],
  mono: ['#f2f1ec', '#c9cdca', '#8a9295', '#555d61'],
  earth: ['#f4d49a', '#d7945b', '#5e91a0', '#d9e0d3']
};

const presets = {
  flow: { title: 'Flow field', subtitle: 'Parametric strand study', generator: 'flow-field' },
  orbit: { title: 'Orbit system', subtitle: 'Rotational component study', generator: 'orbit-system' },
  contour: { title: 'Contour map', subtitle: 'Height-field study', generator: 'contour-map' }
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(0, 2.6, 15);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.xr.enabled = false;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 8;
controls.maxDistance = 22;
controls.target.set(0, 0, 0);

const artwork = new THREE.Group();
scene.add(artwork);
const grid = new THREE.GridHelper(22, 22, 0x30383d, 0x182024);
grid.position.y = -4.4;
grid.material.transparent = true;
grid.material.opacity = 0.32;
scene.add(grid);

const seeded = (value) => {
  let seed = value >>> 0;
  return () => {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const colorAt = (index, total) => {
  const colors = state.palette === 'mono' && root.dataset.theme === 'light'
    ? ['#111315', '#42484c', '#687074', '#92999b']
    : palettes[state.palette];
  return new THREE.Color(colors[index % colors.length]);
};

function clearArtwork() {
  while (artwork.children.length) {
    const child = artwork.children.pop();
    child.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      }
    });
  }
}

function makeLine(points, color, opacity = 0.8) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const blending = root.dataset.theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending;
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, blending });
  return new THREE.Line(geometry, material);
}

function makeFlow(random) {
  const group = new THREE.Group();
  const strandCount = Math.round(20 + state.density * 54);
  const steps = Math.round(26 + state.density * 34);
  for (let strand = 0; strand < strandCount; strand += 1) {
    const points = [];
    const baseY = -3.35 + (strand / Math.max(1, strandCount - 1)) * 6.7;
    const phase = random() * Math.PI * 2;
    for (let step = 0; step < steps; step += 1) {
      const progress = step / Math.max(1, steps - 1);
      const x = -8 + progress * 16;
      const wave = Math.sin(progress * 9 + phase) * state.tension * 1.15;
      const cross = Math.cos(progress * 15 + phase * 1.7) * state.depth * 0.55;
      const y = baseY + wave + cross;
      const z = Math.sin(progress * 6.5 + phase * 0.7) * state.depth * 2.35 + (strand - strandCount / 2) * 0.018;
      points.push(new THREE.Vector3(x, y, z));
    }
    group.add(makeLine(points, colorAt(strand, strandCount), 0.18 + state.density * 0.55));
  }
  return group;
}

function makeOrbit(random) {
  const group = new THREE.Group();
  const ringCount = Math.round(6 + state.density * 16);
  for (let ring = 0; ring < ringCount; ring += 1) {
    const points = [];
    const radius = 1.1 + ring * (0.28 + state.depth * 0.18);
    const tilt = (random() - 0.5) * state.tension * 1.4;
    const pointsPerRing = 96;
    for (let step = 0; step <= pointsPerRing; step += 1) {
      const angle = (step / pointsPerRing) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2 + ring) * state.depth * 0.35;
      points.push(new THREE.Vector3(x, y, z).applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt));
    }
    const line = makeLine(points, colorAt(ring, ringCount), 0.2 + state.density * 0.58);
    line.rotation.y = (ring / ringCount) * Math.PI * 0.9;
    group.add(line);
  }
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.65 + state.depth * 0.35, 2), new THREE.MeshBasicMaterial({ color: colorAt(1, 4), wireframe: true, transparent: true, opacity: 0.8 }));
  group.add(core);
  return group;
}

function makeContour(random) {
  const group = new THREE.Group();
  const rows = Math.round(8 + state.density * 16);
  const columns = Math.round(18 + state.density * 28);
  const width = 15;
  const depth = 10;
  for (let row = 0; row < rows; row += 1) {
    const points = [];
    for (let column = 0; column < columns; column += 1) {
      const px = (column / (columns - 1) - 0.5) * width;
      const pz = (row / (rows - 1) - 0.5) * depth;
      const height = Math.sin(px * 0.65 + state.seed * 0.04) * Math.cos(pz * 0.58 + state.seed * 0.02) * state.depth * 2.2;
      points.push(new THREE.Vector3(px, height + row * 0.06 - 1.8, pz));
    }
    group.add(makeLine(points, colorAt(row, rows), 0.16 + state.density * 0.62));
  }
  for (let column = 0; column < columns; column += 2) {
    const points = [];
    for (let row = 0; row < rows; row += 1) {
      const px = (column / (columns - 1) - 0.5) * width;
      const pz = (row / (rows - 1) - 0.5) * depth;
      const height = Math.sin(px * 0.65 + state.seed * 0.04) * Math.cos(pz * 0.58 + state.seed * 0.02) * state.depth * 2.2;
      points.push(new THREE.Vector3(px, height + row * 0.06 - 1.8, pz));
    }
    group.add(makeLine(points, colorAt(column, columns), 0.1 + state.density * 0.44));
  }
  group.rotation.x = -0.12 - state.tension * 0.12;
  return group;
}

function updateLabels() {
  const preset = presets[state.preset];
  document.querySelector('#scene-title').textContent = preset.title;
  document.querySelector('#scene-subtitle').textContent = preset.subtitle;
  document.querySelector('#meta-generator').textContent = preset.generator;
  document.querySelector('#canvas-seed').textContent = `SEED ${String(state.seed).padStart(3, '0')}`;
  ['density', 'tension', 'depth', 'motion'].forEach((key) => {
    document.querySelector(`#${key}-value`).textContent = String(Math.round(state[key] * 100)).padStart(2, '0');
  });
  document.querySelectorAll('[data-preset]').forEach((button) => button.setAttribute('aria-selected', String(button.dataset.preset === state.preset)));
  document.querySelectorAll('[data-palette]').forEach((button) => button.setAttribute('aria-selected', String(button.dataset.palette === state.palette)));
}

function renderArtwork() {
  clearArtwork();
  const random = seeded(state.seed);
  const next = state.preset === 'orbit' ? makeOrbit(random) : state.preset === 'contour' ? makeContour(random) : makeFlow(random);
  artwork.add(next);
  artwork.rotation.set(0, 0, 0);
  status.textContent = `Generator ready / ${state.preset}`;
  updateLabels();
  const url = new URL(window.location.href);
  url.searchParams.set('scene', state.preset);
  url.searchParams.set('seed', state.seed);
  url.searchParams.set('palette', state.palette);
  window.history.replaceState({}, '', url);
}

function resize() {
  const rect = canvas.parentElement.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function setTheme(theme) {
  root.dataset.theme = theme;
  const light = theme === 'light';
  document.querySelector('#theme-toggle').textContent = light ? 'Dark mode' : 'Light mode';
  document.querySelector('#theme-toggle').setAttribute('aria-pressed', String(light));
  renderer.setClearColor(light ? 0xe9ebe8 : 0x050607, 1);
  grid.material.color.set(light ? 0xaeb5b1 : 0x30383d);
  grid.material.vertexColors = false;
  const canvasText = light ? 'rgba(17, 19, 21, .66)' : 'rgba(255, 255, 255, .66)';
  document.querySelectorAll('.canvas-top span, .canvas-bottom span').forEach((element) => { element.style.color = canvasText; });
  document.querySelector('.canvas-title small').style.color = light ? 'rgba(17, 19, 21, .56)' : 'rgba(255, 255, 255, .5)';
}

document.querySelectorAll('[data-preset]').forEach((button) => button.addEventListener('click', () => {
  state.preset = button.dataset.preset;
  renderArtwork();
}));
document.querySelectorAll('[data-palette]').forEach((button) => button.addEventListener('click', () => {
  state.palette = button.dataset.palette;
  renderArtwork();
}));
['density', 'tension', 'depth', 'motion'].forEach((key) => {
  const input = document.querySelector(`#${key}`);
  input.addEventListener('input', () => {
    state[key] = Number(input.value);
    renderArtwork();
  });
});
document.querySelector('#seed').addEventListener('change', (event) => {
  state.seed = clamp(Math.round(Number(event.target.value) || 0), 0, 999999);
  event.target.value = state.seed;
  renderArtwork();
});
document.querySelector('#randomize').addEventListener('click', () => {
  state.seed = Math.floor(Math.random() * 1000);
  document.querySelector('#seed').value = state.seed;
  renderArtwork();
});
document.querySelector('#theme-toggle').addEventListener('click', () => {
  setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  renderArtwork();
});
document.querySelector('#capture').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = `hypergraphia-${state.preset}-${state.seed}.png`;
  link.href = renderer.domElement.toDataURL('image/png');
  link.click();
  status.textContent = 'Capture saved / state preserved';
});

window.addEventListener('resize', resize);
setTheme(root.dataset.theme);
document.querySelector('#seed').value = state.seed;
document.querySelector('#density').value = state.density;
document.querySelector('#tension').value = state.tension;
document.querySelector('#depth').value = state.depth;
document.querySelector('#motion').value = state.motion;
renderArtwork();
resize();

const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();
  const movement = prefersReducedMotion ? 0 : state.motion;
  artwork.rotation.y = elapsed * movement * 0.06;
  artwork.rotation.x = Math.sin(elapsed * 0.18) * movement * 0.035;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
