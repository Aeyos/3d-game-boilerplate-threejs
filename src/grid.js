import { Geometry, LineBasicMaterial, Line, Object3D, Vector3 } from "three";

const Grid = () => {
  const group = new Object3D();

  const material = new LineBasicMaterial({
    color: 0xffffff,
    opacity: 0.2
  });

  for (let i = -50; i <= 50; i++) {
    const geometry = new Geometry();
    geometry.vertices.push(new Vector3(i, -1, -50), new Vector3(i, -1, 50));

    geometry.vertices[0].x = i;
    geometry.vertices[1].x = i;
    group.add(new Line(geometry, material));
  }

  for (let i = -50; i <= 50; i++) {
    const geometry = new Geometry();
    geometry.vertices.push(new Vector3(-50, -1, i), new Vector3(50, -1, i));

    geometry.vertices[0].z = i;
    geometry.vertices[1].z = i;
    group.add(new Line(geometry, material));
  }

  return group;
};

export default Grid;
