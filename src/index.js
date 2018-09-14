import { Vector3 } from "three";

import Game from "./game";
import Sphere from "./sphere";
import Light from "./light";
import Grid from "./grid";
import Pointer from "./utils/Pointer";

const game = new Game({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  viewAngle: 45,
  nearPlane: 0.1,
  farPlane: 10000,
  container: document.querySelector("#container")
});

const sphere = new Sphere();
const sphere2 = new Sphere({
  color: 0xffffff,
  pos: new Vector3(0, 0, 0)
});
const grid = new Grid();

const light = new Light();
const pointer = new Pointer(game.scene, game.camera, game.mouseTracker, 0.05);

game.scene.add(sphere);
// game.scene.add(sphere2);
game.scene.add(grid);
game.scene.add(light);

game.onUpdate = delta => {
  pointer.update(delta);
};

if (module.hot) {
  module.hot.dispose(() => {
    game.destroy();
  });
}
