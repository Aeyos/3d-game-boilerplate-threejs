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
    console.clog(`%c${name}`, "background-color: hsl(180, 100%, 95%)");
    console.clog(...args);
  };
  console.log.isModified = true;
}

if (!console.warn.isModified) {
  console.cwarn = console.warn;
  console.warn = function(...args) {
    const obj = {};
    Error.captureStackTrace(obj);

    const name = obj.stack.replace(
      /^[\s\S]*?at[\s\S]*?at (.*?)\s(?:.*\/)(.*?)\)[\s\S]*$/gi,
      "@ $1 ($2)"
    );
    console.cwarn(`%c${name}`, "background-color: hsl(90, 100%, 95%)");
    console.cwarn(...args);
  };
  console.warn.isModified = true;
}

if (!console.error.isModified) {
  console.cerror = console.error;
  console.error = function(...args) {
    const obj = {};
    Error.captureStackTrace(obj);

    const name = obj.stack.replace(
      /^[\s\S]*?at[\s\S]*?at (.*?)\s(?:.*\/)(.*?)\)[\s\S]*$/gi,
      "@ $1 ($2)"
    );
    console.cerror(`%c${name}`, "background-color: hsl(0, 100%, 95%)");
    console.cerror(...args);
  };
  console.error.isModified = true;
}

window.$engine = engine;
