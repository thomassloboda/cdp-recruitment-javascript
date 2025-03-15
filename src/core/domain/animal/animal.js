const {Assert} = require("../assert/assert.js");

/**
 * Represents an animal with a name.
 */
class Animal {
    #name;

    /**
     * Constructs an instance of the class with the specified name.
     *
     * @param {string} name - The name to be assigned to the instance. Must be a valid, non-empty string.
     * @throws {Error} If the provided name is not a valid string.
     * @return {Object} A new instance of the class.
     */
    constructor(
        name,
    ) {
        Assert.isValidString(name, 'name');

        this.#name = name;
    }

    /**
     * Retrieves the name property of the object.
     *
     * @return {string} The name associated with the object.
     */
    get name() {
        return this.#name;
    }

       /**
        * Checks if the name contains the specified pattern, ignoring case sensitivity.
        *
        * @param {string} pattern - The pattern to check for in the name.
        * @return {boolean} True if the name contains the pattern, false otherwise.
        */
       nameContains(pattern) {
        return this.#name.toLowerCase().indexOf(pattern.toLowerCase()) > -1;
    }

    /**
     * Returns a string representation of the object.
     *
     * @return {Object} An object containing the `name` property.
     */
    toString() {
        return {
            name: this.#name
        }
    }
}

module.exports = {Animal};
