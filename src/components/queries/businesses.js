const _ = require('lodash');

exports = module.exports = (purchaseQueries) => {
    return new BusinessQueries(purchaseQueries);
};

function BusinessQueries(purchaseQueries) {
    BusinessQueries.prototype.purchaseQueries = purchaseQueries;
}

BusinessQueries.prototype.findByCustomer = async (userId, ctx) => {
    const fragment = `{
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

    return await ctx.db
        .businesses({
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
        })
        .$fragment(fragment)
};

BusinessQueries.prototype.findAll = async(parent, args, ctx, info) => {
    return await ctx.db.businesses({}, info)
};

BusinessQueries.prototype.findOne = async(parent, { id }, ctx, info) => {
    return await ctx.db.business({ id: id }, info)
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
    return ctx.db.businesses({
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