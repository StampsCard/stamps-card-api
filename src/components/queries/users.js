const _ = require('lodash');

exports = module.exports = (businessQueries, purchaseQueries, stampsCardQueries, userErrors) => {
    return new UserQueries(businessQueries, purchaseQueries, stampsCardQueries, userErrors);
};

function UserQueries(businessQueries, purchaseQueries, stampsCardQueries, userErrors) {
    UserQueries.prototype.businessQueries = businessQueries;
    UserQueries.prototype.errors = userErrors;
    UserQueries.prototype.purchaseQueries = purchaseQueries;
    UserQueries.prototype.stampsCardQueries = stampsCardQueries;
}

UserQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.users({}, info)
};

UserQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const user = await ctx.db.user({ id }, info);
    if (!user) {
        throw new UserQueries.prototype.errors.userNotFoundError();
    }
    user.purchases = await UserQueries.prototype.purchaseQueries.findByUser(parent, { id }, ctx, info);
    user.businesses = await UserQueries.prototype.businessQueries.findByOwner(parent, { id }, ctx, info);
    user.stampCards = await UserQueries.prototype.stampsCardQueries.findByUser(parent, { id }, ctx, info);

    return user;
};


UserQueries.prototype.customersByBusiness = async (parent, { businessId }, ctx, info) => {
    const business = await UserQueries.prototype.businessQueries.findOne(parent, {id: businessId }, ctx);
    if (!business) {
        throw new UserQueries.prototype.errors.BusinessNotExistsError();
    }

    const fragment = `
    fragment UserWithPurcases on User {
        id
        username
        email
        password
        firstName
        lastName
        purchases {
            id
            amount
            confirmedAt
            cancelledAt
        }
    }
    `

    const users = await ctx.db
        .users({
            where: {
                purchases_some: {
                    stampCard: {
                        business: {
                            id: businessId
                        }
                    }
                }
            },
        })
        .$fragment(fragment)

    return _.map(users, (user) => {
        const purchases = user.purchases;

        return {
            user: user,
            spent: UserQueries.prototype.purchaseQueries.sumTotal(purchases),
            lastPayment: UserQueries.prototype.purchaseQueries.getLatestPurchaseDate(purchases)
        };
    });
};

UserQueries.prototype.getUserRole = async (ctx, userId) => {
    const userHasBusiness = await ctx.db.user({ id: userId }).businesses().length;
    if (!userHasBusiness) {
        return "CUSTOMER";
    }
    return "BUSINESS_OWNER";
};

UserQueries.prototype.getUser = async(email, ctx) => {
    const user = await ctx.db.user({ email: email });
    if (!user) {
        const user = await ctx.db.user({ email: email });
        if (!user) {
            throw new UserQueries.prototype.errors.EmailOrUsernameError();
        }
    }
    return user;
};


exports['@singleton'] = true;
exports['@require'] = ['queries/businesses', 'queries/purchases', 'queries/stamps_cards', 'errors/user_errors'];