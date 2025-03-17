const { Assert } = require('../assert/index.js');
const { Person } = require('../person/index.js');

class Country {
  #name;
  #people = [];

  constructor(name, people = []) {
    Assert.isValidString(name, 'name');
    Assert.isValidArray(people, 'people', Person);

    this.#name = name;
    this.#people = people;
  }

  get name() {
    return this.#name;
  }

  get people() {
    return this.#people;
  }

  toJSON() {
    return {
      name: this.#name,
      people: this.#people.map((person) => person.toJSON()),
    };
  }
}

module.exports = { Country };
