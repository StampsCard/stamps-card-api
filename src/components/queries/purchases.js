const moment = require('moment');
const _ = require('lodash');

exports = module.exports = () => {
    return new PurchaseQueries();
};

function PurchaseQueries() {

}

PurchaseQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.purchases({ orderBy: "confirmedAt_DESC"}, info)
};

PurchaseQueries.prototype.findByUser = (parent, { userId }, ctx, info) => {
    return ctx.db.query.purchases(
        {
            where: {
                user: {
                    id: userId
                },
                cancelledAt: null
            },
            orderBy: "confirmedAt_DESC"
        },
        info
    )
};

PurchaseQueries.prototype.findByBusiness = (parent, { businessId }, ctx, info) => {
    return ctx.db.query.purchases(
        {
            where: {
                stampCard: {
                    business: {
                        id: businessId
                    }
                },
                cancelledAt: null
            },
            orderBy: "confirmedAt_DESC"
        },
        info
    )
};

PurchaseQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.purchase({ where: { id } }, info)
};

PurchaseQueries.prototype.getTotalStampsByUserAndBusiness = async (userId, businessId, ctx) => {
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

    return PurchaseQueries.prototype.getTotalStamps(purchases);
};

PurchaseQueries.prototype.getTotalStamps = (purchases) => {
    return _.reduce(purchases, function(sum, purchase) {
        return sum + purchase.stamps;
    }, 0);
};

PurchaseQueries.prototype.sumTotal = (purchases) => {
    return _.reduce(purchases, function(sum, purchase) {
        return sum + purchase.amount;
    }, 0);
};

PurchaseQueries.prototype.getLatestPurchaseDate = (purchases) => {
    return _.reduce(purchases, function(date, purchase) {
        return isAfter(date, purchase.confirmedAt);
    }, null);
};

function isAfter(date1, date2) {

    if (!date1) return date2;
    if (!date2) return date1;

    if (moment(date1).isBefore(moment(date2))) {
        return date2;
    }
    return date1;
}

exports['@singleton'] = true;
