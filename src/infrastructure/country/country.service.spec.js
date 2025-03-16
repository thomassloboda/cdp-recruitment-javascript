const { CountryService } = require('./country.service.js');
const { Country } = require('../../core/domain/country/index.js');
const { Person } = require('../../core/domain/person/index.js');
const { Animal } = require('../../core/domain/animal/index.js');
const { WrongTypeParameterError } = require('../../core/domain/errors');
const {
  MissingRequiredParameterError,
} = require('../../core/domain/errors/missing-required-parameter');

describe('CountryService', () => {
  const service = new CountryService();

  describe('load', () => {
    it('should load raw data and convert it to Country objects', () => {
      const rawData = [
        {
          name: 'Country1',
          people: [
            {
              name: 'Person1',
              animals: [{ name: 'Dog' }, { name: 'Cat' }],
            },
            {
              name: 'Person2',
              animals: [{ name: 'Parrot' }],
            },
          ],
        },
      ];

      const result = service.load(rawData);

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Country);
      expect(result[0].name).toBe('Country1');
      expect(result[0].people).toHaveLength(2);
      expect(result[0].people[0]).toBeInstanceOf(Person);
      expect(result[0].people[0].animals).toHaveLength(2);
      expect(result[0].people[0].animals[0]).toBeInstanceOf(Animal);
      expect(result[0].people[0].animals[0].name).toBe('Dog');
    });
  });

  describe('filterCountriesByAnimalName', () => {
    it('should filter countries by a matching animal name pattern', () => {
      const countries = [
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
          new Person('Person2', [new Animal('Parrot')]),
        ]),
        new Country('Country2', [
          new Person('Person3', [new Animal('Elephant'), new Animal('Lion')]),
        ]),
      ];

      const result = service.filterCountriesByAnimalName(countries, 'Dog');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Country1');
      expect(result[0].people).toHaveLength(1); // Only "Person1" matches
      expect(result[0].people[0].name).toBe('Person1');
      expect(result[0].people[0].animals).toHaveLength(1);
      expect(result[0].people[0].animals[0].name).toBe('Dog');
    });

    it('should return undefined if no animal names match the pattern', () => {
      const countries = [
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
        ]),
      ];

      const result = service.filterCountriesByAnimalName(countries, 'Zebra');

      expect(result).toBeUndefined();
    });

    it('should throw an error if countries input is invalid', () => {
      const invalidCountries = [{ notACountry: true }];

      expect(() =>
        service.filterCountriesByAnimalName(invalidCountries, 'Zebra')
      ).toThrowError(new WrongTypeParameterError('countries', 'Country[]'));
    });

    it('should throw an error if pattern input is invalid', () => {
      expect(() => service.filterCountriesByAnimalName([], '')).toThrowError(
        new MissingRequiredParameterError('pattern')
      );
      expect(() => service.filterCountriesByAnimalName([], 1)).toThrowError(
        new WrongTypeParameterError('pattern', 'string')
      );
    });

    it('should return the same results weither the pattern is lowercase or uppercase', () => {
      const countries = [
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
        ]),
      ];
      const result1 = service.filterCountriesByAnimalName(countries, 'dog');
      const result2 = service.filterCountriesByAnimalName(countries, 'DOG');
      expect(result1).toEqual(result2);
    });
  });

  describe('count', () => {
    it('should return the number of persons for each country and the number of animals for each person', () => {
      const countries = [
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
          new Person('Person2', [new Animal('Dog'), new Animal('Cat')]),
        ]),
        new Country('Country2', [
          new Person('Person3', [new Animal('Elephant')]),
        ]),
      ];

      const result = service.count(countries);
      expect(result[0].name).toEqual('Country1 [2]');
      expect(result[0].people[0].name).toEqual('Person1 [2]');
      expect(result[1].name).toEqual('Country2 [1]');
      expect(result[1].people[0].name).toEqual('Person3 [1]');
    });
  });
});
