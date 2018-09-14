import {
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  Raycaster,
  Vector2,
  Vector3
} from "three";
import Sphere from "../sphere";

export default class Pointer {
  constructor(scene, camera, mouse, delay) {
    this.sceneRef = scene;
    this.cameraRef = camera;
    this.mouseRef = mouse;
    this.elapsed = 0;
    this.delay = delay;

    const xyPlaneGeo = new PlaneBufferGeometry(1000, 1000);
    xyPlaneGeo.rotateX(-Math.PI / 2);
    this.xyPlane = new Mesh(
      xyPlaneGeo,
      new MeshBasicMaterial({ visible: false })
    );
    // this.sceneRef.add(this.xyPlane);

    // this.pointSphere = new Sphere({
    //   color: 0xffffff,
    //   pos: new Vector3(0, 0, 0),
    //   radius: 1
    // });
    // this.sceneRef.add(this.pointSphere);

    this.raycaster = new Raycaster();
  }

  update(delta) {
    this.elapsed += delta;
    if (this.elapsed > this.delay) {
      this.elapsed = 0;

      this.raycaster.setFromCamera(
        this.mouseRef.getNormalizedCoords(),
        this.cameraRef
      );

      const intersects = this.raycaster.intersectObjects(
        this.sceneRef.children
      );

      for (var i = 0; i < intersects.length; i++) {}

      // if (!intersects.length) {
      const collision = this.raycaster.intersectObject(this.xyPlane);
      // if (collision.length) {
      // this.pointSphere.position.copy(collision[0].point);
      // }
      // }
    }
  }
}
