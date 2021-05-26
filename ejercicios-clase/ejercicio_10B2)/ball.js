class ball extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      /*Creamos y añadimos a la escena el cilindro*/
      var cylinderGeometry = new THREE.CylinderGeometry(1,1,3,32);
      var cylinderMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});

      this.cylinderMesh = new THREE.Mesh(cylinderGeometry,cylinderMaterial);
      this.cylinderMesh.position.y = 1.5;

      this.add(this.cylinderMesh);

      /*Creamos y añadimos a la escena la esfera*/
      var sphereGeometry = new THREE.SphereGeometry(0.5,32,32);
      var sphereMaterial = new THREE.MeshNormalMaterial();

      this.sphereMesh = new THREE.Mesh(sphereGeometry,sphereMaterial);
      this.ballFather = new THREE.Object3D();

      this.sphereMesh.position.z = 1.5;

      this.ballFather.add(this.sphereMesh);
      this.add(this.ballFather);


    }

    createGUI(gui){
      this.guiControls = new function(){
        this.radius = 1;
        this.maxiumHeight = false;
        this.minimumHeight = false;
        this.currentHeight = 0;
      }

      var that = this;

      var folder = gui.addFolder("Tamaño cilindro");

      folder.add(this.guiControls,"radius",1,5,1).name("Radio").onChange(function(value){that.changeRadius()});
    }

    changeRadius(){
      var newCylinderGeometry = new THREE.CylinderGeometry(this.guiControls.radius,this.guiControls.radius,3,32);
      this.cylinderMesh.geometry = newCylinderGeometry;
    }

    update () {
       this.ballFather.rotation.y += 0.025; 
       this.sphereMesh.position.z = 0.5+this.guiControls.radius;

       if(this.guiControls.maxiumHeight == false){
         this.guiControls.currentHeight += 0.005;
         this.sphereMesh.position.y += 0.005;

         if(this.guiControls.currentHeight >= 3){
           this.guiControls.maxiumHeight = true;
           this.guiControls.minimumHeight = false;
         }
       }

       else if(this.guiControls.minimumHeight == false){
          this.guiControls.currentHeight -= 0.005;
          this.sphereMesh.position.y -= 0.005;

          if(this.guiControls.currentHeight <= 0){
            this.guiControls.maxiumHeight = false;
            this.guiControls.minimumHeight = true;
          }
       }
    }

  }