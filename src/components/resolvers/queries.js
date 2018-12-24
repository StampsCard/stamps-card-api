exports = module.exports = (
    userQueries,
    businessQueries,
    businessTypeQueries,
    stampCardQueries,
    purchaseQueries,
    authQueries
) => {
    return new Queries(
        userQueries,
        businessQueries,
        businessTypeQueries,
        stampCardQueries,
        purchaseQueries,
        authQueries
    );
};

function Queries(userQueries, businessQueries, businessTypeQueries, stampCardQueries, purchaseQueries, authQueries) {
    this._map = {
        //Auth
        login: authQueries.login,
        //Users
        users: userQueries.findAll,
        user: userQueries.findOne,
        customersByBusiness: userQueries.customersByBusiness,
        //Business
        businesses: businessQueries.findAll,
        business: businessQueries.findOne,
        //Business Types
        businessType: businessTypeQueries.findOne,
        businessTypeByName: businessTypeQueries.findByName,
        storesByCustomer: businessQueries.storesByCustomer,
        businessesByOwner: businessQueries.findByOwner,
        //Stamp Cards
        stampsCards: stampCardQueries.findAll,
        stampsCard: stampCardQueries.findOne,
        stampsCardsByUser: stampCardQueries.findByUser,
        stampsCardByPurchase: stampCardQueries.findByPurchase,
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
    'queries/stamps_cards',
    'queries/purchases',
    'queries/auth_queries'
];