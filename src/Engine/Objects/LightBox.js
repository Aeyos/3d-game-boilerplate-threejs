import { DirectionalLight, Object3D, Vector3 } from "three";

import EmptyObject from "./EmptyObject";
import { Gradient } from "../Utils";

class LightBox extends EmptyObject {
  constructor(args) {
    super();

    const gradient = Gradient(0x99, 0xff, 5);
    const lightColors = gradient.map(e => e + e * 256 + e * 65536);

    const light1 = new DirectionalLight(lightColors[1], 1);
    const light2 = new DirectionalLight(lightColors[2], 1);
    const light3 = new DirectionalLight(lightColors[3], 1);
    const light4 = new DirectionalLight(lightColors[2], 1);
    const light5 = new DirectionalLight(lightColors[4], 0.98);
    const light6 = new DirectionalLight(lightColors[0], 1);

    const center = new Vector3(0, 0, 0);

    light1.position.x = 100;
    light1.position.z = 0;
    light1.position.y = 0;
    light1.lookAt(center);

    light2.position.x = 0;
    light2.position.y = 0;
    light2.position.z = 100;
    light2.lookAt(center);

    light3.position.x = -100;
    light3.position.y = 0;
    light3.position.z = 0;
    light3.lookAt(center);

    light4.position.x = 0;
    light4.position.y = 0;
    light4.position.z = -100;
    light4.lookAt(center);

    light5.position.x = 0;
    light5.position.y = 100;
    light5.position.z = 0;
    light5.lookAt(center);

    light6.position.x = 0;
    light6.position.y = -100;
    light6.position.z = 0;
    light6.lookAt(center);

    this.add(light1, light2, light3, light4, light5, light6);
  }
}

export default LightBox;
