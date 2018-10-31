import { Scene } from "three";

import { Collection } from "../Utils";
import { ForAllChildren } from "../Utils/ThreeHelpers";

import FeaturedClass from "./FeaturedClass";
import { EVENTS } from "./Const";

class GameScene extends FeaturedClass(Scene) {
  constructor(featureArgs, args) {
    super(args);

    EVENTS.forEach(e => {
      const eventName = `on${e}`;
      this[eventName] = delta =>
        this.updateAll(this.children, eventName, delta);
    });
  }

  refChildren($engine) {
    ForAllChildren(this.children, obj => {
      obj.$gameState = this.$engine.state;
    });
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
