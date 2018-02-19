exports = module.exports = (userMutations, businessMutations, businessTypeMutations, stampCardMutations) => {
    return new Mutations(userMutations, businessMutations, businessTypeMutations, stampCardMutations);
};


function Mutations(userMutations, businessMutations, businessTypeMutations, stampCardMutations) {
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
        createStampCard: stampCardMutations.create,
        updateStampCard: stampCardMutations.update,
        deleteStampCard: stampCardMutations.delete,
    };
}

Mutations.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['mutations/users', 'mutations/businesses', 'mutations/business_types', 'mutations/stamp_cards'];