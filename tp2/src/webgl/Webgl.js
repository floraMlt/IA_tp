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

    this.runMenger(this.scene, -1.5, -1.5, -1.5, 20,2);

    this.camera.position.z = 45;

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

  createCube(x,y,z,d){
    this.cube = new MagicalObject(x, y, z, d, this.getColor());
    this.scene.add(this.cube);
  }

  runMenger(scene, x, y, z, d, it, lvl=0) {
    if (it === lvl) {
      this.createCube(x, y, z, d)
    }
    else {
      const ns = d / 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          for (let k = 0; k < 3; k++) {
            if ((i !== 1 && j !== 1) || (k !== 1 && j !== 1) || (i !== 1 && k !== 1)) {
              this.runMenger(scene, x + i * ns, y + j * ns, z + k * ns, ns, it, lvl + 1);
            }
          }
        }
      }
    }
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
