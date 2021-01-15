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
    this.time = 0;
    this.list = this.createGrid()
    var self=this
    for(var i=0; i<5;i++){
      setTimeout(function() {
        self.getState(self.list)
      }, 1000*i);
    }
    window.addEventListener("resize", this.onResize);
  }

  getAlive() {
    var min = Math.ceil(0);
    var max = Math.floor(100);
    var alive = Math.floor(Math.random() * (max - min + 1)) + min
    var color;
    if(alive>50){
      color = new Color(0,1,1);
    }
    else{
      color = new Color(1,1,1);
    }
    return color.getHex();
  }

  createGrid(){
    var cubes =[]
    var color
    for(var i=0; i<10;i++){
      for(var j=0; j<10;j++){
        this.cube = new MagicalObject(5*i, 5*j, 1, this.getAlive());
        this.scene.add(this.cube);
        cubes.push(this.cube)
      }
    }
    return cubes
  }

  getState(list){
    var alive=0
    var self=this
    var toChange=[]
    list.forEach(element => {
      //check voisins
      list.forEach(item => {
        if(item.position.x==element.position.x-5 && item.position.y==element.position.y && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x+5 && item.position.y==element.position.y && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x-5 && item.position.y==element.position.y-5 && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x && item.position.y==element.position.y-5 && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x-5 && item.position.y==element.position.y+5 && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x+5 && item.position.y==element.position.y-5 && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x+5 && item.position.y==element.position.y+5 && item.material.color.r==0){
            alive++
        }
        else if(item.position.x==element.position.x && item.position.y==element.position.y+5 && item.material.color.r==0){
            alive++
        }
      })
      toChange.push(self.changeState(element,alive))
      alive=0
    })
    this.changeColor(toChange)
  }

  changeState(element, alive){
    if(element.material.color.r==0){
      console.log(alive)
    }
    
    var toChange
    if(element.material.color.r==1 && alive>=3){
      toChange={element, alive:0}
    }
    else if(element.material.color.r==0 && (alive==2 || alive == 3)){
      toChange={element, alive:0}
    }
    else{
      toChange={element, alive:1}
    }
    return toChange
  }

  changeColor(toChange){
    toChange.forEach(element => {
      if(element.alive==1){
        element.element.material.color.setRGB(1,1,1)
      }
      else{
        element.element.material.color.setRGB(0,1,1)
      }
      //
    })
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
