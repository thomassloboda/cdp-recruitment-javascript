const { handledArgs } = require('../commands/index.js');
const { CountryService } = require('../../country-service/index.js');

const handleCountCommand = (countryService, countries) =>
  countryService.countChildrenElement(countries);

const handleFilterCommand = (countryService, filter, countries) =>
  countryService.filterCountriesByAnimalName(countries, filter);

module.exports = {
  main: (rawData) => {
    const args = handledArgs();
    if (!(args.count || args.filter)) {
      console.log(
        'Please specify a valid argument: --count or --filter=<value>'
      );
      return;
    }

    const transformations = [];
    const countryService = new CountryService();
    let filteredCountries = countryService.buildDomainObjectsFromRawData(rawData);

    if (args.filter) {
      filteredCountries = handleFilterCommand(countryService, args.filter, filteredCountries);
    }
    if (args.count) {
      filteredCountries = handleCountCommand(countryService, filteredCountries);
    }

    if (filteredCountries.length === 0) return;

    console.log(
      JSON.stringify(
          filteredCountries.map((country) => country.toJSON()),
        null,
        2
      )
    );
  },
};
