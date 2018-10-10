import { TextureLoader } from "three";
import { Animation, EmptyObject, Sprite } from "../Engine";

class ColorSelector extends EmptyObject {
  constructor(args) {
    super();

    const colors = 25;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const ctx = canvas.getContext("2d");
    const tex = new TextureLoader().load(
      "https://uploads.codesandbox.io/uploads/user/e3b4aea8-bdf2-48b5-8c19-b1bfeb3a0c27/vzRc-ball.png",
      () => {
        console.log(tex.image);
        for (let i = 0; i < colors; i++) {
          ctx.clearRect(0, 0, 64, 64);
          ctx.drawImage(tex.image, 0, 0);
          ctx.fillStyle = `hsl(${i * Math.round(360 / colors)}, 90%, 66%)`;
          ctx.beginPath();
          ctx.arc(32, 32, 25, 0, Math.PI * 2);
          ctx.fill();
          const spr = new Sprite({
            texture: canvas.toDataURL()
          });

          this.add(spr);
        }
      }
    );

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
              (300 * anim.progress)
          );
          c.position.y = Math.round(
            Math.cos(
              anim.progress * Math.PI * 2 +
                (i / this.children.length) * Math.PI * 2
            ) *
              (300 * anim.progress)
          );
          c.scale.x = c.scale.y = 64 * anim.progress;
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
