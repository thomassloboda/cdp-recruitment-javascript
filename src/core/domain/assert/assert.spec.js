const { Assert } = require('./index.js');
const {
  MissingRequiredParameterError,
  WrongTypeParameterError,
} = require('../errors/index.js');

class Dummy {}

describe('Assert', () => {
  describe('isValidString', () => {
    it('should not throw an error for a valid string', () => {
      expect(() =>
        Assert.isValidString('Valid string', 'testParam')
      ).not.toThrow();
    });

    it('should throw WrongTypeParameterError for non-string values', () => {
      [null, undefined, 42, {}, []].forEach((value) => {
        expect(() => Assert.isValidString(value, 'testParam')).toThrow(
          WrongTypeParameterError
        );
      });
    });

    it('should throw MissingRequiredParameterError for an empty string or whitespace', () => {
      ['', ' '].forEach((value) => {
        expect(() => Assert.isValidString(value, 'testParam')).toThrow(
          MissingRequiredParameterError
        );
      });
    });
  });

  describe('isValidArray', () => {
    it('should not throw an error for a valid array of expected instances', () => {
      const validArray = [new Dummy(), new Dummy()];
      expect(() =>
        Assert.isValidArray(validArray, 'testParam', Dummy)
      ).not.toThrow();
    });

    it('should not throw an error for an empty array', () => {
      expect(() => Assert.isValidArray([], 'testParam', Dummy)).not.toThrow();
    });

    it('should throw WrongTypeParameterError for non-array values', () => {
      [null, undefined, 42, {}, 'string'].forEach((value) => {
        expect(() => Assert.isValidArray(value, 'testParam', Dummy)).toThrow(
          WrongTypeParameterError
        );
      });
    });

    it('should throw WrongTypeParameterError if array elements are not of expected instance type', () => {
      const invalidArray = [42, 'string'];
      expect(() =>
        Assert.isValidArray(invalidArray, 'testParam', Dummy)
      ).toThrow(WrongTypeParameterError);
    });
  });
});
