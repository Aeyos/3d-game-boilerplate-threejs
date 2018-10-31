import { MeshLambertMaterial, Mesh, BoxGeometry, Vector3 } from "three";
import FeaturedClass from "../Core/FeaturedClass";

class Box extends FeaturedClass(Mesh) {
  constructor(args) {
    const defaultArgs = {
      color: 0xffffff,
      pos: new Vector3(0, 0, 0),
      w: 2,
      h: 2,
      l: 2,
      opacity: 1
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
