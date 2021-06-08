function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
} 

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

    this.topos = [];

    this.selectbox=null;

    this.trackballControls=null;

    this.createLights ();
    this.createCamera (renderer);

    // Un suelo 
    this.createGround ();

    this.model = this.createModel ();
    this.add (this.model);

    this.ran = Math.round(Math.random()*5);


  }

  /// It creates the camera and adds it to the graph
  /**
   * @param renderer - The renderer associated with the camera
   */
  createCamera (renderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (60, 30, 60);
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);

    this.trackballControls = new THREE.TrackballControls (this.camera, renderer);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
   // this.trackballControls.minDistance = 100;
   // this.trackballControls.maxDistance = 300;
   // this.trackballControls.target = look;

    this.add(this.camera);
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
    var materialGround = new THREE.MeshBasicMaterial ( { color: 0xd3f5dc, map: new  THREE.TextureLoader().load('../imgs/wood.jpg') } );
 
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
  }

  /// It creates the geometric model: crane and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D();


    this.topo1 = new Topo(this.gui, "Controles del topo 1", 33, 0, -10);
    this.add(this.topo1);
    model.add(this.topo1);

    this.topo2 = new Topo(this.gui, "Controles del topo 2", 1, 0, -10);
    this.add (this.topo2);
    model.add(this.topo2);

    this.topo3 = new Topo(this.gui, "Controles del topo 3", -33, 0, -10);
    this.add (this.topo3);
    model.add(this.topo3);

    this.topo4 = new Topo(this.gui, "Controles del topo 3", -16, 0, 11);
    this.add (this.topo4);
    model.add(this.topo4);

    this.topo5 = new Topo(this.gui, "Controles del topo 3", 16, 0, 11);
    this.add (this.topo5);
    model.add(this.topo5);


    return model;
  }


  randomTopo(){

    this.ran = Math.round(Math.random()*4);

  }


  /// It sets the crane position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate () {

    console.log(this.ran.toString());

    if(this.model.children[this.ran].getPositionY() >= -1){
       this.model.children[this.ran].update();
    }


    else{
      this.model.children[this.ran].material.opacity = 1.0;
      this.model.children[this.ran].material.transparent = false;
      this.model.children[this.ran].setPositionY(-0.6);

      this.randomTopo();
    }

  }



  /// It returns the camera
  /**
   * @return The camera
   */
  getCamera () {
    return this.camera;
  }

  /// It returns the camera controls
  /**
   * @return The camera controls
   */
  getCameraControls () {
    return this.trackballControls;
  }

  /// It updates the aspect ratio of the camera
  /**
   * @param anAspectRatio - The new aspect ratio for the camera
   */
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
    }


