class MissingRequiredParameterError extends Error {
    constructor(parameterName) {
        super(`Missing required parameter: ${parameterName}`);
    }
}

module.exports = {MissingRequiredParameterError};
