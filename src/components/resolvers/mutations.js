exports = module.exports = (userMutations, businessMutations, businessTypeMutations, stampCardMutations, purchaseMutations) => {
    return new Mutations(userMutations, businessMutations, businessTypeMutations, stampCardMutations, purchaseMutations);
};


function Mutations(userMutations, businessMutations, businessTypeMutations, stampCardMutations, purchaseMutations) {
    this._map = {
        //User
        createUser: userMutations.create,
        updateUser: userMutations.update,
        deleteUser: userMutations.delete,
        //Business
        createBusiness: businessMutations.create,
        updateBusiness: businessMutations.update,
        deleteBusiness: businessMutations.delete,
        //BusinessType
        createBusinessType: businessTypeMutations.create,
        //StampsCard
        createStampsCard: stampCardMutations.create,
        updateStampsCard: stampCardMutations.update,
        deleteStampsCard: stampCardMutations.delete,
        //Purchase
        createPurchase: purchaseMutations.create,
        confirmPurchase: purchaseMutations.confirm,
        cancelPurchase: purchaseMutations.cancel,
        deletePurchase: purchaseMutations.delete
    };
}

Mutations.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = [
    'mutations/users',
    'mutations/businesses',
    'mutations/business_types',
    'mutations/stamps_cards',
    'mutations/purchases'
];