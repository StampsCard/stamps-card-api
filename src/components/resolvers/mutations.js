exports = module.exports = () => {
    return new Mutations();
};


function Mutations() {
    this._map = {
        //User
        createUser: require('../mutations/users/create')(),
        updateUser: require('../mutations/users/update')(),
        deleteUser: require('../mutations/users/delete')(),
        //Business
        createBusiness: require('../mutations/businesses/create')(),
        updateBusiness: require('../mutations/businesses/update')(),
        deleteBusiness: require('../mutations/businesses/delete')()
    };
}

Mutations.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;