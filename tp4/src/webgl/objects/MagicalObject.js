
import { BoxGeometry, MeshPhysicalMaterial, Mesh } from 'three'

export default class MagicalObject extends Mesh {

  constructor(x,y,z,r,c) {
    const geometry = new BoxGeometry( 5,0.5,0.2);
    geometry.translate( 2.5, 0, 0 )
    const material = new MeshPhysicalMaterial( { color: c, wireframe: false, roughness: 1, metalness: 0, clearcoat: 1 } );
    super(geometry, material);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.rotation.z = r;
  }

  update() {
  }

}