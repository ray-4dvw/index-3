// SCENE-----
const scene = new THREE.Scene();

//width and height 
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
//CAMERA-----
// THREE.PerspectiveCamera(fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  75,
  screenWidth / screenHeight,
  0.1,
  1000
);
camera.position.z = 100;
// camera.position.set(100, 100, 0);


// RENDERER-----
// const renderer = new THREE.WebGLRenderer({
//   alpha: true // remove canvas' bg color
// });
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});


//responsive camera
window.addEventListener('resize', function() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  renderer.setSize(screenWidth, screenHeight);
  camera.aspect = screenWidth / screenHeight;
  camera.updateProjectionMatrix();
});

const container = document.querySelector('.container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

//OBJECT-----
// create geometry
var geometry = new THREE.BoxGeometry(40, 40, 10);
var geometry2 = new THREE.BoxGeometry(20, 30, 1);
// create a material
var material = new THREE.MeshNormalMaterial({ wireframe: true });
var material2 = new THREE.MeshNormalMaterial();
// add the geometry to the mesh - and apply the material to it
var cube = new THREE.Mesh(geometry, material);
const helper= new THREE.AxesHelper(200);
cube.position.set(0, 40, -100);
cube.add(helper);

var cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(-30, 0, 0);
cube2.rotation.set(0, -0.25, 0);
var cube3 = new THREE.Mesh(geometry2, material2);
cube3.position.set(0, 0, 5);
var cube4 = new THREE.Mesh(geometry2, material2);
cube4.position.set(30, 0, 0);
cube4.rotation.set(0, 0.25, 0);

//LIGHT-----
var light = new THREE.PointLight(0xffff00);
/* position the light so it shines on the cube (x, y, z) */
light.position.set(10, 0, 25);

// ADD STUFF TO THE SCENE-----
scene.add(light);
scene.add(cube, cube2, cube3, cube4);

//ANIMATION RENDER-----
function animate() {
  requestAnimationFrame(animate);
  // animations
//   cube.rotation.x += 0.001;
//   cube.rotation.y += 0.001;

  // renderer call
  renderer.render(scene, camera);
}

animate();


camera.lookAt(0,0,0);
//camera follow mouse
var mouse = { x: 0, y: 0 };
var m = { x: 0, y: 0 };
var cameraMoves = { x: 0, y: 0, z: 0, move: false, posSpeed: 0.5 , rotSpeed:0.001 };

function mouseMove(e) {
  camera.position.x += Math.max(
    Math.min((e.clientX - mouse.x) * 0.1, cameraMoves.posSpeed),
    -cameraMoves.posSpeed
  );
  camera.position.y += Math.max(
    Math.min((mouse.y - e.clientY) * 0.1, cameraMoves.posSpeed),
    -cameraMoves.posSpeed
  );

  camera.rotation.y += Math.max(Math.min((e.clientX - mouse.x) * 0.1, cameraMoves.rotSpeed), -cameraMoves.rotSpeed);
  camera.rotation.x += Math.max(Math.min((mouse.y - e.clientY) * 0.1, cameraMoves.rotSpeed), -cameraMoves.rotSpeed);

 
  //make center (0,0)
//   mouse.x = e.clientX - screenWidth * 0.5;
//   mouse.y = e.clientY - screenHeight * 0.5;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  console.log("mouse position: ", mouse.x, mouse.y);
}

//camera reset to center after mouse left window
const mouseOut = e => {    
  camera.position.x = 0;
  camera.position.y = 0;
  camera.rotation.x = 0;
  camera.rotation.y = 0;
  console.log('mouse out');
};

window.addEventListener('mousemove', mouseMove);
window.addEventListener('mouseout', mouseOut);
