class sphereMovile extends THREE.Object3D{
    constructor(){
        super();

        var SphereGeometry = new THREE.SphereGeometry(0.5,32,32);
        var SphereMaterial = new THREE.MeshPhongMaterial({color:0x0000ff});

        this.SphereMesh = new THREE.Mesh(SphereGeometry,SphereMaterial);

        this.add(this.SphereMesh);

        var origin = {p: 0};
        var destiny = {p: 1};

        this.movement = new TWEEN.Tween(origin).to(destiny,1000)
        .onComplete(function(){
            moveX = Math.random()*(2-(-2)) -2;
            moveY = Math.random()*(2-(-2)) -2;
            moveZ = Math.random()*(2-(-2)) -2;

            this.SphereMesh.translateOnAxis(moveX,moveY,moveZ);
        })
        .repeat(Infinity);

        this.movement.start();

    }

    getPointX(){
        return this.SphereMesh.position.x;
    }

    getPointY(){
        return this.SphereMesh.position.y;
    }

    getPointZ(){
        return this.SphereMesh.position.z;
    }
    
    // PROFE
    getSphere() {
      return this.SphereMesh;
    }

    update(){
        TWEEN.update();
    }

   
} 