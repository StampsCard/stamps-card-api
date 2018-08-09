const _ = require('lodash');

exports = module.exports = (purchaseQueries) => {
    return new BusinessQueries(purchaseQueries);
};

function BusinessQueries(purchaseQueries) {
    BusinessQueries.prototype.purchaseQueries = purchaseQueries;
}

BusinessQueries.prototype.findByCustomer = async (userId, ctx) => {
    return await ctx.db.query.businesses({
            where: {
                stampCards_some: {
                    purchases_some: {
                        user: {
                            id: userId
                        }
                    }
                }
            },
            orderBy: "createdAt_DESC"
        },`{
            id
            name
            category {
              id
              name
              description
            }
            owner {
              id
              username
              email
              firstName
              lastName
            }
        }`
    )
};

BusinessQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.businesses({}, info)
};

BusinessQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.business({ where: { id } }, info)
};

BusinessQueries.prototype.exists = async (parent, { id }, ctx) => {
    return await ctx.db.exists.Business({  id: id });
};

BusinessQueries.prototype.storesByCustomer = async (parent, { userId }, ctx, info) => {
    const businesses = await BusinessQueries.prototype.findByCustomer(userId, ctx, info);
    return _.map(businesses, async function (business) {
        return {
            business: business,
            totalOfStamps: await BusinessQueries.prototype.purchaseQueries.getTotalStampsByUserAndBusiness(
                userId,
                business.id,
                ctx
            )
        }
    });
};


BusinessQueries.prototype.findByOwner = async (parent, { userId }, ctx, info) => {
    return ctx.db.query.businesses({
            where: {
                owner: {
                    id: userId
                }
            }
        },
        info
    );
};


exports['@singleton'] = true;
exports['@require'] = ['queries/purchases'];