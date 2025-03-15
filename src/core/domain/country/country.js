const {Assert} = require("../assert/assert.js");
const {Person} = require("../person/index.js");

/**
 * Represent a country with a name and an optional people
 */
class Country {
    #name;
    #people = [];

    /**
     * Constructs an instance of the class.
     *
     * @param {string} name - The name associated with the instance. Must be a valid string.
     * @param {Person[]} [people=[]] - An optional array of Person objects associated with the instance. Default is an empty array.
     * @return {void}
     */
    constructor(name, people = []) {
        Assert.isValidString(name, 'name');
        Assert.isValidArray(people, 'people', Person)

        this.#name = name;
        this.#people = people;
    }

    /**
     * Retrieves the private property `#name`.
     *
     * @return {string} The value of the `#name` property.
     */
    get name() {
        return this.#name;
    }

    /**
     * Retrieves the list of people.
     *
     * @return {Array} An array containing the people data.
     */
    get people() {
        return this.#people;
    }

    /**
     * Converts the instance into a string representation, including its name
     * and a string representation of associated people.
     *
     * @return {Object} An object containing the name of the instance and an array of string representations of people.
     */
    toString(){
        return {
            name: this.#name,
            people: this.#people.map(person => person.toString())
        }
    }
}

module.exports = {Country};
