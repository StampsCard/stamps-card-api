const _ = require('lodash');

exports = module.exports = (purchaseQueries) => {
    return new StampCardQueries(purchaseQueries);
};

function StampCardQueries(purchaseQueries) {
    StampCardQueries.prototype.purchaseQueries = purchaseQueries;
}

StampCardQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.stampCards({}, info)
};

StampCardQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.stampCard({ where: { id } }, info)
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

exports['@singleton'] = true;
exports['@require'] = ['queries/purchases'];