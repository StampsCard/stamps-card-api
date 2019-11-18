const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new AuthErrors();
};

function AuthErrors() {

}

AuthErrors.prototype.notAuthorized = createError('notAuthorizedError', {
    'message': "You are not authorized to use this API."
});

AuthErrors.prototype.InvalidPasswordError = createError('InvalidPasswordError', {
    'message': 'The password is not correct. Please, try it again.'
});

exports['@singleton'] = true;