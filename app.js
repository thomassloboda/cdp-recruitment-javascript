const { CountryService } = require("./src/infrastructure/country/country.service.js");
const { handledArgs } = require("./src/infrastructure/shared/commands/index.js");
const { data } = require('./data.js');

function handleCountCommand(countryService, countries) {
    const result = countryService.count(countries).map(country => country.toString());
    console.log(JSON.stringify(result, null, 2));
}

function handleFilterCommand(countryService, countries, filter) {
    const result = countryService.filterCountriesByAnimalName(countries, filter).map(country => country.toString());
    console.log(JSON.stringify(result, null, 2));
}

function main() {
    const args = handledArgs();
    const countryService = new CountryService();
    const countries = countryService.load(data);

    if (args.count) {
        handleCountCommand(countryService, countries);
    } else if (args.filter) {
        handleFilterCommand(countryService, countries, args.filter);
    } else {
        console.log("Please specify a valid argument: --count or --filter=<value>");
    }
}

main();
