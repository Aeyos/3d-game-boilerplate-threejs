import { Vector2, Vector3 } from "three";
import { Between } from "../Utils/Math";

class CameraControls {
  constructor(globalState) {
    this.globalState = globalState;

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

    this.pivot(new Vector2());
  }

  pivot(delta) {
    // x = ρ sin φ * cos θ
    // y = ρ sin φ * sin θ
    // z = ρ cos φ
    const angleX = this.currentYaw + delta.x / 200;
    this.currentYaw = angleX;
    const angleY = Between(
      this.currentPitch + delta.y / 200,
      0.01,
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

    this.pivot(new Vector2());
  }

  update(deltaSec) {
    const mouse = this.globalState.mouse;
    const keyboard = this.globalState.keyboard;

    if (mouse.mouseRight) {
      this.pivot(mouse.dragDelta);
    }

    if (mouse.scrollY) {
      this.armLength +=
        (mouse.scrollY / 30) * (Math.max(0.5, this.armLength) * 0.05);
      this.armLength = Math.max(0.00001, this.armLength);

      this.pivot(new Vector2());
    }

    let speed = 20;

    if (keyboard.Space.pressed) {
      this.ascend(speed);
    }
    if (keyboard.ControlLeft.pressed) {
      this.ascend(-speed);
    }

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
