class cone extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.cone = this.createGeometry();

      this.cone.position.y = 0.5;

      this.add(this.cone);
      
    }

    createGeometry (){
        this.coneGeometry = new THREE.ConeGeometry(1,1,3);
        this.coneMesh = new THREE.Mesh(this.coneGeometry, this.material);

        return this.coneMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.radius = 1;
        this.height = 1;
        this.radialSegments = 3;
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'radius', 1, 7, 0.1).name ('Radio').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'height', 1, 7, 0.1).name ('Altura').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'radialSegments', 3, 20, 1).name ('Segmentos').onChange(function(value){that.changeParameters()});
    }
    
    changeParameters(){
        var auxConeGeometry = new THREE.ConeGeometry(this.guiControls.radius,this.guiControls.height,this.guiControls.radialSegments);
        this.cone.geometry = auxConeGeometry;
    }

    update (flatShading) {
      this.changeFlatShading(flatShading);
      this.cone.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var coneAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true});
            coneAuxMaterial.needsUpdate = true;
        }

        else{
            var coneAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            coneAuxMaterial.needsUpdate = false;

        }

        this.cone.material = coneAuxMaterial;
    }
  }