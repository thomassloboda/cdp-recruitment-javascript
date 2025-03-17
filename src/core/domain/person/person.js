const { Animal } = require('../animal/index.js');
const { Assert } = require('../assert/index.js');

class Person {
  #name;
  #animals = [];

  constructor(name, animals = []) {
    Assert.isValidString(name, 'name');
    Assert.isValidArray(animals, 'animals', Animal);

    this.#name = name;
    this.#animals = animals;
  }

  get name() {
    return this.#name;
  }

  get animals() {
    return this.#animals;
  }

  toJSON() {
    return {
      name: this.#name,
      animals: this.#animals.map((animal) => animal.toJSON()),
    };
  }
}

module.exports = { Person };
