import { Animation, EmptyObject, Sprite } from "../Engine";

class ColorSelector extends EmptyObject {
  constructor(args) {
    super();
    for (let i = 0; i < 18; i++) {
      const spr = new Sprite({
        texture:
          "https://uploads.codesandbox.io/uploads/user/e3b4aea8-bdf2-48b5-8c19-b1bfeb3a0c27/vzRc-ball.png"
      });

      this.add(spr);

      spr.scale.x = 64;
      spr.scale.y = 64;
    }

    this.attach(new Animation());
    this.animation.register(
      "wut",
      {
        loops: 1,
        duration: 1000
      },
      anim => {
        this.children.forEach((c, i) => {
          c.position.x = Math.round(
            Math.sin(
              anim.progress * Math.PI * 2 +
                (i / this.children.length) * Math.PI * 2
            ) *
              (250 * anim.progress)
          );
          c.position.y = Math.round(
            Math.cos(
              anim.progress * Math.PI * 2 +
                (i / this.children.length) * Math.PI * 2
            ) *
              (250 * anim.progress)
          );
        });
      }
    );
    this.animation.play("wut");
  }

  onUpdate() {
    if (this.$gameState.mouse.mouseClickLeft) {
      this.animation.play("wut");
    }
  }
}

export default ColorSelector;
