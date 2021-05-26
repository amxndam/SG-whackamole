
/// The Ground class
/**
 * @author FVelasco
 *
 * @param aWidth - The width of the ground
 * @param aDeep - The deep of the ground
 * @param aMaterial - The material of the ground
 * @param aBoxSize - The size for the boxes
 */

class Rubik extends THREE.Object3D {

  constructor () {
    super();

    this.rubik = null;
    this.aux = null;
    this.cara1 =null;
    this.cara2 =null;
    this.cara3 =null;
    this.cara4 =null;
    this.cara5 =null;
    this.cara6 =null;

    //sirve para montar el tipo de cubo
    this.iter=10;
    //sirve para resolver
    this.resol=9;

    this.rubik = this.crearRubik();
    this.add (this.rubik);

  }

  crearRubik(){
    this.aux = new THREE.Mesh (
      new THREE.BoxGeometry (10, 10,10, 1, 1, 1),
      new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70}));
    this.cubito = null;


    var x=0;
    var y=0;
    var z=0;

    for(y=-this.iter;y<=this.iter;y+=10){
      for(z=-this.iter;z<=this.iter;z+=10){
        for(x=-this.iter;x<=this.iter;x+=10){
            this.cubito=new Cubo(x,y,z);
            this.aux.add(this.cubito);

        }
      }
    }

    this.cara1 = new THREE.Mesh (
      new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
      new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

      this.cara1.applyMatrix (new THREE.Matrix4().makeTranslation (0, 1013, 0));

      this.cara2 = new THREE.Mesh (
        new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
        new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

        this.cara2.applyMatrix (new THREE.Matrix4().makeTranslation (0, -1013, 0));

        this.cara3 = new THREE.Mesh (
          new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
          new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

          this.cara3.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
          this.cara3.applyMatrix (new THREE.Matrix4().makeTranslation (1013, 0, 0));

          this.cara4 = new THREE.Mesh (
            new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
            new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

            this.cara4.applyMatrix (new THREE.Matrix4().makeRotationZ (Math.PI/2));
            this.cara4.applyMatrix (new THREE.Matrix4().makeTranslation (-1013, 0, 0));

            this.cara5 = new THREE.Mesh (
              new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
              new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

              this.cara5.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
              this.cara5.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, 1013));

              this.cara6 = new THREE.Mesh (
                new THREE.BoxGeometry (100, 0.1,100, 1, 1, 1),
                new THREE.MeshPhongMaterial({color:0x000000,specular:0x000000,shininess:70,transparent:true,opacity:0.0}));

                this.cara6.applyMatrix (new THREE.Matrix4().makeRotationX (Math.PI/2));
                this.cara6.applyMatrix (new THREE.Matrix4().makeTranslation (0, 0, -1013));

this.aux.add(this.cara1);
this.aux.add(this.cara2);
this.aux.add(this.cara3);
this.aux.add(this.cara4);
this.aux.add(this.cara5);
this.aux.add(this.cara6);


    return this.aux;
}

  //Movimientos to guapos
  //Loncha es la posicion
  MovY(loncha,direccion){
      for(var i=0;i<this.aux.children.length-6;i++){
          if(loncha==Math.round(this.aux.children[i].cubo.position.y))
            this.aux.children[i].MovY(direccion);
        }

      }
  MovX(loncha,direccion){
      for(var i=0;i<this.aux.children.length-6;i++){
          if(loncha==Math.round(this.aux.children[i].cubo.position.x))
            this.aux.children[i].MovX(direccion);
        }

      }
  MovZ(loncha,direccion){
      for(var i=0;i<this.aux.children.length-6;i++){
          if(loncha==Math.round(this.aux.children[i].cubo.position.z))
            this.aux.children[i].MovZ(direccion);
        }

      }

      //Movimientos to guapos
      //Loncha es la posicion
      MovYR(loncha,direccion){
          for(var i=0;i<this.aux.children.length-6;i++){
              if(loncha==Math.round(this.aux.children[i].cubo.position.y))
                this.aux.children[i].MovYR(direccion);
            }

          }
      MovXR(loncha,direccion){
          for(var i=0;i<this.aux.children.length-6;i++){
              if(loncha==Math.round(this.aux.children[i].cubo.position.x))
                this.aux.children[i].MovXR(direccion);
            }

          }
      MovZR(loncha,direccion){
          for(var i=0;i<this.aux.children.length-6;i++){
              if(loncha==Math.round(this.aux.children[i].cubo.position.z))
                this.aux.children[i].MovZR(direccion);
            }

          }

  intersect (placa,linea) {
    var corta=false;
    var placabb = new THREE.Box3().setFromObject(placa);
    var lineabb = new THREE.Box3().setFromObject(linea);

    if(placabb.isIntersectionBox(lineabb) ){
      corta=true;
    }
    return corta;
  }

       Solucion(){

         var corta1=0;
         var corta2=0;
         var corta3=0;
         var corta4=0;
         var corta5=0;
         var corta6=0;

         var solucion=true;

         if(solucion==true){
           setMessage("Resuelto");
         }

         //para rojo
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].rojolinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].rojolinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].rojolinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].rojolinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].rojolinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].rojolinea)==true)
             corta6+=1;
         }


         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
        else{
         //para azul
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].azullinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].azullinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].azullinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].azullinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].azullinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].azullinea)==true)
             corta6+=1;
         }

         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
          else{
         //para amarillo
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].amarillolineanaranjalinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].amarillolineanaranjalinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].amarillolineanaranjalinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].amarillolineanaranjalinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].amarillolineanaranjalinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].amarillolineanaranjalinea)==true)
             corta6+=1;
         }
         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
          else{
         //para naranja
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].naranjalinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].naranjalinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].naranjalinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].naranjalinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].naranjalinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].naranjalinea)==true)
             corta6+=1;
         }
         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
          else{
         //para blanmco
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].blancolinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].blancolinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].blancolinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].blancolinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].blancolinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].blancolinea)==true)
             corta6+=1;
         }

         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
          else{
         //para verde
         for(var i=0;i<this.aux.children.length-6 && solucion==true;i++){

           if(this.intersect(this.cara1,this.aux.children[i].verdelinea)==true)
              corta1+=1;
           if(this.intersect(this.cara2,this.aux.children[i].verdelinea)==true)
               corta2+=1;
           if(this.intersect(this.cara3,this.aux.children[i].verdelinea)==true)
             corta3+=1;
           if(this.intersect(this.cara4,this.aux.children[i].verdelinea)==true)
               corta4+=1;
           if(this.intersect(this.cara5,this.aux.children[i].verdelinea)==true)
             corta5+=1;
           if(this.intersect(this.cara6,this.aux.children[i].verdelinea)==true)
             corta6+=1;
         }
         if(corta1>0 && corta1<this.resol || corta2>0 && corta2<this.resol || corta3>0 && corta3<this.resol ||
            corta4>0 && corta4<this.resol || corta5>0 && corta5<this.resol || corta6>0 && corta6<this.resol ){
              solucion=false;
              setMessage("Aun no resuelto");
            }
        }
        }
        }
        }
        }
     }

