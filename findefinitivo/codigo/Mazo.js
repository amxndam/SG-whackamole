class Mazo extends THREE.Object3D {
    constructor( x, y, z) {
      super();

      //El material
      this.material = new THREE.MeshStandardMaterial({color: 0x9BE3E4});
      this.material.needsUpdate = true;
      
      //La geometría
      this.mazoFinal = this.createGeometry();

      //Las posiciones
      this.mazoFinal.position.x = x;
      this.mazoFinal.position.y = y;
      this.mazoFinal.position.z = z;

      //Booleano que es falso cuando el mazo tiene que bajar y verdadero para subir
      this.rotacion = false;

      //La rotación inicial del mazo
      this.mazoFinal.rotation.z = 0;

      //Añadimos el mazo 
      this.add(this.mazoFinal);

    }

    //Se crea el objeto del mazo con la geometría y el material     
    createGeometry (){
      this.mazo = new THREE.BoxGeometry(8,4,6);
      this.mango = new THREE.CylinderGeometry(0.8,0.8,10,50);

      //Posiciones relativas
      this.mazo.translate(0,10,0);
      this.mango.translate(0,3,0);

      //Se ha uso de un merge para unir ambos objetos
      THREE.GeometryUtils.merge(this.mazo,this.mango);
      this.geometria = new THREE.Mesh( this.mazo,this.material);
      
      return this.geometria;
    }

    //Para cambiar el sentido del movimiento del mazo
    setRotacion(r){
      this.rotacion = r;
    }

    //Se actualiza en cada frame y hace la animación del mazo
    update () {

        if(this.rotacion){
          if(this.mazoFinal.rotation.z <= 1.2)
            this.mazoFinal.rotation.z += 0.2; 
        }

        if(!this.rotacion){
          if(this.mazoFinal.rotation.z > 0)
            this.mazoFinal.rotation.z -= 0.2; 
        }

    
    }

  }
