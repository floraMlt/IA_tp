import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
  SpotLight,
} from "three";
const TWEEN = require("@tweenjs/tween.js");

import { OrbitControls } from "./controls/OrbitControls";

import MagicalObject from "./objects/MagicalObject";

export default class Webgl {
  constructor($parent) {
    this.start = this.start.bind(this);
    this.onResize = this.onResize.bind(this);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    $parent.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.light = new AmbientLight(0x404040, 4); // soft white light
    this.scene.add(this.light);
    this.spotlight = new SpotLight(0xffffff, 1);
    this.spotlight.position.set(10, 10, -10);
    this.scene.add(this.spotlight);
    this.spotlight2 = new SpotLight(0xffffff, 1);
    this.spotlight2.position.set(20, 10, -10);
    this.scene.add(this.spotlight2);
    this.camera.position.z = 45;
    this.runKoch("F--F--F-",3)
    this.time = 0;

    window.addEventListener("resize", this.onResize);
  }

  getColor() {
    var min = Math.ceil(0);
    var max = Math.floor(255);
    var color = new Color(
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min,
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    return color.getHex();
  }

  createLine(x,y,z,r){
    this.line = new MagicalObject(x, y, z,r, this.getColor());
    this.scene.add(this.line);
  }

  runKoch(init,n){
    var x =-10;
    var y =-10
    var z=0;
    var r=0;
    var instruction=init;
    for(var i=0;i<n;i++){
      var tmp='';
      var str = "F+F--F+F";
      instruction.split('').forEach((c) => {
        if(c=="F"){
          tmp+=str;
        }
        else{
          tmp+=c
        }
      })
      instruction=tmp;
    }
     instruction.split('').forEach((c) => {
      console.log(c);
      if(c=="F"){
        c=str;
        console.log(x +" " + y)
        this.createLine(x,y,z,r)
        x+=5*Math.cos(r);
        y+=5*Math.sin(r);
      }
      else if(c=="-"){
        r+=Math.PI/3;
      }
      else if(c=="+"){
        r+=-(Math.PI/3);
      }
    });
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  start() {
    requestAnimationFrame(this.start);
    this.time += 0.01;
    

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }
}
