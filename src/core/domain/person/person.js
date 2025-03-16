const { Animal } = require('../animal/index.js');
const { Assert } = require('../assert/assert.js');

/**
 * Represent a person with a name and optionals animals
 */
class Person {
  #name;
  #animals = [];

  /**
   * Constructs an instance of the class with a specified name and an optional array of animals.
   *
   * @param {string} name - The name associated with the instance. Must be a valid string.
   * @param {Animal[]} [animals=[]] - An optional array of Animal objects. Defaults to an empty array.
   * @return {void}
   */
  constructor(name, animals = []) {
    Assert.isValidString(name, 'name');
    Assert.isValidArray(animals, 'animals', Animal);

    this.#name = name;
    this.#animals = animals;
  }

  /**
   * Retrieves the value of the private `#name` property.
   *
   * @return {string} The value of the `#name` property.
   */
  get name() {
    return this.#name;
  }

  /**
   * Retrieves the list of animals.
   *
   * @return {Array} An array containing the animal objects.
   */
  get animals() {
    return this.#animals;
  }

  /**
   * Converts the object to a string representation.
   * @return {Object} An object containing the `name` of the object and an array of string representations of `animals`.
   */
  toString() {
    return {
      name: this.#name,
      animals: this.#animals.map((animal) => animal.toString()),
    };
  }
}

module.exports = { Person };
