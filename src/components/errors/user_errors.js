const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new UserErrors();
};

function UserErrors() {

}

UserErrors.prototype.EmailOrUsernameError = createError('EmailOrUsernameError', {
    'message': 'The email or username from this request are not valid.'
});


UserErrors.prototype.BusinessNotExistsError = createError('BusinessNotExistsError', {
    'message': 'The business not exists on the system.'
});

UserErrors.prototype.userNotFoundError = createError('UserNotFoundError', {
    'message': 'The user was not found.'
});

exports['@singleton'] = true;