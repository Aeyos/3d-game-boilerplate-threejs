import { Color, Vector3 } from "three";
import { Animation, Box, EmptyObject } from "../Engine";

class VoxelEditor extends EmptyObject {
  constructor(args) {
    super();

    if (window.$hmr.voxels) {
      this.children = window.$hmr.voxels.children;
    }
  }

  onInput(delta) {
    if (this.$gameState.mouse.mouseClickLeft) {
      const point =
        this.$gameState.pointer.intersects[0] ||
        this.$gameState.pointer.collision[0];
      if (point) {
        const newBox = new Box({
          color: Math.random() * 0xffffff,
          pos: new Vector3(
            Math.round(point.point.x + 0.5) - 0.5,
            Math.round(point.point.y + 0.51) - 0.5,
            Math.round(point.point.z + 0.5) - 0.5
          ),
          w: 1.001, // w: 1.025,
          h: 1.001, // h: 1.025,
          l: 1.001, // l: 1.025,
          opacity: 1
        });
        // newBox.attach(new Animation());
        // newBox.animation.register(
        //   "hue",
        //   {
        //     loops: "infinite",
        //     easing: "linear",
        //     duration: 2500
        //   },
        //   anim => {
        //     newBox.scale.x = newBox.scale.y = newBox.scale.z =
        //       Math.sin(anim.progress * Math.PI * 2) * 0.25 + 0.75;
        //   }
        // );
        // newBox.animation.play("hue");
        // newBox.animation.register(
        //   "pulse",
        //   {
        //     loops: "infinite",
        //     easing: "linear",
        //     duration: 5000
        //   },
        //   anim => {
        //     newBox.material.color = new Color(
        //       `hsl(${anim.progress * 360}, 80%, 80%)`
        //     );
        //   }
        // );
        // newBox.animation.play("pulse");
        // newBox.animation.register(
        //   "rotate",
        //   {
        //     loops: "infinite",
        //     easing: "linear",
        //     duration: 2000
        //   },
        //   anim => {
        //     newBox.rotation.x = newBox.rotation.y = newBox.rotation.z =
        //       Math.PI * 2 * anim.progress;
        //   }
        // );
        // newBox.animation.play("rotate");
        this.add(newBox);
      }
    } else if (
      this.$gameState.pointer.intersects[0] &&
      this.$gameState.mouse.mouseClickRight
    ) {
      this.remove(this.$gameState.pointer.intersects[0].object);
    }
  }
}

export default VoxelEditor;
