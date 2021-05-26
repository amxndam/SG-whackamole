class satellites extends THREE.Object3D {
    constructor() {
      super();
      
      this.numberOfLoops = 0;
      this.satellitesGeometry = new THREE.SphereGeometry(2,32,32);

      var textureSatellitesLoader = new THREE.TextureLoader();
      var textureSatellites = textureSatellitesLoader.load("../imgs/cara.jpg");
      var satellitesMaterial = new THREE.MeshPhongMaterial({map: textureSatellites});

      this.satellite1Mesh = new THREE.Mesh(this.satellitesGeometry, satellitesMaterial);
      this.satellite2Mesh = new THREE.Mesh(this.satellitesGeometry, satellitesMaterial);
      this.satellite3Mesh = new THREE.Mesh(this.satellitesGeometry, satellitesMaterial);


      this.satellite1MeshTranslation = new THREE.Object3D();
      this.satellite2MeshTranslation = new THREE.Object3D();
      this.satellite3MeshTranslation = new THREE.Object3D();

      this.satellite1Mesh.rotation.y = -Math.PI;
      this.satellite1Mesh.position.x = 6;
      this.satellite2Mesh.rotation.y = -Math.PI/2;
      this.satellite2Mesh.position.x = 12;
      this.satellite3Mesh.position.x = 18;


      
      this.satellite1MeshTranslation.add(this.satellite1Mesh);
      this.satellite2MeshTranslation.add(this.satellite2Mesh);
      this.satellite3MeshTranslation.add(this.satellite3Mesh);

      this.add(this.satellite1MeshTranslation);
      this.add(this.satellite2MeshTranslation);
      this.add(this.satellite3MeshTranslation);

    }


    update () {
        /*Satelite 1*/
        this.satellite1MeshTranslation.rotation.y += 0.01;

        /*Satelite 2*/
        this.satellite2MeshTranslation.rotation.y += 0.01;
        this.satellite2Mesh.rotation.y -= 0.01;

        /*Satelite 3*/
        this.satellite3MeshTranslation.rotation.y += 0.01;
        this.satellite3Mesh.rotation.y +=0.01;
    }

  }