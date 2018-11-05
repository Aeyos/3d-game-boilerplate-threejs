import { SpriteMaterial, Sprite, TextureLoader, Vector2 } from "three";
import { BaseObject } from "../Core";

class AugmentedSprite extends Sprite {
  constructor(args) {
    const spriteMap = new TextureLoader().load(args.texture);
    const spriteMaterial = new SpriteMaterial({
      map: spriteMap,
      color: 0xffffff
    });

    super(args, spriteMaterial);
  }
}
export default BaseObject(AugmentedSprite);
