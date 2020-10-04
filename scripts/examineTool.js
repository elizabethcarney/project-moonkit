/**********************************/
/*         EXAMINETOOL.JS         */
/**********************************/
/*        Project: MoonKit        */
/*      NASA Space Apps 2020      */
/*         Team: Griffins         */
/**********************************/

function examineTool(type) {

    const container = document.querySelector('.model-viewport');

    const mod_scene = new THREE.Scene();
    mod_scene.background = new THREE.Color('rgb(180,205,255)');

    // the loaded model
    var tool;
    var tool_file = (type == 'brush') ? ('assets/mod/moonkit-brush.glb')
              : console.log('Model not found.');

    // camera
    const mod_aspect = container.clientWidth / container.clientHeight;
    const mod_camera = new THREE.PerspectiveCamera(300, mod_aspect, 0.1, 5000); // fov, aspect, near_clip, far_clip
    mod_camera.position.set(0, 0, 15);

    // light
    var light = new THREE.AmbientLight(0x404040, 3); // soft white light
    mod_scene.add(light);
    var spotLight = new THREE.SpotLight(0xffffff, .8, 200, 0.75, 1);
    spotLight.position.set(-15, 20, 70);
    spotLight.castShadow = true;
    mod_scene.add(spotLight);
    //var spotLightHelper = new THREE.SpotLightHelper( spotLight );
    //mod_scene.add( spotLightHelper );

    // loaded models become instances of Object3D
    var loader = new THREE.GLTFLoader();
    const onProgress = () => {};
    const onError = (errorMessage) => { console.log(errorMessage); };
    loader.load(tool_file, function (gltf) {
        tool = gltf.scene;
        tool.castShadow = true;
        tool.scale.set(40,40,40);
        tool.position.set(0, 2, 0);
        tool.rotation.set( Math.PI, -0.4, -0.2 );
        mod_scene.add(tool);
    }, onProgress, onError);

    //renderer
    mod_renderer = new THREE.WebGLRenderer( { antialias: true } );
    mod_renderer.setSize(container.clientWidth, container.clientHeight);
    mod_renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(mod_renderer.domElement);
    mod_renderer.render(mod_scene, mod_camera);

    function render_mod() {
        requestAnimationFrame(render_mod);
        mod_renderer.render(mod_scene, mod_camera);
    }
    render_mod(); // if you don't repeatedly re-render it goes away :(

}
examineTool('brush');