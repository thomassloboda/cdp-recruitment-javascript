class WrongTypeParameterError extends Error {
    constructor(parameterName, expectedType) {
        super(`Wrong type for parameter ${parameterName}. Expected ${expectedType}`);
    }
}

module.exports = {WrongTypeParameterError};
