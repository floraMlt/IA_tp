
import { TorusGeometry, MeshBasicMaterial, MeshPhysicalMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor(x,y,r,c) {
    const geometry = new TorusGeometry( r, 1, 16, 100);
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.rotation.x = 190;

  }

  update() {
  }

}