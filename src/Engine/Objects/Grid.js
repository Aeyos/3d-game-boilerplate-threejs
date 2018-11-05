import { Geometry, LineDashedMaterial, Line, Vector3 } from "three";
import EmptyObject from "./EmptyObject";
import { BaseObject } from "../Core";

class Grid extends EmptyObject {
  constructor(args) {
    super(args || {});

    const material = new LineDashedMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
      scale: 0.5,
      dashSize: 0.1,
      gapSize: 0.1
    });

    for (let i = -50; i <= 50; i++) {
      const geometry = new Geometry();
      geometry.vertices.push(new Vector3(i, 0, -50), new Vector3(i, 0, 50));

      geometry.vertices[0].x = i;
      geometry.vertices[1].x = i;
      const line = new Line(geometry, material);
      line.computeLineDistances();
      this.add(line);
    }

    for (let i = -50; i <= 50; i++) {
      const geometry = new Geometry();
      geometry.vertices.push(new Vector3(-50, 0, i), new Vector3(50, 0, i));

      geometry.vertices[0].z = i;
      geometry.vertices[1].z = i;
      const line = new Line(geometry, material);
      line.computeLineDistances();
      this.add(line);
    }

    this.material = material;
  }
}

export default BaseObject(Grid);
