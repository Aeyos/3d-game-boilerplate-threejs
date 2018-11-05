import { Geometry, Material, Mesh, Object3D } from "three";

const rename = (name, fn) => {
  fn.toString = () => name;
  return fn;
};

export default {
  NotRequired: type =>
    rename(
      `${type.name}, null`,
      o => (o ? type(o) : o === null || o === undefined)
    ),
  OneOf: types =>
    rename(types.map(t => t.name).join(", "), o => types.some(type => type(o))),

  Any: o => true,
  HTMLElement: e => e instanceof Element,
  Number: n => typeof n === "number",
  Geometry: g => g instanceof Geometry,
  Material: m => m instanceof Material,
  Mesh: m => m instanceof Mesh,
  Object3D: o => o instanceof Object3D,
  Array: a => a instanceof Array
};
