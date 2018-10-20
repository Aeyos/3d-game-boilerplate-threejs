import { Vector2 } from "three";
import { noop } from "../Utils";
import { TARGETS } from "../Core/Const";

export default class Mouse {
  constructor(state) {
    this.stateRef = state;

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

    state.mouse = {
      mouseLeft: this.mouseLeft,
      mouseUpLeft: this.mouseLeft,
      mouseRight: this.mouseRight,
      dragStart: this.dragStart,
      dragStep: this.dragStep,
      dragDelta: this.dragDelta,
      pos: this.pos,
      normalPos: this.normalPos
    };
  }

  destroy() {
    window.removeEventListener("mousedown", this.mouseDown);
    window.removeEventListener("mouseup", this.mouseUp);
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("wheel", this.mouseWheel);
    window.removeEventListener("contextmenu", () => false);
  }

  mouseDown(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.mouseLeft = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
      // State
      this.stateRef.mouse.mouseLeft = this.mouseLeft;
    }

    if (evt.button === 1) {
      this.mouseMiddle = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
      // State
      this.stateRef.mouse.mouseMiddle = this.mouseMiddle;
    }

    if (evt.button === 2) {
      this.mouseRight = true;
      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;
      // State
      this.stateRef.mouse.mouseRight = this.mouseRight;
    }

    return false;
  }

  mouseUp(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.mouseLeft = false;

      if (Math.abs(this.dragStep.x) <= 5 && Math.abs(this.dragStep.y) <= 5) {
        this.mouseUpLeft = true;
        this.stateRef.mouse.mouseUpLeft = this.mouseUpLeft;
      }

      this.stateRef.mouse.mouseLeft = this.mouseLeft;
      this.resetDrag();
    }

    if (evt.button === 1) {
      this.mouseMiddle = false;

      if (Math.abs(this.dragStep.x) <= 5 && Math.abs(this.dragStep.y) <= 5) {
        this.mouseUpMiddle = true;
        this.stateRef.mouse.mouseUpMiddle = this.mouseUpMiddle;
      }

      this.stateRef.mouse.mouseMiddle = this.mouseMiddle;
      this.resetDrag();
    }

    if (evt.button === 2) {
      this.mouseRight = false;

      if (Math.abs(this.dragStep.x) <= 5 && Math.abs(this.dragStep.y) <= 5) {
        this.mouseUpRight = true;
        this.stateRef.mouse.mouseUpRight = this.mouseUpRight;
      }

      this.stateRef.mouse.mouseRight = this.mouseRight;
      this.resetDrag();
    }

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

    this.pos.x = evt.clientX;
    this.pos.y = evt.clientY;

    this.normalPos.x = (this.pos.x / this.width) * 2 - 1;
    this.normalPos.y = -(this.pos.y / this.height) * 2 + 1;

    return false;
  }

  resetDrag() {
    this.dragStart.x = this.dragStart.y = this.dragStep.x = this.dragStep.y = this.dragDelta.x = this.dragDelta.y = -1;
  }

  mouseWheel(evt) {
    evt.preventDefault();

    console.log(evt);

    return false;
  }

  loopEnd() {
    if (this.mouseUpLeft) {
      this.mouseUpLeft = this.stateRef.mouse.mouseUpLeft = false;
      this.stateRef.mouse.mouseClickLeft = true;
    } else if (this.stateRef.mouse.mouseClickLeft) {
      this.stateRef.mouse.mouseClickLeft = false;
    }

    if (this.mouseUpRight) {
      this.mouseUpRight = this.stateRef.mouse.mouseUpRight = false;
      this.stateRef.mouse.mouseClickRight = true;
    } else if (this.stateRef.mouse.mouseClickRight) {
      this.stateRef.mouse.mouseClickRight = false;
    }

    this.dragDelta.x = 0;
    this.dragDelta.y = 0;
  }
}
