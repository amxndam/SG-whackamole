class box extends THREE.Scene {
    constructor(pointX, pointY, pointZ){
        super();

        var boxGeometry = new THREE.BoxGeometry(1,1,1);
        var boxMaterial = new THREE.MeshPhongMaterial ({color: Math.floor (Math.random()*16777215)});

        this.boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);


        this.boxMesh.position.x = pointX;
        this.boxMesh.position.y = pointY;
        this.boxMesh.position.z = pointZ;

        this.add(this.boxMesh);
    }

    getPointX(){
        return this.boxMesh.position.x;
    }

    getPointY(){
        return this.boxMesh.position.y;
    }

    getPointZ(){
        return this.boxMesh.position.z;
    }

    setPointX(pointX){
        this.boxMesh.position.x = pointX;
    }
    
    setPointY(pointY){
        this.boxMesh.position.y = pointY;

    }
    
    setPointZ(pointZ){
        this.boxMesh.position.z = pointZ;
    }

    rotateBox(event){
        this.boxMesh.rotation.y += (event.wheelDelta ? event.wheelDelta/20 : -event.detail);
    }

    update(selected){
        if(selected == true){
            this.boxMesh.material.transparent = true;
            this.boxMesh.material.opacity = 0.35;
        }

        else{
            this.boxMesh.material.transparent = false;
        }

    }
}