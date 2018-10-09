class TypedClass {
  constructor(args) {
    if (
      !this.constructor.argTypes ||
      !Object.keys(this.constructor.argTypes).length
    ) {
      return;
    }

    if (!args) {
      throw new Error(`Class "${this.constructor.name}" requires arguments`);
    }

    Object.entries(this.constructor.argTypes).forEach(rc => {
      if (!args[rc[0]] === undefined) {
        throw new Error(`"${rc[0]}" is required`);
      } else if (!rc[1](args[rc[0]])) {
        const err = new Error(
          `"${rc[0]}" is of wrong type (${this.getObjectName(
            args[rc[0]]
          )}) expected (${rc[1].name || rc[1].toString()})`
        );
        err.stackTraceLimit = 0;
        throw err;
      }
    });
  }

  getObjectName(obj) {
    try {
      return obj.constructor.name;
    } catch (__) {}
    return typeof obj;
  }
}

export default TypedClass;
