class earth extends THREE.Object3D {
    constructor() {
      super();
      
      this.earthGeometry = new THREE.SphereGeometry(3,32,32);
    
      var textureEarthLoader = new THREE.TextureLoader();
      var textureEarth = textureEarthLoader.load("../imgs/tierra.jpg");
      var earthMaterial = new THREE.MeshPhongMaterial({map: textureEarth});

      this.earthMesh = new THREE.Mesh(this.earthGeometry, earthMaterial);

      this.add(this.earthMesh);
    }


    update () {
      this.earthMesh.rotation.y += 0.01;
    }

  }