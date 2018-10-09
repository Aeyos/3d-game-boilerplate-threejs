import { Grid } from "../Engine";

class FloorGrid extends Grid {
  constructor(args) {
    super({ ignoreMouseTrace: true });
  }
  onUpdate(delta) {
    this.material.opacity =
      1 / (this.$gameState.refs.camera.position.y * 0.05 + 1);
  }
}

export default FloorGrid;
