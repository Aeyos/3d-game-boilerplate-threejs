import { Map } from "immutable";

export default class GlobalStateMachine {
  constructor() {
    this.state = new Map({});
    this.newState = null;
  }

  getNewState() {
    return this.newState ? this.newState : this.state;
  }

  set(prop, val) {
    this.newState = this.getNewState().set(prop, val);
  }

  get(prop) {
    return this.state.get(prop);
  }

  setIn(arr, val) {
    this.newState = this.getNewState().setIn(arr, val);
  }

  getIn(arr) {
    return this.state.getIn(arr);
  }

  commit() {
    this.state = this.newState;
    this.newState = null;
  }

  flush() {
    this.newState = null;
  }
}
