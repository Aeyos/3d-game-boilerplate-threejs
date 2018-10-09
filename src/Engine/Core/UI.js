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
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = Math.pow(
      2,
      Math.ceil(Math.log2(engine.state.config.width))
    );
    this.canvas.height = Math.pow(
      2,
      Math.ceil(Math.log2(engine.state.config.height))
    );

    this.texture = new Texture(this.canvas);
    this.texture.needUpdate = true;

    this.material = new MeshBasicMaterial({ map: this.texture });
    this.material.transparent = true;

    this.plane = new PlaneGeometry(
      engine.state.config.width,
      engine.state.config.height
    );

    // UV REMAPPING
    const px = engine.state.config.width / this.canvas.width;
    const py = 1 - engine.state.config.height / this.canvas.height;
    // X
    this.plane.faceVertexUvs[0][0][2].x = px;
    this.plane.faceVertexUvs[0][1][1].x = px;
    this.plane.faceVertexUvs[0][1][2].x = px;
    // Y
    this.plane.faceVertexUvs[0][0][1].y = py;
    this.plane.faceVertexUvs[0][1][0].y = py;
    this.plane.faceVertexUvs[0][1][1].y = py;

    this.mesh = new Mesh(this.plane, this.material);

    this.camera = new OrthographicCamera(
      -engine.state.config.width / 2,
      engine.state.config.width / 2,
      engine.state.config.height / 2,
      -engine.state.config.height / 2,
      0,
      30
    );

    this.children = new Collection();
    this.scene = new Scene();

    this.scene.add(this.mesh);
  }

  add(object) {
    this.children.push(object);
  }

  update(deltaSec) {
    this.children.forEach(c => {
      if (typeof c.onUpdate === "function") {
        c.onUpdate(deltaSec);
      }
    });
  }

  getCollisions(mousePos, mousePosNorm) {
    const collisions = [];
    this.children.forEach(c => {
      // if (
      //   c.collision &&
      //   c.collision.broadPhase(mousePos) &&
      //   c.collision.collide(mousePos)
      // ) {
      //   collisions.push(c);
      // }
    });
    console.log("UI collisions: ", collisions);
  }

  render(renderer) {
    this.children.forEach(c => {
      this.ctx.drawImage(c.canvas, c.position.x, c.position.y);
    });

    this.texture.needsUpdate = true;
    renderer.render(this.scene, this.camera);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default UI;
