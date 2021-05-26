class screw extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial();
      
      this.screw = this.createGeometry();
      this.screw.position.y = 1;

      this.add(this.screw);
      
    }

    createGeometry (){
        var screwMesh = this.generateFigure().toMesh(this.material);
        screwMesh.geometry.computeFaceNormals();
        screwMesh.geometry.computeVertexNormals();

        return screwMesh;
    }
    
    generateFigure(){
       var circle = new THREE.SphereGeometry(2.02,32,32);
       var cylinder1 = new THREE.CylinderGeometry(2,2,1,6);
       var cylinder2 = new THREE.CylinderGeometry(1,1,1,20);
       var teeth = new THREE.Shape();

       var points = [];
       points.push(new THREE.Vector3(0, -0.5, 0));
       points.push(new THREE.Vector3(1.2,-0.4,0));
       points.push(new THREE.Vector3(1.1,-0.3,0));
       points.push(new THREE.Vector3(1.2,-0.2,0));
       points.push(new THREE.Vector3(1.1,-0.1,0));
       points.push(new THREE.Vector3(1.2,0,0));
       points.push(new THREE.Vector3(1.1,0.1,0));
       points.push(new THREE.Vector3(1.2,0.2,0));
       points.push(new THREE.Vector3(1.1,0.3,0));
       points.push(new THREE.Vector3(1.2,0.4,0));
       points.push(new THREE.Vector3(1.1,0.5,0));
       points.push(new THREE.Vector3(1.2,0.6,0));
       points.push(new THREE.Vector3(1.1,0.7,0));
       points.push(new THREE.Vector3(1.2,0.8,0));
       points.push(new THREE.Vector3(1.1,0.9,0));
       points.push(new THREE.Vector3(1.2,1,0));
       points.push(new THREE.Vector3(1.1,1.1,0));
       points.push(new THREE.Vector3(1.2,1.2,0));
       points.push(new THREE.Vector3(1.1,1.3,0));
       points.push(new THREE.Vector3(1.2,1.4,0));
       points.push(new THREE.Vector3(1.1,1.5,0));
       points.push(new THREE.Vector3(1.2,1.6,0));
       points.push(new THREE.Vector3(0.0,1.6,0));


       var teethFigure = new THREE.LatheGeometry(points,20,0,Math.PI*2);

       teethFigure.translate(0,-0.5,0);


       var circleBSP = new ThreeBSP(circle);
       var cylinder1BSP = new ThreeBSP(cylinder1);
       var cylinder2BSP = new ThreeBSP(cylinder2);
       var teethFigureBSP = new ThreeBSP(teethFigure);

       var partialresult1 = cylinder1BSP.intersect(circleBSP);
       var partialresult2 = partialresult1.subtract(cylinder2BSP);
       var finalresult = partialresult2.subtract(teethFigureBSP); 



        return finalresult;
    }
   

    update (animation) {

        if(animation == true){
            this.screw.rotation.x += 0.01;
            this.screw.rotation.y += 0.01;
            
        }
    }

  }
  