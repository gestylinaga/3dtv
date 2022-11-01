// 3d Tv
console.log("by: gesty Linaga 🏄")

// Var setup:
let container;
let camera;
let renderer;
let scene;
let tv;

// Main function:
function init() {
  container = document.querySelector('.scene');

  // Create Scene:
  scene = new THREE.Scene();

  // Camera vars:
  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 500;

  // Camera Setup:
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 5);
  //syntax: (x, y, distance)

  // Ambient Light:
  const ambient = new THREE.AmbientLight(0x404040, 3); //(color, distance)
  scene.add(ambient);

  // Directional Light:
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(10, 10, 10);
  scene.add(light);

  // Renderer:
  renderer = new THREE.WebGLRenderer({antialiases:true, alpha: true});
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Load Model:
  let loader = new THREE.GLTFLoader();
  loader.load('../tv/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    tv = gltf.scene.children[0];
    renderer.render(scene, camera);
  });
}

// Animate Model:
function animate() {
  requestAnimationFrame(animate);
  //tv.rotation.x += 0.005;
  //tv.rotation.y -= 0.005;
  tv.rotation.z += 0.003;
  renderer.render(scene, camera);
}

// Initialize Three.js & Animate Model:
init();
animate();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container. clientHeight);
}

window.addEventListener("resize", onWindowResize);
