import '../globelScript.js';

import * as Three from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


showToast('Use Mouse ( left Down and move ) for Move the diagram')



// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Light
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1));

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshPhongMaterial({ color: 0x555555, depthWrite: true })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Cube for reference
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshPhongMaterial({ color: "gray" })
);
cube.position.set(0, 1.5, -10);
scene.add(cube);

// Camera
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.threejs'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Simple overlay menu
const menu = document.createElement('div');
menu.id = "menu";
menu.innerHTML = "Click to play";
menu.style.position = "absolute";
menu.style.top = "50%";
menu.style.left = "50%";
menu.style.transform = "translate(-50%, -50%)";
menu.style.color = "white";
menu.style.fontSize = "24px";
menu.style.cursor = "pointer";
document.body.appendChild(menu);

menu.addEventListener('click', () => {
  controls.lock();
});

controls.addEventListener('lock', () => {
  menu.style.display = 'none';
});

controls.addEventListener('unlock', () => {
  menu.style.display = 'block';
});

// Movement setup
const velocity = new THREE.Vector3();
const keys = {};

document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

const clock = new THREE.Clock();

// Animation loop
function animate() {
  const delta = clock.getDelta();

  // reset velocity
  velocity.set(0, 0, 0);

  // WASD movement
  const speed = 5;
  if (keys['KeyW']) velocity.z -= speed * delta;
  if (keys['KeyS']) velocity.z += speed * delta;
  if (keys['KeyA']) velocity.x -= speed * delta;
  if (keys['KeyD']) velocity.x += speed * delta;

  // Apply relative movement
  controls.moveForward(-velocity.z);
  controls.moveRight(velocity.x);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
