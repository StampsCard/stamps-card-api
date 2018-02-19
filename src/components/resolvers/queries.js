exports = module.exports = (userQueries, businessQueries, businessTypeQueries) => {
    return new Queries(userQueries, businessQueries, businessTypeQueries);
};

function Queries(userQueries, businessQueries, businessTypeQueries) {
    this._map = {
        //Users
        users: userQueries.findAll,
        user: userQueries.findOne,
        //Business
        businesses: businessQueries.findAll,
        business: businessQueries.findOne,
        // //Business Types
        // businessTypeByName: businessTypeQueries.findByName,
        // businessType: businessTypeQueries.findOne,
    };
}

Queries.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['queries/users', 'queries/businesses', 'queries/business_types'];