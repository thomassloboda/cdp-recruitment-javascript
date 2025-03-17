const {
  MissingRequiredParameterError,
  WrongTypeParameterError,
} = require('../errors/index.js');

class Assert {
  static isValidString(value, name) {
    if (typeof value !== 'string')
      throw new WrongTypeParameterError(name, 'string');

    if (!value.trim()) throw new MissingRequiredParameterError(name);
  }

  static isValidArray(value, name, expectedInstance) {
    if (!Array.isArray(value)) throw new WrongTypeParameterError(name, 'Array');
    if (value.length > 0 && !(value[0] instanceof expectedInstance))
      throw new WrongTypeParameterError(name, `${expectedInstance.name}[]`);
  }
}

module.exports = { Assert };
