class torus extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.torus = this.createGeometry();

      this.torus.position.x = 3;
      this.torus.position.y = 4.5;

      this.add(this.torus);
      
    }

    createGeometry (){
        this.torusGeometry = new THREE.TorusGeometry(1,0.15,3,3);
        this.torusMesh = new THREE.Mesh(this.torusGeometry, this.material);

        return this.torusMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.radius = 1;
        this.tube = 0.15;
        this.radialSegments = 3;
        this.tubularSegments = 3;
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'radius', 1, 7, 0.1).name ('Radio').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'tube', 0.15, 5, 0.1).name ('Ancho del tubo').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'radialSegments', 3, 15, 1).name ('Segementos radiales').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'tubularSegments', 3, 15, 1).name ('Segmentos tubulares').onChange(function(value){that.changeParameters()});
    }
    
    changeParameters(){
        var auxTorusGeometry = new THREE.TorusGeometry(this.guiControls.radius, this.guiControls.tube, this.guiControls.radialSegments,this.guiControls.tubularSegments);
        this.torus.geometry = auxTorusGeometry;
    }

    update (flatShading) {
      this.changeFlatShading(flatShading);
      this.torus.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var torusAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true});
            torusAuxMaterial.needsUpdate = true;

        }

        else{
            var torusAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            torusAuxMaterial.needsUpdate = false;

        }

        this.torus.material = torusAuxMaterial;
    }
  }