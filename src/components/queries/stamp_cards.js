const _ = require('lodash');

exports = module.exports = (purchaseQueries, stampCardErrors) => {
    return new StampCardQueries(purchaseQueries, stampCardErrors);
};

function StampCardQueries(purchaseQueries, stampCardErrors) {
    StampCardQueries.prototype.purchaseQueries = purchaseQueries;
    StampCardQueries.prototype.errors = stampCardErrors;
}

StampCardQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.stampCards({}, info)
};

StampCardQueries.prototype.findOne = async (parent, { id }, ctx, info) => {
    const stampCard = await ctx.db.query.stampCard({ where: { id } }, info);

    if (!Object.keys(stampCard).length) {
        throw new StampCardQueries.prototype.errors.stampCardNotFound();
    }

    return stampCard;
};

StampCardQueries.prototype.findByUser = async (parent, { userId }, ctx) => {
    const stampCards = await ctx.db.query.stampCards(
        {
            where: {
                purchases_some: {
                    user: {
                        id: userId
                    }
                }
            },
            orderBy: "createdAt_DESC"
        },
        `{
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
          stamps
        }
        discount
    }`
    );


    return _.map(stampCards, function(stampCard) {
        return {
            stampCard: stampCard,
            spent: StampCardQueries.prototype.purchaseQueries.sumTotal(stampCard.purchases),
            amount: StampCardQueries.prototype.purchaseQueries.getTotalStamps(
                stampCard.purchases
            )
        }
    });
};

StampCardQueries.prototype.findByPurchase = async (parent, { purchaseId }, ctx) => {
    const purchase = await StampCardQueries.prototype.purchaseQueries.findOneWithStamps(
        parent,
        { id: purchaseId },
        ctx
    );
    const stampCard = await purchase.stampCard;

    return {
        stampCard: stampCard,
        spent: StampCardQueries.prototype.purchaseQueries.sumTotal(stampCard.purchases),
        amount: StampCardQueries.prototype.purchaseQueries.getTotalStamps(
            stampCard.purchases
        )
    };

};

exports['@singleton'] = true;
exports['@require'] = ['queries/purchases', 'errors/stamp_card_errors'];