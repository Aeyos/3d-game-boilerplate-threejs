import { Scene } from "three";
import TypedClass from "./TypedClass";
import { EVENTS } from "./Const";
import { Collection } from "../Utils";
import { ForAllChildren } from "../Utils/ThreeHelpers";

class GameScene extends TypedClass {
  constructor(args) {
    super(args);

    Object.assign(this, args);

    this.objects = new Collection();

    this.scene = new Scene();

    EVENTS.forEach(e => {
      const eventName = `on${e}`;
      this[eventName] = delta => this.updateAll(this.objects, eventName, delta);
    });
  }

  refChildren($engine) {
    ForAllChildren(this.scene.children, obj => {
      obj.$gameState = this.$engine.state;
    });
  }

  add(obj) {
    if (this.$engine) {
      obj.$gameState = this.$engine.state;
    }

    this.scene.add(obj);

    this.objects.push(obj);
  }

  remove(obj) {
    this.scene.remove(obj);

    this.objects.remove(obj);
  }

  updateAll(objects, eventName, delta) {
    objects.forEach(o => {
      if (o.children.length) {
        this.updateAll(o.children, eventName, delta);
      }
      if (typeof o[eventName] === "function") {
        o[eventName](delta);
      }
    });
  }
}

GameScene.argTypes = {};

export default GameScene;
