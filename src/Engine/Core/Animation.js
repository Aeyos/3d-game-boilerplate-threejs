class Animation {
  constructor(args) {
    Object.assign(this, args);

    this.propName = "animation";
    this.animations = {};
  }

  register(name, args, fn) {
    if (typeof name !== "string") {
      throw new Error(`First parameter should be a string`);
    }
    if (fn && typeof fn !== "function") {
      throw new Error(`Third parameter should be a function`);
    }
    if (this.animations[name]) {
      throw new Error(`${name} already registered`);
    }

    this.animations[name] = { fn, args: Object.assign({ loops: 1 }, args) };
  }

  unregister(name) {
    delete this.animations[name];
  }

  update(delta) {
    Object.values(this.animations).forEach(anim => {
      if (anim.args.playing && typeof anim.fn === "function") {
        let currentTime = anim.args.currentTime + delta * 1000;
        let progress = (currentTime - anim.args.startTime) / anim.args.duration;
        let { iteration, startTime, playing } = anim.args;

        if (progress >= 1) {
          iteration += 1;
          if (anim.args.loops === "infinite" || iteration < anim.args.loops) {
            progress -= 1;
            startTime = currentTime;
          } else if (iteration + 1 >= anim.args.loops) {
            iteration -= 1;
            progress = 1;
            currentTime = startTime + anim.args.duration;
            playing = false;
          }
        }

        Object.assign(anim.args, {
          delta,
          currentTime,
          progress,
          iteration,
          startTime,
          playing
        });

        anim.fn(anim.args);
      }
    });
  }

  play(name) {
    Object.assign(this.animations[name].args, {
      startTime: performance.now(),
      currentTime: performance.now(),
      delta: 0,
      progress: 0,
      iteration: 0,
      playing: true
    });

    this.animations[name].fn(this.animations[name].args);
  }
}

export default Animation;
