import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const TEXTURE_BASE = './textures/';
const REFERENCE_DATE = new Date('2000-01-01T12:00:00Z');
const SECONDS_PER_YEAR = 365.25 * 24 * 60 * 60;

const TEXTURES = {
  sun: '2k_sun.jpg',
  mercury: '2k_mercury.jpg',
  venus: '2k_venus_atmosphere.jpg',
  earth: '2k_earth_daymap.jpg',
  moon: '2k_moon.jpg',
  mars: '2k_mars.jpg',
  jupiter: '2k_jupiter.jpg',
  saturn: '2k_saturn.jpg',
  saturnRing: null,
  uranus: '2k_uranus.jpg',
  neptune: '2k_neptune.jpg',
  io: null,
  europa: null,
  ganymede: null,
  callisto: null,
  titan: null,
  triton: null,
};

const SUN_DATA = {
  name: 'Sun',
  type: 'star',
  radius: 8,
  distance: 0,
  orbitSpeed: 0,
  rotationSpeed: 0.002,
  realDiameter: '1,392,700 km',
  realDistance: '0 km',
  orbitalPeriod: 'N/A',
  dayLength: '27 Earth days (equator)',
  moons: 0,
  description:
    'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
  texture: TEXTURES.sun,
  color: 0xffaa00,
  emissive: 0xffaa00,
};

const PLANETS = [
  {
    name: 'Mercury',
    type: 'planet',
    radius: 1.0,
    distance: 22,
    orbitSpeed: 0.035,
    rotationSpeed: 0.005,
    realDiameter: '4,879 km',
    realDistance: '57.9 million km',
    orbitalPeriodDays: 87.97,
    orbitalPeriod: '88 Earth days',
    dayLength: '59 Earth days',
    moons: 0,
    description:
      'Mercury is the smallest planet in the Solar System and the closest to the Sun. It has a solid, cratered surface much like the Moon.',
    texture: TEXTURES.mercury,
    color: 0x9e9e9e,
  },
  {
    name: 'Venus',
    type: 'planet',
    radius: 1.4,
    distance: 30,
    orbitSpeed: 0.027,
    rotationSpeed: 0.003,
    realDiameter: '12,104 km',
    realDistance: '108.2 million km',
    orbitalPeriodDays: 224.7,
    orbitalPeriod: '225 Earth days',
    dayLength: '243 Earth days',
    moons: 0,
    description:
      'Venus is the second planet from the Sun and the hottest planet in the Solar System due to a thick carbon dioxide atmosphere.',
    texture: TEXTURES.venus,
    color: 0xd4a574,
  },
  {
    name: 'Earth',
    type: 'planet',
    radius: 1.2,
    distance: 40,
    orbitSpeed: 0.022,
    rotationSpeed: 0.02,
    realDiameter: '12,742 km',
    realDistance: '149.6 million km',
    orbitalPeriodDays: 365.25,
    orbitalPeriod: '365.25 days',
    dayLength: '24 hours',
    moons: 1,
    description:
      'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of its surface is covered by water.',
    texture: TEXTURES.earth,
    color: 0x2244aa,
  },
  {
    name: 'Mars',
    type: 'planet',
    radius: 1.1,
    distance: 52,
    orbitSpeed: 0.018,
    rotationSpeed: 0.018,
    realDiameter: '6,779 km',
    realDistance: '227.9 million km',
    orbitalPeriodDays: 686.98,
    orbitalPeriod: '687 Earth days',
    dayLength: '24h 37m',
    moons: 2,
    description:
      'Mars is the fourth planet and is often called the Red Planet because of iron oxide on its surface. It has the largest volcano and canyon in the Solar System.',
    texture: TEXTURES.mars,
    color: 0xc1440e,
  },
  {
    name: 'Jupiter',
    type: 'planet',
    radius: 4.6,
    distance: 78,
    orbitSpeed: 0.012,
    rotationSpeed: 0.04,
    realDiameter: '139,820 km',
    realDistance: '778.5 million km',
    orbitalPeriodDays: 11.86 * 365.25,
    orbitalPeriod: '11.86 Earth years',
    dayLength: '9h 55m',
    moons: 4,
    description:
      'Jupiter is the largest planet in the Solar System. It is a gas giant with a Great Red Spot, a storm that has lasted for centuries.',
    texture: TEXTURES.jupiter,
    color: 0xd4a87a,
  },
  {
    name: 'Saturn',
    type: 'planet',
    radius: 3.9,
    distance: 108,
    orbitSpeed: 0.0085,
    rotationSpeed: 0.038,
    realDiameter: '116,460 km',
    realDistance: '1.43 billion km',
    orbitalPeriodDays: 29.45 * 365.25,
    orbitalPeriod: '29.45 Earth years',
    dayLength: '10h 33m',
    moons: 1,
    description:
      'Saturn is the sixth planet and is best known for its prominent ring system, composed mainly of ice particles, rocky debris, and dust.',
    texture: TEXTURES.saturn,
    color: 0xe4d4a4,
    ring: true,
  },
  {
    name: 'Uranus',
    type: 'planet',
    radius: 2.4,
    distance: 138,
    orbitSpeed: 0.006,
    rotationSpeed: 0.025,
    realDiameter: '50,724 km',
    realDistance: '2.87 billion km',
    orbitalPeriodDays: 84 * 365.25,
    orbitalPeriod: '84 Earth years',
    dayLength: '17h 14m',
    moons: 2,
    description:
      'Uranus is the seventh planet. It has the third-largest planetary radius and rotates on its side, giving it extreme seasonal changes.',
    texture: TEXTURES.uranus,
    color: 0x7de3f4,
  },
  {
    name: 'Neptune',
    type: 'planet',
    radius: 2.35,
    distance: 165,
    orbitSpeed: 0.0048,
    rotationSpeed: 0.024,
    realDiameter: '49,244 km',
    realDistance: '4.5 billion km',
    orbitalPeriodDays: 164.8 * 365.25,
    orbitalPeriod: '164.8 Earth years',
    dayLength: '16h 6m',
    moons: 1,
    description:
      'Neptune is the eighth and farthest-known Solar planet. It is dark, cold, and whipped by supersonic winds.',
    texture: TEXTURES.neptune,
    color: 0x3f54ba,
  },
];

