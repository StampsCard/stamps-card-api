const moment = require('moment');
const _ = require('lodash');

exports = module.exports = (purchaseErrors) => {
    return new PurchaseQueries(purchaseErrors);
};

function PurchaseQueries(purchaseErrors) {
    PurchaseQueries.prototype.errors = purchaseErrors;
}

PurchaseQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.purchases({ orderBy: "confirmedAt_DESC"}, info)
};

PurchaseQueries.prototype.findByUser = async (parent, { userId }, ctx, info) => {
    const fragment = `{
        id
        amount
        stamps
        concept
        stampCard {
          id
          stamp_price
          business {
              id
              name
          }
          total
          purchases {
            id
            amount
            stamps
            confirmedAt
            cancelledAt
          }
          discount
        }
        confirmedAt
        cancelledAt
        createdAt
        updatedAt
      }
    `
    const purchases = await ctx.db
        .purchases(
            {
                where: {
                    user: {
                        id: userId
                    }
                },
                orderBy: "confirmedAt_DESC"
            }
        )
        .$fragment(fragment);

    return _.filter(purchases, function(purchase) {
        return purchaseIsConfirmed(purchase);
    });
};

PurchaseQueries.prototype.findByBusiness = async (parent, { businessId }, ctx, info) => {
    const purchases = await ctx.db.purchases(
        {
            where: {
                stampCard: {
                    business: {
                        id: businessId
                    }
                },
            },
            orderBy: "confirmedAt_DESC"
        },
        info
    );

    return _.filter(purchases, function(purchase) {
        return purchaseIsConfirmed(purchase);
    });
};

PurchaseQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const purchase = await ctx.db.purchase({ id }, info);

    if (!purchase) {
        throw new PurchaseQueries.prototype.errors.purchaseNotFoundError();
    }

    return purchase;
};

PurchaseQueries.prototype.findOneWithStamps = async (parent, { id }, ctx) => {
    const fragment = `{
        id
        amount
        stamps
        concept
        stampCard {
          id
          stamp_price
          business {
              id
              name
          }
          total
          purchases {
            id
            amount
            stamps
            confirmedAt
            cancelledAt
          }
          discount
        }
        confirmedAt
        cancelledAt
        createdAt
        updatedAt
      }
    `;

    return await ctx.db.purchase({ id }).$fragment(fragment);
};

PurchaseQueries.prototype.getTotalStampsByUserAndBusiness = async (userId, businessId, ctx) => {
    const purchases = await ctx.db.purchases({
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
        if (purchaseIsConfirmed(purchase)) {
            sum = sum + purchase.stamps;
        }
        return sum;
    }, 0);
};

PurchaseQueries.prototype.sumTotal = (purchases) => {
    return _.reduce(purchases, function(sum, purchase) {
        if (purchaseIsConfirmed(purchase)) {
            sum = sum + purchase.amount;
        }
        return sum;
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

function purchaseIsConfirmed(purchase) {
    return purchase.confirmedAt && null === purchase.cancelledAt;
}

exports['@singleton'] = true;
exports['@require'] = ['errors/purchase_errors'];