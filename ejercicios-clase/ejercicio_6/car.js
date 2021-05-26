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

    update(rotation){
        if(rotation == true){
            this.modelo.rotation.y += 0.01;
        }
    }
} 