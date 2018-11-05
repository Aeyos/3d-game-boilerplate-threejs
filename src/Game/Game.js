import { Box, RGBLights, Grid, Scene } from "../Engine";

class Game {
  constructor(args) {
    const mainScene = new Scene();

    this.engine = args.engine;
    this.scenes = [mainScene];

    this.engine.setScene(this.scenes[0]);

    this.box = new Box();
    this.lights = new RGBLights({ lightIntensity: 0.5, debug: true });
    this.grid = new Grid();

    this.box.onUpdate = delta => {
      this.box.rotation.x += delta;
      this.box.rotation.y += delta;
      this.box.rotation.z += delta;
    };

    this.lights.onUpdate = delta => {
      this.lights.rotation.y -= delta * 1.5;
    };

    mainScene.add(this.box);
    mainScene.add(this.lights);
    mainScene.add(this.grid);
  }
}

export default Game;
