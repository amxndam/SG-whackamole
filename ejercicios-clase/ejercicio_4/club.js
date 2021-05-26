class club extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshPhongMaterial({color: 0x0000ff});
      
      this.clubParent = new THREE.Object3D();
      this.clubGrandparent = new THREE.Object3D();


      this.club = this.createGeometry();
      this.foot = this.generateFoot();

      this.clubGrandparent.position.set(0,0,0);
      this.clubParent.position.set(5,5,0);

      this.foot.position.set(0,-3,0.5);
      this.club.add(this.foot);
      this.clubParent.add(this.club);
      this.clubGrandparent.add(this.clubParent);

      this.add(this.clubGrandparent);
      
    }

    createGeometry (){
        var clubMesh = new THREE.Mesh(this.generateForm(), this.material);

        return clubMesh;
    }
    
    generateForm(){
        var clubShape = new THREE.Shape();
        clubShape.moveTo(0,0);
        
        clubShape.bezierCurveTo(2.5,-2.25,3.5,1.75,0.75,1.5);
        clubShape.bezierCurveTo(2.3,4.5,-2.3,4.5,-0.75,1.5);
        clubShape.bezierCurveTo(-3.5,1.75,-2.25,-2.5,0,0);

        var options = {
            curveSegments: 15, //
            steps: 1, //Trozos en los que dividir el segmentos sobre el que vamos a hacer extrusion
            depth: 1, //Longitud a extruir
            bevelEnabled: true, //Permitimos viseles
            bevelThickness: 0.5, //Grosor del visel
            bevelSize: 1, //Tamaño del visel
            bevelOffset: 0, //Tamaño del visel respecto de la figura(?)
            bevelSegments: 5 //Número de viseles
        };

        var clubGeometry = new THREE.ExtrudeGeometry(clubShape,options);

        return clubGeometry;
    }

    generateFoot(){
        var points = [];

        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(1.5, 0, 0));
        points.push(new THREE.Vector3(0.5, 1, 0));
        points.push(new THREE.Vector3(0.5, 2, 0));
        points.push(new THREE.Vector3(0.5, 3, 0));
        points.push(new THREE.Vector3(0.5, 4, 0));
        points.push(new THREE.Vector3(0.5, 5, 0));
        points.push(new THREE.Vector3(0, 5, 0));

        var footGeometry = new THREE.LatheGeometry(points,20,0,Math.PI*2);
        var footMesh = new THREE.Mesh(footGeometry,this.material);

        //footMesh.position.y = -3;
        //footMesh.position.z = 0.5;
        
        footMesh.scale.set(0.4,0.4,0.4);

        return footMesh;
    }
   

    update (animation) {

        if(animation == true){
            this.clubGrandparent.rotation.z += 0.01;
            this.clubParent.rotation.z -= 0.01;
            this.club.rotation.y += 0.01;
        }
    }

  }