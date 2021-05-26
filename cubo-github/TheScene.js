
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

    this.rubik = null;

    this.selectbox=null;

    this.trackballControls=null;

    this.createLights ();
    this.createCamera (renderer);

    this.model = this.createModel ();
    this.add (this.model);
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
    this.trackballControls.minDistance = 100;
    this.trackballControls.maxDistance = 300;
    this.trackballControls.target = look;

    this.add(this.camera);
  }

  /// It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    //comentar para quitar luz ambiental
    this.add (this.ambientLight);
  }

  /// It creates the geometric model: crane and ground
  /**
   * @return The model
   */
  createModel () {
    var model = new THREE.Object3D();
    var loader = new THREE.TextureLoader();
    var textura;

    //Skybox
  var materialArray = [];

  for (var i = 0; i < 6; i++){
    materialArray.push( new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture( "imgs/sky.jpg" ),
    side: THREE.BackSide
  }));}

  var skyGeometry = new THREE.CubeGeometry( 400, 400, 400 );
  var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
  var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );

  skyBox.rotation.x += Math.PI / 2;

  model.add( skyBox );

    this.rubik = new Rubik ();
    model.add (this.rubik);

    this.selectbox = new THREE.Mesh (
    new THREE.BoxGeometry (10.5,10.5,10.5, 1, 1, 1),
    new THREE.MeshPhongMaterial({color:0x00FFFF,specular:0x00FFFF,shininess:70,transparent:true,opacity:0.5}));
    model.add(this.selectbox);

    return model;
  }

  /// It sets the crane position according to the GUI
  /**
   * @controls - The GUI information
   */
  animate (controls) {
  }

  setSlectBox(x,y,z){
    this.selectbox.position.x=x;
    this.selectbox.position.y=y;
    this.selectbox.position.z=z;
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
