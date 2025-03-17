const { Person } = require('./index.js');
const { Animal } = require('../animal/index.js');

describe('People', () => {
  it('should have a string name', () => {
    expect(new Person('John').name).toBe('John');
  });

  it('should have a valid animals array', () => {
    expect(new Person('John', [new Animal('puppy')]).animals[0].name).toBe(
      'puppy'
    );
  });

  describe('toJSON', () => {
    it('should return the person name and animals', () => {
      const people = new Person('John', [new Animal('puppy')]);

      expect(people.toJSON()).toEqual({
        name: 'John',
        animals: [{ name: 'puppy' }],
      });
    });
  });
});
