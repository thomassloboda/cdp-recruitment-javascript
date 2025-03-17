const { Assert } = require('../assert/index.js');

class Animal {
  #name;

  constructor(name) {
    Assert.isValidString(name, 'name');

    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  nameContains(pattern) {
    return this.#name.toLowerCase().includes(pattern.toLowerCase());
  }

  toJSON() {
    return {
      name: this.#name,
    };
  }
}

module.exports = { Animal };
