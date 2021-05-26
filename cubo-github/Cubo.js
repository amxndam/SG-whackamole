
/// The Ground class
/**
 * @author FVelasco
 *
 * @param aWidth - The width of the ground
 * @param aDeep - The deep of the ground
 * @param aMaterial - The material of the ground
 * @param aBoxSize - The size for the boxes
 */

class Cubo extends THREE.Object3D {

  constructor (x,y,z) {
    super();

    this.cubo = null;

    this.aux  =null;

    this.rojolinea=null;
    this.azullinea=null;
    this.blancolinea=null;
    this.amarillolinea=null;
    this.naranjalinea=null;
    this.verdelinea=null;

    this.cubo= this.crearSelectBox(x,y,z); //Caja negra dentro de las caras
    this.add (this.cubo);

  }
crearSelectBox(x,y,z){
  this.selectbox = new THREE.Mesh (
    new THREE.BoxGeometry (10.5,10.5,10.5, 1, 1, 1),
    new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));
    this.selectbox.applyMatrix (new THREE.Matrix4().makeTranslation (x, y, z));
    this.negros =this.crearCubo();
    this.selectbox.add(this.negros);
    return this.selectbox;
}
  crearCubo(){
    this.aux = new THREE.Mesh (
      new THREE.BoxGeometry (9.8, 9.8,9.8, 1, 1, 1),
      new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70}));
      this.aux.visible=true;
    //arriba
    this.rojo = new THREE.Mesh (
      new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
      new THREE.MeshPhongMaterial({color:0xff0000,specular:0x000000,emissive:0xff0000,shininess:70}));
      //abajo
      this.naranja = new THREE.Mesh (
        new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
        new THREE.MeshPhongMaterial({color:0xff6600,specular:0x000000,emissive:0xff6600,shininess:70}));
        //derecha
        this.azul = new THREE.Mesh (
          new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
          new THREE.MeshPhongMaterial({color:0x0000ff,specular:0x000000,emissive:0x0000ff,shininess:70}))
          //izquierda
          this.verde = new THREE.Mesh (
            new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
            new THREE.MeshPhongMaterial({color:0x00ff00,specular:0x000000,emissive:0x00ff00,shininess:70}));
            //delante
            this.amarillo = new THREE.Mesh (
              new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
              new THREE.MeshPhongMaterial({color:0xffff00,specular:0x000000,emissive:0xffff00,shininess:70}));
              //atras
              this.blanco = new THREE.Mesh (
                new THREE.BoxGeometry (9, 0.6,9, 1, 1, 1),
                new THREE.MeshPhongMaterial({color:0xffffff,specular:0x000000,emissive:0xffffff,shininess:70}));
      //Lineas
      this.rojolinea = new THREE.Mesh (
        new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
        new THREE.MeshPhongMaterial({color:0xff0000,specular:0x000000,emissive:0xff0000,shininess:70,transparent:true,opacity:0.0}));
        this.naranjalinea = new THREE.Mesh (
          new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
          new THREE.MeshPhongMaterial({color:0xff6600,specular:0x000000,emissive:0xff6600,shininess:70,transparent:true,opacity:0.0}));
          this.azullinea = new THREE.Mesh (
            new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
            new THREE.MeshPhongMaterial({color:0x0000ff,specular:0x000000,emissive:0x0000ff,shininess:70,transparent:true,opacity:0.0}))
            this.verdelinea = new THREE.Mesh (
              new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
              new THREE.MeshPhongMaterial({color:0x00ff00,specular:0x000000,emissive:0x00ff00,shininess:70,transparent:true,opacity:0.0}));
              this.amarillolinea = new THREE.Mesh (
                new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
                new THREE.MeshPhongMaterial({color:0xffff00,specular:0x000000,emissive:0xffff00,shininess:70,transparent:true,opacity:0.0}));
                this.blancolinea = new THREE.Mesh (
                  new THREE.BoxGeometry (0.1, 10,0.1, 1, 1, 1),
                  new THREE.MeshPhongMaterial({color:0xffffff,specular:0x000000,emissive:0xffffff,shininess:70,transparent:true,opacity:0.0}));

      //Ponemos los colores en su sitio
      // this.rojo.position.y=4.75;
      // this.naranja.position.y=-4.75;
      this.rojo.applyMatrix (new THREE.Matrix4().makeTranslation (0, 4.75, 0));
      this.naranja.applyMatrix (new THREE.Matrix4().makeTranslation (0, -4.75, 0));
      this.rojolinea.applyMatrix (new THREE.Matrix4().makeTranslation (0, 1009.75, 0));
      this.naranjalinea.applyMatrix (new THREE.Matrix4().makeTranslation (0, -1009.75, 0));
      //rotamos y colocamos los de derecha e izquierda
      // this.azul.rotation.z=Math.PI/2;
      // this.azul.position.x=4.75;
      // this.verde.rotation.z=Math.PI/2;
      // this.verde.position.x=-4.75;
      this.azul.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
      this.verde.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
      this.azul.applyMatrix (new THREE.Matrix4().makeTranslation (4.75, 0, 0));
      this.verde.applyMatrix (new THREE.Matrix4().makeTranslation (-4.75, 0, 0));
      this.azullinea.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
      this.verdelinea.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
      this.azullinea.applyMatrix (new THREE.Matrix4().makeTranslation (1009.75, 0, 0));
      this.verdelinea.applyMatrix (new THREE.Matrix4().makeTranslation (-1009.75, 0, 0));

      //rotamos y colocamos los de delante y detras
      // this.amarillo.rotation.x=Math.PI/2;
      // this.amarillo.position.z=4.75;
      // this.blanco.rotation.x=Math.PI/2;
      // this.blanco.position.z=-4.75;
      this.amarillo.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
      this.blanco.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
      this.amarillo.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 4.75));
      this.blanco.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, -4.75));
      this.amarillolinea.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
      this.blancolinea.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
      this.amarillolinea.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 1009.75));
      this.blancolinea.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, -1009.75));

      this.aux.add(this.rojo);
      this.aux.add(this.naranja);
      this.aux.add(this.azul);
      this.aux.add(this.verde);
      this.aux.add(this.amarillo);
      this.aux.add(this.blanco);
      this.aux.add(this.rojolinea);
      this.aux.add(this.naranjalinea);
      this.aux.add(this.azullinea);
      this.aux.add(this.verdelinea);
      this.aux.add(this.amarillolinea);
      this.aux.add(this.blancolinea);

      return this.aux;

  }


  MovY(direccion){
        //Hacia alante
        if(direccion==0){

          var ini={x:0};
          var fin={x:Math.PI/2};
          var anterior=0;
          var that = this;
          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((ini.x-anterior)));
                          anterior=ini.x;

                        }).start();


        }
        //hacia atras
        else{

          var ini={x:0};
          var fin={x:-(Math.PI/2)};
          var anterior=0;
          var that = this;

          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((ini.x-anterior)));
                          anterior=ini.x;
                        }).start();

        }

  }
  MovX(direccion){
        //Hacia alante
        if(direccion==0){

          var ini={x:0};
          var fin={x:(Math.PI/2)};
          var anterior=0;
          var that = this;

          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((ini.x-anterior)));
                          anterior=ini.x;
                        }).start();

        }
        //hacia atras
        else{

          var ini={x:0};
          var fin={x:-(Math.PI/2)};
          var anterior=0;
          var that = this;

          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((ini.x-anterior)));
                          anterior=ini.x;
                        }).start();

        }
    }
  MovZ(direccion){
        //Hacia alante
        if(direccion==0){

          var ini={x:0};
          var fin={x:(Math.PI/2)};
          var anterior=0;
          var that = this;

          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((ini.x-anterior)));
                          anterior=ini.x;
                        }).start();

        }
        //hacia atras
        else{

          var ini={x:0};
          var fin={x:-(Math.PI/2)};
          var anterior=0;
          var that = this;

          var anim =new TWEEN.Tween(ini).
                        to(fin,100).
                        onUpdate(function (){
                          that.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((ini.x-anterior)));
                          anterior=ini.x;
                        }).start();

        }
    }

    MovYR(direccion){
          //Hacia alante
          if(direccion==0){

            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY ((Math.PI/8)));



          }
          //hacia atras
          else{

            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationY (-(Math.PI/8)));


          }

    }
    MovXR(direccion){
          //Hacia alante
          if(direccion==0){

            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX ((Math.PI/8)));


          }
          //hacia atras
          else{

            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationX (-(Math.PI/8)));



          }
      }
    MovZR(direccion){
          //Hacia alante
          if(direccion==0){

            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ ((Math.PI/8)));

          }
          //hacia atras
          else{
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ (-(Math.PI/8)));
            this.cubo.applyMatrix (new THREE.Matrix4().makeRotationZ (-(Math.PI/8)));



          }
      }

}
