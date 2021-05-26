class car extends THREE.Object3D{
    constructor(){
        super();

        this.carCamera = new THREE.PerspectiveCamera(45,  window.innerWidth / window.innerHeight, 0.1, 1000);
        this.moveCar = new THREE.Mesh(new THREE.BoxGeometry(3,1,1),new THREE.MeshNormalMaterial({transparent:true, opacity: 0}));
        this.rotateCar = new THREE.Mesh(new THREE.BoxGeometry(5,1,1),new THREE.MeshBasicMaterial({color:0x00ff00, transparent: true, opacity: 0}));
        var that = this;
        var materialLoader = new THREE.MTLLoader();
        var objectLoader = new THREE.OBJLoader();

        materialLoader.load('../models/porsche911/911.mtl',
            function(materials){
                objectLoader.setMaterials(materials);
                objectLoader.load('../models/porsche911/Porsche_911_GT2.obj',

                function(object){
                    that.modelo = object;
                    that.modelo.add(that.carCamera);
                    that.rotateCar.add(that.modelo);
                    that.moveCar.add(that.rotateCar);
                    that.add(that.moveCar);
                }, null, null);
            });


        
        this.carCamera.position.set(-0.3,0.5,0.2);
        
        var target = new THREE.Vector3(0,2,-10);
        
        this.carCamera.getWorldPosition(target);
        
        this.carCamera.lookAt(target);
    }
    
    getCamera(){
        return this.carCamera;
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