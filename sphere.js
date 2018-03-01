//Get the height and the width of the window
var ww = window.innerWidth,
  wh = window.innerHeight;

function init(){

  /* WEBGL RENDERER */

  //Create the webGl renderer from Three
  renderer = new THREE.WebGLRenderer({canvas : document.getElementById('container')});
  //Set the background of our scene
  renderer.setClearColor(0x3F3F3F);
  //Set the size of my renderer, I want it to be fullscreen
  renderer.setSize(ww,wh);

  /* SCENE */

  //Create my scene
  scene = new THREE.Scene();


  /* WINDOW RESIZE */
  window.addEventListener( 'resize', onWindowResize, false );


  /* CAMERA */

  //Create a new Perspective Camera with four parameters
  //Check this video for more information : https://www.youtube.com/watch?t=35&v=KyTaxN2XUyQ
  camera = new THREE.PerspectiveCamera(50, ww/wh, 1, 10000);
  //We set our camera at x:0,y:0 and z:500
  camera.position.set(0, 0, 500);
  //And finally we add our camera in our scene
  scene.add(camera);


  /* LIGHT */

  //Create a white 'directional light'
  light = new THREE.DirectionalLight(0xffffff, 1);

  //We the position of our light
  light.position.set( 50, 250, 500 );

  //We add our light into the scene
  scene.add(light);


  //Create our sphere
  createSphere();


  // //This is very important, it will ask the renderer to render our scene
  // renderer.render(scene,camera);



};


function createSphere() {
  var geometry = new THREE.SphereBufferGeometry(100, 30, 30);
  var material = new THREE.MeshLambertMaterial({
    color: 0xfccdd3
  });
  sphere = new THREE.Mesh( geometry, material );
  sphere.receiveShadow = true;

  scene.add( sphere );

  sphere.rotateZ(.3);

};

mveSpeed =4;


//rotate and translate the sphere

function animate() {

    requestAnimationFrame(animate);

    direction = sphere.getWorldDirection();

    sphere.position.add(direction.multiplyScalar(4));

    renderer.render( scene, camera );

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//Initialize our scene
init();
animate();
