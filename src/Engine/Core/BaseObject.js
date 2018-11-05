function getObjectName(obj) {
  try {
    return obj.constructor.name;
  } catch (__) {}
  return typeof obj;
}

export default function(customClass) {
  return function(args = {}) {
    if (customClass.propTypes && Object.keys(customClass.propTypes).length) {
      Object.entries(customClass.propTypes).forEach(rc => {
        if (!args[rc[0]] === undefined) {
          throw new Error(`"${rc[0]}" is required`);
        } else if (!rc[1](args[rc[0]])) {
          const err = new Error(
            `"${rc[0]}" is of wrong type (${getObjectName(
              args[rc[0]]
            )}) expected (${rc[1].name || rc[1].toString()})`
          );
          err.stackTraceLimit = 0;
          throw err;
        }
      });
    }

    const { ignoreMouseTrace, ...classArgs } = args;
    const obj = new customClass(...classArgs);

    obj.ignoreMouseTrace = Boolean(ignoreMouseTrace);

    return obj;
  };
}
