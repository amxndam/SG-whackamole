

class Topo extends THREE.Object3D {
    constructor(gui,titleGui, x, y, z) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshStandardMaterial({color: 0x9BE3E4});
      this.material.needsUpdate = true;
      
      this.topo = this.createGeometry();

      this.topo.position.x = x;
      this.topo.position.y = y;
      this.topo.position.z = z;

      this.add(this.topo);

      this.arriba = false;
      
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
      
    }   

    setArriba(newArriba){
      this.arriba = newArriba;
    }

    getArriba(){
      return this.arriba;
    }


    getPositionY(){
      return this.topo.position.y;
    }

    setPositionY(newPosition){
      this.topo.position.y = newPosition;
    }

    

    update () {
      this.topo.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
     // this.changeFlatShading(flatShading);
     // this.topo.rotation.y += 0.01;
     console.log(this.topo.position.y.toString());

     

      if(this.guiControls.maximumHeight == false){
         this.topo.position.y += 0.25;

         if(this.topo.position.y >= 9.5){
           this.guiControls.maximumHeight = true;
           this.guiControls.minimumHeight = false;
         }
      }

      else if(this.guiControls.minimumHeight == false){
        this.topo.position.y -= 0.3;

        if(this.topo.position.y <= -1){
          this.guiControls.maximumHeight = false;
          this.guiControls.minimumHeight = true;
        }
      }



    

    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var topoAuxMaterial = new THREE.MeshStandardMaterial({color: 0x9BE3E4,flatShading: true, needsUpdate: true});
            topoAuxMaterial.needsUpdate = true;
        }

        else{
            var topoAuxMaterial = new THREE.MeshStandardMaterial({color: 0x9BE3E4, flatShading: false});
            topoAuxMaterial.needsUpdate = false;

        }

        this.topo.material = topoAuxMaterial;
    }
  }
  