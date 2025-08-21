import * as Three from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';


showToast('After Click Use [W] [S] [A] [D] Keyboard keys for movement and mouse mouve for change pov and for Exit press [ ESC ] key ')


// initialize the scene
const scene = new Three.Scene()

// add objects to the scene
const cubeGeometry = new Three.BoxGeometry(3,1,3)
const cubeMaterial = new Three.MeshBasicMaterial({color: "gray"})

const cubeMesh = new Three.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

// initialize the camera
const camera = new Three.PerspectiveCamera(
90, 
  window.innerWidth / window.innerHeight,
  0.1,
  300)


// const camera=new Three.OrthographicCamera(
//   -1,1,1,-1,0.1,30
// )


// const aspRation=window.innerWidth/window.innerHeight;

// const camera=new Three.OrthographicCamera(
//   -5*aspRation,
//   5*aspRation,
//   10,
//   -5,
//   0.1,
//   50
// )
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new Three.WebGLRenderer({
  canvas: canvas
})


const controls=new FirstPersonControls(camera,canvas);
controls.activeLook=false;
controls.constrainVertical  =0.01;     // mouse look speed
controls.movementSpeed = 1;   // WASD / arrow key speed
controls.lookVertical = true;

controls.enableDamping=true;
controls.autoRotate=true;

renderer.setSize(window.innerWidth, window.innerHeight)



// Clock for delta time
const clock = new Three.Clock();

// Render loop

function renderloop() {
  const delta = clock.getDelta(); // seconds since last frame
  controls.update(delta);         // pass delta here!
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
