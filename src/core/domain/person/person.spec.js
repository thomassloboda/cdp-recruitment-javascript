const { Person } = require('./person.js');
const {
  MissingRequiredParameterError,
  WrongTypeParameterError,
} = require('../errors/index.js');
const { Animal } = require('../animal/index.js');

describe('People', () => {
  it('should have a string name', () => {
    const validPeople = new Person('John');

    // invalid cases
    [undefined, null, '', ' '].forEach((name) => {
      expect(() => new Person(name)).toThrowError(
        new MissingRequiredParameterError('name')
      );
    });
    expect(() => new Person(1)).toThrowError(
      new WrongTypeParameterError('name', 'string')
    );

    // valid cases
    expect(() => new Person('John')).not.toThrow();
    expect(validPeople.name).toBe('John');
  });

  it('should have a valid animals array', () => {
    const validPeople = new Person('John', [new Animal('puppy')]);

    // invalid cases
    expect(() => new Person('John', null)).toThrowError(
      new MissingRequiredParameterError('animals')
    );
    expect(() => new Person('John', ['item'])).toThrowError(
      new WrongTypeParameterError('animals', 'Animal[]')
    );

    // valid cases
    expect(() => new Person('John', [new Animal('puppy')])).not.toThrow();
    expect(validPeople.animals[0].name).toBe('puppy');
  });

  describe('toString', () => {
    it('should return the person name and animals', () => {
      const people = new Person('John', [new Animal('puppy')]);

      expect(people.toString()).toEqual({
        name: 'John',
        animals: [{ name: 'puppy' }],
      });
    });
  });
});
