exports = module.exports = (userQueries, businessQueries, businessTypeQueries, stampCardQueries, purchaseQueries) => {
    return new Queries(userQueries, businessQueries, businessTypeQueries, stampCardQueries, purchaseQueries);
};

function Queries(userQueries, businessQueries, businessTypeQueries, stampCardQueries, purchaseQueries) {
    this._map = {
        //Users
        users: userQueries.findAll,
        user: userQueries.findOne,
        login: userQueries.login,
        //Business
        businesses: businessQueries.findAll,
        business: businessQueries.findOne,
        //Business Types
        businessType: businessTypeQueries.findOne,
        businessTypeByName: businessTypeQueries.findByName,
        //Stamp Cards
        stampCards: stampCardQueries.findAll,
        stampCard: stampCardQueries.findOne,
        stampCardsByUser: stampCardQueries.findByUser,
        //Purchases
        purchases: purchaseQueries.findAll,
        purchase: purchaseQueries.findOne,
        purchasesByUser: purchaseQueries.findByUser,
        purchasesByBusiness: purchaseQueries.findByBusiness
    };
}

Queries.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = [
    'queries/users',
    'queries/businesses',
    'queries/business_types',
    'queries/stamp_cards',
    'queries/purchases'
];