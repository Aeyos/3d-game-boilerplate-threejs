import { MeshLambertMaterial, Mesh, BoxGeometry, Vector3 } from "three";
import { FeaturedClass, GameObject } from "../Core";

class Box extends FeaturedClass(Mesh) {
  constructor(args) {
    const defaultArgs = {
      radius: 10,
      segments: 16,
      rignt: 8,
      color: 0xcc0000,
      pos: new Vector3(0, 0, -300),
      w: 10,
      h: 10,
      l: 10,
      opacity: 0.1
    };

    const boxArgs = { ...defaultArgs, ...args };
    // Set up the box vars
    const boxMaterial = new MeshLambertMaterial({
      color: boxArgs.color,
      transparent: true,
      opacity: boxArgs.opacity
    });

    // Create a new mesh with
    // box geometry - we will cover
    // the boxMaterial next!
    const boxGeometry = new BoxGeometry(boxArgs.w, boxArgs.h, boxArgs.l);

    super(args, boxGeometry, boxMaterial);

    this.castShadow = true;
    this.receiveShadow = true;

    Object.assign(this.position, boxArgs.pos);
    this.geometry = boxGeometry;
    this.material = boxMaterial;
    // const { position, rotation, quaternion, scale, ...boxx } = box;
    // Object.assign(this, boxx);
  }
}

export default Box;
