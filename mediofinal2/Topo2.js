

class TopoPrueba extends THREE.Object3D {
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
      this.cuerpo = new THREE.CylinderGeometry(4,4,6,50);
      this.cabeza = new THREE.SphereGeometry(4,50,100);
      this.ojoIzquierdo = new THREE.SphereGeometry(1,50,100);
      this.ojoDerecho = new THREE.SphereGeometry(1,50,100);

      /*
      var orejaIzquierda = new THREE.ConeGeometry(0.5,3,20);
      var orejaDerecha = new THREE.ConeGeometry(0.5,3,20);
      */

      //Posiciones relativas
      this.cabeza.translate(0,3,0);
      this.ojoIzquierdo.translate(2,3,3);
      this.ojoDerecho.translate(-2,3,3);

      THREE.GeometryUtils.merge(this.cuerpo,this.cabeza);
      THREE.GeometryUtils.merge(this.cuerpo,this.ojoIzquierdo);
      THREE.GeometryUtils.merge(this.cuerpo,this.ojoDerecho);
      this.geometria = new THREE.Mesh( this.cuerpo,this.material);
      
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



    getPositionY () {
      return this.topo.position.y;
    }

    setPositionY ( newPosition ) {
      this.topo.position.y = newPosition;
    }

    posicionCerca ( dx , dy , dz ) {
      
      var difx = dx - this.topo.position.x;
      var dify = dy - this.topo.position.y;
      var difz = dz - this.topo.position.z;

      if(difx <=2 && difx >= -2){
        return true;
      }

      else{
        return false;
      }

    }

    posicionIdeal () {

      if(this.topo.position.y >= 3)
        return true;

      return false;


    }

    posicionCorrecta () {
      return (this.topo.position.y >= -1);
    }

    ponerPosicionAdecuada () {
      this.topo.position.y = -0.6;
    }
    

    update () {
      this.topo.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
     // this.changeFlatShading(flatShading);
     // this.topo.rotation.y += 0.01;
     console.log(this.topo.position.y.toString());

     

      if(this.guiControls.maximumHeight == false){
         this.topo.position.y += 0.1;

         if(this.topo.position.y >= 8.5){
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
