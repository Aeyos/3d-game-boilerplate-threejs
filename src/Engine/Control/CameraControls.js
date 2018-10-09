import { Vector2, Vector3 } from "three";
import { Between } from "../Utils/Math";

class CameraControls {
  constructor(camera, callback) {
    this.cameraRef = camera;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseWheel = this.mouseWheel.bind(this);
    this.onUpdate = callback || (() => {});

    // Event binding
    window.addEventListener("mousedown", this.mouseDown);
    window.addEventListener("mouseup", this.mouseUp);
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("wheel", this.mouseWheel);
    window.addEventListener("contextmenu", () => false);

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
    this.pivot(0, 0);
    this.sendUpdate();
  }

  mouseDown(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.pressingRight = true;

      this.dragStart = new Vector2(evt.clientX, evt.clientY);
    }

    if (evt.button === 1) {
      this.pressingMiddle = true;

      this.dragStart = new Vector2(evt.clientX, evt.clientY);
    }

    if (evt.button === 2) {
      this.pressingLeft = true;

      this.dragStart = new Vector2(evt.clientX, evt.clientY);
    }

    this.sendUpdate();

    return false;
  }

  mouseUp(evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      this.pressingRight = false;
    }

    if (evt.button === 1) {
      this.pressingMiddle = false;
    }

    if (evt.button === 2) {
      this.pressingLeft = false;

      const deltaX = evt.clientX - this.dragStart.x;
      const deltaY = evt.clientY - this.dragStart.y;

      this.currentYaw = this.currentYaw + deltaX / 200;
      this.currentPitch = Between(
        this.currentPitch + deltaY / 200,
        Math.PI / 2,
        Math.PI - 0.01
      );
    }

    this.sendUpdate();

    return false;
  }

  mouseMove(evt) {
    evt.preventDefault();

    if (this.pressingLeft && this.cameraRef) {
      const deltaX = evt.clientX - this.dragStart.x;
      const deltaY = evt.clientY - this.dragStart.y;

      this.pivot(deltaX, deltaY);
    }

    if (this.pressingMiddle && this.cameraRef) {
      const deltaY = evt.clientY - this.dragStart.y;

      this.dragStart.y = evt.clientY;

      this.ascend(-deltaY);
    }

    if (this.pressingRight && this.cameraRef) {
      const deltaX = evt.clientX - this.dragStart.x;
      const deltaY = evt.clientY - this.dragStart.y;

      this.dragStart.x = evt.clientX;
      this.dragStart.y = evt.clientY;

      this.move(deltaX, deltaY);
    }

    this.sendUpdate();

    return false;
  }

  mouseWheel(evt) {
    evt.preventDefault();
    this.armLength -=
      (evt.wheelDeltaY / 30) * (Math.max(0.5, this.armLength) * 0.05);
    this.armLength = Math.max(0.00001, this.armLength);
    this.pivot(0, 0);

    this.sendUpdate();

    return false;
  }

  pivot(deltaX, deltaY) {
    // x = ρ sin φ * cos θ
    // y = ρ sin φ * sin θ
    // z = ρ cos φ

    const angleX = this.currentYaw + deltaX / 200;
    const angleY = Between(
      this.currentPitch + deltaY / 200,
      Math.PI / 2,
      Math.PI - 0.01
    );

    const newX = this.armLength * Math.sin(angleY) * Math.cos(angleX);
    const newZ = this.armLength * Math.sin(angleY) * Math.sin(angleX);
    const newY = -this.armLength * Math.cos(angleY);

    this.cameraRef.position.x = newX + this.refPoint.x;
    this.cameraRef.position.y = newY + this.refPoint.y;
    this.cameraRef.position.z = newZ + this.refPoint.z;

    this.cameraRef.lookAt(this.refPoint);
  }

  move(deltaX, deltaY) {
    const sin = Math.sin(this.currentYaw);
    const cos = Math.cos(this.currentYaw);

    this.refPoint.x += (-deltaY / 50) * cos - (deltaX / 50) * sin;
    this.refPoint.z += (-deltaY / 50) * sin + (deltaX / 50) * cos;

    this.pivot(0, 0);
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
}

export default CameraControls;
