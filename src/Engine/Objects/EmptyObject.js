import { Object3D } from "three";
import { BaseObject } from "../Core";

class EmptyObject extends Object3D {}

export default BaseObject(EmptyObject);
