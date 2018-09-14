import { MeshLambertMaterial, Mesh, SphereGeometry, Vector3 } from "three";

const Sphere = args => {
  const defaultArgs = {
    radius: 10,
    segments: 16,
    rignt: 8,
    color: 0xcc0000,
    pos: new Vector3(0, 0, -300)
  };

  const sphereArgs = { ...defaultArgs, ...args };
  // Set up the sphere vars

  const sphereMaterial = new MeshLambertMaterial({
    color: sphereArgs.color
  });

  // Create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!
  const sphere = new Mesh(
    new SphereGeometry(
      sphereArgs.radius,
      sphereArgs.segments,
      sphereArgs.rignt
    ),
    sphereMaterial
  );

  // Move the Sphere back in Z so we
  // can see it.
  Object.assign(sphere.position, sphereArgs.pos);

  return sphere;
};

export default Sphere;
