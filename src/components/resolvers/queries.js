exports = module.exports = () => {
    return new Queries();
};


function Queries() {
    console.log(__dirname);
    this._map = {
        //Users
        users: require('../queries/users/FindAllUsers')(),
        user: require('../queries/users/FindOneUser')(),
        //Business
        businesses: require('../queries/businesses/FindAllBusinesses')(),
        business: require('../queries/businesses/FindOneBusiness')()
    };
}

Queries.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;