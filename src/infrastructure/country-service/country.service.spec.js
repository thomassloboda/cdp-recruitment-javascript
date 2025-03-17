const { CountryService } = require('./index.js');
const { Country } = require('../../core/domain/country/index.js');
const { Person } = require('../../core/domain/person/index.js');
const { Animal } = require('../../core/domain/animal/index.js');
const { WrongTypeParameterError, MissingRequiredParameterError } = require('../../core/domain/errors/index.js');

describe('CountryService', () => {
  const countryService = new CountryService();

  describe('buildDomainObjectsFromRawData', () => {
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

      const result = countryService.buildDomainObjectsFromRawData(rawData);

      expect(result).toEqual([
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
          new Person('Person2', [new Animal('Parrot')]),
        ]),
      ]);
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

      const result = countryService.filterCountriesByAnimalName(
        countries,
        'Dog'
      );

      expect(result).toEqual([
        new Country('Country1', [new Person('Person1', [new Animal('Dog')])]),
      ]);
    });

    it('should throw an error if countries input is invalid', () => {
      const invalidCountries = [{ notACountry: true }];

      expect(() =>
        countryService.filterCountriesByAnimalName(invalidCountries, 'Zebra')
      ).toThrowError(new WrongTypeParameterError('countries', 'Country[]'));
    });

    it('should throw an error if pattern input is invalid', () => {
      expect(() =>
        countryService.filterCountriesByAnimalName([], '')
      ).toThrowError(new MissingRequiredParameterError('pattern'));
      expect(() =>
        countryService.filterCountriesByAnimalName([], 1)
      ).toThrowError(new WrongTypeParameterError('pattern', 'string'));
    });

    it('should return the same results weither the pattern is lowercase or uppercase', () => {
      const countries = [
        new Country('Country1', [
          new Person('Person1', [new Animal('Dog'), new Animal('Cat')]),
        ]),
      ];
      const result1 = countryService.filterCountriesByAnimalName(
        countries,
        'dog'
      );
      const result2 = countryService.filterCountriesByAnimalName(
        countries,
        'DOG'
      );
      expect(result1).toEqual(result2);
    });
  });

  describe('countChildrenElement', () => {
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

      const result = countryService.countChildrenElement(countries);

      expect(result).toEqual([
        new Country('Country1 [2]', [
          new Person('Person1 [2]', [new Animal('Dog'), new Animal('Cat')]),
          new Person('Person2 [2]', [new Animal('Dog'), new Animal('Cat')]),
        ]),
        new Country('Country2 [1]', [
          new Person('Person3 [1]', [new Animal('Elephant')]),
        ]),
      ]);
    });
  });
});
