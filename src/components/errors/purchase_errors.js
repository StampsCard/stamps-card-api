const { createError } = require('apollo-errors');

exports = module.exports = () => {
    return new PurchaseErrors();
};

function PurchaseErrors() {

}

PurchaseErrors.prototype.purchaseConfirmedError = createError('purchaseConfirmedError', {
    'message': 'You can not cancel a confirmed purchase.'
});

PurchaseErrors.prototype.purchaseCancelledError = createError('purchaseCancelledError', {
    'message': 'You can not confirm a cancelled purchase.'
});

PurchaseErrors.prototype.purchaseNotFoundError = createError('purchaseNotFoundError', {
    'message': 'The purchase could not be found.'
});

exports['@singleton'] = true;