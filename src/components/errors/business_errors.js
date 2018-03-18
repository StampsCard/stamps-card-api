const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new BusinessErrors();
};

function BusinessErrors() {

}

BusinessErrors.prototype.userNotFoundError = createError('userNotFoundError', {
    'message': "The owner of this business not doesn't exist in the system."
});

exports['@singleton'] = true;