const MOONS = {
  Earth: [
    {
      name: 'Moon',
      radius: 0.32,
      distance: 3.2,
      orbitSpeed: 0.045,
      rotationSpeed: 0.015,
      realDiameter: '3,475 km',
      realDistance: '384,400 km from Earth',
      orbitalPeriodDays: 27.3,
      orbitalPeriod: '27.3 Earth days',
      dayLength: '27.3 Earth days',
      description:
        'The Moon is Earth\'s only natural satellite. It is the fifth-largest satellite in the Solar System and influences Earth\'s tides.',
      texture: TEXTURES.moon,
      color: 0xaaaaaa,
    },
  ],
  Mars: [
    {
      name: 'Phobos',
      radius: 0.09,
      distance: 2,
      orbitSpeed: 0.12,
      rotationSpeed: 0.02,
      realDiameter: '22 km',
      realDistance: '9,400 km from Mars',
      orbitalPeriodDays: 0.32,
      orbitalPeriod: '0.32 Earth days',
      dayLength: '0.32 Earth days',
      description:
        'Phobos is the larger and innermost of Mars\'s two moons. It orbits so close to Mars that it rises in the west and sets in the east.',
      color: 0x8a7f78,
    },
    {
      name: 'Deimos',
      radius: 0.07,
      distance: 2.8,
      orbitSpeed: 0.08,
      rotationSpeed: 0.02,
      realDiameter: '12 km',
      realDistance: '23,460 km from Mars',
      orbitalPeriodDays: 1.26,
      orbitalPeriod: '1.26 Earth days',
      dayLength: '1.26 Earth days',
      description:
        'Deimos is the smaller and outermost moon of Mars. It is one of the darkest objects in the Solar System.',
      color: 0x7a7068,
    },
  ],
  Jupiter: [
    {
      name: 'Io',
      radius: 0.28,
      distance: 6.2,
      orbitSpeed: 0.07,
      rotationSpeed: 0.02,
      realDiameter: '3,643 km',
      realDistance: '421,700 km from Jupiter',
      orbitalPeriodDays: 1.77,
      orbitalPeriod: '1.77 Earth days',
      dayLength: '1.77 Earth days',
      description:
        'Io is the most volcanically active body in the Solar System, driven by tidal heating from Jupiter.',
      texture: TEXTURES.io,
      color: 0xe6d9a8,
    },
    {
      name: 'Europa',
      radius: 0.25,
      distance: 8.0,
      orbitSpeed: 0.055,
      rotationSpeed: 0.02,
      realDiameter: '3,122 km',
      realDistance: '671,100 km from Jupiter',
      orbitalPeriodDays: 3.55,
      orbitalPeriod: '3.55 Earth days',
      dayLength: '3.55 Earth days',
      description:
        'Europa has an icy crust that may hide a subsurface ocean, making it one of the most promising places to search for life.',
      texture: TEXTURES.europa,
      color: 0xcfcfc4,
    },
    {
      name: 'Ganymede',
      radius: 0.38,
      distance: 10.2,
      orbitSpeed: 0.04,
      rotationSpeed: 0.02,
      realDiameter: '5,268 km',
      realDistance: '1,070,400 km from Jupiter',
      orbitalPeriodDays: 7.15,
      orbitalPeriod: '7.15 Earth days',
      dayLength: '7.15 Earth days',
      description:
        'Ganymede is the largest moon in the Solar System, even larger than the planet Mercury.',
      texture: TEXTURES.ganymede,
      color: 0x8b7d6b,
    },
    {
      name: 'Callisto',
      radius: 0.36,
      distance: 12.4,
      orbitSpeed: 0.03,
      rotationSpeed: 0.02,
      realDiameter: '4,821 km',
      realDistance: '1,882,700 km from Jupiter',
      orbitalPeriodDays: 16.69,
      orbitalPeriod: '16.69 Earth days',
      dayLength: '16.69 Earth days',
      description:
        'Callisto is heavily cratered and is thought to have a subsurface ocean beneath its thick icy crust.',
      texture: TEXTURES.callisto,
      color: 0x5a5046,
    },
  ],
  Saturn: [
    {
      name: 'Titan',
      radius: 0.33,
      distance: 9.2,
      orbitSpeed: 0.035,
      rotationSpeed: 0.02,
      realDiameter: '5,149 km',
      realDistance: '1,221,800 km from Saturn',
      orbitalPeriodDays: 15.95,
      orbitalPeriod: '15.95 Earth days',
      dayLength: '15.95 Earth days',
      description:
        'Titan is the only moon known to have a dense atmosphere, and it has lakes of liquid methane and ethane on its surface.',
      texture: TEXTURES.titan,
      color: 0xdba85a,
    },
  ],
  Uranus: [
    {
      name: 'Titania',
      radius: 0.18,
      distance: 5.5,
      orbitSpeed: 0.05,
      rotationSpeed: 0.02,
      realDiameter: '1,578 km',
      realDistance: '435,800 km from Uranus',
      orbitalPeriodDays: 8.7,
      orbitalPeriod: '8.7 Earth days',
      dayLength: '8.7 Earth days',
      description:
        'Titania is the largest moon of Uranus. It has a dark surface marked by deep canyons and faults.',
      color: 0xa0a0a0,
    },
    {
      name: 'Oberon',
      radius: 0.17,
      distance: 7.2,
      orbitSpeed: 0.04,
      rotationSpeed: 0.02,
      realDiameter: '1,523 km',
      realDistance: '583,800 km from Uranus',
      orbitalPeriodDays: 13.5,
      orbitalPeriod: '13.5 Earth days',
      dayLength: '13.5 Earth days',
      description:
        'Oberon is the second-largest moon of Uranus and the outermost of its major moons.',
      color: 0x909090,
    },
  ],
  Neptune: [
    {
      name: 'Triton',
      radius: 0.23,
      distance: 6.2,
      orbitSpeed: -0.05,
      rotationSpeed: 0.02,
      realDiameter: '2,707 km',
      realDistance: '354,800 km from Neptune',
      orbitalPeriodDays: -5.88,
      orbitalPeriod: '5.88 Earth days (retrograde)',
      dayLength: '5.88 Earth days',
      description:
        'Triton is the largest moon of Neptune and one of the few moons in the Solar System known to be geologically active.',
      texture: TEXTURES.triton,
      color: 0xc4b6ae,
    },
  ],
};

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.0015);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
);
camera.position.set(0, 90, 240);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 10;
controls.maxDistance = 1000;
controls.target.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x112233, 0.45);
scene.add(hemisphereLight);

