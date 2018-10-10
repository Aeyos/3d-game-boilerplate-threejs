export const ForAllChildren = (arr, cb) => {
  arr.forEach(o => {
    cb(o);
    if (o.children.length) {
      ForAllChildren(o.children, cb);
    }
  })
}