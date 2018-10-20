import { Color, Vector3 } from "three";
import { Box } from "../Engine";

class GhostBox extends Box {
  constructor(args = {}) {
    super({
      color: 0xffffff,
      pos: new Vector3(0, 0, 0),
      w: 1,
      h: 1,
      l: 1,
      opacity: 0.7,
      ignoreMouseTrace: true
    });
  }

  onUpdate(delta) {
    const point =
      this.$gameState.pointer.intersects[0] ||
      this.$gameState.pointer.collision[0];

    this.material.color = new Color(this.$gameState.selectedColor);

    if (point) {
      this.position.x = Math.round(point.point.x + 0.5) - 0.5;
      this.position.y = Math.round(Math.max(0.01, point.point.y) + 0.5) - 0.5;
      this.position.z = Math.round(point.point.z + 0.5) - 0.5;
    }
  }
}

export default GhostBox;
