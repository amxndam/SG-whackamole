 
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

    //Creamos los cubos
    this.createCubes();

    //Creamos las esferas
    this.createSpheres();

    //Creamos la textura del vídeo
    this.createVideo();

    
  }

  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (20, 7, 20);
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
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    this.ground = new THREE.Mesh (geometryGround, materialGround);

    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    this.ground.position.y = -0.1;
    
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

    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    var that = this;
   
    
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

    this.directionalLight = new THREE.DirectionalLight(0xccddee,1);
    this.directionalLight.position.set(40,40,40);
    this.add(this.directionalLight);
    

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

  createCubes(){
    
    var geometry1 = new THREE.BoxGeometry(1,1,1);

    var geometry2 = new THREE.BoxGeometry(1,1,1);
    var geometry3 = new THREE.BoxGeometry(1,1,1);
    var geometry4 = new THREE.BoxGeometry(1,1,1);

    var texture1 = new THREE.TextureLoader().load("../imgs/ladrillo-difuso.png");
    var texture2bump = new THREE.TextureLoader().load("../imgs/ladrillo-bump.png");
    var texture2difuse = new THREE.TextureLoader().load("../imgs/ladrillo-difuso.png");

    //Creamos el 3
    var textureInt = new THREE.TextureLoader().load("../imgs/ladrillo-difuso.png");
    var textureExt = new THREE.TextureLoader().load("../imgs/textura-ajedrezada.jpg");

    var materialExt = new THREE.MeshPhongMaterial({map:textureInt});

    materialExt.alphaMap = textureExt;
    materialExt.transparent = true;
    materialExt.side = THREE.FrontSide;

    var materialInt = materialExt.clone(); 
    materialInt.side = THREE.BackSide; 

    this.mesh3 = new THREE.SceneUtils.createMultiMaterialObject(geometry3,[materialInt, materialExt]);


     //Creamos el 4
 
     var materialExt2 = new THREE.MeshPhongMaterial({map:textureInt, bumpMap: texture2bump});
 
     materialExt2.alphaMap = textureExt;
     materialExt2.transparent = true;
     materialExt2.side = THREE.FrontSide;
 
     var materialInt2 = materialExt2.clone(); 
     materialInt2.side = THREE.BackSide; 
 
     this.mesh4 = new THREE.SceneUtils.createMultiMaterialObject(geometry4,[materialInt2, materialExt2]);


    var material1 = new THREE.MeshPhongMaterial ({map: texture1});
    var material2 = new THREE.MeshPhongMaterial ({map: texture2difuse, bumpMap: texture2bump});

    this.mesh1 = new THREE.Mesh(geometry1,material1);
    this.mesh2 = new THREE.Mesh(geometry2,material2);

    this.mesh1.position.set(-1,0.5,1);
    this.mesh2.position.set(-3,0.5,3);
    this.mesh3.position.set(1,0.5,-1);
    this.mesh4.position.set(3,0.5,-3);

    this.add(this.mesh1);
    this.add(this.mesh2);
    this.add(this.mesh3);
    this.add(this.mesh4);


  }

  createSpheres(){
    var sphere1Geometry = new THREE.SphereGeometry(0.5,32,32);
    var sphere2Geometry = new THREE.SphereGeometry(0.5,32,32);
    var sphere3Geometry = new THREE.SphereGeometry(0.5,32,32);
    var sphere4Geometry = new THREE.SphereGeometry(0.5,32,32);

    var sphere1Material = new THREE.MeshLambertMaterial({color:0xffff00});
    var sphere2Material = new THREE.MeshPhongMaterial({color:0xffff00, shininess: 50});

    //Esfera 3
    var sphere3Texture = new THREE.TextureLoader().load("../imgs/marmol-blanco.jpg");
    var sphere3Material = new THREE.MeshPhongMaterial({map: sphere3Texture});

    //Esfera 4
    var sphere4Texture = new THREE.TextureLoader().load("../imgs/marmol-blanco.jpg");
    var sphere4Material = new THREE.MeshPhongMaterial({map: sphere4Texture, color: 0Xffff00});

    this.sphere1Mesh = new THREE.Mesh(sphere1Geometry, sphere1Material);
    this.sphere2Mesh = new THREE.Mesh(sphere2Geometry, sphere2Material);
    this.sphere3Mesh = new THREE.Mesh(sphere3Geometry, sphere3Material);
    this.sphere4Mesh = new THREE.Mesh(sphere4Geometry, sphere4Material);

    this.sphere1Mesh.position.set(-2,2,2);
    this.sphere2Mesh.position.set(-4,2,4);
    this.sphere3Mesh.position.set(2,2,-2);
    this.sphere4Mesh.position.set(4,2,-4);

    this.add(this.sphere1Mesh);
    this.add(this.sphere2Mesh);
    this.add(this.sphere3Mesh);
    this.add(this.sphere4Mesh);
  }

  createVideo(){
    var videoGeometry = new THREE.BoxGeometry(2,2,0.3);

    var video = document.getElementById("video");
    var videoTexture = new THREE.VideoTexture(video);
    videoTexture.generateMipmaps = false;
    videoTexture.minFilter = THREE.LinearFilter;

    var videoMaterial = new THREE.MeshLambertMaterial({map:videoTexture});

    this.videoMesh = new THREE.Mesh(videoGeometry,videoMaterial);

    this.videoMesh.rotation.y = Math.PI/4;
    this.videoMesh.position.set(0,3,0);

    this.add(this.videoMesh);
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
