import { MeshLambertMaterial, Mesh, BoxGeometry, Vector3 } from "three";
import { BaseObject } from "../Core";

class Box extends Mesh {
  constructor(args = {}) {
    const defaultArgs = {
      color: 0xffffff,
      pos: new Vector3(0, 0, 0),
      w: 2,
      h: 2,
      l: 2,
      opacity: 1
    };

    const boxArgs = { ...defaultArgs, ...args };

    // -- MATERIAL
    const boxMaterial = new MeshLambertMaterial({
      color: boxArgs.color,
      transparent: Boolean(args.opacity),
      opacity: boxArgs.opacity
    });

    // -- GEOMETRY
    const boxGeometry = new BoxGeometry(boxArgs.w, boxArgs.h, boxArgs.l);

    // -- CREATE MESH
    super(boxGeometry, boxMaterial);

    // Set position
    Object.assign(this.position, boxArgs.pos);
  }
}

export default BaseObject(Box);
