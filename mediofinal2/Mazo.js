

class Mazo extends THREE.Object3D {
    constructor(gui,titleGui, x, y, z) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshStandardMaterial({color: 0x9BE3E4});
      this.material.needsUpdate = true;
      
      this.mazoFinal = this.createGeometry();

      this.mazoFinal.position.x = x;
      this.mazoFinal.position.y = y;
      this.mazoFinal.position.z = z;



      this.add(this.mazoFinal);

      this.arriba = false;
      
    }

                

    createGeometry (){
      this.mazo = new THREE.BoxGeometry(8,4,6);
      this.mango = new THREE.CylinderGeometry(0.8,0.8,10,50);

      //Posiciones relativas
      this.mazo.translate(0,10,0);
      this.mango.translate(0,3,0);

      THREE.GeometryUtils.merge(this.mazo,this.mango);
      this.geometria = new THREE.Mesh( this.mazo,this.material);
      
      return this.geometria;
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
      return this.mazoFinal.position.y;
    }

    setPositionY(newPosition){
      this.mazoFinal.position.y = newPosition;
    }

    setPositions(x,y){
      this.mazoFinal.position.x = x;
      this.mazoFinal.position.y = y;
    }
    

    setRotacion(z){
      this.mazoFinal.rotation.z = z;
    }


    update () {
      this.mazoFinal.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
     // this.changeFlatShading(flatShading);
     // this.mazoFinal.rotation.y += 0.01;
     console.log(this.mazoFinal.position.y.toString());

 

    }

    changeFlatShading(flatShading){
        if(flatShading == true){
            var mazoFinalAuxMaterial = new THREE.MeshStandardMaterial({color: 0x9BE3E4,flatShading: true, needsUpdate: true});
            mazoFinalAuxMaterial.needsUpdate = true;
        }

        else{
            var mazoFinalAuxMaterial = new THREE.MeshStandardMaterial({color: 0x9BE3E4, flatShading: false});
            mazoFinalAuxMaterial.needsUpdate = false;

        }

        this.mazoFinal.material = mazoFinalAuxMaterial;
    }
  }
