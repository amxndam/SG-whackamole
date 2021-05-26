class cup extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial();
      
      this.cup = this.createGeometry();

      this.add(this.cup);
      this.cup.position.y = 1;
      
    }

    createGeometry (){
        var cupMesh = this.generateFigure().toMesh(this.material);
        cupMesh.geometry.computeFaceNormals();
        cupMesh.geometry.computeVertexNormals();

        return cupMesh;
    }
    
    generateFigure(){
        var cylinderBase = new THREE.CylinderGeometry(1,1,2,20);
        var torusHandle = new THREE.TorusGeometry(0.6,0.15,16,100);
        var cylinderInside = new THREE.CylinderGeometry(0.8,0.8,1.8,20);

        cylinderBase.translate(0,0,0);
        torusHandle.translate(1,0,0);
        cylinderInside.translate(0,0.2,0);

        var cylinderBaseBSP = new ThreeBSP(cylinderBase);
        var cylinderInsideBSP = new ThreeBSP(cylinderInside);
        var torusHandleBSP = new ThreeBSP(torusHandle);

        var partialResult = cylinderBaseBSP.union(torusHandleBSP);
        var finalresult = partialResult.subtract(cylinderInsideBSP);


        return finalresult;
    }
   

    update (animation) {

        if(animation == true){
            this.cup.rotation.x += 0.01;
            this.cup.rotation.y += 0.01;
        }
    }

  }
  