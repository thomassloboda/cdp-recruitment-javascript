const { Animal } = require('./animal.js');
const {
  MissingRequiredParameterError,
  WrongTypeParameterError,
} = require('../errors/index.js');

describe('Animal', () => {
  it('should have a string name', () => {
    const validAnimal = new Animal('puppy');

    // invalid cases
    [undefined, null, '', ' '].forEach((name) => {
      expect(() => new Animal(name)).toThrowError(
        new MissingRequiredParameterError('name')
      );
    });
    expect(() => new Animal(1)).toThrowError(
      new WrongTypeParameterError('name', 'string')
    );

    // valid cases
    expect(() => new Animal('puppy')).not.toThrow();
    expect(validAnimal.name).toBe('puppy');
  });

  describe('nameContains', () => {
    it('should return true if the animal name contains the given string', () => {
      const animal = new Animal('puppy');

      expect(animal.nameContains('pup')).toBe(true);
    });

    it('should return false if the animal name does not contain the given string', () => {
      const animal = new Animal('puppy');

      expect(animal.nameContains('dog')).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the animal name', () => {
      const animal = new Animal('puppy');

      expect(animal.toString()).toEqual({ name: 'puppy' });
    });
  });
});
