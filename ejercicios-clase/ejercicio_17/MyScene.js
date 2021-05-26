 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  // Recibe el  div  que se ha creado en el  html  que va a ser el lienzo en el que mostrar
  // la visualización de la escena
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Un suelo 
    this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    ////Creamos el cilindro
    var cylinderGeometry = new THREE.CylinderGeometry(0.1,0.1,3,8);
    var cylinderMaterial = new THREE.MeshBasicMaterial({color:0xff0000});

    this.cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);

    this.cylinderMesh.rotation.x = Math.PI/2;
    this.cylinderMesh.position.set(-10,-10,0);

    this.add(this.cylinderMesh)
    
  }

  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 40);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (20,0,20);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/abeja.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    this.ground = new THREE.Mesh (geometryGround, materialGround);

    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground.rotation.x = -Math.PI/2;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (this.ground);


  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.image = "abeja";
      this.repeatS = 1;
      this.repeatT = 1;
      this.wrapS = "ClampToEdgeWrapping";
      this.wrapT = "ClampToEdgeWrapping";
      this.rotation = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.centerX = 0;
      this.centerY = 0;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    var that = this;
    
    folder.add(this.guiControls,"image", {abeja: "abeja", ajedrez: "ajedrez"}).name("Imagen").onChange(function(value) {that.changeImage(that.guiControls.image)});
    folder.add(this.guiControls,"repeatS",1,10,1).name("Repite S").onChange(function(value){that.changeRepetition(that.guiControls.repeatS, that.guiControls.repeatT)});
    folder.add(this.guiControls,"repeatT",1,10,1).name("Repite T").onChange(function(value){that.changeRepetition(that.guiControls.repeatS, that.guiControls.repeatT)});
    folder.add(this.guiControls,"wrapS",{ClampToEdgeWrapping:"ClampToEdgeWrapping", MirroredRepeatWraping: "MirroredRepeatWrapping", RepeatWrapping: "RepeatWrapping"})
    .name("Wrap S").onChange(function(value){that.changeWrapS()});

    folder.add(this.guiControls,"wrapT",{ClampToEdgeWrapping:"ClampToEdgeWrapping", MirroredRepeatWrapping: "MirroredRepeatWrapping", RepeatWrapping: "RepeatWrapping"})
    .name("Wrap T").onChange(function(value){that.changeWrapT()});


    folder.add(this.guiControls,"centerX", 0,1,0.25).name("Center X").onChange(function(value){that.changeCenter()});
    folder.add(this.guiControls,"centerY", 0,1,0.25).name("Center Y").onChange(function(value){that.changeCenter()});
    folder.add(this.guiControls,"offsetX", 0,3,0.1).name("Offset X");
    folder.add(this.guiControls,"offsetY", 0,3,0.1).name("Offset Y");
    folder.add(this.guiControls,"rotation",0,2*Math.PI,0.1).name("Rotación");
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.7);
    // La añadimos a la escena
    this.add (this.ambientLight);

  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
    
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  changeImage(image){
    if(image == "abeja"){
      var newTexture = new THREE.TextureLoader().load('../imgs/abeja.jpg');
    }

    else{
      var newTexture= new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
    }

    var newMaterial = new THREE.MeshPhongMaterial({map: newTexture});

    this.ground.material = newMaterial;
  }

  changeRepetition(repeatS, repeatT){
    this.ground.material.map.repeat.set(repeatS,repeatT);
  }

  changeWrapS(){
    this.ground.material.map.needsUpdate = true;

    if(this.guiControls.wrapS == "ClampToEdgeWrapping"){
      this.ground.material.map.wrapS = THREE.ClampToEdgeWrapping;
    }

    else if(this.guiControls.wrapS == "MirroredRepeatWrapping"){
      this.ground.material.map.wrapS = THREE.MirroredRepeatWrapping;
    } 

    else{
      this.ground.material.map.wrapS = THREE.RepeatWrapping;
    }
  }

  changeWrapT(){
    this.ground.material.map.needsUpdate = true;

    if(this.guiControls.wrapT == "ClampToEdgeWrapping"){
      this.ground.material.map.wrapT = THREE.ClampToEdgeWrapping;
    }

    else if(this.guiControls.wrapT == "MirroredRepeatWrapping"){
      this.ground.material.map.wrapT = THREE.MirroredRepeatWrapping;
    } 

    else{
      this.ground.material.map.wrapT = THREE.RepeatWrapping;
    }
  }

  changeCenter(){
    this.ground.material.map.center.set(this.guiControls.centerX, this.guiControls.centerY);
    this.cylinderMesh.position.x = (this.guiControls.centerX*20)-10;
    this.cylinderMesh.position.y = (this.guiControls.centerY*20)-10;
  }

  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    //Actualizamos la raotación
    this.ground.material.map.rotation = this.guiControls.rotation;

    //Actualizamos el offset
    this.ground.material.map.offset.set(this.guiControls.offsetX, this.guiControls.offsetY);
  }

 
}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
