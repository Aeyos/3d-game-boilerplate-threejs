import { KEYBOARD_KEYS } from "../Core/Const";

export default class Keyboard {
  constructor(state) {
    this.stateRef = state;

    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);

    // Event binding
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);

    state.keyboard = KEYBOARD_KEYS.reduce((acc, val) => {
      acc[val] = {
        pressed: false,
        delta: 0
      };
      return acc;
    }, {});
  }

  destroy() {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  }

  update(delta) {
    Object.values(this.stateRef.keyboard)
      .filter(e => e.pressed)
      .forEach(key => {
        key.delta += delta;
      });
  }

  setKeyDown(key) {
    if (!this.stateRef.keyboard[key] || !this.stateRef.keyboard[key].pressed) {
      this.stateRef.keyboard[key] = {
        pressed: true,
        delta: 0
      };
    }
  }

  setKeyUp(key) {
    this.stateRef.keyboard[key] = {
      pressed: false,
      delta: 0
    };
  }

  keyDown(evt) {
    evt.preventDefault();
    this.setKeyDown(evt.code);
  }

  keyUp(evt) {
    this.setKeyUp(evt.code);
  }
}
