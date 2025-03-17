const { Country } = require('../../core/domain/country/index.js');
const { Assert } = require('../../core/domain/assert/index.js');
const { Animal } = require('../../core/domain/animal/index.js');
const { Person } = require('../../core/domain/person/index.js');

class CountryService {
  // <editor-fold desc="Converting raw data to domain objects">

  #buildAnimals(rawAnimals) {
    return rawAnimals.map((rawAnimal) => new Animal(rawAnimal.name));
  }

  #buildPeople(rawPeople) {
    return rawPeople.map(
      (rawPerson) =>
        new Person(rawPerson.name, this.#buildAnimals(rawPerson.animals))
    );
  }

  #buildCountries(rawCountries) {
    return rawCountries.map(
      (rawCountry) =>
        new Country(rawCountry.name, this.#buildPeople(rawCountry.people))
    );
  }

  /**
   * Processes raw data to build and load countries.
   *
   * @param {Array<unknown>} rawData - The raw data to be used for building countries.
   * @return {Array<Country>} Returns an array of country objects built from the raw data.
   */
  buildDomainObjectsFromRawData(rawData) {
    return this.#buildCountries(rawData);
  }

  // </editor-fold>

  // <editor-fold desc="Filtering countries on people's animal name">

  #filterAnimalsByName(animals, pattern) {
    return animals.filter((animal) => animal.nameContains(pattern));
  }

  #filterPeopleByAnimalName(people, pattern) {
    return people.reduce((filteredPeople, person) => {
      const filteredAnimals = this.#filterAnimalsByName(
        person.animals,
        pattern
      );
      if (filteredAnimals.length > 0) {
        filteredPeople.push(new Person(person.name, filteredAnimals));
      }
      return filteredPeople;
    }, []);
  }

  /**
   * Filters an array of countries to only include those with people
   * whose animals' names match the provided pattern.
   *
   * @param {Array<Country>} countries - The array of countries to filter. Each country must be a valid instance of the Country class.
   * @param {string} pattern - The pattern used to filter animals' names. Must be a non-empty string.
   * @return {Array<Country>|undefined} An array of filtered Country objects or undefined if no matches are found.
   */
  filterCountriesByAnimalName(countries, pattern) {
    Assert.isValidArray(countries, 'countries', Country);
    Assert.isValidString(pattern, 'pattern');

    return countries.reduce((filteredCountries, country) => {
      const filteredPeople = this.#filterPeopleByAnimalName(
        country.people,
        pattern
      );
      if (filteredPeople.length > 0) {
        filteredCountries.push(new Country(country.name, filteredPeople));
      }
      return filteredCountries;
    }, []);
  }

  // </editor-fold>

  // <editor-fold desc="Count owned children and append to the name">

  #countPeopleAnimals(people) {
    return people.map(
      (person) =>
        new Person(
          `${person.name} [${person.animals.length}]`,
          person.animals.map((animal) => new Animal(animal.name))
        )
    );
  }

  #countCountriesPeople(countries) {
    return countries.map(
      (country) =>
        new Country(
          `${country.name} [${country.people.length}]`,
          this.#countPeopleAnimals(country.people)
        )
    );
  }

  /**
   * Counts the total number of people across the given countries and
   * the total of animals across the given people.
   *
   * @param {Array<Country>} countries - An array of Country objects to count people from.
   * @returns {Array<Country>} An array of Country with children total append to the object name
   */
  countChildrenElement(countries) {
    Assert.isValidArray(countries, 'countries', Country);

    return this.#countCountriesPeople(countries);
  }

  // </editor-fold>
}

module.exports = { CountryService };
