
class MyScene extends THREE.Scene {
  
  constructor (myCanvas) { 
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se crea la interfaz gráfica de usuario
    this.gui = this.createGUI ();
    
    //creamos la luz
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Un suelo 
    this.createGround ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    //creamos los topos

       
    this.topo1 = new Topo(this.gui, "Controles del topo 1", 33, 5, -10);
    this.add (this.topo1);

 	this.topo2 = new Topo(this.gui, "Controles del topo 2", 1, 5, -10);
    this.add (this.topo2);

    this.topo3 = new Topo(this.gui, "Controles del topo 3", -33, 5, -10);
    this.add (this.topo3);

    this.positionx =null;
	this.positiony =null;
	this.positionz =null;

	this.selectbox = new THREE.Mesh (
    new THREE.CubeGeometry (5,10,3),
    new THREE.MeshPhongMaterial({color:0x000000}));



 /*

    this.topo1 = new Topo(this.gui, "Controles del topo 1", 33, 5, -10);
 	this.topo2 = new Topo(this.gui, "Controles del topo 2", 1, 5, -10);
    this.topo3 = new Topo(this.gui, "Controles del topo 3", -33, 5, -10);

    this.group = new THREE.Group();

    this.group.add(this.topo1);
    this.group.add(this.topo2);
    this.group.add(this.topo3);

    this.add(this.group);

   




    this.topo1 = new Topo(this.gui, "Controles del topo 1", 33, 5, -10);
 	this.topo2 = new Topo(this.gui, "Controles del topo 2", 1, 5, -10);
    this.topo3 = new Topo(this.gui, "Controles del topo 3", -33, 5, -10);

    this.topos = [];

    this.topos.push(this.topo1);
    this.topos.push(this.topo2);
    this.topos.push(this.topo3);

    this.add(this.topos);

     */



    //para registrar el ratón
 	this.mouse = new THREE.Vector2();
 	this.raycaster = new THREE.Raycaster();

    

  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión vértical en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (6, 3, 6);
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
    
    // La geometría es una caja con poca altura y 5 agujeros
    var cilindro1 = new THREE.CylinderGeometry(5,5,12,20);
    var cilindro2 = new THREE.CylinderGeometry(5,5,12,20);
    var cilindro3 = new THREE.CylinderGeometry(5,5,12,20);
    var cilindro4 = new THREE.CylinderGeometry(5,5,12,20);
    var cilindro5 = new THREE.CylinderGeometry(5,5,12,20);

    var geometryGround = new THREE.BoxGeometry (100,12,50);

    cilindro1.translate(-35,0.2,-11);
    cilindro2.translate(-1,0.2,-11);
    cilindro3.translate(33,0.2,-11);
    cilindro4.translate(-18,0.2,11);
    cilindro5.translate(17,0.2,11);

    var geometryGroundBSP = new ThreeBSP(geometryGround);
    var cilindroBSP1 = new ThreeBSP(cilindro1);
    var cilindroBSP2 = new ThreeBSP(cilindro2);
    var cilindroBSP3 = new ThreeBSP(cilindro3);
    var cilindroBSP4 = new ThreeBSP(cilindro4);
    var cilindroBSP5 = new ThreeBSP(cilindro5);

    var finalGeometryGround = geometryGroundBSP.subtract(cilindroBSP1);
    var finalGeometryGround2 = finalGeometryGround.subtract(cilindroBSP2);
    var finalGeometryGround3 = finalGeometryGround2.subtract(cilindroBSP3);
    var finalGeometryGround4 = finalGeometryGround3.subtract(cilindroBSP4);
    var finalGeometryGround5 = finalGeometryGround4.subtract(cilindroBSP5);

    
    // El material se hará con una textura de madera
    var materialGround = new THREE.MeshPhongMaterial ({color: 0x9BE3E4});
    
    // Ya se puede construir el Mesh
    var ground = finalGeometryGround5.toMesh(materialGround);
    ground.geometry.computeFaceNormals();
    ground.geometry.computeVertexNormals();


    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
   var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
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

  pulsarTopo (){

	this.raycaster.setFromCamera( this.mouse, this.camera );

	this.topos = [];

    this.topos.push(this.topo1);
    this.topos.push(this.topo2);
    this.topos.push(this.topo3);

	const intersects = this.raycaster.intersectObjects( this.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[i].object.material.color.set( 0x000000 );

	}

  }

  resetMaterials(){

  	for (let i = 0; i < this.children.length; i ++){
  		if(this.children[i].material){
  		   this.children[i].material.opacity = 0.5;
  		}

  	}



  }

  update () {
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.camera);

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();


    this.resetMaterials();
  	this.pulsarTopo();
   
   this.topo1.update(this.guiControls.flatShading);
    this.topo2.update(this.guiControls.flatShading);
    this.topo3.update(this.guiControls.flatShading);



    /*
	
	for ( let i = 0; i < this.group.children.length; i ++ ) {

		group.children[i].update(this.guiControls.flatShading);

	}

	

	for ( let i = 0; i < this.topos.length; i ++ ) {

		this.topos[i].update(this.guiControls.flatShading);

	}

	*/

    
   
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
  }

   setSlectBox(x,y,z){
    this.selectbox.position.x=x;
    this.selectbox.position.y=y;
    this.selectbox.position.z=z;
  }

   onMouseMove( event ) {

	    event.preventDefault();
	    var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,
	                            -( event.clientY / window.innerHeight ) * 2 + 1,
	                            0.5 );
	    var raycaster =  new THREE.Raycaster();
	    raycaster.setFromCamera( mouse3D, this.getCamera() );

	    this.topos = [];

	    this.topos.push(this.topo1);
	    this.topos.push(this.topo2);
	    this.topos.push(this.topo3);

	    var objects = [this.children];
	    var intersects = raycaster.intersectObjects( objects,true );

	    this.positionx=Math.round(intersects[0].object.position.x);
	    this.positiony=Math.round(intersects[0].object.position.y);
	    this.positionz=Math.round(intersects[0].object.position.z);

	    this.setSlectBox(this.positionx,this.positiony,this.positionz);

	 
	}

}


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

 // window.addEventListener( "mousemove", () => scene.onMouseMove, true );
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
