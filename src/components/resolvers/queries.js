exports = module.exports = (FindAllUsers) => {
    return new Queries(FindAllUsers);
};

function Queries(userQueries) {
    this._map = {
        //Users
        users: userQueries.findAll,
        user: userQueries.findOne,
        //Business
        businesses: require('../queries/businesses/FindAllBusinesses')(),
        business: require('../queries/businesses/FindOneBusiness')()
    };
}

Queries.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['queries/users'];