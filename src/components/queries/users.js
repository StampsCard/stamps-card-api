const _ = require('lodash');

exports = module.exports = (businessQueries, purchaseQueries, userErrors) => {
    return new UserQueries(businessQueries, purchaseQueries, userErrors);
};

function UserQueries(businessQueries, purchaseQueries, userErrors) {
    UserQueries.prototype.businessQueries = businessQueries;
    UserQueries.prototype.errors = userErrors;
    UserQueries.prototype.purchaseQueries = purchaseQueries;
}

UserQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.users({}, info)
};

UserQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const user = await ctx.db.query.user({ where: { id } }, info);

    if (!Object.keys(user).length) {
        throw new UserQueries.prototype.errors.userNotFoundError();
    }

    return user;
};


UserQueries.prototype.customersByBusiness = async (parent, { businessId }, ctx, info) => {
    const business = await UserQueries.prototype.businessQueries.exists(parent, businessId, ctx);
    if (!business) {
        throw new UserQueries.prototype.errors.BusinessNotExistsError();
    }
    const users = await ctx.db.query.users({
        where: {
            purchases_some: {
                stampCard: {
                    business: {
                        id: businessId
                    }
                }
            }
        },
    },
    `{
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
    `);

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
    const userHasBusiness = await ctx.db.exists.Business({ owner: { id: userId }});
    if (!userHasBusiness) {
        return "CUSTOMER";
    }
    return "BUSINESS_OWNER";
};

UserQueries.prototype.getUser = async(email, ctx) => {
    const user = await ctx.db.query.user({where: { email: email }});
    if (!Object.keys(user).length) {
        const user = await ctx.db.query.user({where: { username: email }});
        if (!Object.keys(user).length) {
            throw new UserQueries.prototype.errors.EmailOrUsernameError();
        }
    }
    return user;
};


exports['@singleton'] = true;
exports['@require'] = ['queries/businesses', 'queries/purchases', 'errors/user_errors'];