const {MissingRequiredParameterError, WrongTypeParameterError} = require("../errors/index.js");
const {Country} = require("./country.js");
const {Person} = require("../person/index.js");

describe('Country', () => {
    it('should have a string name', () => {
        const validCountry = new Country('USA');

        // invalid cases
        [undefined, null, '', ' '].forEach(name => {
            expect(() => new Country(name)).toThrowError(new MissingRequiredParameterError('name'));
        });
        expect(() => new Country(1)).toThrowError(new WrongTypeParameterError('name', 'string'));

        // valid cases
        expect(() => new Country('USA')).not.toThrow();
        expect(validCountry.name).toBe('USA');
    });

    it('should have a valid people array', () => {
        const validCountry = new Country('USA', [new Person('John')]);

        // invalid cases
        expect(() => new Country('USA', null)).toThrowError(new MissingRequiredParameterError('people'));
        expect(() => new Country('USA', ["item"])).toThrowError(new WrongTypeParameterError('people', 'Person[]'));

        // valid cases
        expect(() => new Country('USA', [new Person('John')])).not.toThrow();
        expect(validCountry.people[0].name).toBe('John');
    });

    describe('toString', () => {
        it('should return the country name and people', () => {
            const country = new Country('USA', [new Person('John')]);

            expect(country.toString()).toEqual({name: 'USA', people: [{name: 'John', animals: []}]});
        });
    });
});
