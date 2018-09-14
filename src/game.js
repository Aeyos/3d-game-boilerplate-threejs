import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import CameraControls from "./control/CameraControls";
import MouseTracker from "./control/MouseTracker";

const Number = n => typeof n === "number";
const HTMLElement = e => e instanceof Element;

const requiredConfig = {
  width: Number,
  height: Number,
  viewAngle: Number,
  nearPlane: Number,
  farPlane: Number,
  container: HTMLElement
};

class Game {
  constructor(args) {
    if (!args) {
      throw new Error("Object Game requires arguments");
    }

    Object.entries(requiredConfig).forEach(rc => {
      if (!args[rc[0]]) {
        throw new Error(`"${rc[0]}" is required`);
      } else if (!rc[1](args[rc[0]])) {
        throw new Error(
          `"${rc[0]}" is of wrong type (${typeof args[rc[0]]}) expected (${
            rc[1].name
          })`
        );
      }
    });

    this.config = args;

    this.config.aspect = this.config.width / this.config.height;

    this.renderer = new WebGLRenderer();
    this.camera = new PerspectiveCamera(
      this.config.viewAngle,
      this.config.aspect,
      this.config.near,
      this.config.far
    );

    this.scene = new Scene();

    this.scene.add(this.camera);

    this.renderer.setSize(this.config.width, this.config.height);

    this.renderer.setClearColor(0x222222, 1);

    this.mouseTracker = new MouseTracker(this.config.width, this.config.height);

    this.cameraControls = new CameraControls(this.camera);

    this.clock = new Clock();
    this.clock.start();

    // BOOTSTRAP
    this.config.container.appendChild(this.renderer.domElement);
    this.renderer.domElement.oncontextmenu = () => false;

    if (module.hot) {
      module.hot.dispose(() => {
        console.log("destroy", this.renderer);
        this.destroy = false;
        this.destroy = true;
      });
    }

    this.isDestroyed = false;
    requestAnimationFrame(this.update.bind(this));
  }

  destroy() {
    this.isDestroyed = true;
    this.renderer.dispose();
  }

  update() {
    const delta = this.clock.getDelta();

    if (this.isDestroyed) {
      return;
    }

    this.renderer.render(this.scene, this.camera);

    if (typeof this.onUpdate === "function") {
      this.onUpdate.call(this, delta);
    }

    // Schedule the next frame.
    requestAnimationFrame(this.update.bind(this));
  }
}

export default Game;
