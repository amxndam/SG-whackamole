








pulsarTopo (){

    this.raycaster.setFromCamera( this.mouse, this.camera );

    this.topos = [];

    this.topos.push(this.topo1);
    this.topos.push(this.topo2);
    this.topos.push(this.topo3);

    const intersects = this.raycaster.intersectObjects( this.ground );

    for ( let i = 0; i < intersects.length; i ++ ) {

        intersects[i].object.material.color.set( 0x000000 );

    }

}