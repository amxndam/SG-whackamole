class cone extends THREE.Object3D {
    constructor(gui) {
      super();
      
      this.createGUI(gui);

      /*Creamos el cono*/
      var coneGeometry = new THREE.ConeGeometry(0.5,3,20);

      coneGeometry.rotateX(Math.PI/2);

      var textureConeLoader = new THREE.TextureLoader();
      var textureCone = textureConeLoader.load("../imgs/textura-ajedrezada.jpg");
      var coneMaterial = new THREE.MeshPhongMaterial({map: textureCone});

      this.coneMesh = new THREE.Mesh(coneGeometry,coneMaterial);
      this.coneMesh.position.z = 3;
      this.coneMesh.position.y = 3;

      this.add(this.coneMesh);

      /*Creamos el spline*/
      var spline = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(10, -3, -5),
        new THREE.Vector3(25, 0, 0), new THREE.Vector3(10, 3, 5),
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(-10, -3, -5),
        new THREE.Vector3(-25, 0, 0), new THREE.Vector3(-10, 3, 5),
        new THREE.Vector3(0, 0, 0)]);

      var geometryLine = new THREE.Geometry();
      geometryLine.vertices = spline.getPoints(56);

      var material = new THREE.LineBasicMaterial({color: 0xff0000});
      var visibleSpline = new THREE.Line(geometryLine,material);

      this.add(visibleSpline);

      /*Movimientos con Tween*/
      var inicio = {p:0};
      var parada1 = {p:0.5};
      var inicio2 = {p:0.5};
      var final = {p:1};

      var that = this;

      /*Bucle dcha*/
      this.bucleDcha = new TWEEN.Tween(inicio)
      .to(parada1,8000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function(){
        var posicion = spline.getPointAt(inicio.p);
        that.coneMesh.position.copy(posicion);
        var tangente = spline.getTangentAt(inicio.p);
        posicion.add(tangente);
        that.coneMesh.lookAt(posicion);

      })


      this.bucleIzda = new TWEEN.Tween(inicio2)
      .to(final,4000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(function(){
        var posicion = spline.getPointAt(inicio2.p);
        that.coneMesh.position.copy(posicion);
        var tangente = spline.getTangentAt(inicio2.p);
        posicion.add(tangente);
        that.coneMesh.lookAt(posicion);

      })
      .onComplete(function(){that.bucleDcha.start();});

      this.bucleDcha.chain(this.bucleIzda);
      this.bucleDcha.start();

      
    }

    createGUI(gui){
      
    }

    update () {
      TWEEN.update();
    }

  }