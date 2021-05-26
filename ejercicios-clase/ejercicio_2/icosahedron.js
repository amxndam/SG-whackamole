class icosahedron extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.icosahedron = this.createGeometry();

      this.icosahedron.position.x = -3;
      this.icosahedron.position.y = 4.5;

      this.add(this.icosahedron);
      
    }

    createGeometry (){
        this.icosahedronGeometry = new THREE.IcosahedronGeometry(1,0);
        this.icosahedronMesh = new THREE.Mesh(this.icosahedronGeometry, this.material);

        return this.icosahedronMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.radius = 1;
        this.detail = 0;

      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'radius', 1, 7, 0.1).name ('Radio').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'detail', 0, 5, 1).name ('Detalle').onChange(function(value){that.changeParameters()});
    }
    
    changeParameters(){
        var auxIcosahedronGeometry = new THREE.IcosahedronGeometry(this.guiControls.radius, this.guiControls.detail);
        this.icosahedron.geometry = auxIcosahedronGeometry;
    }

    update (flatShading) {
      this.changeFlatShading(flatShading);
      this.icosahedron.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var icosahedronAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true});
            icosahedronAuxMaterial.needsUpdate = true;

        }

        else{
            var icosahedronAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            icosahedronAuxMaterial.needsUpdate = false;

        }

        this.icosahedron.material = icosahedronAuxMaterial;
    }
  }