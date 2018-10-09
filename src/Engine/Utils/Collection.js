class Collection extends Array {
  constructor(...args) {
    super(...args);
    this.__proto__.remove = entry => {
      this.splice(this.indexOf(entry), 1);
    };
  }
}

export default Collection;
