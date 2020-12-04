import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
  SpotLight,
} from "three";
const TWEEN = require("@tweenjs/tween.js");
import regeneratorRuntime from "regenerator-runtime";

import { OrbitControls } from "./controls/OrbitControls";

import MagicalObject from "./objects/MagicalObject";
import Cylinder from "./objects/Cylinder";
import Blob from "./objects/blob/Blob";
import SkySphere from "./objects/skySphere/SkySphere";

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
    // this.camera = new OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
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

    this.number = document.getElementById("number").value;
    this.createTorrus(this.number);
    this.animations = [];

    this.cylinder1 = new Cylinder(-30, 5, 1);
    this.scene.add(this.cylinder1);
    this.cylinder2 = new Cylinder(0, 5, 1);
    this.scene.add(this.cylinder2);
    this.cylinder3 = new Cylinder(30, 5, 1);
    this.scene.add(this.cylinder3);

    this.camera.position.z = 45;

    this.time = 0;

    this.startGame(this.cylinder1.position, this.cylinder3.position, this.cylinder2.position, this.number);
    this.move()

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

  createTorrus(n) {
    var x = -30;
    var y = -5;
    var radius = 10;

    this.torrus = [];
    for (var i = 0; i < n; i++) {
      this.torrus.push(new MagicalObject(x, y, radius, this.getColor()));
      this.scene.add(this.torrus[i]);
      this.torrus[i].name = "object" + i;
      y = y + 1.8;
      radius = radius - 1;
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  deleteGeometry() {
    var that = this;
    this.torrus.forEach(function (item) {
      that.scene.remove(item);
    });
  }

  startGame(debut, fin, milieu, nb) {
    if (nb > 0) {
      this.startGame(debut, milieu, fin, nb - 1);
      this.animations.push([debut, fin]);
      //   var item = this.torrus[this.number - nb]
      this.startGame(milieu, fin, debut, nb - 1);
      // fonction hanoi entre le milieu et la fin il faut stocker les valeurs puis lancer animation
      // faire un tableau avec les déplacements et le jouer à la fin tant que c'est pas vide
    }
  }

  move() {
    if (this.animations.length == 0) {
      return;
    }
    const currentAnimation = this.animations.shift();
    const from = currentAnimation[0];
    const to = currentAnimation[1];
    console.log(from)
   /// const coords = this.torrus[this.number].position;
   const that = this

   const item = this.torrus.find(function(torus) {
     const yDesTorus = that.torrus.map(torus => torus.position.y)
     console.log(torus.position.x === from.x && torus.position.y === Math.max.apply(Math, yDesTorus))
     return torus.position.x === from.x && torus.position.y === Math.max.apply(Math, yDesTorus)
   })
   
   if (item) {
    var moveUp = new TWEEN.Tween(item.position)
      .to({ x: from.x, y: from.y + 20 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out);

    var moveSide = new TWEEN.Tween(item.position)
      .to({ x: to.x, y: from.y + 20 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out);

    var moveDown = new TWEEN.Tween(item.position)
      .to({ x: to.x, y: to.y - 10 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onComplete(function () {
        that.move()
      });

    moveUp.start();
    moveUp.chain(moveSide);
    moveSide.chain(moveDown);
   }
    
  }

  start() {
    requestAnimationFrame(this.start);
    this.time += 0.01;

    if (this.number != document.getElementById("number").value) {
      this.deleteGeometry();
      this.number = document.getElementById("number").value;
      this.createTorrus(this.number);
    }

    for (var i = 0; i < this.number - 1; i++) {
      this.torrus[i].update();
    }
    this.controls.update();
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  }
}
