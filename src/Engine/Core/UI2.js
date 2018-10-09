import {
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  Texture
} from "three";

import { Collection } from "../Utils";

class UI {
  constructor(engine) {
    this.width = engine.state.config.width;
    this.height = engine.state.config.height;

    this.camera = new OrthographicCamera(
      -engine.state.config.width / 2,
      engine.state.config.width / 2,
      engine.state.config.height / 2,
      -engine.state.config.height / 2,
      0,
      30
    );

    this.scene = new Scene();
  }

  add(object) {
    this.scene.add(object);
  }

  update(deltaSec) {
    this.scene.children.forEach(c => {
      if (typeof c.onUpdate === "function") {
        c.onUpdate(deltaSec);
      }
    });
  }

  getCollisions(mousePos, mousePosNorm) {
    // const collisions = [];
    // this.scene.children.forEach(c => {
    // if (
    //   c.collision &&
    //   c.collision.broadPhase(mousePos) &&
    //   c.collision.collide(mousePos)
    // ) {
    //   collisions.push(c);
    // }
    // });
    // console.log("UI collisions: ", collisions);
  }

  render(renderer) {
    renderer.render(this.scene, this.camera);
  }
}

export default UI;
