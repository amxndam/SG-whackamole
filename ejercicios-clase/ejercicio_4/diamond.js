class diamond extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshPhongMaterial({color: 0xff0000});
      
      this.diamond = this.createGeometry();
      this.diamondParent = new THREE.Object3D();
      this.diamondGrandparent = new THREE.Object3D();

      this.diamondGrandparent.position.set(0,0,0);
      this.diamondParent.position.set(5,-5,0);

      this.diamondParent.add(this.diamond);
      this.diamondGrandparent.add(this.diamondParent);
      this.add(this.diamondGrandparent);
      
    }

    createGeometry (){
        var diamondMesh = new THREE.Mesh(this.generateForm(), this.material);

        return diamondMesh;
    }
    
    generateForm(){
        var diamondShape = new THREE.Shape();
        diamondShape.moveTo(1.25,0);
        diamondShape.lineTo(0,1.25);
        diamondShape.lineTo(-1.25,0);
        diamondShape.lineTo(0,-1.25);
        diamondShape.lineTo(1.25,0);

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

        var diamondGeometry = new THREE.ExtrudeGeometry(diamondShape,options);

        return diamondGeometry;
    }
   

    update (animation) {

        if(animation == true){
            this.diamondGrandparent.rotation.z += 0.01;
            this.diamondParent.rotation.z -= 0.01;
            this.diamond.rotation.y += 0.01;
        }
    }

  }