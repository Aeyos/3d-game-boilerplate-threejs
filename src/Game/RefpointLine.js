import { Line, LineDashedMaterial, Geometry, Vector3 } from "three";
import { EmptyObject } from "../Engine/Objects";

export default class RefpointLine extends EmptyObject {
  constructor(props) {
    super({ ignoreMouseTrace: true, ...props });

    const material = new LineDashedMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      linewidth: 1,
      scale: 0.5,
      dashSize: 0.1,
      gapSize: 0.1
    });

    const geometry = new Geometry();
    geometry.vertices.push(new Vector3(0, -25, 0), new Vector3(0, 25, 0));
    const line = new Line(geometry, material);
    line.computeLineDistances();
    this.line = line;

    this.add(line);
  }

  onUpdate() {
    const refPoint = this.$gameState.cameraControls.refPoint;

    this.line.position.set(refPoint.x, refPoint.y, refPoint.z);
  }
}
