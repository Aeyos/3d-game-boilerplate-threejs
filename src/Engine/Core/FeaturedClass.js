export default defClass =>
  class FeaturedClass extends defClass {
    constructor(featuredArgs, ...args) {
      super(...args);

      const fargs = featuredArgs || {};

      this.ignoreMouseTrace = Boolean(fargs.ignoreMouseTrace);
    }

    attach(component) {
      this[component.propName] = component;
    }

    detach(component) {
      delete this[component.propName];
    }
  };
