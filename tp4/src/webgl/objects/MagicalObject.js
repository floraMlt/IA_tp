
import { BoxGeometry, MeshPhysicalMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor(x,y,z,c) {
    const geometry = new BoxGeometry(5,5);
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  update() {
  }

}