import { Collection } from "../Utils";

class Collision2D {
  constructor(args) {
    Object.assign(this, args);

    this.BPShapes = new Collection();
    this.colShapes = new Collection();
  }

  addShape(phase, type, args) {
    const collection = phase === "broad" ? this.BPShapes : this.colShapes;

    switch (type) {
      case "circle":
        collection.push({
          type,
          args,
          collideCheckPoint(point) {
            console.log(this, point);
            // if ()
          }
        });
    }
  }
}

export default Collision2D;
