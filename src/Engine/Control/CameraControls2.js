import { Vector2, Vector3 } from "three";
import { Between } from "../Utils/Math";

class CameraControls {
  constructor(globalState) {
    this.globalState = globalState;
    console.log("globalState", globalState);

    // Declaration
    this.pressingLeft = false;
    this.dragStart = null;
    this.refPoint = new Vector3(0, 0, 0);
    this.currentYaw = 0;
    this.currentPitch = 2;
    this.armLength = 30;

    if (window.$hmr && window.$hmr.camera) {
      Object.assign(this, window.$hmr.camera);
    }

    // Action
    this.pivot(new Vector2());
    // this.sendUpdate();
  }

  // mouseDown(evt) {
  //     evt.preventDefault();

  //     if (evt.button === 0) {
  //       this.pressingRight = true;

  //       this.dragStart = new Vector2(evt.clientX, evt.clientY);
  //     }

  //     if (evt.button === 1) {
  //       this.pressingMiddle = true;

  //       this.dragStart = new Vector2(evt.clientX, evt.clientY);
  //     }

  //     if (evt.button === 2) {
  //       this.pressingLeft = true;

  //       this.dragStart = new Vector2(evt.clientX, evt.clientY);
  //     }

  //     this.sendUpdate();

  //     return false;
  //   }

  //   mouseUp(evt) {
  //     evt.preventDefault();

  //     if (evt.button === 0) {
  //       this.pressingRight = false;
  //     }

  //     if (evt.button === 1) {
  //       this.pressingMiddle = false;
  //     }

  //     if (evt.button === 2) {
  //       this.pressingLeft = false;

  //       const deltaX = evt.clientX - this.dragStart.x;
  //       const deltaY = evt.clientY - this.dragStart.y;

  //       this.currentYaw = this.currentYaw + deltaX / 200;
  //       this.currentPitch = Between(
  //         this.currentPitch + deltaY / 200,
  //         Math.PI / 2,
  //         Math.PI - 0.01
  //       );
  //     }

  //     this.sendUpdate();

  //     return false;
  //   }

  //   mouseMove(evt) {
  //     evt.preventDefault();

  //     if (this.pressingLeft && this.cameraRef) {
  //       const deltaX = evt.clientX - this.dragStart.x;
  //       const deltaY = evt.clientY - this.dragStart.y;

  //       this.pivot(deltaX, deltaY);
  //     }

  //     if (this.pressingMiddle && this.cameraRef) {
  //       const deltaY = evt.clientY - this.dragStart.y;

  //       this.dragStart.y = evt.clientY;

  //       this.ascend(-deltaY);
  //     }

  //     if (this.pressingRight && this.cameraRef) {
  //       const deltaX = evt.clientX - this.dragStart.x;
  //       const deltaY = evt.clientY - this.dragStart.y;

  //       this.dragStart.x = evt.clientX;
  //       this.dragStart.y = evt.clientY;

  //       this.move(deltaX, deltaY);
  //     }

  //     this.sendUpdate();

  //     return false;
  //   }

  //   mouseWheel(evt) {
  //     evt.preventDefault();
  //     this.armLength -=
  //       (evt.wheelDeltaY / 30) * (Math.max(0.5, this.armLength) * 0.05);
  //     this.armLength = Math.max(0.00001, this.armLength);
  //     this.pivot(0, 0);

  //     this.sendUpdate();

  //     return false;
  //   }

  pivot(delta) {
    // x = ρ sin φ * cos θ
    // y = ρ sin φ * sin θ
    // z = ρ cos φ
    const angleX = this.currentYaw + delta.x / 200;
    this.currentYaw = angleX;
    const angleY = Between(
      this.currentPitch + delta.y / 200,
      Math.PI / 2,
      Math.PI - 0.01
    );
    this.currentPitch = angleY;

    const newX = this.armLength * Math.sin(angleY) * Math.cos(angleX);
    const newZ = this.armLength * Math.sin(angleY) * Math.sin(angleX);
    const newY = -this.armLength * Math.cos(angleY);

    this.globalState.refs.camera.position.x = newX + this.refPoint.x;
    this.globalState.refs.camera.position.y = newY + this.refPoint.y;
    this.globalState.refs.camera.position.z = newZ + this.refPoint.z;

    this.globalState.refs.camera.lookAt(this.refPoint);
  }

  move(delta) {
    const sin = Math.sin(this.currentYaw);
    const cos = Math.cos(this.currentYaw);

    this.refPoint.x += (-delta.y / 50) * cos - (delta.x / 50) * sin;
    this.refPoint.z += (-delta.y / 50) * sin + (delta.x / 50) * cos;

    this.pivot(new Vector2());
  }

  ascend(deltaY) {
    this.refPoint.y += deltaY / 50;

    this.pivot(0, 0);
  }

  sendUpdate() {
    this.onUpdate({
      pressingLeft: this.pressingLeft,
      dragStart: this.dragStart,
      refPoint: this.refPoint,
      currentYaw: this.currentYaw,
      currentPitch: this.currentPitch,
      armLength: this.armLength
    });
  }

  update(deltaSec) {
    const mouse = this.globalState.mouse;
    const keyboard = this.globalState.keyboard;

    if (mouse.mouseRight) {
      this.pivot(mouse.dragDelta);
    }

    let speed = 20;
    if (
      keyboard.KeyA.pressed &&
      (keyboard.KeyW.pressed || keyboard.KeyS.pressed)
    ) {
      speed /= Math.SQRT2;
    }
    if (
      keyboard.KeyD.pressed &&
      (keyboard.KeyW.pressed || keyboard.KeyS.pressed)
    ) {
      speed /= Math.SQRT2;
    }

    if (keyboard.KeyA.pressed) {
      this.move(new Vector2(speed, 0));
    }
    if (keyboard.KeyD.pressed) {
      this.move(new Vector2(-speed, 0));
    }
    if (keyboard.KeyW.pressed) {
      this.move(new Vector2(0, speed));
    }
    if (keyboard.KeyS.pressed) {
      this.move(new Vector2(0, -speed));
    }
  }
}

export default CameraControls;