Random(dificultad){
if(this.iter==10){
    for(var i=0;i<dificultad;i++){

    if(Math.random()>0.5)
    this.MovYR(0,0);
    if(Math.random()>0.5)
    this.MovYR(-10,0);
    if(Math.random()>0.5)
    this.MovYR(10,0);
    if(Math.random()>0.5)
    this.MovZR(0,0);
    if(Math.random()>0.5)
    this.MovZR(-10,0);
    if(Math.random()>0.5)
    this.MovZR(10,0);
    if(Math.random()>0.5)
    this.MovXR(0,0);
    if(Math.random()>0.5)
    this.MovXR(-10,0);
    if(Math.random()>0.5)
    this.MovXR(10,0);

    if(Math.random()>0.5)
    this.MovYR(0,1);
    if(Math.random()>0.5)
    this.MovYR(-10,1);
    if(Math.random()>0.5)
    this.MovYR(10,1);
    if(Math.random()>0.5)
    this.MovZR(0,1);
    if(Math.random()>0.5)
    this.MovZR(-10,1);
    if(Math.random()>0.5)
    this.MovZR(10,1);
    if(Math.random()>0.5)
    this.MovXR(0,1);
    if(Math.random()>0.5)
    this.MovXR(-10,1);
    if(Math.random()>0.5)
    this.MovXR(10,1);
  }
}
if(this.iter==5){
  for(var i=0;i<dificultad;i++){

  if(Math.random()>0.5)
  this.MovYR(-5,0);
  if(Math.random()>0.5)
  this.MovYR(5,0);
  if(Math.random()>0.5)
  this.MovZR(-5,0);
  if(Math.random()>0.5)
  this.MovZR(5,0);
  if(Math.random()>0.5)
  this.MovXR(5,0);
  if(Math.random()>0.5)
  this.MovXR(-5,0);

  if(Math.random()>0.5)
  this.MovYR(-5,1);
  if(Math.random()>0.5)
  this.MovYR(5,1);
  if(Math.random()>0.5)
  this.MovZR(5,1);
  if(Math.random()>0.5)
  this.MovZR(-5,1);
  if(Math.random()>0.5)
  this.MovXR(5,1);
  if(Math.random()>0.5)
  this.MovXR(-5,1);
}
}
if(this.iter==15){
  for(var i=0;i<dificultad;i++){

  if(Math.random()>0.5)
  this.MovYR(-5,0);
  if(Math.random()>0.5)
  this.MovYR(5,0);
  if(Math.random()>0.5)
  this.MovYR(-15,0);
  if(Math.random()>0.5)
  this.MovYR(15,0);
  if(Math.random()>0.5)
  this.MovZR(-5,0);
  if(Math.random()>0.5)
  this.MovZR(5,0);
  if(Math.random()>0.5)
  this.MovZR(-15,0);
  if(Math.random()>0.5)
  this.MovZR(15,0);
  if(Math.random()>0.5)
  this.MovXR(5,0);
  if(Math.random()>0.5)
  this.MovXR(-5,0);
  if(Math.random()>0.5)
  this.MovXR(15,0);
  if(Math.random()>0.5)
  this.MovXR(-15,0);

  if(Math.random()>0.5)
  this.MovYR(-5,1);
  if(Math.random()>0.5)
  this.MovYR(5,1);
  if(Math.random()>0.5)
  this.MovYR(-15,1);
  if(Math.random()>0.5)
  this.MovYR(15,1);
  if(Math.random()>0.5)
  this.MovXR(5,1);
  if(Math.random()>0.5)
  this.MovXR(-5,1);
  if(Math.random()>0.5)
  this.MovXR(15,1);
  if(Math.random()>0.5)
  this.MovXR(-15,1);
  if(Math.random()>0.5)
  this.MovZR(5,1);
  if(Math.random()>0.5)
  this.MovZR(-5,1);
  if(Math.random()>0.5)
  this.MovZR(15,1);
  if(Math.random()>0.5)
  this.MovZR(-15,1);

}
}

     }

Reset3(){
  for(var i=0;i<this.children.length;i++){
    this.remove(this.children[i]);
  }
  this.iter=10;
  this.resol=9;
  this.rubik = this.crearRubik();
  this.add (this.rubik);
}
Reset2(){
  for(var i=0;i<this.children.length;i++){
    this.remove(this.children[i]);
  }
  this.iter=5;
  this.resol=4;
  this.rubik = this.crearRubik();
  this.add (this.rubik);
}
Reset4(){
  for(var i=0;i<this.children.length;i++){
    this.remove(this.children[i]);
  }
  this.iter=15;
  this.resol=16;
  this.rubik = this.crearRubik();
  this.add (this.rubik);
}
  }
