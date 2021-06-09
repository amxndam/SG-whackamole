

/// The Model Facade class. The root node of the graph.
/**
 * @param renderer - The renderer to visualize the scene
 */
class TheScene extends THREE.Scene {

  constructor (renderer) {
    super();


    // Attributes

    this.ambientLight = null;

    this.camera = null;
    this.trackballControls = null;

    //  this.cube = null;
    this.topo1 = null;
    this.topo2 = null;
    this.topo3 = null;
    this.topo4 = null;
    this.topo5 = null;

    this.createFondoNubes();
    this.createFondoHierba();

    this.mazo = new Mazo(this.gui, "Controles del topo 2", 1, 20, -10);
    this.add (this.mazo);

    this.createLights ();
    this.createCamera (renderer);

    // Un suelo 
    this.createGround ();
    this.createAnillos ();

    this.model = this.createModel ();
    this.add (this.model);

    this.ran = Math.floor(Math.random() * (5));


  }

  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (12, 25, 140);
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);

    this.trackballControls = new THREE.TrackballControls (this.camera, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;

    this.trackballControls.enabled = false;
    this.add(this.camera);
  }

  createAnillos (){
    //Anillos

    //Geometrías
    this.anillo1Geometry = new THREE.TorusGeometry(5,1.7,10,25);
    this.anillo1Geometry.translate(-34,-10,-6.3);
    this.anillo1Geometry.rotateX(1.54);

    this.anillo2Geometry = new THREE.TorusGeometry(5,1.7,10,25);
    this.anillo2Geometry.translate(0.9,-10,-6.3);
    this.anillo2Geometry.rotateX(1.58);

    this.anillo3Geometry = new THREE.TorusGeometry(5,1.7,10,25);
    this.anillo3Geometry.translate(33,-10,-6.3);
    this.anillo3Geometry.rotateX(1.54);

    this.anillo4Geometry = new THREE.TorusGeometry(5,1.7,10,25);
    this.anillo4Geometry.translate(16,10,-6.3);
    this.anillo4Geometry.rotateX(1.58);

    this.anillo5Geometry = new THREE.TorusGeometry(5,1.7,10,25);
    this.anillo5Geometry.translate(-17,10,-6.3);
    this.anillo5Geometry.rotateX(1.58);


    //Materiales
    this.anillo1Material = new THREE.MeshStandardMaterial({color: 0x804000});
    this.anillo2Material = new THREE.MeshStandardMaterial({color: 0x804000});
    this.anillo3Material = new THREE.MeshStandardMaterial({color: 0x804000});
    this.anillo4Material = new THREE.MeshStandardMaterial({color: 0x804000});
    this.anillo5Material = new THREE.MeshStandardMaterial({color: 0x804000});

    //Mesh
    this.anillo1 = new THREE.Mesh(this.anillo1Geometry, this.anillo1Material);
    this.anillo2 = new THREE.Mesh(this.anillo2Geometry, this.anillo2Material);
    this.anillo3 = new THREE.Mesh(this.anillo3Geometry, this.anillo3Material);
    this.anillo4 = new THREE.Mesh(this.anillo4Geometry, this.anillo4Material);
    this.anillo5 = new THREE.Mesh(this.anillo5Geometry, this.anillo5Material);


    this.add(this.anillo1);
    this.add(this.anillo2);
    this.add(this.anillo3);
    this.add(this.anillo4);
    this.add(this.anillo5);



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

    
    // El material
    var materialGround = new THREE.MeshBasicMaterial ( { color: 0xd3f5dc, map: new  THREE.TextureLoader().load('./imgs/wood.jpg') } );
 
    materialGround.transparency = true;
    materialGround.opacity = 0.5;

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


  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    //comentar para quitar luz ambiental
    this.add (this.ambientLight);

    this.spotLight = new THREE.SpotLight( 0xffffff );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);

  
    this.spotLight1 = new THREE.SpotLight( 0x0eb34e5 );
    this.spotLight1.position.set( -100,-10,-6.3 );
    this.add (this.spotLight1);

    this.spotLight2 = new THREE.SpotLight( 0xeb8934 );
    this.spotLight2.position.set( 0.9,-10,-6.3 );
    this.add (this.spotLight1);
  }

  //Crea el fondo de las nubes
  createFondoNubes(){
    var fondoGeometry = new THREE.BoxGeometry(190,150,1);
    var fondoTexture = new  THREE.TextureLoader().load('./imgs/skyOrange.png')
    var fondoMaterial = new THREE.MeshLambertMaterial({map:fondoTexture});

    this.fondoMesh1 = new THREE.Mesh(fondoGeometry,fondoMaterial);
    this.fondoMesh2 = new THREE.Mesh(fondoGeometry,fondoMaterial);
    this.fondoMesh3 = new THREE.Mesh(fondoGeometry,fondoMaterial);
    
    this.fondoMesh1.position.set(0,25,-80);
   this.add(this.fondoMesh1);

    this.fondoMesh2.rotation.y = 80;
    this.fondoMesh2.position.set(-105,25,15);
    this.add(this.fondoMesh2);

    this.fondoMesh3.rotation.y = -80;
    this.fondoMesh3.position.set(105,25,15);
   this.add(this.fondoMesh3);
  }

  //Crea el fondo de la hierba
  createFondoHierba(){
    var fondoGeometry = new THREE.BoxGeometry(300,280,1);
    var fondoTexture = new  THREE.TextureLoader().load('./imgs/hierba.jpg')
    var fondoMaterial = new THREE.MeshLambertMaterial({map:fondoTexture});

    this.fondoMesh1 = new THREE.Mesh(fondoGeometry,fondoMaterial);
    this.fondoMesh1.rotation.x = -7.9;
    this.fondoMesh1.position.set(0,-5,0);
   this.add(this.fondoMesh1);


  }


  /// Crea un modelo
  createModel () {
    var model = new THREE.Object3D();


    this.topo1 = new TopoPrueba(this.gui, "Controles del topo 1", 33, 0, -10);
    this.add(this.topo1);
    model.add(this.topo1);

    this.topo2 = new TopoPrueba(this.gui, "Controles del topo 2", 1, 0, -10);
    this.add (this.topo2);
    model.add(this.topo2);

    this.topo3 = new TopoPrueba(this.gui, "Controles del topo 3", -33, 0, -10);
    this.add (this.topo3);
    model.add(this.topo3);

    this.topo4 = new TopoPrueba(this.gui, "Controles del topo 3", -16, 0, 11);
    this.add (this.topo4);
    model.add(this.topo4);

    this.topo5 = new TopoPrueba(this.gui, "Controles del topo 3", 16, 0, 11);
    this.add (this.topo5);
    model.add(this.topo5);

    return model;
  }


  randomTopo(){
    this.ran = Math.floor(Math.random() * (5));
  }


  cerca(i, dx, dy, dz){
    if(i == 0)
     return this.topo1.posicionCerca(dx, dy, dz);

    else if(i == 1)
      return this.topo2.posicionCerca(dx, dy, dz);

    else if(i == 2)
     return  this.topo3.posicionCerca(dx, dy, dz);

    else if(i == 3)
     return this.topo4.posicionCerca(dx, dy, dz);

    else if(i == 4)
     return this.topo5.posicionCerca(dx, dy, dz);
  }


  posicionAdecuada(i){

    if(i == 0)
     return this.topo1.posicionIdeal();

    else if(i == 1)
      return this.topo2.posicionIdeal();

    else if(i == 2)
     return  this.topo3.posicionIdeal();

    else if(i == 3)
     return this.topo4.posicionIdeal();

    else if(i == 4)
     return this.topo5.posicionIdeal();

  }


  /// Se actualiza en cada frame y sirve para la animación
  animate () {

    this.mazo.update();
    var ranAux = this.ran;

    if(ranAux == 0){
      if(this.topo1.posicionCorrecta()){
       this.topo1.update();
      }
      else{
        this.topo1.material.opacity = 1.0;
        this.topo1.material.transparent = false;
        this.topo1.ponerPosicionAdecuada();
        this.randomTopo();
      }
    }

    else if(ranAux == 1){
      if(this.topo2.posicionCorrecta()){
       this.topo2.update();
      }
      else{
        this.topo2.material.opacity = 1.0;
        this.topo2.material.transparent = false;
        this.topo2.ponerPosicionAdecuada();
        this.randomTopo();
      }
    }

    else if(ranAux == 2){
     if(this.topo3.posicionCorrecta()){
       this.topo3.update();
      }
      else{
        this.topo3.material.opacity = 1.0;
        this.topo3.material.transparent = false;
        this.topo3.ponerPosicionAdecuada();
        this.randomTopo();
      }
    }

    else if(ranAux == 3){
     if(this.topo4.posicionCorrecta()){
       this.topo4.update();
      }
      else{
        this.topo4.material.opacity = 1.0;
        this.topo4.material.transparent = false;
        this.topo4.ponerPosicionAdecuada();
        this.randomTopo();
      }
    }

    else if(ranAux == 4){
     if(this.topo5.posicionCorrecta()){
       this.topo5.update();
      }
      else{
        this.topo5.material.opacity = 1.0;
        this.topo5.material.transparent = false;
        this.topo5.ponerPosicionAdecuada();
        this.randomTopo();
      }
    }

  }


  /// Devuelve la cámara
  getCamera () {
    return this.camera;
  }

  /// Conseguir los controles de la cámara
  getCameraControls () {
    return this.trackballControls;
  }

  /// Actualiza el radio de la cámara
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
    }


