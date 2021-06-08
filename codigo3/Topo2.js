class TopoPrueba extends THREE.Object3D {
    constructor(gui,titleGui, x, y, z) {
      super();
      const grupo = new THREE.Group();
      
      // this.abajo = false;     Para saber que el topo esta abajo

      // Se crea la parte de la interfaz que corresponde a la grapadora
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshStandardMaterial({color: 0x9BE3E4});

      //Colores material
      this.materialVerde = new THREE.MeshPhongMaterial({color: 0x00ff00});
      this.materialRojo = new THREE.MeshPhongMaterial({color: 0xff0000});
      this.materialAzul = new THREE.MeshPhongMaterial({color: 0x0000ff});
      this.materialAmarillo = new THREE.MeshPhongMaterial({color: 0x00ff00});
      this.materialCilindro = new THREE.MeshNormalMaterial();


      //Geometrías
      var cuerpo = new THREE.CylinderGeometry(4,4,10,50);
      var cabeza = new THREE.SphereGeometry(4,50,100);
      var ojoIzquierdo = new THREE.SphereGeometry(1,50,100);
      var ojoDerecho = new THREE.SphereGeometry(1,50,100);

      /*
      var orejaIzquierda = new THREE.ConeGeometry(0.5,3,20);
      var orejaDerecha = new THREE.ConeGeometry(0.5,3,20);
      */

      //Mesh
      this.cuerpoMesh = new THREE.Mesh(cuerpo,this.materialVerde);
      this.cabezaMesh = new THREE.Mesh(cabeza,this.materialRojo);
      this.ojoIzquierdoMesh = new THREE.Mesh(ojoIzquierdo,this.materialAzul);
      this.ojoDerechoMesh = new THREE.Mesh(ojoDerecho,this.materialAzul);
      /*
      this.orejaIzquierdaMesh = new THREE.Mesh(orejaIzquierda,this.materialAmarillo);
      this.orejaDerechaMesh = new THREE.Mesh(orejaDerecha,this.materialAmarillo);
      */
    
      //Posiciones iniciales
      //Cuerpo
      
      this.cuerpoMesh.position.x = x;
      this.cuerpoMesh.position.y = y;
      this.cuerpoMesh.position.z = z;

      //Cabeza
      this.cabezaMesh.position.x = x;
      this.cabezaMesh.position.y = y;
      this.cabezaMesh.position.z = z;

      //OjoIzquierdo
      this.ojoIzquierdoMesh.position.x = x;
      this.ojoIzquierdoMesh.position.y = y;
      this.ojoIzquierdoMesh.position.z = z;

      //OjoDerecho
      this.ojoDerechoMesh.position.x = x;
      this.ojoDerechoMesh.position.y = y;
      this.ojoDerechoMesh.position.z = z;
      
      /*
      //OrejaIzquierda
      this.orejaIzquierdaMesh.position.x = x;
      this.orejaIzquierdaMesh.position.y = y;
      this.orejaIzquierdaMesh.position.z = z;
      //OrejaDerecha
      this.orejaDerechaMesh.position.x = x;
      this.orejaDerechaMesh.position.y = y;
      this.orejaDerechaMesh.position.z = z;
      */

      //Posiciones relativas
      cabeza.translate(0,5,0);
      
      ojoIzquierdo.translate(2,5,3);
      ojoDerecho.translate(-2,5,3);

      //orejaIzquierda.translate(2,8,3);
      //orejaDerecha.translate(-2,8,3);
      


      //Objetos añadidos
      
      this.add(this.cuerpoMesh);
      this.add(this.cabezaMesh);
      
      this.add(this.ojoIzquierdoMesh);
      this.add(this.ojoDerechoMesh);
      
      /*
      this.add(this.orejaIzquierda);
      this.add(this.orejaDerecha);
      */
   
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

    

    update () {
     // this.TopoPrueba.scale.set(this.guiControls.x, this.guiControls.y,this.guiControls.z);
     
     this.cuerpoMesh.scale.set(this.guiControls.x, this.guiControls.y, this.guiControls.z);
     this.cabezaMesh.scale.set(this.guiControls.x, this.guiControls.y, this.guiControls.z);
     //this.cabezaMesh.scale.set(this.guiControls.x, this.guiControls.y, this.guiControls.z);




     // this.changeFlatShading(flatShading);
     // this.topo.rotation.y += 0.01;

     
     // Para comprobar cuando el topo está a cierta altura y hacer que baje.
      if(this.guiControls.maximumHeight == false){
         this.cuerpoMesh.position.y += 0.05;
         this.cabezaMesh.position.y += 0.05;
         this.ojoIzquierdoMesh.position.y += 0.05;
         this.ojoDerechoMesh.position.y += 0.05;

         if(this.cuerpoMesh.position.y >= 9.5){
           this.guiControls.maximumHeight = true;
           this.guiControls.minimumHeight = false;
         }
      }

      else if(this.guiControls.minimumHeight == false){
        this.cuerpoMesh.position.y -= 0.1;
        this.cabezaMesh.position.y -= 0.1;
        this.ojoIzquierdoMesh.position.y -= 0.1;
        this.ojoDerechoMesh.position.y -= 0.1;

        if(this.cuerpoMesh.position.y <= -1){
          this.abajo = true;
          this.cuerpoMesh.position.y = -0.9;
          this.cabezaMesh.position.y = -0.9;
          this.ojoIzquierdoMesh.position.y = -0.9;
          this.ojoDerechoMesh.position.y = -0.9;

          this.guiControls.maximumHeight = false;
          this.guiControls.minimumHeight = true;
        }
      }

      


    }

    /* Ni idea
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
    */

  }