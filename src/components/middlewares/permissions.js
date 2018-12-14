const { validateToken } = require('../auth/auth_token');

const rules = {
    authorizeToken: (resolve, root, args, context, info) => {
        validateToken(context);
        return true;
    }
};

const permissions = {
    Query: {
        //Users
        users: rules.authorizeToken,
        user: rules.authorizeToken,
        customersByBusiness: rules.authorizeToken,
        //Business
        businesses: rules.authorizeToken,
        business: rules.authorizeToken,
        //Business Types
        businessType: rules.authorizeToken,
        businessTypeByName: rules.authorizeToken,
        storesByCustomer: rules.authorizeToken,
        businessesByOwner: rules.authorizeToken,
        //Stamp Cards
        stampCards: rules.authorizeToken,
        stampCard: rules.authorizeToken,
        stampCardsByUser: rules.authorizeToken,
        stampCardByPurchase: rules.authorizeToken,
        //Purchases
        purchases: rules.authorizeToken,
        purchase: rules.authorizeToken,
        purchasesByUser: rules.authorizeToken,
        purchasesByBusiness: rules.authorizeToken
    },
    Mutation: {
        //User
        createUser: rules.authorizeToken,
        updateUser: rules.authorizeToken,
        deleteUser: rules.authorizeToken,
        //Business
        createBusiness: rules.authorizeToken,
        updateBusiness: rules.authorizeToken,
        deleteBusiness: rules.authorizeToken,
        //BusinessType
        createBusinessType: rules.authorizeToken,
        //StampsCard
        createStampCard: rules.authorizeToken,
        updateStampCard: rules.authorizeToken,
        deleteStampCard: rules.authorizeToken,
        //Purchase
        createPurchase: rules.authorizeToken,
        confirmPurchase: rules.authorizeToken,
        cancelPurchase: rules.authorizeToken
    }

};

module.exports = {
    permissions,
};