import { Engine, GameScene } from "./Engine/Core";
import { LightBox } from "./Engine/Objects";
import {
  ColorSelector,
  GhostBox,
  FloorGrid,
  RefpointLine,
  VoxelEditor
} from "./Game";

window.$hmr = window.$hmr || {};

const game = new Engine({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  viewAngle: 68,
  nearPlane: 0.1,
  farPlane: 10000,
  container: document.querySelector("#container")
});

const mainScene = new GameScene();

// BOX
const box = new GhostBox();

// GRID
const grid = new FloorGrid();

// LIGHTS
const lightBox = new LightBox({ ignoreMouseTrace: true });

// VOXELS
const voxelEditor = new VoxelEditor();

// SPRITE
const colorSelector = new ColorSelector();

// CAMERA REFPOINT
const refpointLine = new RefpointLine();

game.state.selectedColor = "#FFF";

mainScene.add(box);
mainScene.add(grid);
mainScene.add(lightBox);
mainScene.add(voxelEditor);
mainScene.add(refpointLine);

game.UI.add(colorSelector);

game.setScene(mainScene);

if (module.hot) {
  module.hot.dispose(() => {
    window.$hmr.voxels = voxelEditor;
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
