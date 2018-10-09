import { Object3D } from "three";
import { FeaturedClass } from "../Core";

class EmptyObject extends FeaturedClass(Object3D) {
  constructor(args) {
    super(args);

    // Object.assign(
    //   this,
    //   {
    //     geometry: null,
    //     material: null,
    //     mesh: new Object3D(),
    //     // children: []
    //   },
    //   args
    // );
  }

  // add(obj) {
  //   this.children.push(obj);
  //   this.mesh.add(obj.mesh);
  // }

  // remove(obj) {
  //   this.mesh.remove(obj.mesh);
  //   console.log(this.children);
  //   this.children.remove(obj);
  //   console.log(this.children);
  // }
}

export default EmptyObject;
