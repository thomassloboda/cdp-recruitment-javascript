const {MissingRequiredParameterError, WrongTypeParameterError} = require("../errors/index.js");

/**
 * The Assert class provides utility methods for runtime validation of values and their types.
 * It is used to ensure that the input matches specific criteria or throws proper errors when validation fails.
 */
class Assert {
    /**
     * Validates whether the given value is a non-empty string.
     * Throws an error if the value is missing, not of type string, or consists solely of whitespace.
     *
     * @param {any} value - The value to validate.
     * @param {string} name - The parameter name, used for error messages.
     * @return {void}
     */
    static isValidString(value, name) {
        if (!value) throw new MissingRequiredParameterError(name);
        if (typeof value !== 'string')
            throw new WrongTypeParameterError(name, 'string')
        if (!value.trim()) throw new MissingRequiredParameterError(name)
    }

    /**
     * Validates whether the provided value is a valid array and meets the expected criteria.
     *
     * @param {*} value The value to be validated.
     * @param {string} name The name of the parameter being validated, used in error messages.
     * @param {Function} expectedInstance The constructor function of the expected instance for array elements.
     * @return {void} Throws an error if the validation fails; otherwise, no return value.
     */
    static isValidArray(value, name, expectedInstance) {
        if (!value) throw new MissingRequiredParameterError(name);
        if (!Array.isArray(value)) throw new WrongTypeParameterError(name, 'Array')
        if (value.length > 0 && !(value[0] instanceof expectedInstance)) throw new WrongTypeParameterError(name, `${expectedInstance.name}[]`)
    }
}

module.exports = {Assert};
