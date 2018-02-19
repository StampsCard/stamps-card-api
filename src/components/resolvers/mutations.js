exports = module.exports = (userMutations, businessMutations, businessTypeMutations) => {
    return new Mutations(userMutations, businessMutations, businessTypeMutations);
};


function Mutations(userMutations, businessMutations, businessTypeMutations) {
    this._map = {
        //User
        createUser: userMutations.create,
        updateUser: userMutations.update,
        deleteUser: userMutations.delete,
        //Business
        createBusiness: businessMutations.create,
        updateBusiness: businessMutations.update,
        deleteBusiness: businessMutations.delete
    };
}

Mutations.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['mutations/users', 'mutations/businesses', 'mutations/business_types'];