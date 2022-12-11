import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.module.js';
var str = "var FOO_BAR_BAZ";
var camera, scene, renderer, mesh, material;

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 125;
  scene = new THREE.Scene();

  material = new THREE.MeshBasicMaterial();
  mesh = new THREE.Mesh( new THREE.TorusBufferGeometry( 30, 25, 50, 50 ), material );
  scene.add( mesh );
  
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  document.body.appendChild( renderer.domElement );
  window.addEventListener( 'resize', onWindowResize, false );
  setCanvas();
  onWindowResize();
}

function setCanvas() {
  var canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  var context = canvas.getContext( '2d' );
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 2;
  context.font = "150px Helvetica, Arial";
  for (var i = 0; i < 6; i++) {
    context.strokeText(str, 0, i * 200);
  }
  material.map = new THREE.CanvasTexture( canvas, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping  );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  material.map.offset.x -= 0.001;
  material.map.offset.y += 0.005;
  material.map.needsUpdate = true;
  mesh.rotation.x += 0.01;
  mesh.rotation.y -= 0.01;
  mesh.rotation.z += 0.01;
  renderer.render( scene, camera );
}

init();
animate();