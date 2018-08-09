const _ = require('lodash');

exports = module.exports = () => {
    return new BusinessQueries();
};

function BusinessQueries() {

}

async function findByCustomer(userId, ctx) {
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
        }
    )
}

async function totalOfStamps(userId, businessId, ctx) {
    const purchases = await ctx.db.query.purchases({
            where: {
                user: {
                    id: userId
                },
                stampCard: {
                    business: {
                        id: businessId
                    }
                }
            },

        }
    );

    return _.reduce(purchases, function(sum, purchase) {
        return sum + purchase.stamps;
    }, 0);
}

BusinessQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.businesses({}, info)
};

BusinessQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.business({ where: { id } }, info)
};

BusinessQueries.prototype.exists = async (parent, { id }, ctx) => {
    return await ctx.db.exists.Business({  id: id });
};

BusinessQueries.prototype.storesByCustomer = async (parent, { userId }, ctx) => {
    const businesses = await findByCustomer(userId, ctx);
    return _.map(businesses, async function (business) {
        const total = await totalOfStamps(userId, business.id, ctx);
        return {
            business: business,
            totalOfStamps: total
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
