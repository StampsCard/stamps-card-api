const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new UserErrors();
};

function UserErrors() {

}

UserErrors.prototype.EmailOrUsernameError = createError('EmailOrUsernameError', {
    'message': 'The email and username from this request are not valid.'
});

UserErrors.prototype.InvalidPasswordError = createError('InvalidPasswordError', {
    'message': 'The password is not correct. Please, try again.'
});

exports['@singleton'] = true;