import { EVENTS } from "../Core/Const";
import { noop, Collection } from "../Utils";

export default defClass =>
  class FeaturedClass extends defClass {
    constructor(featuredArgs, ...args) {
      super(...args);

      // EVENTS.forEach(e => {
      //   this[`before${e}`] = this[`on${e}`] = noop;
      // });

      this.ignoreMouseTrace = Boolean(featuredArgs.ignoreMouseTrace);
      if (window.$state) {
        this.$gameState = window.$state;
      }
    }

    attach(component) {
      this[component.propName] = component;
    }

    detach(component) {
      delete this[component.propName];
    }
  };
