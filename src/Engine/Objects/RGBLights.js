import { Color, Object3D, PointLight, Vector3 } from "three";

import { BaseObject } from "../Core";
import Box from "./Box";

class RGBLights extends Object3D {
  constructor(args) {
    super();

    const oargs = Object.assign(
      {
        lightCount: 5,
        lightIntensity: 1
      },
      args
    );

    const center = new Vector3(0, 0, 0);

    this.lights = [];

    for (let i = 0; i < oargs.lightCount; i++) {
      const light = new PointLight(
        new Color(`hsl(${i * (360 / oargs.lightCount)}, 100%, 50%)`)
      );

      light.position.x =
        Math.cos((Math.PI / 180) * Math.round((360 / oargs.lightCount) * i)) *
        50;
      light.position.z =
        Math.sin((Math.PI / 180) * Math.round((360 / oargs.lightCount) * i)) *
        50;
      light.position.y = 50;
      light.intensity = oargs.lightIntensity;
      light.lookAt(center);

      if (oargs.debug) {
        light.add(new Box());
      }

      this.lights.push(light);
      this.add(light);
    }
  }
}

export default BaseObject(RGBLights);
