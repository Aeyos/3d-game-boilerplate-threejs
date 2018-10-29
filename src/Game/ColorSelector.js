import { TextureLoader } from "three";
import { Animation, EmptyObject, Sprite } from "../Engine";

class ColorSelector extends EmptyObject {
  constructor(args) {
    super();

    this.gridsize = 20;
    this.ballsize = 36;
    this.ballhover = 1.3;
    this.ballpadding = 4;
    this.ballspacing = 38;
    this.ballTextureSize = 2 ** Math.floor(Math.sqrt(this.ballsize, 2));

    const canvas = document.createElement("canvas");
    canvas.width = this.ballTextureSize;
    canvas.height = this.ballTextureSize;

    const ctx = canvas.getContext("2d");
    const tex = new TextureLoader().load(
      "https://uploads.codesandbox.io/uploads/user/e3b4aea8-bdf2-48b5-8c19-b1bfeb3a0c27/vzRc-ball.png",
      () => {
        for (let i = 0; i < this.gridsize; i++) {
          for (let j = 0; j < this.gridsize; j++) {
            ctx.clearRect(0, 0, this.ballTextureSize, this.ballTextureSize);
            ctx.drawImage(
              tex.image,
              0,
              0,
              this.ballTextureSize,
              this.ballTextureSize
            );
            if (j === this.gridsize - 1) {
              ctx.fillStyle = `hsl(0, 0%, ${(this.gridsize - 1 - i) *
                (100 / (this.gridsize - 1))}%)`;
            } else {
              ctx.fillStyle = `hsl(${i *
                Math.round(360 / this.gridsize)}, 90%, ${(j + 1) *
                (100 / this.gridsize)}%)`;
            }
            ctx.beginPath();
            ctx.arc(
              this.ballTextureSize / 2,
              this.ballTextureSize / 2,
              this.ballTextureSize / 2 - this.ballpadding,
              0,
              Math.PI * 2
            );
            ctx.fill();
            const spr = new Sprite({
              texture: canvas.toDataURL()
            });
            spr.color = ctx.fillStyle;

            spr.position.x = (this.gridsize / 2 - j) * this.ballspacing;
            spr.position.y = (this.gridsize / 2 - i) * this.ballspacing;

            this.add(spr);
          }
        }
      }
    );

    this.visible = false;

    this.attach(new Animation());
    this.animation.register(
      "wut",
      {
        loops: 1,
        duration: 250
      },
      anim => {
        this.children.forEach((c, i) => {
          c.material.opacity = anim.progress;
        });
      }
    );
    this.animation.play("wut");
  }

  onUpdate() {
    this.children.forEach(c => (c.scale.x = c.scale.y = this.ballsize));

    if (this.$gameState.keyboard.KeyC.pressed) {
      if (!this.visible) {
        this.animation.play("wut");
      }
      this.visible = true;
    } else {
      this.visible = false;
    }

    if (this.$gameState.pointer.intersectsUI.length) {
      const UIEl = this.$gameState.pointer.intersectsUI[0];

      UIEl.object.scale.x = UIEl.object.scale.y =
        this.ballsize * this.ballhover;

      if (this.$gameState.mouse.mouseClickLeft) {
        this.$gameState.selectedColor = UIEl.object.color;
        UIEl.object.scale.x = UIEl.object.scale.y =
          this.ballsize / this.ballhover;

        if (this.selectedColorIndex) {
          this.children[this.selectedColorIndex].scale.x = this.children[
            this.selectedColorIndex
          ].scale.y = this.ballsize;
        }

        this.selectedColorIndex = this.children.indexOf(UIEl.object);
      }
    }

    if (this.selectedColorIndex) {
      this.children[this.selectedColorIndex].scale.x = this.children[
        this.selectedColorIndex
      ].scale.y =
        this.ballsize / this.ballhover;
    }
  }
}

export default ColorSelector;
