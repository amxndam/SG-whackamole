class cylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.cylinder = this.createGeometry();
    

      this.cylinder.position.x = -3;
      this.cylinder.position.y = 0.5;

      this.add(this.cylinder);
      
    }

    createGeometry (){
        this.cylinderGeometry = new THREE.CylinderGeometry(1,1,1,3);
        this.cylinderMesh = new THREE.Mesh(this.cylinderGeometry, this.material);

        return this.cylinderMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.radiusTop = 1;
        this.radiusBottom = 1;
        this.height = 1;
        this.radialSegments = 3;
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'radiusTop', 1, 7, 0.1).name ('Radio superior').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'radiusBottom', 1, 7, 0.1).name ('Radio inferior').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'height', 1, 7, 0.1).name ('Altura').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'radialSegments', 3, 20, 1).name ('Segmentos').onChange(function(value){that.changeParameters()});
    }
    
    changeParameters(){
        var auxCylinderGeometry = new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom,this.guiControls.height,this.guiControls.radialSegments);
        this.cylinder.geometry = auxCylinderGeometry;
    }

    update (flatShading) {
      this.changeFlatShading(flatShading);
      this.cylinder.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var cylinderAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true});
            cylinderAuxMaterial.needsUpdate = true;

        }

        else{
            var cylinderAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            cylinderAuxMaterial.needsUpdate = false;

        }

        this.cylinder.material = cylinderAuxMaterial;
    }
  }