import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

showToast('Use Mouse (left click + move) to manipulate the diagram');

let option = 'translate'; // default

// Scene
const scene = new THREE.Scene();

// Cube
const cubeGeometry = new THREE.BoxGeometry(3, 1, 3);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
camera.position.z = 5;

// Renderer
const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Transform Controls
const controls = new TransformControls(camera, canvas);
controls.attach(cubeMesh);   // attach cube to controls
controls.setMode(option);    // default mode
scene.add(controls);

// Listen for dropdown changes
const toolSelect = document.getElementById('tools');
toolSelect.addEventListener('change', (e) => {
  option = e.target.value;
  controls.setMode(option);
  
  showToast(`Use Mouse ( left Down and move ) for Move the diagram and Current option is ${option}`)
});

// Optional: listen for drag changes
controls.addEventListener('dragging-changed', function (event) {
  console.log("Dragging:", event.value);
});

// Render loop
function renderloop() {
  renderer.render(scene, camera);
  requestAnimationFrame(renderloop);
}
renderloop();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
