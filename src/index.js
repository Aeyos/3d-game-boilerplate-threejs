import { Engine } from "./Engine";
import { Game } from "./Game";

window.$hmr = window.$hmr || {};

const engine = new Engine({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  viewAngle: 68,
  nearPlane: 0.1,
  farPlane: 10000,
  container: document.querySelector("#container")
});

const game = new Game({ engine });

if (module.hot) {
  module.hot.dispose(() => {
    engine.destroy();
  });
}

if (!console.log.isModified) {
  console.clog = console.log;
  console.log = function(...args) {
    const obj = {};
    Error.captureStackTrace(obj);

    const name = obj.stack.replace(
      /^[\s\S]*?at[\s\S]*?at (.*?)\s(?:.*\/)(.*?)\)[\s\S]*$/gi,
      "@ $1 ($2)"
    );
    console.clog(`%c${name}`, "background-color: hsl(0, 100%, 95%)");
    console.clog(...args);
  };
  console.log.isModified = true;
}

window.$engine = engine;
