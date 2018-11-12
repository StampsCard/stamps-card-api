const bcrpyt = require('bcrypt');
const _ = require('lodash');

exports = module.exports = (businessQueries, purchaseQueries, authToken, userErrors) => {
    return new UserQueries(businessQueries, purchaseQueries, authToken, userErrors);
};

function UserQueries(businessQueries, purchaseQueries, authToken, userErrors) {
    UserQueries.prototype.businessQueries = businessQueries;
    UserQueries.prototype.errors = userErrors;
    UserQueries.prototype.purchaseQueries = purchaseQueries;
    UserQueries.prototype.authToken = authToken;
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

UserQueries.prototype.login = async (parent, { email, password }, ctx) => {
    const user = await getUser(email, ctx);
    if (await isAValidPassword(password, user.password) === true) {
        return {
            user: user,
            userRole: await getUserRole(ctx, user.id),
            token: UserQueries.prototype.authToken.sign(user.id)
        };
    } else {
        throw new UserQueries.prototype.errors.InvalidPasswordError();
    }
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

async function getUserRole(ctx, userId) {
    const userHasBusiness = await ctx.db.exists.Business({ owner: { id: userId }});
    if (!userHasBusiness) {
        return "CUSTOMER";
    }
    return "BUSINESS_OWNER";
}

async function getUser(email, ctx) {
    const user = await ctx.db.query.user({where: { email: email }});
    if (!Object.keys(user).length) {
        const user = await ctx.db.query.user({where: { username: email }});
        if (!Object.keys(user).length) {
            throw new UserQueries.prototype.errors.EmailOrUsernameError();
        }
    }
    return user;
}

async function isAValidPassword(passwordRequested, originalPassword) {
    return await bcrpyt.compare(passwordRequested, originalPassword);
}

exports['@singleton'] = true;
exports['@require'] = ['queries/businesses', 'queries/purchases', 'auth/auth_token', 'errors/user_errors'];