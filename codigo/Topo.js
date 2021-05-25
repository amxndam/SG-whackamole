class Topo extends THREE.Object3D {
    constructor(gui,titleGui, x, y, z) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshNormalMaterial({flatShading: true});
      this.material.needsUpdate = true;
      
      this.topo = this.createGeometry();

      this.topo.position.x = x;
      this.topo.position.y = y;
      this.topo.position.z = z;

      this.add(this.topo);
      
    }

    createGeometry (){
        this.topoGeometry = new THREE.CubeGeometry(5,10,3);
        this.topoMesh = new THREE.Mesh(this.topoGeometry, this.material);

        return this.topoMesh;
    }
    
    
    createGUI (gui,titleGui) {
      // Controles para el movimiento de la parte móvil
      this.guiControls = new function () {
        this.x = 1;
        this.y = 1;
        this.z = 1;
        this.maximumHeight = false;
        this.minimumHeight = true;
        this.currentHeight = 0;
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
      this.topo.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
      this.changeFlatShading(flatShading);
      

      if(this.guiControls.maximumHeight == false){
         this.topo.position.y += 0.01;

         if(this.topo.position.y >= 10){
           this.guiControls.maximumHeight = true;
           this.guiControls.minimumHeight = false;
         }
      }

      else if(this.guiControls.minimumHeight == false){
        this.topo.position.y -= 0.1;

        if(this.topo.position.y <= -1){
          this.guiControls.maximumHeight = false;
          this.guiControls.minimumHeight = true;
        }
      }

    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var topoAuxMaterial = new THREE.MeshNormalMaterial({flatShading: true, needsUpdate: true});
            topoAuxMaterial.needsUpdate = true;
        }

        else{
            var topoAuxMaterial = new THREE.MeshNormalMaterial({flatShading: false});
            topoAuxMaterial.needsUpdate = false;

        }

        this.topo.material = topoAuxMaterial;
    }
  }
  