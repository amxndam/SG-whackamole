class car extends THREE.Object3D{
    constructor(){
        super();

        var bulbsGeometry = new THREE.SphereGeometry(0.05,32,32);
        this.bulbsMaterial1 = new THREE.MeshLambertMaterial({color:0xddcc00, emissive: 0xddcc00, emissiveIntensity: 0});
        this.bulbsMaterial2 = new THREE.MeshLambertMaterial({color:0xddcc00, emissive: 0xddcc00, emissiveIntensity: 0});
        this.lightLeft = new THREE.SpotLight(0xddcc00,0);
        this.lightRight = new THREE.SpotLight(0xddcc00,0);
        var target = new THREE.Object3D();
        target.position.set(0,0,-11.7);


        this.lightLeft.angle = Math.PI/5;
        this.lightRight.angle = Math.PI/5;

        this.bulbsMesh1 = new THREE.Mesh(bulbsGeometry,this.bulbsMaterial1);
        this.bulbsMesh2 = new THREE.Mesh(bulbsGeometry,this.bulbsMaterial2);

        this.bulbsMesh1.position.set(-0.6,0,-1.7);
        this.bulbsMesh2.position.set(0.6,0,-1.7);

        this.lightRight.target = target;
        this.lightLeft.target = target;

        this.lightLeft.add(target);
        this.lightRight.add(target);
        this.bulbsMesh1.add(this.lightLeft);
        this.bulbsMesh2.add(this.lightRight);
        this.add(this.bulbsMesh1);
        this.add(this.bulbsMesh2);

        
        var that = this;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        materialLoader.load('../models/porsche911/911.mtl',
            function(materials){
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',

                function(object){
                    that.modelo = object;
                    that.modelo.add(that.bulbsMesh1);
                    that.modelo.add(that.bulbsMesh2);
                    that.add(that.modelo);
                }, null, null);
            });
        

    }

    update(direction, lightsOn){

        if(lightsOn == true){
            this.lightLeft.intensity = 1.0;
            this.lightRight.intensity = 1.0;
            this.bulbsMaterial1.emissiveIntensity = 1.0;
            this.bulbsMaterial2.emissiveIntensity = 1.0;
        }

        else{
            this.lightLeft.intensity = 0;
            this.lightRight.intensity = 0;
            this.bulbsMaterial1.emissiveIntensity = 0;
            this.bulbsMaterial2.emissiveIntensity = 0;
        }

        if(direction == "go"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,-1).normalize(), 0.1);
        }

        if(direction == "back"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.1);
        }

        if(direction == "left"){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), 0.1);

        }

        if(direction == "right"){
            this.modelo.rotateOnAxis(new THREE.Vector3(0,-1,0).normalize(), 0.1);

        }

        if(direction == "goLeft"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,-1).normalize(), 0.1);
            this.modelo.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), 0.01);


        }

        if(direction == "backLeft"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.1);
            this.modelo.rotateOnAxis(new THREE.Vector3(0,-1,0).normalize(), 0.01);

        }

        if(direction == "goRight"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,-1).normalize(), 0.1);
            this.modelo.rotateOnAxis(new THREE.Vector3(0,-1,0).normalize(), 0.01);

        }

        if(direction == "backRight"){
            this.modelo.translateOnAxis(new THREE.Vector3(0,0,1).normalize(), 0.1);
            this.modelo.rotateOnAxis(new THREE.Vector3(0,1,0).normalize(), 0.01);

        }


    }

    rotate(){
        this.modelo.rotation.y += 0.01;
    }


} 