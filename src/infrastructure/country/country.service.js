const {Country} = require("../../core/domain/country/index.js");
const {Assert} = require("../../core/domain/assert/assert.js");
const {Animal} = require("../../core/domain/animal/index.js");
const {Person} = require("../../core/domain/person/index.js");

/**
 * Country service
 */
class CountryService {

    /**
     * Processes raw data to create structured objects including countries, people, and animals.
     *
     * @param {Array} rawData - Array containing raw data objects for countries, people, and animals.
     * @return {Array} An array of Country objects, each containing nested Person and Animal objects.
     */
    load(rawData) {
        return rawData.reduce((countries, rawCountry) => {
            return [
                ...countries,
                new Country(rawCountry.name, rawCountry.people.reduce((people, rawPerson) => {
                    return [
                        ...people,
                        new Person(rawPerson.name, rawPerson.animals.map(rawAnimal => new Animal(rawAnimal.name)))
                    ];
                }, []))
            ];
        }, []);
    }

    /**
     * Filters a list of animals by their names based on a specified pattern.
     *
     * @param {Array} animals - An array of animal objects to be filtered.
     * @param {string} pattern - The string pattern to match in the animal names.
     * @return {Array} - A filtered array of animal objects whose names contain the specified pattern.
     */
    #filterAnimalsByName(animals, pattern) {
        return animals.filter(animal => animal.nameContains(pattern));
    }

    /**
     * Filters an array of people, returning only those whose animals' names match a given pattern.
     * Each returned person will include only the animals that match the pattern.
     *
     * @param {Array} people - An array of person objects, where each person has a name and an array of animals.
     * @param {string|RegExp} pattern - The string or regular expression to match against animal names.
     * @return {Array} An array of filtered people, each containing only the animals whose names match the given pattern.
     */
    #filterPeopleByAnimalName(people, pattern) {
        const filteredPeople = [];
        for (const person of people) {
            const filteredAnimals = this.#filterAnimalsByName(person.animals, pattern);
            if (filteredAnimals.length > 0) {
                filteredPeople.push(new Person(person.name, filteredAnimals));
            }
        }
        return filteredPeople;
    }


    /**
     * Filters a list of countries based on a pattern matching the names of animals associated with people in each country.
     *
     * @param {Array<Country>} countries - An array of Country objects to be filtered.
     * @param {string} pattern - A string pattern used to match the names of animals.
     * @return {Array<Country>|undefined} Returns an array of filtered Country objects containing people whose associated animals match the given pattern.
     *                                     Returns undefined if no matches are found.
     */
    filterCountriesByAnimalName(countries, pattern) {
        Assert.isValidArray(countries, 'countries', Country);
        Assert.isValidString(pattern, 'pattern');

        const filteredCountries = [];
        for (const country of countries) {
            const filteredPeople = this.#filterPeopleByAnimalName(country.people, pattern);
            if (filteredPeople.length > 0) {
                filteredCountries.push(new Country(country.name, filteredPeople));
            }
        }
        if (filteredCountries.length === 0) return;
        return filteredCountries;
    }

    /**
     * Transforms a list of countries by appending the count of people in each country
     * and the count of animals for each person in the country to their respective names.
     *
     * @param {Array} countries - An array of Country objects, where each country contains people, and each person contains animals.
     * @return {Array} A new array of Country objects with modified names containing the count of people for each country
     * and animals for each person.
     */
    count(countries) {
        Assert.isValidArray(countries, 'countries', Country);

        return countries.reduce((newCountries, country) => {
            return [
                ...newCountries,
                new Country(`${country.name} [${country.people.length}]` , country.people.reduce((people, person) => {
                    return [
                        ...people,
                        new Person(`${person.name} [${person.animals.length}]`, person.animals.map(animal => new Animal(animal.name)))
                    ];
                }, []))
            ]
        }, [])
    }
}


module.exports = {CountryService};
