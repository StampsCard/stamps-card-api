const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new StampsCardErrors();
};

function StampsCardErrors() {

}

StampsCardErrors.prototype.stampsCardNotFound = createError('stampsCardNotFound', {
    'message': 'The stamps card was not found.'
});


exports['@singleton'] = true;