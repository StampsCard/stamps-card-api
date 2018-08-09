const bcrpyt = require('bcrypt');
const _ = require('lodash');
const moment = require('moment');

exports = module.exports = (businessQueries, userErrors) => {
    return new UserQueries(businessQueries, userErrors);
};

function UserQueries(businessQueries, userErrors) {
    UserQueries.prototype.businessQueries = businessQueries;
    UserQueries.prototype.errors = userErrors;
}

UserQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.users({}, info)
};

UserQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
};

UserQueries.prototype.login = async (parent, { email, password }, ctx) => {
    const user = await getUser(email, ctx);
    if (await isAValidPassword(password, user.password) === true) {
        return {
            user: user,
            userRole: await getUserRole(ctx, user.id)
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
            spent: sumAllPurchases(purchases),
            lastPayment: getLastPurchaseDate(purchases)
        };
    });
};

function sumAllPurchases(purchases) {
    return _.reduce(purchases, function(sum, purchase) {
        return sum + purchase.amount;
    }, 0);
}

function getLastPurchaseDate(purchases) {
    return _.reduce(purchases, function(date, purchase) {
        return isAfter(date, purchase.confirmedAt);
    }, null);
}

function isAfter(date1, date2) {

    if (!date1) return date2;
    if (!date2) return date1;

    if (moment(date1).isBefore(moment(date2))) {
        return date2;
    }
    return date1;
}

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
exports['@require'] = ['queries/businesses', 'errors/user_errors'];