class pawn extends THREE.Object3D {
    constructor(firstFigure = true) {
      super();
      
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.firstFigure = firstFigure;
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.pawn = this.createGeometry();

      ////ACTUALIZAR LUEGO ESTA ALTURA EN BASE A LA DE LA FIGURA
      this.pawn.position.y = 1.4;

      this.add(this.pawn);
      
    }

    createGeometry (){
        this.pawnGeometry = new THREE.LatheGeometry(this.createLine(),3,0,Math.PI*2);
        this.pawnMesh = new THREE.Mesh(this.pawnGeometry, this.material);

        return this.pawnMesh;
    }

    createLine(){
        this.points = [];

        this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
        this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
        this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
        this.points.push(new THREE.Vector3(0.5, -0.7, 0.0));
        this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
        this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
        this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
        this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
        this.points.push(new THREE.Vector3(0.5, 0.8, 0.0));
        this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
        this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
        this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
        this.points.push(new THREE.Vector3(0.0, 1.4, 0.0));

        return this.points;
    }
    
    
    changeParameters(segments, phiLenght){
      if(this.firstFigure == true){
        var auxPawnGeometry = new THREE.LatheGeometry(this.createLine(), segments, 0, phiLenght);
      }

      else{
        var auxPawnGeometry = new THREE.LatheGeometry(this.createLine(), segments , 0, Math.PI*2);
      }
        
      this.pawn.geometry = auxPawnGeometry;
    }

    update (flatShading, animation) {
      this.changeFlatShading(flatShading);

      if(animation == true){
        this.pawn.rotation.y += 0.01;
      }

    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var pawnAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true, needsUpdate: true});
            pawnAuxMaterial.needsUpdate = true;
        }

        else{
            var pawnAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            pawnAuxMaterial.needsUpdate = false;

        }

        this.pawn.material = pawnAuxMaterial;
    }

    getPoints(){
      var points = this.createLine();

      this.pawnLineGeometry = new THREE.Geometry();
      this.pawnLineGeometry.vertices = points;

      var pawnLineMaterial = new THREE.MeshBasicMaterial({color:0x0000ff});
      this.pawnLineMesh = new THREE.Line(this.pawnLineGeometry, pawnLineMaterial);

      return this.pawnLineMesh;
    }
  }
  