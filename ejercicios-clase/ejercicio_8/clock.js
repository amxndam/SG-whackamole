class clock extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.materialGreen = new THREE.MeshPhongMaterial({color: 0x00ff00, wireframe: true});
      this.materialRed = new THREE.MeshPhongMaterial({color: 0xff0000});
     
      this.sphereMovileMesh = this.createStructure();
    }

    createStructure(){
      var circleAux = new THREE.CircleGeometry(4,12);


      this.prueba = new THREE.Object3D();


      circleAux.rotateX(-Math.PI/2);

      var sphere1Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere2Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere3Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere4Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere5Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere6Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere7Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere8Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere9Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere10Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere11Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphere12Mesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialRed);
      var sphereMovileMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5,32,32), this.materialGreen);



      sphere1Mesh.position.z = 4;
      sphere2Mesh.position.z = -4;
      sphere3Mesh.position.x = 4;
      sphere4Mesh.position.x = -4;
      sphere5Mesh.position.x = circleAux.vertices[2]["x"];
      sphere5Mesh.position.y = circleAux.vertices[2]["y"];
      sphere5Mesh.position.z = circleAux.vertices[2]["z"];
      sphere6Mesh.position.x = circleAux.vertices[3]["x"];
      sphere6Mesh.position.y = circleAux.vertices[3]["y"];
      sphere6Mesh.position.z = circleAux.vertices[3]["z"];
      sphere7Mesh.position.x = circleAux.vertices[5]["x"];
      sphere7Mesh.position.y = circleAux.vertices[5]["y"];
      sphere7Mesh.position.z = circleAux.vertices[5]["z"];
      sphere8Mesh.position.x = circleAux.vertices[6]["x"];
      sphere8Mesh.position.y = circleAux.vertices[6]["y"];
      sphere8Mesh.position.z = circleAux.vertices[6]["z"];
      sphere9Mesh.position.x = circleAux.vertices[8]["x"];
      sphere9Mesh.position.y = circleAux.vertices[8]["y"];
      sphere9Mesh.position.z = circleAux.vertices[8]["z"];
      sphere10Mesh.position.x = circleAux.vertices[9]["x"];
      sphere10Mesh.position.y = circleAux.vertices[9]["y"];
      sphere10Mesh.position.z = circleAux.vertices[9]["z"];
      sphere11Mesh.position.x = circleAux.vertices[11]["x"];
      sphere11Mesh.position.y = circleAux.vertices[11]["y"];
      sphere11Mesh.position.z = circleAux.vertices[11]["z"];
      sphere12Mesh.position.x = circleAux.vertices[12]["x"];
      sphere12Mesh.position.y = circleAux.vertices[12]["y"];
      sphere12Mesh.position.z = circleAux.vertices[12]["z"];


      sphereMovileMesh.position.x = 2.8;
      


      //this.add(circleMesh);
      this.add(sphere1Mesh);
      this.add(sphere2Mesh);
      this.add(sphere3Mesh);
      this.add(sphere4Mesh);
      this.add(sphere5Mesh);
      this.add(sphere6Mesh);
      this.add(sphere7Mesh);
      this.add(sphere8Mesh);
      this.add(sphere9Mesh);
      this.add(sphere10Mesh);
      this.add(sphere11Mesh);
      this.add(sphere12Mesh);
      this.prueba.add(sphereMovileMesh);
      this.add(this.prueba);

      return sphereMovileMesh;
    }

    createGUI(gui){
      this.guiControls = new function(){
       this.speed = 0;
      }

      var folder = gui.addFolder("Velocidad:");
      folder.add(this.guiControls,"speed",-6,6,1).name("Velocidad");

    }

    update () {
      
      this.prueba.rotation.y += 0.01*this.guiControls.speed;

    }

  }