

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var currentBump;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var SCREEN_WIDTH = window.innerWidth * .66;
var SCREEN_HEIGHT = window.innerHeight * 0.88;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

document.body.appendChild(renderer.domElement);

//var camControls = new THREE.OrbitControls(camera);
//camControls.addEventListener('change', render);




var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
var cube2 = new THREE.Mesh(geometry, material);

//scene.add(cube);


var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(1, 0, 1).normalize();
///directionalLight
scene.add(directionalLight);

//var lightControls = new THREE.OrbitControls(cube);
//lightControls.addEventListener('change', render);

var ambient = new THREE.AmbientLight(0x444444);
//ambient.
scene.add(ambient);

camera.position.z = 5;

var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total)
{
    console.log(item, loaded, total);
};

var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};

var onError = function (xhr) {
};


//var loader = new THREE.ObjectLoader();
//loader.load('./obj/box.obj', function(object)
//        {
//            scene.add(object);
//        }
//);

var objectloader = new THREE.OBJLoader(manager);
//loader.load(obj/box.obj)

objectloader.load('obj/tail4.obj', function (object)
{
    object.traverse(function (child)
    {
        var bump = THREE.ImageUtils.loadTexture("obj/scalebump.jpg");
        //mapHeight.offset.set( 5, 5 );
        bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
        //bump.repeat.set( 3, 3 );
        //mapHeight.format = THREE.RGBFormat;
        //bump.needsUpdate = true;


        child.material = new THREE.MeshPhongMaterial(
                {
                    color: 0xffffff,
                    shininess: 30,
                    map: THREE.ImageUtils.loadTexture("obj/tailcolor.png"),
                    bumpMap: bump,
                    bumpScale: .05,
                    //specularMap: bump,
                    //bumpMap.repeat: new Vector2( 2, 2 ),
                    wrapRGB: new THREE.Vector3(0.575, 0.5, 0.5),
                    wrapAround: true
                            //metal: true
                });

        child.material.bumpMap.repeat.set(.5, .5);
    });


    cube2 = object;
    cube2.position.y -= .4;
    //cube2.position.x -= 3;
    scene.add(object);

}, onProgress, onError);

objectloader.load('obj/fin.obj', function (object)
{
    object.traverse(function (child)
    {
        var bump = THREE.ImageUtils.loadTexture("obj/finWirebump.png");
        currentBump = "fin";
        //mapHeight.offset.set( 5, 5 );
        bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
        //bump.repeat.set( 3, 3 );
        //mapHeight.format = THREE.RGBFormat;
        //bump.needsUpdate = true;


        child.material = new THREE.MeshPhongMaterial(
                {
                    color: 0xffffff,
                    shininess: 30,
                    map: THREE.ImageUtils.loadTexture("obj/tailcolor.png"),
                    bumpMap: bump,
                    bumpScale: 1,
                    //specularMap: bump,
                    //bumpMap.repeat: new Vector2( 2, 2 ),
                    wrapRGB: new THREE.Vector3(0.575, 0.5, 0.5),
                    wrapAround: true
                            //metal: true
                });

        child.material.bumpMap.repeat.set(.5, .5);
    });


    cube = object;
    cube.position.y -= .4;
    //cube.rotation.x = 99;
    scene.add(object);

}, onProgress, onError);





render();

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('touchstart', onDocumentTouchStart, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize(event) {

    //console.log("here");

    SCREEN_WIDTH = window.innerWidth * 0.66;
    SCREEN_HEIGHT = window.innerHeight * 0.88;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();
}

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length == 1) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

    }

}

function render()
{
    requestAnimationFrame(render);

    //cube.rotation.x += 0.01;
    cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
    cube2.rotation.y += (targetRotation - cube2.rotation.y) * 0.05;

    //directionalLight.position = camera.position;

    renderer.render(scene, camera);
}

function changeFinBumpTexture(tex, bump)
{
    //console.log("here");
    
    cube.traverse(function (child)
    {
        child.material.bumpMap = new THREE.ImageUtils.loadTexture(tex);
        child.material.bumpScale = bump;
        child.material.bumpMap.needsUpdate = true;
        child.material.needsUpdate = true;
    });

}

function changeColor(value)
{
    console.log("here");
    
    cube.traverse(function (child)
    {
        child.material.color.setHex(value);
        child.material.color.needsUpdate = true;
        child.material.needsUpdate = true;
    });
    
    cube2.traverse(function (child)
    {
        child.material.color.setHex(value);
        child.material.color.needsUpdate = true;
        child.material.needsUpdate = true;
    });

}