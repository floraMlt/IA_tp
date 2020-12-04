import { Scene, PerspectiveCamera, WebGLRenderer, Color, AmbientLight, SpotLight } from 'three'

import { OrbitControls } from './controls/OrbitControls'

import MagicalObject from './objects/MagicalObject'
import Cylinder from './objects/Cylinder'
import Blob from './objects/blob/Blob'
import SkySphere from './objects/skySphere/SkySphere'

export default class Webgl {
  constructor($parent) {
    this.start = this.start.bind(this)
    this.onResize = this.onResize.bind(this)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    // this.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
    this.renderer = new WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    $parent.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.light = new AmbientLight( 0x404040, 4 ); // soft white light
    this.scene.add(this.light);
    this.spotlight = new SpotLight( 0xffffff, 1 );
    this.spotlight.position.set(10, 10, -10)
    this.scene.add(this.spotlight);
    this.spotlight2 = new SpotLight( 0xffffff, 1 );
    this.spotlight2.position.set(20, 10, -10)
    this.scene.add(this.spotlight2);
    
    this.number = document.getElementById("number").value;
    this.createTorrus(this.number);
   
    this.cylinder = new Cylinder(-30, 5, 1)
    this.scene.add( this.cylinder );
    this.cylinder = new Cylinder(0, 5, 1)
    this.scene.add( this.cylinder );
    this.cylinder = new Cylinder(30, 5, 1)
    this.scene.add( this.cylinder );
    
    this.camera.position.z = 45;

    this.time = 0
    
    console.log(this.number);

    window.addEventListener('resize', this.onResize);
  }
  getColor(){
    var min = Math.ceil(0);
    var max = Math.floor(255);
    var color = new Color( Math.floor(Math.random() * (max - min +1)) + min,  Math.floor(Math.random() * (max - min +1)) + min, Math.floor(Math.random() * (max - min +1)) + min );
    return color.getHex();
  }

  createTorrus(n){
    var x = -30;
    var y = -5;
    var radius=10;
    
    this.torrus= [];
    for(var i = 0; i<n; i++){
      this.torrus.push(new MagicalObject(x,y,radius,this.getColor()));
      this.scene.add( this.torrus[i] );
      this.torrus[i].name= "object"+i;
      y=y+1.8;
      radius=radius-1;
    }
  }

  onResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  deleteGeometry(){
    var that =this;
    this.torrus.forEach(function(item){
      that.scene.remove(item)
    })
  }

  startGame(debut, milieu, fin, nb){

    if(nb>0){
      this.startGame(debut,fin,milieu,nb-1)

      this.move(fin,this.torrus[this.number-nb])
      this.startGame(milieu,debut, fin ,nb-1)
    }
  }
  
  move(fin, obj){
    if(obj.position.y <20 && obj.position.x<fin )
    {
      obj.position.y+=0.5;
    }
    else if (obj.position.y >=20 && obj.position.x<fin){
        obj.position.x+=0.5;
        obj.position.y=20;
    }
    else if ( Math.abs(obj.position.x-fin) < 0.01){
      var size=-5;
      this.torrus.forEach(function(item){
        if(item.position.x==fin){
          size +=1.8;
        }
      })
      if(obj.position.y >size){
        obj.position.y-=0.5;
      }
     
    }

  }

  start () {
    
    requestAnimationFrame( this.start );
    this.time += 0.01;
   
    if(this.number != document.getElementById("number").value)
    {
      this.deleteGeometry()
      this.number = document.getElementById("number").value;
      this.createTorrus(this.number);
    }

    for(var i = 0; i<this.number-1; i++){
      this.torrus[i].update()
    }
    this.controls.update();
    this.startGame(-30,0,30,this.number);
    this.renderer.render( this.scene, this.camera );
  
  }

  
}
