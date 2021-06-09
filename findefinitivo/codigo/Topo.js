class Topo extends THREE.Object3D {
    constructor( x, y, z) {
      super();
      
      // El material
      this.material = new THREE.MeshStandardMaterial({color: 0x9BE3E4});
      this.material.needsUpdate = true;
      
      //Se crea el topo
      this.topo = this.createGeometry();

      //Se le añade las posiciones iniciales
      this.topo.position.x = x;
      this.topo.position.y = y;
      this.topo.position.z = z;

      this.maximumHeight = false;
      this.minimumHeight = true;
      this.currentHeight = 0;

      //Se añade el topo
      this.add(this.topo);

    }

                
    //Se crea el objeto del mazo con la geometría y el material 
    createGeometry (){
      this.cuerpo = new THREE.CylinderGeometry(4,4,6,50);
      this.cabeza = new THREE.SphereGeometry(4,50,100);
      this.ojoIzquierdo = new THREE.SphereGeometry(1,50,100);
      this.ojoDerecho = new THREE.SphereGeometry(1,50,100);

      //Posiciones relativas
      this.cabeza.translate(0,3,0);
      this.ojoIzquierdo.translate(2,3,3);
      this.ojoDerecho.translate(-2,3,3);

      //Se ha uso de un merge para unir todas las geometrías
      THREE.GeometryUtils.merge(this.cuerpo,this.cabeza);
      THREE.GeometryUtils.merge(this.cuerpo,this.ojoIzquierdo);
      THREE.GeometryUtils.merge(this.cuerpo,this.ojoDerecho);
      this.geometria = new THREE.Mesh( this.cuerpo,this.material);
      
      return this.geometria;
    }
    

    //Va a devolver cómo de cerca está de una posición
    //Aclarar que no se añade la comparación con el eje Z para que el juego sea más sencillo de jugar
    posicionCerca ( dx , dy , dz ) {
      
      var difx = dx - this.topo.position.x;
      var dify = dy - this.topo.position.y;
      var difz = dz - this.topo.position.z;

      if(difx <=2 && difx >= -2 && dify <=2 && dify >= -2){
        return true;
      }

      else{
        return false;
      }

    }

    //Devuelve la posición a la que el topo podrá empezar a ser golpeado
    posicionIdeal () {

      if(this.topo.position.y >= 2)
        return true;

      return false;


    }

    //Devuelve la posición a la que el topo se sigue actualizando antes de que llegue abajo y restaure su opacidad
    posicionCorrecta () {
      return (this.topo.position.y >= -1);
    }

    //Devuelve la posición a la que se pone el topo, una vez termina de bajar
    ponerPosicionAdecuada () {
      this.topo.position.y = -0.6;
    }
    

    //Se actualiza en cada frame y hace la animación de los topos
    update () {

      if(this.maximumHeight == false){
         this.topo.position.y += 0.1;

         if(this.topo.position.y >= 8.5){
           this.maximumHeight = true;
           this.minimumHeight = false;
         }
      }

      else if(this.minimumHeight == false){
        this.topo.position.y -= 0.1;

        if(this.topo.position.y <= -1){
          this.maximumHeight = false;
          this.minimumHeight = true;
        }
      }
  

    }

  }
