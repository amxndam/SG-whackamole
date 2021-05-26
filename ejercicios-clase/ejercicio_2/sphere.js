class sphere extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.sphere = this.createGeometry();

      this.sphere.position.y = 4.5;

      this.add(this.sphere);
      
    }

    createGeometry (){
        this.sphereGeometry = new THREE.SphereGeometry(1,3,2);
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.material);

        return this.sphereMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.radius = 1;
        this.widthSegments = 3;
        this.heightSegments = 2;
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'radius', 1, 7, 0.1).name ('Radio').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'widthSegments', 3, 15, 1).name ('Segementos ancho').onChange(function(value){that.changeParameters()});
      folder.add (this.guiControls, 'heightSegments', 2, 15, 1).name ('Segmentos altura').onChange(function(value){that.changeParameters()});
    }
    
    changeParameters(){
        var auxSphereGeometry = new THREE.SphereGeometry(this.guiControls.radius, this.guiControls.widthSegments,this.guiControls.heightSegments);
        this.sphere.geometry = auxSphereGeometry;
    }

    update (flatShading) {
      this.changeFlatShading(flatShading);
      this.sphere.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var sphereAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true});
            sphereAuxMaterial.needsUpdate = true;

        }

        else{
            var sphereAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            sphereAuxMaterial.needsUpdate = false;

        }

        this.sphere.material = sphereAuxMaterial;
    }
  }