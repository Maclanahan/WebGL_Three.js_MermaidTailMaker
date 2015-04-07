

var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var currentBump;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth *.66 /2;
var windowHalfY = window.innerHeight * .88 /2;
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

var directionalLight = new THREE.DirectionalLight(0xffeedd);
directionalLight.position.set(3, 0, 2).normalize();
scene.add(directionalLight);

var ambient = new THREE.AmbientLight(0x444444);
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
//console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
};
var onError = function (xhr) {
};


var objectloader = new THREE.OBJLoader(manager);

objectloader.load('obj/tail4.obj', function (object)
{
    object.traverse(function (child)
    {
        var bump = THREE.ImageUtils.loadTexture("img/" + "classic" + "/scalebump.png");

        child.material = new THREE.MeshPhongMaterial(
        {
            color: 0xffffff,
            shininess: 10,
            //map: THREE.ImageUtils.loadTexture("obj/tailcolorcolor.png"),
            bumpMap: bump,
            bumpScale: .05,
            //alphaMap: THREE.ImageUtils.loadTexture("obj/finWire.png"),
            //specularMap: THREE.ImageUtils.loadTexture("img/scalespec.png"),
            //bumpMap.repeat: new Vector2( 2, 2 ),
            wrapRGB: new THREE.Vector3(0.575, 0.5, 0.5),
            wrapAround: true
            //metal: true
        });
        //child.material.bumpMap.repeat.set(.5, .5);
    });
    cube2 = object;
    cube2.position.y -= .4;
    scene.add(object);
    
    //changeTextureFromCanvas();
}, onProgress, onError);
objectloader.load('obj/fin.obj', function (object)
{
    object.traverse(function (child)
    {
        var bump = THREE.ImageUtils.loadTexture("img/" + imageFinPath + "/flukebump.png");

        child.material = new THREE.MeshPhongMaterial(
                {
                    color: 0xffffff,
                    shininess: 20,
                    //map: THREE.ImageUtils.loadTexture("img/flukeBase.png"),
                    bumpMap: bump,
                    bumpScale: 1,
                    
                    //specularMap: bump,
                    //bumpMap.repeat: new Vector2( 2, 2 ),
                    wrapRGB: new THREE.Vector3(0.575, 0.5, 0.5),
                    wrapAround: true
                            //metal: true
                });
        //child.material.bumpMap.repeat.set(.5, .5);
    });
    cube = object;
    cube.position.y -= .4;
    scene.add(object);
    
    //changeTextureFromCanvas();
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
    if(event.clientX < SCREEN_WIDTH)
    {
        event.preventDefault();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);
        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
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

    if (event.touches.length === 1 && event.touches[0].pageX < SCREEN_WIDTH) {

        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1 && event.touches[0].pageX < SCREEN_WIDTH) {

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

function changeColor()
{
    var value = document.getElementById('background-color').value;
    value = value.replace('#','');
    value = "0x" + value;
    //console.log(value);
    
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

function changeTexture(tex)
{
    //console.log(tex);
    
    
    cube2.traverse(function (child)
    {
        child.material.color.setHex(0xffffff);
        child.material.map = new THREE.ImageUtils.loadTexture(tex);
        //child.material.map.needsUpdate = true;
        child.material.needsUpdate = true;
    });
    
//    cube.traverse(function (child)
//    {
//        child.material.color.setHex(0xffffff);
//        child.material.map = new THREE.ImageUtils.loadTexture(tex);
//        //child.material.map.needsUpdate = true;
//        child.material.needsUpdate = true;
//    });
    
}

function changeFinTexture(tex)
{
    //console.log(tex);
    
    
//    cube2.traverse(function (child)
//    {
//        child.material.color.setHex(0xffffff);
//        child.material.map = new THREE.ImageUtils.loadTexture(tex);
//        //child.material.map.needsUpdate = true;
//        child.material.needsUpdate = true;
//    });
    
    cube.traverse(function (child)
    {
        //console.log("here");
        child.material.color.setHex(0xffffff);
        child.material.map = new THREE.ImageUtils.loadTexture(tex);
        //child.material.map.needsUpdate = true;
        child.material.needsUpdate = true;
    });
    
}