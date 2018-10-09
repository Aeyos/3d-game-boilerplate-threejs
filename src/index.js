import { Color, Vector3 } from "three";
import { Animation, Engine, GameScene } from "./Engine/Core";
import { Box, EmptyObject, Grid, LightBox, Sprite } from "./Engine/Objects";

window.$hmr = window.$hmr || {};

const game = new Engine({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  viewAngle: 45,
  nearPlane: 0.1,
  farPlane: 10000,
  container: document.querySelector("#container")
});

const mainScene = new GameScene();

// BOX
const box = new Box({
  color: 0xffffff,
  pos: new Vector3(0, 0, 0),
  w: 1,
  h: 1,
  l: 1,
  opacity: 0.7,
  ignoreMouseTrace: true
});
box.onUpdate = delta => {
  const point =
    game.state.pointer.intersects[0] || game.state.pointer.collision[0];
  if (point) {
    box.position.x = Math.round(point.point.x + 0.5) - 0.5;
    box.position.y = Math.round(Math.max(0.01, point.point.y) + 0.5) - 0.5;
    box.position.z = Math.round(point.point.z + 0.5) - 0.5;
  }
};

// GRID
const grid = new Grid({ ignoreMouseTrace: true });
grid.onUpdate = delta => {
  grid.material.opacity = 1 / (game.state.refs.camera.position.y * 0.05 + 1);
};
// grid.attach(new Animation());
// grid.animation.register(
//   "pulse",
//   {
//     loops: "infinite",
//     easing: "linear",
//     duration: 3000
//   },
//   anim => {
//     grid.material.opacity = Math.sin(anim.progress * Math.PI * 2) * 0.1 + 0.3;
//   }
// );
// grid.animation.play("pulse");

// LIGHTS
const lightBox = new LightBox({ ignoreMouseTrace: true });

// VOXELS
const voxels = window.$hmr.voxels || new EmptyObject();

voxels.onInput = delta => {
  if (game.state.mouse.mouseClickLeft) {
    const point =
      game.state.pointer.intersects[0] || game.state.pointer.collision[0];
    if (point) {
      const newBox = new Box({
        color: Math.random() * 0xffffff,
        pos: new Vector3(
          Math.round(point.point.x + 0.5) - 0.5,
          Math.round(point.point.y + 0.51) - 0.5,
          Math.round(point.point.z + 0.5) - 0.5
        ),
        w: 1.001, // w: 1.025,
        h: 1.001, // h: 1.025,
        l: 1.001, // l: 1.025,
        opacity: 1
      });
      // newBox.attach(new Animation());
      // newBox.animation.register(
      //   "hue",
      //   {
      //     loops: "infinite",
      //     easing: "linear",
      //     duration: 2500
      //   },
      //   anim => {
      //     newBox.scale.x = newBox.scale.y = newBox.scale.z =
      //       Math.sin(anim.progress * Math.PI * 2) * 0.25 + 0.75;
      //   }
      // );
      // newBox.animation.play("hue");
      // newBox.animation.register(
      //   "pulse",
      //   {
      //     loops: "infinite",
      //     easing: "linear",
      //     duration: 5000
      //   },
      //   anim => {
      //     newBox.material.color = new Color(
      //       `hsl(${anim.progress * 360}, 80%, 80%)`
      //     );
      //   }
      // );
      // newBox.animation.play("pulse");
      voxels.add(newBox);
    }
  } else if (
    game.state.pointer.intersects[0] &&
    game.state.mouse.mouseClickRight
  ) {
    voxels.remove(game.state.pointer.intersects[0].object);
  }
};

// SPRITE
// const sprite = new Sprite({ texture: 'assets/ball.png' });
const sprite = new Sprite({
  texture:
    "https://uploads.codesandbox.io/uploads/user/e3b4aea8-bdf2-48b5-8c19-b1bfeb3a0c27/vzRc-ball.png"
});
sprite.attach(new Animation());
sprite.animation.register(
  "wut",
  {
    loops: 4,
    duration: 1000
  },
  anim => {
    sprite.position.x = Math.round(Math.sin(anim.progress * Math.PI * 2) * 100);
    sprite.position.y = Math.round(Math.cos(anim.progress * Math.PI * 2) * 100);
  }
);
sprite.animation.play("wut");
sprite.onUpdate = () => {
  if (game.state.mouse.mouseClickLeft) {
    sprite.animation.play("wut");
  }
};

sprite.scale.x = 64;
sprite.scale.y = 64;

game.UI.add(sprite);

mainScene.add(box);
mainScene.add(grid);
mainScene.add(lightBox);
mainScene.add(voxels);

game.setScene(mainScene);

if (module.hot) {
  module.hot.dispose(() => {
    window.$hmr.voxels = voxels;
    window.$hmr.camera = game.state.camera || window.$hmr.camera;
    game.destroy();
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

window.$game = game;
