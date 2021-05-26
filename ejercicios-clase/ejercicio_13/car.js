class car extends THREE.Object3D{
    constructor(){
        super();

        var that = this;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        materialLoader.load('../models/porsche911/911.mtl',
            function(materials){
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',

                function(object){
                    that.modelo = object;
                    that.add(that.modelo);
                }, null, null);
            });

    }

    update(direction){
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
} 