const sunLight = new THREE.PointLight(0xffffff, 120, 2000, 1.0);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add(sunLight);

const interactables = [];
const celestialObjects = [];
const clock = new THREE.Clock();

let simSpeed = 1;
let isPaused = false;
let selectedObject = null;
let realTimeMode = false;
let realTimeEpoch = null;
let realTimeStart = null;

const simDateEl = document.getElementById('sim-date');

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
textureLoader.setCrossOrigin('anonymous');

loadingManager.onLoad = () => {
  document.getElementById('loading').classList.add('hidden');
};

// Fallback: hide loader after a timeout even if some textures fail
setTimeout(() => {
  document.getElementById('loading').classList.add('hidden');
}, 10000);

function createNoiseTexture(baseColor, density = 0.4) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const base = new THREE.Color(baseColor);
  const darker = base.clone().multiplyScalar(0.65);
  const lighter = base.clone().offsetHSL(0, 0, 0.15);

  ctx.fillStyle = `#${base.getHexString()}`;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < size * size * density; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 3 + 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = Math.random() > 0.5 ? `#${lighter.getHexString()}` : `#${darker.getHexString()}`;
    ctx.globalAlpha = Math.random() * 0.35 + 0.1;
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createMaterial({ texture, color, emissive, isSun = false, transparent = false, opacity = 1 }) {
  const material = new THREE.MeshStandardMaterial({
    color: color ?? 0xffffff,
    emissive: emissive ?? 0x000000,
    emissiveIntensity: emissive ? (isSun ? 1.2 : 0.8) : 0,
    roughness: isSun ? 0.9 : 0.65,
    metalness: 0.1,
    transparent,
    opacity,
  });

  if (texture) {
    textureLoader.load(
      TEXTURE_BASE + texture,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        material.map = tex;
        if (emissive) material.emissiveMap = tex;
        material.needsUpdate = true;
      },
      undefined,
      () => {
        console.warn(`Texture failed to load: ${texture}`);
      }
    );
  } else if (color) {
    material.map = createNoiseTexture(color);
  }

  return material;
}

function createRingTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Transparent background for the gaps between rings
  ctx.clearRect(0, 0, size, size);

  const center = size / 2;
  const maxRadius = size / 2;

  const bands = [
    { from: 0.05, to: 0.12, alpha: 0.35 },
    { from: 0.15, to: 0.22, alpha: 0.55 },
    { from: 0.26, to: 0.30, alpha: 0.25 },
    { from: 0.35, to: 0.42, alpha: 0.6 },
    { from: 0.48, to: 0.55, alpha: 0.5 },
    { from: 0.62, to: 0.68, alpha: 0.35 },
    { from: 0.75, to: 0.82, alpha: 0.4 },
  ];

  bands.forEach(({ from, to, alpha }) => {
    const innerR = from * maxRadius;
    const outerR = to * maxRadius;
    const grad = ctx.createRadialGradient(center, center, innerR, center, center, outerR);
    grad.addColorStop(0, `rgba(220, 205, 170, 0)`);
    grad.addColorStop(0.15, `rgba(220, 205, 170, ${alpha})`);
    grad.addColorStop(0.85, `rgba(200, 185, 150, ${alpha})`);
    grad.addColorStop(1, `rgba(180, 165, 130, 0)`);

    ctx.beginPath();
    ctx.arc(center, center, outerR, 0, Math.PI * 2);
    ctx.arc(center, center, innerR, 0, Math.PI * 2, true);
    ctx.fillStyle = grad;
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createRingMaterial() {
  const texture = createRingTexture();
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    alphaTest: 0.02,
  });

  return material;
}

function addStarfield() {
  const count = 4500;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colorA = new THREE.Color(0xaaccff);
  const colorB = new THREE.Color(0xffffff);
  const temp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const r = 900 + Math.random() * 1100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    temp.copy(colorA).lerp(colorB, Math.random());
    colors[i * 3] = temp.r;
    colors[i * 3 + 1] = temp.g;
    colors[i * 3 + 2] = temp.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.6,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
  });

  scene.add(new THREE.Points(geometry, material));
}

function createOrbitLine(radius) {
  const segments = 128;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array((segments + 1) * 3);

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
  });

  return new THREE.Line(geometry, material);
}

