
import { ConeGeometry, MeshPhysicalMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor(x, y, z, b, h, c) {
    const geometry = new ConeGeometry(b, h, 4, 1);
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  update() {
  }

}