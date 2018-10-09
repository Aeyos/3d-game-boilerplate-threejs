import { SpriteMaterial, Sprite, TextureLoader, Vector2 } from "three";
import { FeaturedClass, TypedClass, Collision2D } from "../Core";
import { Collection } from "../Utils";
import { MATHC } from "../Utils/Math";
// import { Types } from "../Utils";

class AugmentedSprite extends FeaturedClass(Sprite) {
  constructor(args) {
    const spriteMap = new TextureLoader().load(args.texture);
    const spriteMaterial = new SpriteMaterial({
      map: spriteMap,
      color: 0xffffff
    });
    super(args, spriteMaterial);
    // this.spriteMap = spriteMap;
    // this.spriteMaterial = spriteMaterial;

    this.collision = new Collision2D();
  }
}
export default AugmentedSprite;
