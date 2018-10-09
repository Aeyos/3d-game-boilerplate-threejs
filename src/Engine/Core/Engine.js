import { Color, Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";

import CameraControls from "../Control/CameraControls";
import Types from "../Utils/Types";
import { Pointer } from "../Control";
import MouseTracker from "./MouseTracker";
import UI from "./UI2";
import TypedClass from "./TypedClass";
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
    this.cameraControls = new CameraControls(this.camera, camera => {
      this.state.camera = camera;
    });
    this.mouseTracker = new MouseTracker(this.state);
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

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  setScene(scene) {
    this.scene = scene;
    this.state.refs.scene = this.scene;
  }

  handleInput(deltaSec) {
    if (this.state.mouse.mouseUpLeft) {
      this.state.mouse.mouseUpLeft = false;
      this.state.mouse.mouseClickLeft = true;
    } else if (this.state.mouse.mouseClickLeft) {
      this.state.mouse.mouseClickLeft = false;
    }

    if (this.state.mouse.mouseUpRight) {
      this.state.mouse.mouseUpRight = false;
      this.state.mouse.mouseClickRight = true;
    } else if (this.state.mouse.mouseClickRight) {
      this.state.mouse.mouseClickRight = false;
    }

    this.pointer.update(deltaSec);
  }
  handleCollision(deltaSec) {}
  handleAnimation(deltaSec) {
    if (this.scene) {
      this.updateAll(this.scene.scene.children, deltaSec);
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

  loop() {
    if (this.isDestroyed) return;

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
        this.scene[`on${fn}`].call(this, delta);
      });

      // Render scene
      this.renderer.render(this.scene.scene, this.camera);
      this.UI.render(this.renderer);

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
