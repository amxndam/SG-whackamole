class heart extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshPhongMaterial({color: 0xff0000});
      
      this.heart = this.createGeometry();
      this.heartParent = new THREE.Object3D();
      this.heartGrandparent = new THREE.Object3D();

      this.heartGrandparent.position.set(0,0,0);
      this.heartParent.position.set(-5,5,0);

      this.heartParent.add(this.heart);
      this.heartGrandparent.add(this.heartParent);
      this.add(this.heartGrandparent);
      
    }

    createGeometry (){
        var heartMesh = new THREE.Mesh(this.generateForm(), this.material);

        return heartMesh;
    }
    
    generateForm(){
        var heartShape = new THREE.Shape();
        heartShape.moveTo(0,0);
        heartShape.lineTo(-0.75,2.5);
        heartShape.splineThru([new THREE.Vector2(-0.75,3),  new THREE.Vector2(0,2.5)]);
        heartShape.splineThru([new THREE.Vector2(0.75,3), new THREE.Vector2(0.65,2.5)]);
        heartShape.lineTo(0,0);

        var options = {
            curveSegments: 15, //
            steps: 1, //Trozos en los que dividir el segmentos sobre el que vamos a hacer extrusion
            depth: 1, //Longitud a extruir
            bevelEnabled: true, //Permitimos viseles
            bevelThickness: 0.5, //Grosor del visel
            bevelSize: 1, //Tamaño del visel
            bevelOffset: 0, //Tamaño del visel respecto de la figura(?)
            bevelSegments: 5 //Número de viseles
        };

        var heartGeometry = new THREE.ExtrudeGeometry(heartShape,options);

        return heartGeometry;
    }
   

    update (animation) {

        if(animation == true){
            this.heartGrandparent.rotation.z += 0.01;
            this.heartParent.rotation.z -= 0.01;
            this.heart.rotation.y += 0.01;
        }
    }

  }
  