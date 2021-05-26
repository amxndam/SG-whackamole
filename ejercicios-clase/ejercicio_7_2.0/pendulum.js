class pendulum extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      //Group 1
      var boxUpperGroup1Geometry = new THREE.BoxGeometry(1,3,0.5);
      var boxUpperGroup1Material = new THREE.MeshPhongMaterial({color:0x00ff00});

      var boxMiddleGroup1Geometry = new THREE.BoxGeometry(1,5,0.5);
      var boxMiddleGroup1Material = new THREE.MeshPhongMaterial({color:0xff0000});

      var boxLowerGroup1Geometry = new THREE.BoxGeometry(1,3,0.5);
      var boxLowerGroup1Material = new THREE.MeshPhongMaterial({color:0x00ff00});


      boxUpperGroup1Geometry.translate(0,-0.5,-0);
      boxMiddleGroup1Geometry.translate(0,-2.5,0);
      boxLowerGroup1Geometry.translate(0,-1.5,0);

      this.boxUpperGroup1Mesh = new THREE.Mesh(boxUpperGroup1Geometry,boxUpperGroup1Material);
      this.boxMiddleGroup1Mesh = new THREE.Mesh(boxMiddleGroup1Geometry,boxMiddleGroup1Material);
      this.boxLowerGroup1Mesh = new THREE.Mesh(boxLowerGroup1Geometry,boxLowerGroup1Material);

      this.boxMiddleGroup1Mesh.position.set(0,-2,0);
      this.boxLowerGroup1Mesh.position.set(0,-7,0);

      this.boxUpperGroup1Mesh.add(this.boxMiddleGroup1Mesh);
      this.boxUpperGroup1Mesh.add(this.boxLowerGroup1Mesh);
      

      //Group 2
      var cylinderGroup2Geometry = new THREE.CylinderGeometry(0.25,0.25,3,32);
      var cylinderGroup2Material = new THREE.MeshNormalMaterial();

      var boxGroup2Geometry = new THREE.BoxGeometry(1,3,0.5);
      var boxGroup2Material = new THREE.MeshPhongMaterial({color:0x0000ff});

      cylinderGroup2Geometry.rotateX(Math.PI/2);
      boxGroup2Geometry.translate(0,-1,0);

      this.cylinderGroup2Mesh = new THREE.Mesh(cylinderGroup2Geometry, cylinderGroup2Material);
      this.boxGroup2Mesh = new THREE.Mesh(boxGroup2Geometry, boxGroup2Material);

      
      this.cylinderGroup2Mesh.position.set(0,-2,0);
      this.boxGroup2Mesh.position.set(0,0,0.5);

      this.cylinderGroup2Mesh.add(this.boxGroup2Mesh);
      this.boxUpperGroup1Mesh.add(this.cylinderGroup2Mesh);

      this.add(this.boxUpperGroup1Mesh);
      
    }

    createGUI(gui){
      this.guiControls = new function(){
        this.rotation = 0;
        this.rotation2 = 0;
        this.movileLenght = 5;
        this.movileLenght2 = 3;
        this.upDownPercent = 10; 
      }

      var folder = gui.addFolder("Péndulo 1:");
      folder.add(this.guiControls,"rotation",-(Math.PI/4),Math.PI/4,0.1).name("Rotación");
      folder.add(this.guiControls,"movileLenght",5,10,1).name("Escalado");

      folder = gui.addFolder("Péndulo 2:");
      folder.add(this.guiControls,"rotation2",-(Math.PI/4),Math.PI/4,0.1).name("Rotación");
      folder.add(this.guiControls,"upDownPercent",10,90,1).name("Porcentaje(%)");
      folder.add(this.guiControls,"movileLenght2",3,7,1).name("Escalado");


    }

    update () {
      this.boxUpperGroup1Mesh.rotation.z = this.guiControls.rotation;
      this.boxMiddleGroup1Mesh.scale.set(1,this.guiControls.movileLenght/5,1);

      if(this.guiControls.movileLenght != 10){
        this.boxLowerGroup1Mesh.position.y = -(7*(this.guiControls.movileLenght/5) - (0.4*(this.guiControls.movileLenght%5))); 
      }

      else{
        this.boxLowerGroup1Mesh.position.y = -(7*(this.guiControls.movileLenght/5) - 2); 
      }

      this.cylinderGroup2Mesh.rotation.z = this.guiControls.rotation2;
      this.cylinderGroup2Mesh.position.y = - 2 - (5*(this.guiControls.movileLenght/5)*(this.guiControls.upDownPercent/100));
      this.boxGroup2Mesh.scale.set(1,this.guiControls.movileLenght2/3,1);
    }

  }