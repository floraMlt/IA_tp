
import { CylinderGeometry, MeshBasicMaterial, MeshPhysicalMaterial, Mesh } from 'three'

export default class Cylinder extends Mesh {

  constructor(x, y, s) {
    const geometry = new CylinderGeometry( 2, 2, 20, 32 );
    const material = new MeshPhysicalMaterial( { color: 0x3425AF, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.scale.x = s;
    this.scale.y = s;
    this.scale.z = s;
  }

}