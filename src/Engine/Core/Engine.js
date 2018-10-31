import {
  Color,
  Clock,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer
} from "three";

import CameraControls from "../Control/CameraControls2";
import Types from "../Utils/Types";
import { Pointer } from "../Control";
import { Keyboard, Mouse } from "../Control";
import UI from "./UI";
import TypedClass from "./TypedClass";
import FeaturedClass from "./FeaturedClass";
import { EVENTS as fns } from "./Const";

class Game extends TypedClass {
  constructor(args) {
    if (!args) {
      throw new Error("Engine object requires arguments");
    }

    super(args);

    // CONFIG
    this.config = args;
    this.config.aspect = this.config.width / this.config.height;

    // STATEFUL
    this.state = {};
    this.state.config = this.config;

    // THREEJS SETUP
    // - Renderer
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.config.width, this.config.height);
    this.renderer.autoClear = false;
    // - Camera
    this.camera = new PerspectiveCamera(
      this.config.viewAngle,
      this.config.aspect,
      this.config.near,
      this.config.far
    );
    // - Controls
    this.mouse = new Mouse(this.state);
    this.keyboard = new Keyboard(this.state);
    this.pointer = new Pointer(this.state, 0.05);
    this.clock = new Clock();
    this.UI = new UI(this);

    // BOOTSTRAP
    this.clock.start();
    this.config.container.appendChild(this.renderer.domElement);

    // STATE
    this.state.refs = {
      camera: this.camera,
      pointer: this.pointer,
      renderer: this.renderer,
      UI: this.UI
    };

    // - Controls
    this.cameraControls = new CameraControls(this.state);
    this.state.cameraControls = this.cameraControls;

    // EVENTS
    this.renderer.domElement.oncontextmenu = () => false;

    // EXTERNALIZATION
    window.$state = this.state;

    // FINAL SETUP
    this.isDestroyed = false;
    requestAnimationFrame(this.loop.bind(this));
  }

  destroy() {
    this.isDestroyed = true;

    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null;

    delete this.camera;
    delete this.clock;
    delete this.scene;

    this.mouse.destroy();
    this.keyboard.destroy();

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  setScene(scene) {
    this.scene = scene;
    this.state.refs.scene = this.scene;
    this.scene.$engine = this;
    this.scene.refChildren();
  }

  handleInput(deltaSec) {
    this.keyboard.update(deltaSec);

    this.pointer.update(deltaSec);

    this.cameraControls.update(deltaSec);
  }
  handleCollision(deltaSec) {}
  handleAnimation(deltaSec) {
    if (this.scene) {
      this.updateAll(this.scene.children, deltaSec);
    }
    if (this.UI) {
      this.updateAll(this.UI.scene.children, deltaSec);
    }
  }
  handlePhysics(deltaSec) {}
  handleEvents(deltaSec) {}
  handleAI(deltaSec) {}
  handleUpdate(deltaSec) {}
  handleUI(deltaSec) {
    this.UI.update();
  }
  handleLoopEnd(deltaSec) {
    this.mouse.loopEnd();
  }

  loop() {
    if (this.isDestroyed) return;
    if (!this.scene) return;

    try {
      const delta = this.clock.getDelta();

      fns.forEach(fn => {
        // ENGINE "BEFORE" EVENT
        if (typeof this[`onBefore${fn}`] === "function") {
          this[`onBefore${fn}`].call(this, delta);
        }

        // ENGINE "HANDLE" EVENT
        this[`handle${fn}`].call(this, delta);

        // ENGINE "ON" EVENT
        if (typeof this[`on${fn}`] === "function") {
          this[`on${fn}`].call(this, delta);
        }

        // SCENE "ON" EVENT
        if (typeof this.scene[`on${fn}`] === "function") {
          this.scene[`on${fn}`].call(this, delta);
        }
      });

      // Render scene
      this.renderer.render(this.scene, this.camera);
      this.UI.render(this.renderer);

      // Clean-up, prepare
      this.handleLoopEnd();

      // Schedule the next frame.
      requestAnimationFrame(this.loop.bind(this));
    } catch (e) {
      if (!this.hasError) {
        this.hasError = true;
        console.error(e);
      }
    }
  }

  updateAll(objects, delta) {
    objects.forEach(o => {
      if (o.children.length) {
        this.updateAll(o.children, delta);
      }
      if (o.animation) {
        o.animation.update(delta);
      }
    });
  }
}

Game.argTypes = {
  width: Types.Number,
  height: Types.Number,
  viewAngle: Types.Number,
  nearPlane: Types.Number,
  farPlane: Types.Number,
  container: Types.HTMLElement
};

export default Game;
