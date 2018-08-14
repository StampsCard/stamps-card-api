const moment = require('moment');
const _ = require('lodash');

exports = module.exports = (purchaseErrors) => {
    return new PurchaseQueries(purchaseErrors);
};

function PurchaseQueries(purchaseErrors) {
    PurchaseQueries.prototype.errors = purchaseErrors;
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

PurchaseQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const purchase = await ctx.db.query.purchase({ where: { id } }, info);

    if (!Object.keys(purchase).length) {
        throw new PurchaseQueries.prototype.errors.purchaseNotFoundError();
    }

    return purchase;
};

PurchaseQueries.prototype.findOneWithStamps = async (parent, { id }, ctx) => {
    return await ctx.db.query.purchase({ where: { id } },
    `{
        id
        amount
        stamps
        concept
        stampCard {
          id
          stamp_price
          total
          purchases {
            id
            amount
            stamps
          }
          discount
        }
        confirmedAt
        cancelledAt
      }
    `
    );
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
exports['@require'] = ['errors/purchase_errors'];