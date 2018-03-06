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

};


function createSphere() {
  var geometry = new THREE.SphereBufferGeometry(50, 30, 30);
  var material = new THREE.MeshLambertMaterial({
    color: 0xfccdd3
  });
  sphere = new THREE.Mesh( geometry, material );
  sphere.receiveShadow = true;

  scene.add( sphere );

};

var dxPerFrame = 2;
var dyPerFrame = 2;


//rotate and translate the sphere

function animate() {
    requestAnimationFrame(animate);
    move()

    renderer.render( scene, camera );
}

function move(x) {
  //sphere.position.x += dxPerFrame; // move ball
  //sphere.position.y += dyPerFrame; // move ball

/*
  if(sphere.position.x >  100) dxPerFrame = -1; // if we're too far right, move towards the left
  if(sphere.position.x < -100) dxPerFrame =  1; // if we're too far left, move towards the right again
  if(sphere.position.y >  100) dyPerFrame = -1; // if we're too far right, move towards the left
  if(sphere.position.y < -100) dyPerFrame =  1; // if we're too far left, move towards the right again
*/
}

function position(x){
  sphere.position.x = x;
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//Initialize our scene
init();
animate();

function handleOrientation(event) {
  let y = event.beta;
  let x = event.gamma;

  const scaleY = d3.scaleLinear()
    .domain([45,90])
    .range([90, -90]);
  
  const scaleYVelocity = d3.scaleLinear()
    .domain([45,90])
    .range([-1, 1]);

  const scaleX = d3.scaleLinear()
    .domain([-10,10])
    .range([90, -90]);
  
  const scaleXVelocity = d3.scaleLinear()
    .domain([-20,20])
    .range([1, -1]);

  // This particular code is terrible
  sphere.position.y= parseInt(sphere.position.y) + d3.min([d3.max([scaleYVelocity(scaleY(y)), -3]),3]);
  sphere.position.x= parseInt(sphere.position.x) + d3.min([d3.max([scaleXVelocity(scaleX(x)), -3]),3]);

/*
  if (y > 55) {
    sphere.position.y= parseInt(sphere.position.y) - (yInc);
  }
  else if ( y < 35) {
    sphere.position.y = parseInt(sphere.position.y) + (yInc);
  }

  if (x < -10) {
    console.log('RIGHT!!!!!!');
    sphere.position.x = parseInt(sphere.position.x) - (xInc);
  }
  else if ( x > 10) {
    console.log('LEFT!!!!!!');
    sphere.position.x = parseInt(sphere.position.x) + (xInc);
  }
  */
}

function recenter(){
  sphere.position.y = 0;
 sphere.position.x = 0;
}

window.addEventListener("deviceorientation", handleOrientation, true);
window.addEventListener("touchstart", recenter, true);
