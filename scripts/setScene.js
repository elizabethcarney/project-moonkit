const container = document.querySelector('#model-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

//loaded Object3D models
var ground;
var brush;

//camera
const fov = 70; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100000; // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 120, 20);
camera.rotateX(-0.1);

//light
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 100, 100);
spotLight.castShadow = true;
scene.add(spotLight);

// ground
var moon_sphere = new THREE.SphereGeometry( 135, 200, 200 );
moon_sphere.rotateX( - Math.PI / 2 );
var moonTexture = new THREE.TextureLoader().load( '../assets/img/moon-surface.png' );
moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping;
moonTexture.repeat.set(15, 15);
var moon_mat = new THREE.MeshBasicMaterial({map: moonTexture, side: THREE.FrontSide});
var moon_mesh = new THREE.Mesh( moon_sphere, moon_mat );
scene.add( moon_mesh );
moon_mesh.position.set(0, -20, -10);

// sky
var sky_sphere = new THREE.SphereGeometry( 99000, 200, 200 );
var skyTexture = new THREE.TextureLoader().load( '../assets/img/background-sky.jpg' );
var sky_mat = new THREE.MeshBasicMaterial({map: skyTexture, side: THREE.BackSide});
var sky_mesh = new THREE.Mesh( sky_sphere, sky_mat );
scene.add( sky_mesh );

// loaded models become instances of Object3D
var loader = new THREE.GLTFLoader();
const onProgress = () => {};
const onError = (errorMessage) => { console.log(errorMessage); };
loader.load('assets/mod/moonkit-brush.glb', function (gltf) {
    brush = gltf.scene;
    brush.castShadow = true;
    brush.scale.set(100,100,100);
    brush.position.set(-10, 0, -20);
    scene.add(brush);
}, onProgress, onError);

//renderer
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
renderer.render(scene, camera);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    moon_mesh.rotation.z += 0.0001;
}
render(); // if you don't repeatedly re-render it goes away :(