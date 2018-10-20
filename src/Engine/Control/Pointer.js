import { Mesh, PlaneBufferGeometry, MeshBasicMaterial, Raycaster } from "three";

import { Collection } from "../Utils";

export default class Pointer {
  constructor(state, delay) {
    this.elapsed = 0;
    this.delay = delay;
    this.state = state;
    this.state.pointer = {
      collision: [],
      intersects: [],
      intersectsUI: []
    };

    const xyPlaneGeo = new PlaneBufferGeometry(1000, 1000);
    xyPlaneGeo.rotateX(-Math.PI / 2);
    this.xyPlane = new Mesh(
      xyPlaneGeo,
      new MeshBasicMaterial({ visible: false })
    );

    this.raycaster = new Raycaster();
  }

  getRayCastableObjects(obj) {
    const castable = obj.filter(e => !e.ignoreMouseTrace);
    obj.forEach(o => {
      if (o.ignoreMouseTrace || !o.visible) return;
      if (o.children.length) {
        castable.push(...this.getRayCastableObjects(o.children));
      }
    });

    return castable;
  }

  update(delta) {
    this.elapsed += delta;
    if (this.elapsed > this.delay) {
      this.elapsed = 0;

      // UI CAM

      this.raycaster.setFromCamera(
        this.state.mouse.normalPos,
        this.state.refs.UI.camera
      );

      // UI INTERSECT
      const castableUI = this.getRayCastableObjects(
        this.state.refs.UI.scene.children
      );

      const intersectsUI = this.raycaster.intersectObjects(castableUI);
      this.state.pointer.intersectsUI = intersectsUI;
      if (intersectsUI.length) {
        this.state.pointer.intersects = [];
        this.state.pointer.collision = [];
        return null;
      }

      // Scene CAM
      this.raycaster.setFromCamera(
        this.state.mouse.normalPos,
        this.state.refs.camera
      );

      // SCENE
      const castable = this.getRayCastableObjects(
        this.state.refs.scene.scene.children
      );

      const intersects = this.raycaster.intersectObjects(castable);
      this.state.pointer.intersects = intersects;

      // GROUND
      const collision = this.raycaster.intersectObject(this.xyPlane);
      this.state.pointer.collision = collision;
    }
  }
}
