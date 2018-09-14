import { Vector2, Vector3 } from "three";

export default class MouseTracker {
  constructor(width, height) {
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseWheel = this.mouseWheel.bind(this);
    this.width = width;
    this.height = height;

    // Event binding
    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("wheel", this.mouseWheel);
    window.addEventListener("contextmenu", () => false);

    // Declaration
    this.pressingLeft = false;
    this.pressingRight = false;
    this.dragStart = new Vector3(0, 0, 0);
    this.dragDelta = new Vector2(0, 0);
    this.pos = new Vector2(0, 0);
  }

  mouseDown(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.pressingLeft = true;

      this.dragStart = new Vector2(evt.clientX, evt.clientY);
    }

    if (evt.button === 2) {
      this.pressingRight = true;

      this.dragStart = new Vector2(evt.clientX, evt.clientY);
    }

    return false;
  }

  mouseUp(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.pressingLeft = false;
    }

    if (evt.button === 2) {
      this.pressingRight = false;
    }

    return false;
  }

  mouseMove(evt) {
    evt.preventDefault();

    if (this.pressingLeft || this.pressingRight) {
      this.dragDelta.x = evt.clientX - this.dragStart.x;
      this.dragDelta.y = evt.clientY - this.dragStart.y;
    }

    this.pos.x = evt.clientX;
    this.pos.y = evt.clientY;

    return false;
  }

  getNormalizedCoords() {
    return new Vector2(
      (this.pos.x / this.width) * 2 - 1,
      -(this.pos.y / this.height) * 2 + 1
    );
  }

  mouseWheel(evt) {
    evt.preventDefault();

    return false;
  }
}
