class rectangle extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.rectangle = this.createGeometry();

      this.rectangle.position.x = 3;
      this.rectangle.position.y = 0.5;

      this.add(this.rectangle);
      
    }

    createGeometry (){
        this.rectangleGeometry = new THREE.CubeGeometry(1,1,1);
        this.rectangleMesh = new THREE.Mesh(this.rectangleGeometry, this.material);

        return this.rectangleMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.x = 1;
        this.y = 1;
        this.z = 1;
      } 
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      folder.add (this.guiControls, 'x', 1, 7, 0.1).name ('Coordenada x');
      folder.add (this.guiControls, 'y', 1, 7, 0.1).name ('Coordenada y');
      folder.add (this.guiControls, 'z', 1, 7, 0.1).name ('Coordenada z');
    }    

    update (flatShading) {
      this.rectangle.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
      this.changeFlatShading(flatShading);
      this.rectangle.rotation.y += 0.01;
    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var rectangleAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true, needsUpdate: true});
            rectangleAuxMaterial.needsUpdate = true;
        }

        else{
            var rectangleAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            rectangleAuxMaterial.needsUpdate = false;

        }

        this.rectangle.material = rectangleAuxMaterial;
    }
  }
  