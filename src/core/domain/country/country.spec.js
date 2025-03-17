const { Country } = require('./index.js');
const { Person } = require('../person/index.js');

describe('Country', () => {
  it('should have a string name', () => {
    expect(new Country('USA').name).toBe('USA');
  });

  it('should have a valid people array', () => {
    expect(new Country('USA', [new Person('John')]).people[0].name).toBe(
      'John'
    );
  });

  describe('toJSON', () => {
    it('should return the country name and people', () => {
      const country = new Country('USA', [new Person('John')]);

      expect(country.toJSON()).toEqual({
        name: 'USA',
        people: [{ name: 'John', animals: [] }],
      });
    });
  });
});
