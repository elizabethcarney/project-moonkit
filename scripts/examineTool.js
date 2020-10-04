/**********************************/
/*         EXAMINETOOL.JS         */
/**********************************/
/*        Project: MoonKit        */
/*      NASA Space Apps 2020      */
/*         Team: Griffins         */
/**********************************/

function examineTool(type) {

    const mod_container = document.querySelector('.model-viewport');
    const mod_scene = new THREE.Scene();
    mod_scene.background = new THREE.Color('rgb(180,205,255)');

    // cameras
    const mod_aspect = mod_container.clientWidth / mod_container.clientHeight;
    const mod_camera = new THREE.PerspectiveCamera(300, mod_aspect, 0.1, 5000); // fov, aspect, near_clip, far_clip
    mod_camera.position.set(0, 0, 15);
    var frustumSize = 400;
    const ortho_camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
    mod_camera.position.set(0, 0, 15);

    // light
    var light = new THREE.AmbientLight(0x404040, 1); // soft white light
    mod_scene.add(light);
    var dirlight1 = new THREE.DirectionalLight( 0xffffff );
    dirlight1.position.set( 1, 1, 1 );
    mod_scene.add( dirlight1 );
    var dirlight2 = new THREE.DirectionalLight( 0xffffff );
    dirlight2.position.set( -1, -1, -1 );
    mod_scene.add( dirlight2 );

    // the loaded model
    var tool;
    var tool_file = (type == 'brush') ? ('assets/mod/moonkit-brush.glb')
              : console.log('Model not found.');

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
    var mod_renderer = new THREE.WebGLRenderer( { antialias: true } );
    mod_renderer.setSize(mod_container.clientWidth, mod_container.clientHeight);
    mod_renderer.setPixelRatio(window.devicePixelRatio);
    mod_container.appendChild(mod_renderer.domElement);
    mod_renderer.render(mod_scene, mod_camera);

    function render_mod() {
        requestAnimationFrame(render_mod);
        mod_renderer.render(mod_scene, mod_camera);
    }
    render_mod(); // if you don't repeatedly re-render it goes away :(

}

// menu clicking logic
/* when menu item is clicked, display modal */
$("document").ready(function(){
    var modal = $('.model-container');
    $('.tool_menu_item').click(function(event) {
        /* get modal name from clicked item */
        var id = event.currentTarget.id;
        /* close any open modals */
        modal.css("display", "none");
        $('.model-viewport').empty();
        /* display modal */
        modal.css("display", "block");
        examineTool(id);
    });
    /* when exit button is clicked, hide modals */
    $('img.exit-icon').click(function(event) {
        modal.css("display", "none");
        $('.model-viewport').empty();
    });
});