class streetLight extends THREE.Object3D{
    constructor(){
        super();

        var stickGeometry = new THREE.CylinderGeometry(0.1,0.1,4,32);
        var stickMaterial = new THREE.MeshPhongMaterial({color:0xcccccc});
        var stickMesh = new THREE.Mesh(stickGeometry,stickMaterial);

        var bulbGeometry = new THREE.SphereGeometry(0.5,32,32);
        this.bulbMaterial = new THREE.MeshLambertMaterial({color:0xeeeeee, emissive: 0xffffff, emissiveIntensity: 0});
        var bulbMesh = new THREE.Mesh(bulbGeometry,this.bulbMaterial);

        this.pointLight = new THREE.PointLight(0xffffff,0,50);

        stickMesh.position.x = -4;
        stickMesh.position.y = 6;
        stickMesh.position.z = -4
        bulbMesh.position.y = 2.5;

        this.pointLight.position.x = -4;
        this.pointLight.position.y = 8.5;
        this.pointLight.position.z = -4;
        
        stickMesh.add(bulbMesh);
        this.add(this.pointLight);
        this.add(stickMesh);

    }

    update(intensity){
        this.pointLight.intensity = intensity;
        this.bulbMaterial.emissiveIntensity = intensity;
    }

} 