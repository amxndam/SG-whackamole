positionx =null;
positiony =null;
positionz =null;
/// Several functions, including the main

/// The scene graph
scene = null;

/// The GUI information
GUIcontrols = null;

/// The object for the statistics
stats = null;

/// A boolean to know if the left button of the mouse is down
mouseDown = false;

/// The current mode of the application
applicationMode = TheScene.NO_ACTION;

/// It creates the GUI and, optionally, adds statistic information
/**
 * @param withStats - A boolean to show the statictics or not
 */
function createGUI (withStats) {
  GUIcontrols = new function() {
    this.dificultad=0;

    this.MoverYDelante   = function () {
      // scene.MovY(positiony,positionx,positionz,0);
      scene.rubik.MovY(positiony,0);
    };
    this.MoverYDetras   = function () {
      // scene.MovY(positiony,positionx,positionz,1);
      scene.rubik.MovY(positiony,1);
    };
    this.MoverXDelante   = function () {
      // scene.MovX(positiony,positionx,positionz,0);
      scene.rubik.MovX(positionx,0);
    };
    this.MoverXDetras   = function () {
      // scene.MovX(positiony,positionx,positionz,1);
      scene.rubik.MovX(positionx,1);
    };
    this.MoverZDelante   = function () {
      // scene.MovZ(positiony,positionx,positionz,0);
      scene.rubik.MovZ(positionz,0);
    };
    this.MoverZDetras   = function () {
      // scene.MovZ(positiony,positionx,positionz,1);
      scene.rubik.MovZ(positionz,1);
    };
    this.Random   = function () {
      scene.rubik.Random(this.dificultad);
    };
    this.Reset3   = function () {
      scene.rubik.Reset3();
      scene.setSlectBox(0,0,0);
    };
    this.Reset2   = function () {
      scene.rubik.Reset2();
      scene.setSlectBox(0,0,0);
    };
    this.Reset4   = function () {
      scene.rubik.Reset4();
      scene.setSlectBox(0,0,0);
    };
    this.Dificultad   = function () {
      scene.rubik.Reset();
    };
  }

  var gui = new dat.GUI();


  var actions = gui.addFolder ('Actions');
    var MoverYDelante = actions.add(GUIcontrols, 'MoverYDelante').name (': Y Delante :');
    var MoverYDetras = actions.add(GUIcontrols, 'MoverYDetras').name (': Y Detras :');
    var MoverXDelante = actions.add(GUIcontrols, 'MoverXDelante').name (': X Delante :');
    var MoverXDetras = actions.add(GUIcontrols, 'MoverXDetras').name (': X Detras :');
    var MoverZDelante = actions.add(GUIcontrols, 'MoverZDelante').name (': Z Delante :');
    var MoverZDetras = actions.add(GUIcontrols, 'MoverZDetras').name (': Z Detras :');
    var Dificultad = actions.add (GUIcontrols, 'dificultad', 0, 10, 1).name(': Dificultad :').listen();
    var Random = actions.add(GUIcontrols, 'Random').name (': Random :');
    var Reset2 = actions.add(GUIcontrols, 'Reset2').name (': Cubo 2x2 :');
    var Reset3 = actions.add(GUIcontrols, 'Reset3').name (': Cubo 3x3 :');
    var Reset4 = actions.add(GUIcontrols, 'Reset4').name (': Cubo 4x4 :');


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

function onMouseDown( event ) {
  if (event.ctrlKey) {
  // The Trackballcontrol only works if Ctrl key is pressed
  scene.getCameraControls().enabled = true;
  }
  else {
    scene.getCameraControls().enabled = false;
    event.preventDefault();
    var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,
                            -( event.clientY / window.innerHeight ) * 2 + 1,
                            0.5 );
    var raycaster =  new THREE.Raycaster();
    raycaster.setFromCamera( mouse3D, scene.getCamera() );

    var objects = [scene.rubik.aux];
    var intersects = raycaster.intersectObjects( objects,true );

    positionx=Math.round(intersects[0].object.position.x);
    positiony=Math.round(intersects[0].object.position.y);
    positionz=Math.round(intersects[0].object.position.z);

    scene.setSlectBox(positionx,positiony,positionz);

  }
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
//se llama a solucion cada segundo
setInterval('scene.rubik.Solucion()',100);
/// It renders every frame
function render() {
  requestAnimationFrame(render);

  stats.update();
  scene.getCameraControls().update ();
  scene.animate(GUIcontrols);
  // scene.animar();
  TWEEN.update();

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
  // window.addEventListener ("mousemove", onMouseMove, true);
  window.addEventListener ("mousedown", onMouseDown, true);
  // window.addEventListener ("mouseup", onMouseUp, true);
  // window.addEventListener ("mousewheel", onMouseWheel, true);   // For Chrome an others
  // window.addEventListener ("DOMMouseScroll", onMouseWheel, true); // For Firefox

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  scene = new TheScene (renderer.domElement);
  createGUI(true);

  render();
});
