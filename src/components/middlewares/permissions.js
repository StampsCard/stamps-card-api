exports = module.exports = (authQueries) => {

    return new Permissions(authQueries);
};

function Permissions(authQueries) {
    Permissions.prototype.authQueries = authQueries;

    this._map = {
        Query: {
            //Users
            users: authorizeToken,
            user: authorizeToken,
            customersByBusiness: authorizeToken,
            //Business
            businesses: authorizeToken,
            business: authorizeToken,
            //Business Types
            businessType: authorizeToken,
            businessTypeByName: authorizeToken,
            storesByCustomer: authorizeToken,
            businessesByOwner: authorizeToken,
            //Stamp Cards
            stampCards: authorizeToken,
            stampCard: authorizeToken,
            stampCardsByUser: authorizeToken,
            stampCardByPurchase: authorizeToken,
            //Purchases
            purchases: authorizeToken,
            purchase: authorizeToken,
            purchasesByUser: authorizeToken,
            purchasesByBusiness: authorizeToken
        },
        Mutation: {
            //User
            createUser: authorizeToken,
            updateUser: authorizeToken,
            deleteUser: authorizeToken,
            //Business
            createBusiness: authorizeToken,
            updateBusiness: authorizeToken,
            deleteBusiness: authorizeToken,
            //BusinessType
            createBusinessType: authorizeToken,
            //StampsCard
            createStampCard: authorizeToken,
            updateStampCard: authorizeToken,
            deleteStampCard: authorizeToken,
            //Purchase
            createPurchase: authorizeToken,
            confirmPurchase: authorizeToken,
            cancelPurchase: authorizeToken
        }

    };
}

Permissions.prototype.get = function() {
    return this._map;
};

const authorizeToken = async(resolve, root, args, context, info) => {
    Permissions.prototype.authQueries.validateToken(context);
    return resolve();
};

exports['@singleton'] = true;
exports['@require'] = ['queries/auth_queries'];