const { Animal } = require('./index.js');

describe('Animal', () => {
  it('should have a string name', () => {
    expect(new Animal('puppy').name).toBe('puppy');
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

  describe('toJSON', () => {
    it('should return the animal name', () => {
      const animal = new Animal('puppy');

      expect(animal.toJSON()).toEqual({ name: 'puppy' });
    });
  });
});
