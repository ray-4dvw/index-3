// SCENE-----
const container = document.querySelector('.container');
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
let mouseX,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// scene
const ambient = new THREE.AmbientLight(0x101030);
const directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(0, 0, 1);
scene.add(ambient, directionalLight);

//model
// create geometry
let geometry = new THREE.BoxGeometry(40, 40, 10);
let geometry2 = new THREE.BoxGeometry(20, 30, 1);
// create a material
let material = new THREE.MeshNormalMaterial({ wireframe: true });
let material2 = new THREE.MeshNormalMaterial();
// add the geometry to the mesh - and apply the material to it
let cube = new THREE.Mesh(geometry, material);
const helper = new THREE.AxesHelper(200);
cube.position.set(0, 40, -100);
cube.add(helper);

let cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(-30, 0, 0);
cube2.rotation.set(0, -0.25, 0);
let cube3 = new THREE.Mesh(geometry2, material2);
cube3.position.set(0, 0, 5);
let cube4 = new THREE.Mesh(geometry2, material2);
cube4.position.set(30, 0, 0);
cube4.rotation.set(0, 0.25, 0);

scene.add(cube, cube2, cube3, cube4);

camera.position.z = 200;

camera.lookAt(0, 0, 0);

//renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
// renderer.setPixelRatio(1);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

document.addEventListener('mousemove', onDocumentMouseMove, false);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 2;
  mouseY = (event.clientY - windowHalfY) / 2;
  console.log(mouseX, mouseY);
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(0,0,0);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

// init();
animate();

// //OBJECT-----
// // create geometry
// var geometry = new THREE.BoxGeometry(40, 40, 10);
// var geometry2 = new THREE.BoxGeometry(20, 30, 1);
// // create a material
// var material = new THREE.MeshNormalMaterial({ wireframe: true });
// var material2 = new THREE.MeshNormalMaterial();
// // add the geometry to the mesh - and apply the material to it
// var cube = new THREE.Mesh(geometry, material);
// const helper = new THREE.AxesHelper(200);
// cube.position.set(0, 40, -100);
// cube.add(helper);

// var cube2 = new THREE.Mesh(geometry2, material2);
// cube2.position.set(-30, 0, 0);
// cube2.rotation.set(0, -0.25, 0);
// var cube3 = new THREE.Mesh(geometry2, material2);
// cube3.position.set(0, 0, 5);
// var cube4 = new THREE.Mesh(geometry2, material2);
// cube4.position.set(30, 0, 0);
// cube4.rotation.set(0, 0.25, 0);

// //LIGHT-----
// var light = new THREE.PointLight(0xffff00);
// /* position the light so it shines on the cube (x, y, z) */
// light.position.set(10, 0, 25);

// // ADD STUFF TO THE SCENE-----
// scene.add(light);
// scene.add(cube, cube2, cube3, cube4);

// //ANIMATION RENDER-----
// function animate() {
//   requestAnimationFrame(animate);

//   // renderer call
//   renderer.render(scene, camera);
// }

// animate();
