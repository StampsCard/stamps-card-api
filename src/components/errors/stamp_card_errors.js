const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new StampCardErrors();
};

function StampCardErrors() {

}

StampCardErrors.prototype.stampCardNotFound = createError('stampCardNotFound', {
    'message': 'The stamp card was not found.'
});


exports['@singleton'] = true;