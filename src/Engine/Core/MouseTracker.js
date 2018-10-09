import { Vector2 } from "three";
import { TARGETS } from "./Const";

export default class MouseTracker {
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
    window.addEventListener("contextmenu", () => false);

    // Declaration
    this.mouseLeft = false;
    this.mouseUpLeft = false;
    this.mouseRight = false;
    this.dragStart = new Vector2(0, 0);
    this.dragDelta = new Vector2(0, 0);
    this.pos = new Vector2(0, 0);
    this.normalPos = new Vector2(0, 0);
    this.target = TARGETS.WORLD;

    state.mouse = {
      mouseLeft: this.mouseLeft,
      mouseUpLeft: this.mouseLeft,
      mouseRight: this.mouseRight,
      dragStart: this.dragStart,
      dragDelta: this.dragDelta,
      pos: this.pos,
      normalPos: this.normalPos
    };
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

      if (Math.abs(this.dragDelta.x) <= 1 && Math.abs(this.dragDelta.y) <= 1) {
        this.mouseUpLeft = true;
        this.stateRef.mouse.mouseUpLeft = this.mouseUpLeft;
      }

      this.stateRef.mouse.mouseLeft = this.mouseLeft;
      this.resetDrag();
    }

    if (evt.button === 1) {
      this.mouseMiddle = false;

      if (Math.abs(this.dragDelta.x) <= 1 && Math.abs(this.dragDelta.y) <= 1) {
        this.mouseUpMiddle = true;
        this.stateRef.mouse.mouseUpMiddle = this.mouseUpMiddle;
      }

      this.stateRef.mouse.mouseMiddle = this.mouseMiddle;
      this.resetDrag();
    }

    if (evt.button === 2) {
      this.mouseRight = false;

      if (Math.abs(this.dragDelta.x) <= 1 && Math.abs(this.dragDelta.y) <= 1) {
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
      this.dragDelta.x = evt.clientX - this.dragStart.x;
      this.dragDelta.y = evt.clientY - this.dragStart.y;
    }

    this.pos.x = evt.clientX;
    this.pos.y = evt.clientY;

    this.normalPos.x = (this.pos.x / this.width) * 2 - 1;
    this.normalPos.y = -(this.pos.y / this.height) * 2 + 1;

    const UICollisions = this.checkUICollisions();

    return false;
  }

  resetDrag() {
    this.dragStart.x = this.dragStart.y = this.dragDelta.x = this.dragDelta.y = 0;
  }

  mouseWheel(evt) {
    evt.preventDefault();

    return false;
  }

  checkUICollisions() {
    // console.log(this.stateRef.refs);
    // this.stateRef.refs.UI.getCollisions(this.pos, this.normalPos);
  }
}
