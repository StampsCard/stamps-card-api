const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new AuthErrors();
};

function AuthErrors() {

}

AuthErrors.prototype.notAuthorized = createError('notAuthorizedError', {
    'message': "You are not authorized to use this API."
});

exports['@singleton'] = true;