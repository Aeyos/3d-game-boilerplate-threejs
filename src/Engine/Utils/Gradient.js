export default (init, end, steps) => {
  const arr = [init];
  const step = (end - init) / steps;

  for (let i = 1; i < steps - 1; i += 1) {
    arr.push(Math.round(i * step) + init);
  }

  return [...arr, end];
};
