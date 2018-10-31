import { PointLight, Vector3 } from "three";

const Light = () => {
  const pointLight = new PointLight(0xffffff);

  // set its position
  pointLight.position.x = 20;
  pointLight.position.y = 40;
  pointLight.position.z = 80;

  pointLight.lookAt(new Vector3(0, 0, 0));

  return pointLight;
};

export default Light;
