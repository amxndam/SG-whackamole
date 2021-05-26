class spade extends THREE.Object3D {
    constructor() {
      super();
      
     
      // El material se usa desde varios métodos. Por eso se alamacena en un atributo
      this.material = new THREE.MeshPhongMaterial({color: 0x0000ff});
      
      this.spade = this.createGeometry();
      this.foot = this.generateFoot();
      this.spadeParent = new THREE.Object3D();
      this.spadeGrandparent = new THREE.Object3D();

      this.foot.position.set(0,-2.5,0.5);
      this.spadeParent.position.set(0,0,0);
      this.spadeParent.position.set(-5,-5,0);

      this.spade.add(this.foot);
      this.spadeParent.add(this.spade);
      this.spadeGrandparent.add(this.spadeParent);
      this.add(this.spadeGrandparent);

      this.catmullGrandparent = new THREE.Object3D();
      this.catmullParent = new THREE.Object3D();
      this.catmull = this.generateCatMullRom();

      this.catmullGrandparent.position.set(0,0,0);
      this.catmullParent.position.set(-13,0,0);

      this.catmullParent.add(this.catmull);
      this.catmullGrandparent.add(this.catmullParent);
      this.add(this.catmullGrandparent);
        
    }

    createGeometry(){
        var spadeMesh = new THREE.Mesh(this.generateForm(), this.material);
        return spadeMesh;
    }
    
    generateForm(){
        var spadeShape = new THREE.Shape();
        spadeShape.moveTo(0,0);
        spadeShape.splineThru([new THREE.Vector2(-0.75,-0.5), new THREE.Vector2(-0.75,0)]);
        spadeShape.lineTo(0,3);
        spadeShape.lineTo(0.65,0);  
        spadeShape.splineThru([new THREE.Vector2(0.75,-0.5), new THREE.Vector2(0,0)]);

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

        var spadeGeometry = new THREE.ExtrudeGeometry(spadeShape,options);
        return spadeGeometry;
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
        
        footMesh.scale.set(0.4,0.4,0.4);

        return footMesh;
    }

    generateCatMullRom(){
        var spadeShape = new THREE.Shape();
        spadeShape.moveTo(0,-0);
        spadeShape.splineThru([new THREE.Vector2(-0.75,-0.5), new THREE.Vector2(-0.75,-0)]);
        spadeShape.lineTo(0,3);
        spadeShape.lineTo(0.65,0);  
        spadeShape.splineThru([new THREE.Vector2(0.75,-0.5), new THREE.Vector2(0,0)]);

        this.points = [];
        this.points.push(new THREE.Vector3(-2,5,0));
        this.points.push(new THREE.Vector3(-2,1,0));
        this.points.push(new THREE.Vector3(0,-1,0));
        this.points.push(new THREE.Vector3(0,-2,0));        
        this.points.push(new THREE.Vector3(0,-5,0));

        var path = new THREE.CatmullRomCurve3 (this.points);
        var options = {
            steps: 3, 
            curveSegments: 4,
            extrudePath: path,
            curveSegments: 40, //
            depth: 1, //Longitud a extruir
            bevelEnabled: true, //Permitimos viseles
            bevelThickness: 0.5, //Grosor del visel
            bevelSize: 1, //Tamaño del visel
            bevelOffset: 0, //Tamaño del visel respecto de la figura(?)
            bevelSegments: 5 //Número de viseles
            };

        var catmullRomGeometry = new THREE.ExtrudeGeometry(spadeShape,options);
        var catmullRomMaterial = new THREE.MeshPhongMaterial({color:0x00ff00});

        this.catmullRomMesh = new THREE.Mesh(catmullRomGeometry,catmullRomMaterial);

        return this.catmullRomMesh;
    }

    getCatmull(){
        return this.catmullFigure;
    }
   

    update (animation) {

        if(animation == true){
            this.spadeGrandparent.rotation.z += 0.01;
            this.spadeParent.rotation.z -= 0.01;
            this.spade.rotation.y += 0.01;

            this.catmullGrandparent.rotation.x +=0.01;
            this.catmullParent.rotation.y += 0.01;
        }
    }

  }