var puntuacion = 0;         //número de golpes acertados
var mouse = {x: 0, y: 0};   //vector con dos coordenadas del ratón
var zMazo = 0;              //posición del mazo
var posMazo = true;         //booleano para subir y bajar el mazo
scene = null;               //Escena a nula


/// Función para adaptarse a los cambios de tamaño de pantalla
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

//Función para contabilizar el número de golpes acertados
function contarTopos (){
 
  if(!posMazo){   //si el mazo ha dado un golpe
 
    for(var i = 0; i< 5; i++ ){  //para cada uno de los 5 topos
      //se comprueba si el mazo muy cerca del topo
      if(scene.cerca(i, scene.mazo.position.x - 10, scene.mazo.position.y + 10, scene.mazo.position.z)){
        //es el caso de que sí, se cambia su opacidad
        if(scene.model.children[i].material.transparent == false && scene.posicionAdecuada(i)){
          scene.model.children[i].material.transparent = true;
          scene.model.children[i].material.opacity = 0.7;
         }

        //y con se añade el punto
        if(scene.model.children[i].material.opacity == 0.7){
          puntuacion++;
          scene.model.children[i].material.opacity = 0.2;

         }

      }
    }

  }
}

//Función para añadir funciones a los eventos de las teclas
function onDocumentKeyDown(event) {

    var keyCode = event.which;

    //Con la A, se mueve el mazo hace delante en el eje z
    if (keyCode == 65) { 
        zMazo += 3.5;
    } 

    //Con la S, se mueve el mazo hace atrás en el eje z
    else if (keyCode == 83) { 
        zMazo -= 3.5;
    } 

    //Con la F, se muestra una alerta con las instrucciones de uso
     else if (keyCode == 70){
      window.alert("Pulsa A para mover el mazo hacia tí\n\n Pulsa S para mover el mazo hacia delante");
    }

    //se el nuevo valor de la posición z al mazo
    scene.mazo.position.z = zMazo;
}


//Añadir funciones a los eventos del movimiento del ratón
function onMouseMove( event ){

  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;


  var vector3D = new THREE.Vector3(mouse.x, mouse.y, zMazo);
  vector3D.unproject( scene.camera );
  var positionCam = vector3D.sub( scene.camera.position ).normalize();
  var distancia = - scene.camera.position.z / positionCam.z;
  var pos = scene.camera.position.clone().add( positionCam.multiplyScalar( distancia ) );
  pos.z = zMazo;
  scene.mazo.position.copy(pos);

}

//Función para mover el mazo al hacer click
function onMouseClick( event ){
  event.preventDefault();

  //si el mazo está arriba, se baja
  if(posMazo){
    scene.mazo.setRotacion(true);
    posMazo = false;
  }

  //al contrario
  else{
    scene.mazo.setRotacion(false);
    posMazo = true;
  }
    
}


//Función para conseguir que las cámaras se muevan sólo con la tecla ctrl
function onMouseDown( event ) {
  if (event.ctrlKey)
    scene.getCameraControls().enabled = true;

  else
    scene.getCameraControls().enabled = false;

}


/// Crea el renderer
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000), 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  return renderer;
}

/// Renderiza frame a frame
function render() {
  requestAnimationFrame(render);
  scene.getCameraControls().update ();
  scene.animate();
  contarTopos ();

  renderer.render(scene, scene.getCamera());
}



//Main
$(function () {

  renderer = createRenderer();

  $("#WebGL-output").append(renderer.domElement);

  //Se declaran los listeners
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener ("mousemove", onMouseMove, true);
  document.addEventListener("keydown", onDocumentKeyDown, false);
  window.addEventListener ("click", onMouseClick, true);

  scene = new MyScene (renderer.domElement);
  render();

});
