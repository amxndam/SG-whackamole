class squad extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial();
      
      this.squad = this.createGeometry();

      this.add(this.squad);
      this.squad.position.y = 1.5;
      
    }

    createGeometry (){
        var squadMesh = this.generateFigure().toMesh(this.material);
        squadMesh.geometry.computeFaceNormals();
        squadMesh.geometry.computeVertexNormals();

        return squadMesh;
    }
    
    generateFigure(){
        /*Creamos las líneas*/

        /*Figura principal*/
        var mainfigure = new THREE.Shape();

        mainfigure.moveTo(0,0);
        mainfigure.lineTo(0,1.5);
        mainfigure.lineTo(1.5,1.5);
        mainfigure.lineTo(1.5,1.4);
        mainfigure.lineTo(0.6,1.4);
        mainfigure.quadraticCurveTo(0.1,1.3,0.15,0.8);
        mainfigure.lineTo(0.15,0);
        mainfigure.lineTo(0,0);


        var options = {
            curveSegment: 15,
            steps: 1,
            depth: 0.5,
            bevelEnabled: false,
        }

        var mainFigureExtrude = new THREE.ExtrudeGeometry(mainfigure,options);

        /*Conos*/
        var cone1 = new THREE.ConeGeometry(1,2,20);
        var cone2 = new THREE.ConeGeometry(0.4,2,20);

        cone1.translate(1,0.6,0.25);
        cone2.translate(0.7,-0.6,0.25);
        cone2.rotateZ(Math.PI/2);

        /*Creamos BSPs*/
        var mainFigureBSP = new ThreeBSP(mainFigureExtrude);
        var cone1BSP = new ThreeBSP(cone1);
        var cone2BSP = new ThreeBSP(cone2);

        var partialresult = mainFigureBSP.subtract(cone1BSP);
        var finalresult = partialresult.subtract(cone2BSP);


        return finalresult;
    }
   

    update (animation) {

        if(animation == true){
            this.squad.rotation.x += 0.01;
            this.squad.rotation.y += 0.01;
            
        }
    }

  }
  