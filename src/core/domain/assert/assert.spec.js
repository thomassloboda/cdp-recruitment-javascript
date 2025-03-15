const { Assert } = require('./assert.js');
const { MissingRequiredParameterError, WrongTypeParameterError } = require('../errors/index.js');

class Dummy {}

describe('Assert', () => {
  describe('isValidString', () => {
    it('should not throw an error for a valid string', () => {
      expect(() => Assert.isValidString('Valid string', 'testParam')).not.toThrow();
    });

    it('should throw MissingRequiredParameterError for null or undefined values', () => {
      expect(() => Assert.isValidString(null, 'testParam')).toThrow(MissingRequiredParameterError);
      expect(() => Assert.isValidString(undefined, 'testParam')).toThrow(MissingRequiredParameterError);
    });

    it('should throw WrongTypeParameterError for non-string values', () => {
      expect(() => Assert.isValidString(42, 'testParam')).toThrow(WrongTypeParameterError);
      expect(() => Assert.isValidString({}, 'testParam')).toThrow(WrongTypeParameterError);
      expect(() => Assert.isValidString([], 'testParam')).toThrow(WrongTypeParameterError);
    });

    it('should throw MissingRequiredParameterError for an empty string or whitespace', () => {
      expect(() => Assert.isValidString('', 'testParam')).toThrow(MissingRequiredParameterError);
      expect(() => Assert.isValidString('   ', 'testParam')).toThrow(MissingRequiredParameterError);
    });
  });

  describe('isValidArray', () => {
    it('should not throw an error for a valid array of expected instances', () => {
      const validArray = [new Dummy(), new Dummy()];
      expect(() => Assert.isValidArray(validArray, 'testParam', Dummy)).not.toThrow();
    });

    it('should not throw an error for an empty array', () => {
      expect(() => Assert.isValidArray([], 'testParam', Dummy)).not.toThrow();
    });

    it('should throw MissingRequiredParameterError for null or undefined values', () => {
      expect(() => Assert.isValidArray(null, 'testParam', Dummy)).toThrow(MissingRequiredParameterError);
      expect(() => Assert.isValidArray(undefined, 'testParam', Dummy)).toThrow(MissingRequiredParameterError);
    });

    it('should throw WrongTypeParameterError for non-array values', () => {
      expect(() => Assert.isValidArray(42, 'testParam', Dummy)).toThrow(WrongTypeParameterError);
      expect(() => Assert.isValidArray({}, 'testParam', Dummy)).toThrow(WrongTypeParameterError);
      expect(() => Assert.isValidArray('string', 'testParam', Dummy)).toThrow(WrongTypeParameterError);
    });

    it('should throw WrongTypeParameterError if array elements are not of expected instance type', () => {
      const invalidArray = [42, 'string'];
      expect(() => Assert.isValidArray(invalidArray, 'testParam', Dummy)).toThrow(WrongTypeParameterError);
    });
  });
});
