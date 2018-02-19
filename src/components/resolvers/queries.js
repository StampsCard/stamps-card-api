exports = module.exports = (userQueries, businessQueries, businessTypeQueries, stampCardQueries) => {
    return new Queries(userQueries, businessQueries, businessTypeQueries, stampCardQueries);
};

function Queries(userQueries, businessQueries, businessTypeQueries, stampCardQueries) {
    this._map = {
        //Users
        users: userQueries.findAll,
        user: userQueries.findOne,
        //Business
        businesses: businessQueries.findAll,
        business: businessQueries.findOne,
        //Business Types
        businessType: businessTypeQueries.findOne,
        businessTypeByName: businessTypeQueries.findByName,
        //Stamp Cards
        stampCards: stampCardQueries.findAll,
        stampCard: stampCardQueries.findOne
    };
}

Queries.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['queries/users', 'queries/businesses', 'queries/business_types', 'queries/stamp_cards'];