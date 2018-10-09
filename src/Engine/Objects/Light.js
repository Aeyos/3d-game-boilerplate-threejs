import { PointLight } from "three";

const Light = () => {
  const pointLight = new PointLight(0xffffff);

  // set its position
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;

  return pointLight;
};

export default Light;
