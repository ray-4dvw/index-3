// SCENE-----
let scene = new THREE.Scene();

//width and height
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

//CAMERA-----
// THREE.PerspectiveCamera(fov, aspect, near, far)
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
camera.position.z = 150;
camera.lookAt(scene.position);

// RENDERER-----
// const renderer = new THREE.WebGLRenderer({
//   alpha: true // remove canvas' bg color
// });
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
const container = document.querySelector('.container');
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

//Image loader and texture
const loader = new THREE.ImageLoader();
const mainLogo = loader.load('./4DLogo.png');
const tex = new THREE.CanvasTexture(mainLogo);

//OBJECT-----
// create geometry
var geometry = new THREE.PlaneGeometry(30, 30, 0);
var geometry2 = new THREE.BoxGeometry(20, 30, 1);

// create a material
var material = new THREE.MeshBasicMaterial({
  map: tex
});
var material2 = new THREE.MeshNormalMaterial();
// add the geometry to the mesh - and apply the material to it
var cube = new THREE.Mesh(geometry, material);
const helper = new THREE.AxesHelper(200);
cube.position.set(0, 40, -60);
// cube.add(helper);
// cube.userData = {URL : 'http://4dvw.com'};

var cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(-30, 0, 0);
cube2.rotation.set(0, -0.25, 0);
cube2.userData = { URL: 'http://www.4dvw.com/about' };

var cube3 = new THREE.Mesh(geometry2, material2);
cube3.position.set(0, 0, 5);
cube3.userData = { URL: 'http://www.4dvw.com/home_search' };
var cube4 = new THREE.Mesh(geometry2, material2);
cube4.position.set(30, 0, 0);
cube4.rotation.set(0, 0.25, 0);
cube4.userData = { URL: 'http://www.4dvw.com/investor_relations' };

//LIGHT-----
var light = new THREE.PointLight(0xffff00);
/* position the light so it shines on the cube (x, y, z) */
light.position.set(10, 0, 25);

// ADD STUFF TO THE SCENE-----
scene.add(light);
scene.add(cube, cube2, cube3, cube4);

//responsive camera
window.addEventListener('resize', function() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//camera follow mouse
var mouseX = 0,
  mouseY = 0;

function mouseMove(e) {
  mouseX = (event.clientX - windowHalfX) / 5;
  mouseY = (event.clientY - windowHalfY) / 5;
  
}
window.addEventListener('mousemove', mouseMove, false);

//for clickables
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

const mouseClick = e => {
  event.preventDefault();

  mouse.x = event.clientX / renderer.domElement.clientWidth * 2 - 1;
  mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  // console.log('====================================');
  // console.log(intersects);
  // console.log('====================================');
  if (intersects.length > 0) {
    window.open(intersects[0].object.userData.URL, '_self');
  }
};

window.addEventListener('mousedown', mouseClick, false);

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

//ANIMATION RENDER-----
function animate() {
  requestAnimationFrame(animate);
  // animations
  // cube.rotation.x += 0.00001;
  // cube.rotation.y += 0.00001;

  // renderer call
  render();
}

animate();
