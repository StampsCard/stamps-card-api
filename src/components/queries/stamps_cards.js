const _ = require('lodash');

exports = module.exports = (purchaseQueries, stampsCardErrors) => {
    return new StampsCardQueries(purchaseQueries, stampsCardErrors);
};

function StampsCardQueries(purchaseQueries, stampsCardErrors) {
    StampsCardQueries.prototype.purchaseQueries = purchaseQueries;
    StampsCardQueries.prototype.errors = stampsCardErrors;
}

StampsCardQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.stampCards({})
};

StampsCardQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const stampsCard = await ctx.db.stampCard({ id }, info);

    if (!stampsCard) {
        throw new StampsCardQueries.prototype.errors.stampsCardNotFound();
    }

    return stampsCard;
};

StampsCardQueries.prototype.findByUser = async (parent, { userId }, ctx) => {
    const fragment = `{
        id
        stamp_price
        total
        business {
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
          }
        }
        purchases {
          id
          amount
          confirmedAt
          cancelledAt
          stamps
        }
        discount
    }`
    const stampsCards = await ctx.db
        .stampCards({
            where: {
                purchases_some: {
                    user: {
                        id: userId
                    }
                }
            },
            orderBy: "createdAt_DESC"
        })
        .$fragment(fragment);


    return _.map(stampsCards, function(stampsCard) {
        return {
            stampsCard: stampsCard,
            spent: StampsCardQueries.prototype.purchaseQueries.sumTotal(stampsCard.purchases),
            amount: StampsCardQueries.prototype.purchaseQueries.getTotalStamps(
                stampsCard.purchases
            )
        }
    });
};

StampsCardQueries.prototype.findByPurchase = async (parent, { purchaseId }, ctx) => {
    const purchase = await StampsCardQueries.prototype.purchaseQueries.findOneWithStamps(
        parent,
        { id: purchaseId },
        ctx
    );

    if (!purchase) {
        throw new StampsCardQueries.prototype.errors.purchaseNotFound();
    }
    const stampsCard = await purchase.stampCard;

    return {
        stampsCard: stampsCard,
        spent: StampsCardQueries.prototype.purchaseQueries.sumTotal(stampsCard.purchases),
        amount: StampsCardQueries.prototype.purchaseQueries.getTotalStamps(stampsCard.purchases)
    };

};

exports['@singleton'] = true;
exports['@require'] = ['queries/purchases', 'errors/stamps_card_errors'];