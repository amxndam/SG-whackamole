class Sphere extends THREE.Object3D{
    constructor(positionX, positionY, positionZ){
        super();

        var SphereGeometry = new THREE.SphereGeometry(0.5,32,32);
        var SphereMaterial = new THREE.MeshNormalMaterial();

        this.SphereMesh = new THREE.Mesh(SphereGeometry,SphereMaterial);

        this.SphereMesh.position.x = positionX;
        this.SphereMesh.position.y = positionY;
        this.SphereMesh.position.z = positionZ;

        this.add(this.SphereMesh);

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

    update(material){
      this.SphereMesh.material = material;  
    }
    
    // PROFE
    getSphere() {
      return this.SphereMesh;
    }
} 
