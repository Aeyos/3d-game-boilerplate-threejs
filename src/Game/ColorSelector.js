import { Animation, Sprite } from "../Engine";

class ColorSelector extends Sprite {
  constructor(args) {
    super({
      texture:
        "https://uploads.codesandbox.io/uploads/user/e3b4aea8-bdf2-48b5-8c19-b1bfeb3a0c27/vzRc-ball.png"
    });

    this.attach(new Animation());
    this.animation.register(
      "wut",
      {
        loops: 4,
        duration: 1000
      },
      anim => {
        this.position.x = Math.round(
          Math.sin(anim.progress * Math.PI * 2) * 100
        );
        this.position.y = Math.round(
          Math.cos(anim.progress * Math.PI * 2) * 100
        );
      }
    );
    this.animation.play("wut");
    this.scale.x = 64;
    this.scale.y = 64;
  }

  onUpdate() {
    if (this.$gameState.mouse.mouseClickLeft) {
      this.animation.play("wut");
    }
  }
}

export default ColorSelector;
