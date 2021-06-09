var puntuacion = 0;
var mouse = {x: 0, y: 0};

var zMazo = 0;
var xMazo = 0;
var yMazo = 0;

var posMazo = true;


/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;


/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {

  if (withStats)
    stats = initStats();
}

/// It adds statistics information to a previously created Div
/**
 * @return The statistics object
 */
function initStats() {

  var stats = new Stats();

  stats.setMode(0); // 0: fps, 1: ms

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  $("#Stats-output").append( stats.domElement );

  return stats;
}

/// It shows a feed-back message for the user
/**
 * @param str - The message
 */
function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h1 >"+str+"</h1>";
}



/// It processes the window size changes
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}



function contarTopos (){
 
  
  if(!posMazo){
 
    for(var i = 0; i< 5; i++ ){

      if(scene.cerca(i, scene.mazo.position.x - 10, scene.mazo.position.y + 10, scene.mazo.position.z)){
         console.log('puntuacion:' + puntuacion);
         console.log('scene:' + scene.posicionAdecuada(i));
        if(scene.model.children[i].material.transparent == false && scene.posicionAdecuada(i)){
          scene.model.children[i].material.transparent = true;
          scene.model.children[i].material.opacity = 0.7;
         }

        if(scene.model.children[i].material.opacity == 0.7){
          puntuacion++;
          scene.model.children[i].material.opacity = 0.2;
        

         }

      }
    }

  }
}

function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 65) { //A
        zMazo += 3.5;
    } else if (keyCode == 83) { //S
        zMazo -= 3.5;
    } 

    //else if (keyCode == 17) { //Ctrl
      //  scene.getCameraControls().enabled = true;
    //}
     else if (keyCode == 70){
      window.alert("Pulsa A para mover el mazo hacia tí\n\n Pulsa S para mover el mazo hacia delante");
    }


    /* else if (keyCode == 81) { //Q
        xMazo += 3.5;
    } else if (keyCode == 87) { //W
        xMazo -= 3.5;
    } else if (keyCode == 90) { //Z
        yMazo += 3.5;
    } else if (keyCode == 88) { //X
        yMazo -= 3.5;
    }  */


    scene.mazo.position.z = zMazo;
  //  scene.mazo.position.x = xMazo;
    //scene.mazo.position.y = yMazo;
}


function onMouseMove( event ){
  // Update the mouse variable
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;


  var vector = new THREE.Vector3(mouse.x, mouse.y, zMazo);
  vector.unproject( scene.camera );
  var dir = vector.sub( scene.camera.position ).normalize();
  var distance = - scene.camera.position.z / dir.z;
  var pos = scene.camera.position.clone().add( dir.multiplyScalar( distance ) );
  pos.z = zMazo;
  scene.mazo.position.copy(pos);

}

function onMouseClick( event ){
  event.preventDefault();
  if(posMazo){
    scene.mazo.setRotacion(true);
    posMazo = false;
  }

  else{
    scene.mazo.setRotacion(false);
    posMazo = true;
  }
    
}




function onMouseDown( event ) {
  if (event.ctrlKey) {
  // The Trackballcontrol only works if Ctrl key is pressed
  scene.getCameraControls().enabled = true;

  }

  else{
    scene.getCameraControls().enabled = false;

  }
}

function golpeado(){
  puntuacion++;
}

/// It creates and configures the WebGL renderer
/**
 * @return The renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;
}
/// It renders every frame
function render() {
  requestAnimationFrame(render);

  stats.update();
  scene.getCameraControls().update ();
  scene.animate(GUIcontrols);
  // scene.animar();
  TWEEN.update();
  contarTopos ();

  renderer.render(scene, scene.getCamera());
}



/// The main function
$(function () {
  // create a render and set the size
  renderer = createRenderer();


  // add the output of the renderer to the html element
  $("#WebGL-output").append(renderer.domElement);
  // liseners
  
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mousemove", onMouseMove, true);
  document.addEventListener("keydown", onDocumentKeyDown, false);
  window.addEventListener ("click", onMouseClick, true);
  // window.addEventListener ("mouseup", onMouseUp, true);
  // window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  // window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
  createGUI(true);

  render();
});
