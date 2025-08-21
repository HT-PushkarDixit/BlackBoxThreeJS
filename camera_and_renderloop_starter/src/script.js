import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();

// Cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Fake thick border with slightly larger wireframe cube
const borderGeometry = new THREE.BoxGeometry(1.05, 1.05, 1.05); // slightly bigger
const borderMaterial = new THREE.MeshBasicMaterial({
  color: "black",
  wireframe: true
});
const border = new THREE.Mesh(borderGeometry, borderMaterial);
cubeMesh.add(border); // attach border

// Camera
const camera = new THREE.PerspectiveCamera(
  30, 
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
camera.position.z = 5;

// Renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Controls
const controls = new OrbitControls(camera, canvas);

// === Color changing every 1s ===
const colors = ["red", "green", "blue", "yellow", "purple", "orange"];
let colorIndex = 0;

setInterval(() => {
  colorIndex = (colorIndex + 1) % colors.length;
  cubeMesh.material.color.set(colors[colorIndex]);
}, 1000);

// Render loop
function renderloop() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderloop);
}
renderloop();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
