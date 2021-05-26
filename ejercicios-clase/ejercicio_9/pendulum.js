class pendulum extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.materialGreen = new THREE.MeshPhongMaterial({color: 0x00ff00});
      this.materialRed = new THREE.MeshPhongMaterial({color: 0xff0000});
      this.materialBlue = new THREE.MeshPhongMaterial({color: 0x0000ff});
      this.materialCylinder = new THREE.MeshNormalMaterial();
      
      var boxAbove = new THREE.BoxGeometry(1,4,1);
      var boxMiddle = new THREE.BoxGeometry(1,5,1);
      var boxBelow = new THREE.BoxGeometry(1,4,1);
      var cylinderAbove = new THREE.CylinderGeometry(0.5,0.5,2,20);
      var cylinderBelow = new THREE.CylinderGeometry(0.3,0.3,2.5,20);
      var boxPart2 = new THREE.BoxGeometry(0.8,3,0.3);

      boxMiddle.translate(0,-2.5,0);
      boxBelow.translate(0,-2,0);
      cylinderAbove.rotateX(Math.PI/2);
      cylinderBelow.rotateX(Math.PI/2);
      boxPart2.translate(0,-1,0.8);


      this.boxAboveMesh = new THREE.Mesh(boxAbove,this.materialGreen);
      this.boxMiddleMesh = new THREE.Mesh(boxMiddle,this.materialRed);
      this.boxBelowMesh = new THREE.Mesh(boxBelow,this.materialGreen);
      this.cylinderAboveMesh = new THREE.Mesh(cylinderAbove,this.materialCylinder);
      this.cylinderBelowMesh = new THREE.Mesh(cylinderBelow,this.materialGreen);
      this.boxPart2Mesh = new THREE.Mesh(boxPart2,this.materialBlue);

    

      this.boxMiddleMesh.position.y = -2;
      this.boxMiddleMesh.scale.y = 1;

      this.boxBelowMesh.position.y = -7;
      
      this.cylinderBelowMesh.position.y = -2.5;
      this.boxPart2Mesh.position.z = 0.15; 

      this.cylinderBelowMesh.rotation.z = this.guiControls.rotation2;
      this.rotation.z = this.guiControls.rotation;
      
      this.add(this.boxAboveMesh);
      this.add(this.boxMiddleMesh);
      this.add(this.boxBelowMesh);
      this.add(this.cylinderAboveMesh);
      this.cylinderBelowMesh.add(this.boxPart2Mesh);
      this.add(this.cylinderBelowMesh);
      
    }

    createGUI(gui){
      this.guiControls = new function(){
        this.rotation = 0;
        this.rotation2 = 0;
        this.movileLenght = 5;
        this.movileLenght2 = 3;
        this.upDownPercent = 10;
        this.animateBig = false; 
        this.animateSmall = false; 
        this.speedBig = 0; 
        this.speedSmall = 0;
        this.maximumPositiveBig = false; 
        this.maximumPositiveSmall = false; 
        this.maximumNegativeBig = false; 
        this.maximumNegativeSmall = false; 
        this.controlSpeedBig = 0.0;
        this.controlSpeedSmall = 0.0;

      }

      var folder = gui.addFolder("Péndulo 1:");
      folder.add(this.guiControls,"rotation",-(Math.PI/4),Math.PI/4,0.1).name("Rotación");
      folder.add(this.guiControls,"movileLenght",5,10,1).name("Escalado");

      folder = gui.addFolder("Péndulo 2:");
      folder.add(this.guiControls,"rotation2",-(Math.PI/4),Math.PI/4,0.1).name("Rotación");
      folder.add(this.guiControls,"upDownPercent",10,90,1).name("Porcentaje(%)");
      folder.add(this.guiControls,"movileLenght2",3,7,1).name("Escalado");

      folder = gui.addFolder("Animación:");
      folder.add(this.guiControls,"animateBig").name("Péndulo 1");
      folder.add(this.guiControls,"speedBig",0,2,0.1).name("Velocidad(rad/s)");
      folder.add(this.guiControls,"animateSmall").name("Péndulo 2");
      folder.add(this.guiControls,"speedSmall",0,2,0.1).name("Velocidad(rad/s)");



    }

    update () {
      this.boxMiddleMesh.scale.y = (this.guiControls.movileLenght/5);
      this.boxPart2Mesh.scale.y = this.guiControls.movileLenght2/3;
      this.boxBelowMesh.position.y = (-7*(this.guiControls.movileLenght/5))+(0.4*(this.guiControls.movileLenght-5));
      this.cylinderBelowMesh.position.y = -2-((this.guiControls.movileLenght/100)*this.guiControls.upDownPercent);

      //console.log("VALOR DE 1:"+this.guiControls.animateBig);
      //console.log("VALOR DE 2:"+this.guiControls.animateSmall);

      if(this.guiControls.animateBig == false & this.guiControls.animateSmall == false){
        this.cylinderBelowMesh.rotation.z = this.guiControls.rotation2;
        this.rotation.z = this.guiControls.rotation;
      }
      
      else{
        if(this.guiControls.maximumPositiveBig == false){
          this.guiControls.controlSpeedBig += 0.01*this.guiControls.speedBig;
          
          if(this.guiControls.controlSpeedBig >= Math.PI/4){
            this.guiControls.maximumPositiveBig = true;
            this.guiControls.maximumNegativeBig = false;
          }
        }

        else if(this.guiControls.maximumNegativeBig == false){
          this.guiControls.controlSpeedBig -=0.01*this.guiControls.speedBig;

          if(this.guiControls.controlSpeedBig <= -Math.PI/4){
            this.guiControls.maximumNegativeBig = true;
            this.guiControls.maximumPositiveBig = false;
          }
        }

        if(this.guiControls.maximumPositiveSmall == false){
          this.guiControls.controlSpeedSmall += 0.01*this.guiControls.speedSmall;
          
          if(this.guiControls.controlSpeedSmall >= Math.PI/4){
            this.guiControls.maximumPositiveSmall = true;
            this.guiControls.maximumNegativeSmall = false;
          }
        }

        else if(this.guiControls.maximumNegativeSmall == false){
          this.guiControls.controlSpeedSmall -=0.01*this.guiControls.speedSmall;

          if(this.guiControls.controlSpeedSmall <= -Math.PI/4){
            this.guiControls.maximumNegativeSmall = true;
            this.guiControls.maximumPositiveSmall = false;
          }
        }


        if(this.guiControls.animateBig == true & this.guiControls.animateSmall == false){
          this.cylinderBelowMesh.rotation.z = this.guiControls.rotation2;
          this.rotation.z = this.guiControls.controlSpeedBig;
        }
  
        else if(this.guiControls.animateBig == false & this.guiControls.animateSmall == true){
          this.cylinderBelowMesh.rotation.z = this.guiControls.controlSpeedSmall;
          this.rotation.z = this.guiControls.rotation;
        }
  
        else{
          this.cylinderBelowMesh.rotation.z = this.guiControls.controlSpeedSmall;
          this.rotation.z = this.guiControls.controlSpeedBig;
        }

      }
     
    }

  }