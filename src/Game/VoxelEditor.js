import { Color, Vector3 } from "three";
import { Animation, Box, EmptyObject } from "../Engine";

class VoxelEditor extends EmptyObject {
  constructor(args) {
    super();

    this.dragStart = null;
    this.dragBox = null;

    if (window.$hmr.voxels) {
      this.children = window.$hmr.voxels.children;
    }
  }

  onInput(delta) {
    const point =
      this.$gameState.pointer.intersects[0] ||
      this.$gameState.pointer.collision[0];

    if (this.$gameState.mouse.mouseClickLeft) {
      if (point) {
        const newBox = new Box({
          color: this.$gameState.selectedColor,
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
    } else if (
      this.$gameState.mouse.mouseLeft &&
      this.$gameState.mouse.isDragging &&
      point &&
      !this.dragStart
    ) {
      this.dragStart = new Vector3(
        Math.round(point.point.x + 0.5) - 0.5,
        Math.round(point.point.y + 0.51) - 0.5,
        Math.round(point.point.z + 0.5) - 0.5
      );
      this.dragBox = new Box({
        color: this.$gameState.selectedColor,
        pos: this.dragStart,
        w: 1.001, // w: 1.025,
        h: 1.001, // h: 1.025,
        l: 1.001, // l: 1.025,
        opacity: 1,
        ignoreMouseTrace: true
      });
      this.add(this.dragBox);
    } else if (
      this.$gameState.mouse.mouseLeft &&
      this.$gameState.mouse.isDragging &&
      this.dragStart
    ) {
      const deltaX = Math.round(point.point.x - this.dragStart.x);
      const deltaY = Math.max(0, Math.round(point.point.y - this.dragStart.y));
      const deltaZ = Math.round(point.point.z - this.dragStart.z);
      console.log(deltaY);
      this.dragBox.scale.x = Math.round(1 + Math.abs(deltaX));
      this.dragBox.scale.y = Math.round(1 + Math.abs(deltaY));
      this.dragBox.scale.z = Math.round(1 + Math.abs(deltaZ));

      this.dragBox.position.x = this.dragStart.x + deltaX / 2;
      this.dragBox.position.y = this.dragStart.y + deltaY / 2;
      this.dragBox.position.z = this.dragStart.z + deltaZ / 2;
    } else if (this.$gameState.mouse.mouseUpLeft) {
      this.dragBox.ignoreMouseTrace = false;
      this.dragBox = this.dragStart = null;
    }
  }
}

export default VoxelEditor;
