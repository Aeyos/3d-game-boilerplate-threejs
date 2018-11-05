import { Box, Light, Grid, Scene } from "../Engine";

class Game {
  constructor(args) {
    const mainScene = new Scene();

    this.engine = args.engine;
    this.scenes = [mainScene];

    this.engine.setScene(this.scenes[0]);

    this.box = new Box();
    this.light = new Light();
    this.grid = new Grid();

    this.box.onUpdate = delta => {
      this.box.rotation.x += delta;
      this.box.rotation.y += delta * 1.5;
      this.box.rotation.z += delta * 2;
    };

    mainScene.add(this.box);
    mainScene.add(this.light);
    mainScene.add(this.grid);
  }
}

export default Game;