function createBodyMesh(data, isSun = false) {
  const geometry = new THREE.SphereGeometry(data.radius, 48, 48);
  const material = createMaterial({
    texture: data.texture,
    color: data.color,
    emissive: data.emissive,
    isSun,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = !isSun;
  mesh.receiveShadow = !isSun;
  mesh.userData = {
    name: data.name,
    type: data.type,
    realDiameter: data.realDiameter,
    realDistance: data.realDistance,
    orbitalPeriod: data.orbitalPeriod,
    orbitalPeriodDays: data.orbitalPeriodDays,
    dayLength: data.dayLength,
    description: data.description,
    texture: data.texture,
    moons: data.moons,
  };
  return mesh;
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255, 180, 80, 1)');
  gradient.addColorStop(0.35, 'rgba(255, 120, 30, 0.35)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createSun() {
  const mesh = createBodyMesh(SUN_DATA, true);
  scene.add(mesh);
  interactables.push(mesh);

  const glowMaterial = new THREE.SpriteMaterial({
    map: createGlowTexture(),
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glow = new THREE.Sprite(glowMaterial);
  glow.scale.set(SUN_DATA.radius * 5.5, SUN_DATA.radius * 5.5, 1);
  mesh.add(glow);

  return mesh;
}

function createPlanet(data) {
  const orbitGroup = new THREE.Group();
  scene.add(orbitGroup);

  const mesh = createBodyMesh(data);
  mesh.position.set(data.distance, 0, 0);
  orbitGroup.add(mesh);
  interactables.push(mesh);
  celestialObjects.push({
    mesh,
    orbitGroup,
    rotationSpeed: data.rotationSpeed,
    orbitSpeed: data.orbitSpeed,
    orbitalPeriodDays: data.orbitalPeriodDays,
  });

  scene.add(createOrbitLine(data.distance));

  if (data.ring) {
    const inner = data.radius * 1.35;
    const outer = data.radius * 2.55;
    const ringGeometry = new THREE.RingGeometry(inner, outer, 128);
    const ringMaterial = createRingMaterial();
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    mesh.add(ring);
  }

  // Moons
  const moons = MOONS[data.name] || [];
  const moonPivot = new THREE.Group();
  moonPivot.position.set(data.distance, 0, 0);
  orbitGroup.add(moonPivot);

  moons.forEach((moonData) => {
    const moonMesh = createBodyMesh(moonData);
    moonMesh.position.set(moonData.distance, 0, 0);
    moonMesh.userData.parentPlanet = data.name;
    moonPivot.add(moonMesh);
    interactables.push(moonMesh);
    celestialObjects.push({
      mesh: moonMesh,
      orbitGroup: moonPivot,
      rotationSpeed: moonData.rotationSpeed,
      orbitSpeed: moonData.orbitSpeed,
      orbitalPeriodDays: moonData.orbitalPeriodDays,
    });
  });

  return orbitGroup;
}

function initSolarSystem() {
  addStarfield();
  createSun();
  PLANETS.forEach(createPlanet);
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
const infoCard = document.getElementById('info-card');
const infoName = document.getElementById('info-name');
const infoType = document.getElementById('info-type');
const infoImage = document.getElementById('info-image');
const infoStats = document.getElementById('info-stats');
const infoDesc = document.getElementById('info-desc');

let pointerDown = { x: 0, y: 0 };

function isOverUI(target) {
  return target.closest('#ui-controls, #info-card, .tooltip, #loading');
}

function updatePointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function getHoveredObject() {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactables, false);
  return hits.length ? hits[0].object : null;
}

function showTooltip(text, x, y) {
  tooltip.textContent = text;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
  tooltip.classList.remove('hidden');
}

function hideTooltip() {
  tooltip.classList.add('hidden');
}

function openInfoCard(object) {
  const data = object.userData;
  selectedObject = object;

  infoName.textContent = data.name;
  const isMoon = data.parentPlanet !== undefined;
  infoType.textContent = data.type === 'star'
    ? 'Star'
    : data.type === 'planet'
      ? 'Planet'
      : isMoon
        ? `Moon of ${data.parentPlanet}`
        : 'Moon';

  if (data.texture) {
    infoImage.src = TEXTURE_BASE + data.texture;
    infoImage.alt = data.name;
  } else {
    infoImage.src = '';
    infoImage.alt = '';
  }

  const stats = [
    ['Diameter', data.realDiameter],
    isMoon
      ? ['Distance from parent', data.realDistance]
      : data.type === 'star'
        ? ['Location', 'Center of the Solar System']
        : ['Distance from Sun', data.realDistance],
    ['Orbital period', data.orbitalPeriod],
    ['Day length', data.dayLength],
  ];

  if (data.type === 'planet' && typeof data.moons === 'number') {
    stats.push(['Major moons shown', data.moons]);
  }

  infoStats.innerHTML = stats
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join('');

  infoDesc.textContent = data.description;
  infoCard.classList.remove('hidden');
}

function closeInfoCard() {
  infoCard.classList.add('hidden');
  selectedObject = null;
}

function resetCamera() {
  controls.target.set(0, 0, 0);
  camera.position.set(0, 90, 240);
  controls.update();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('pointermove', (event) => {
  if (isOverUI(event.target)) {
    hideTooltip();
    document.body.style.cursor = 'default';
    return;
  }

  updatePointer(event);
  const hovered = getHoveredObject();

  if (hovered) {
    document.body.style.cursor = 'pointer';
    showTooltip(hovered.userData.name, event.clientX, event.clientY);
  } else {
    document.body.style.cursor = 'default';
    hideTooltip();
  }
});

window.addEventListener('pointerdown', (event) => {
  if (isOverUI(event.target)) return;
  pointerDown.x = event.clientX;
  pointerDown.y = event.clientY;
});

window.addEventListener('pointerup', (event) => {
  if (isOverUI(event.target)) return;

  const dx = event.clientX - pointerDown.x;
  const dy = event.clientY - pointerDown.y;
  if (Math.sqrt(dx * dx + dy * dy) > 5) return;

  updatePointer(event);
  const hovered = getHoveredObject();
  if (hovered) {
    openInfoCard(hovered);
  } else {
    closeInfoCard();
  }
});

const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');

speedSlider.addEventListener('input', () => {
  simSpeed = parseFloat(speedSlider.value);
  speedValue.textContent = simSpeed.toFixed(1) + '×';
  if (simSpeed !== 1) {
    realTimeMode = false;
    simDateEl.textContent = '';
  }
});

const btnPause = document.getElementById('btn-pause');
btnPause.addEventListener('click', () => {
  isPaused = !isPaused;
  btnPause.textContent = isPaused ? 'Resume' : 'Pause';
});

function setPlayState(playing) {
  isPaused = !playing;
  btnPause.textContent = isPaused ? 'Resume' : 'Pause';
}

document.getElementById('btn-reset').addEventListener('click', () => {
  resetCamera();
  closeInfoCard();
});

document.getElementById('info-close').addEventListener('click', (event) => {
  event.stopPropagation();
  closeInfoCard();
});

function formatDate(date) {
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });
}

function setRealTimeNow() {
  const now = new Date();
  realTimeMode = true;
  realTimeEpoch = now.getTime();
  realTimeStart = performance.now();
  simSpeed = 1;
  setPlayState(true);
  speedSlider.value = 1;
  speedValue.textContent = '1.0× (real-time)';

  // Position every object at its real orbital phase for the current date
  const secondsSinceRef = (now.getTime() - REFERENCE_DATE.getTime()) / 1000;

  celestialObjects.forEach((item) => {
    const periodDays = item.orbitalPeriodDays;
    if (!periodDays) return;

    const periodSeconds = Math.abs(periodDays) * 24 * 60 * 60;
    const revolutions = secondsSinceRef / periodSeconds;
    const angle = (revolutions % 1) * Math.PI * 2 * Math.sign(periodDays);
    item.orbitGroup.rotation.y = angle;
  });

  simDateEl.textContent = `Simulation time: ${formatDate(now)}`;
}

document.getElementById('btn-realtime').addEventListener('click', () => {
  setRealTimeNow();
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta() * (isPaused ? 0 : simSpeed);

  celestialObjects.forEach((item) => {
    item.mesh.rotation.y += item.rotationSpeed * delta;

    if (realTimeMode) {
      const periodDays = item.orbitalPeriodDays;
      if (periodDays) {
        const periodSeconds = Math.abs(periodDays) * 24 * 60 * 60;
        const angularVelocity = (Math.PI * 2 / periodSeconds) * Math.sign(periodDays);
        item.orbitGroup.rotation.y += angularVelocity * delta;
      }
    } else {
      item.orbitGroup.rotation.y += item.orbitSpeed * delta;
    }
  });

  if (realTimeMode && realTimeEpoch) {
    const elapsedSeconds = (performance.now() - realTimeStart) / 1000 * simSpeed;
    simDateEl.textContent = `Simulation time: ${formatDate(new Date(realTimeEpoch + elapsedSeconds * 1000))}`;
  }

  if (selectedObject) {
    const worldPos = new THREE.Vector3();
    selectedObject.getWorldPosition(worldPos);
    controls.target.lerp(worldPos, 0.04);
  }

  controls.update();
  renderer.render(scene, camera);
}

initSolarSystem();
animate();
