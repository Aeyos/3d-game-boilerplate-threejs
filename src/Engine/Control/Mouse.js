import { Vector2 } from "three";
import { noop } from "../Utils";
import { TARGETS } from "../Core/Const";

export default class Mouse {
  constructor(state) {
    state.mouse = this;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseWheel = this.mouseWheel.bind(this);
    this.width = state.config.width;
    this.height = state.config.height;

    // Event binding
    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("wheel", this.mouseWheel);
    window.addEventListener("contextmenu", noop);

    // Declaration
    this.mouseLeft = false;
    this.mouseUpLeft = false;
    this.mouseRight = false;
    this.dragStart = new Vector2(0, 0);
    this.dragStep = new Vector2(0, 0);
    this.dragDelta = new Vector2(0, 0);
    this.pos = new Vector2(0, 0);
    this.normalPos = new Vector2(0, 0);
    this.target = TARGETS.WORLD;
  }

  destroy() {
    window.removeEventListener("mousedown", this.mouseDown);
    window.removeEventListener("mouseup", this.mouseUp);
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("wheel", this.mouseWheel);
    window.removeEventListener("contextmenu", () => false);
  }

  mouseDown(evt) {
    console.log("MOUSE DOWNNNNNNNNNNNNNNNNNNNNNN!!!!!!!!!!!!!");
    evt.preventDefault();

    if (evt.button === 0) {
      this.mouseLeft = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
    }

    if (evt.button === 1) {
      this.mouseMiddle = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
    }

    if (evt.button === 2) {
      this.mouseRight = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
    }

    return false;
  }

  mouseUp(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.mouseLeft = false;
      this.mouseUpLeft = true;

      if (!this.isDragging) {
        this.mouseClickLeft = true;
      }
    }

    if (evt.button === 1) {
      this.mouseMiddle = false;
      this.mouseUpMiddle = true;

      if (!this.isDragging) {
        this.mouseClickMiddle = true;
      }
    }

    if (evt.button === 2) {
      this.mouseRight = false;
      this.mouseUpRight = true;

      if (!this.isDragging) {
        this.mouseClickRight = true;
      }
    }

    this.resetDrag();

    return false;
  }

  mouseMove(evt) {
    evt.preventDefault();

    if (this.mouseLeft || this.mouseRight) {
      this.dragDelta.x = evt.clientX - this.dragStart.x - this.dragStep.x;
      this.dragDelta.y = evt.clientY - this.dragStart.y - this.dragStep.y;

      this.dragStep.x = evt.clientX - this.dragStart.x;
      this.dragStep.y = evt.clientY - this.dragStart.y;
    }

    if (Math.abs(this.dragStep.x) >= 5 || Math.abs(this.dragStep.y) >= 5) {
      this.isDragging = true;
    } else if (!this.isDragging) {
      this.isDragging = false;
    }

    this.pos.x = evt.clientX;
    this.pos.y = evt.clientY;

    this.normalPos.x = (this.pos.x / this.width) * 2 - 1;
    this.normalPos.y = -(this.pos.y / this.height) * 2 + 1;

    return false;
  }

  resetDrag() {
    this.isDragging = false;
    this.dragStart.x = this.dragStart.y = this.dragStep.x = this.dragStep.y = this.dragDelta.x = this.dragDelta.y = -1;
  }

  mouseWheel(evt) {
    evt.preventDefault();

    this.scrollX = evt.deltaX;
    this.scrollY = evt.deltaY;

    return false;
  }

  loopEnd() {
    this.mouseUpLeft = this.mouseClickLeft = this.mouseUpMiddle = this.mouseClickMiddle = this.mouseUpRight = this.mouseClickRight = false;

    this.dragDelta.x = 0;
    this.dragDelta.y = 0;

    this.scrollX = 0;
    this.scrollY = 0;
  }
}
