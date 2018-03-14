exports = module.exports = () => {
    return new PurchaseQueries();
};

function PurchaseQueries() {

}

PurchaseQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.purchases({ orderBy: "confirmedAt_DESC"}, info)
};

PurchaseQueries.prototype.findByUser = (parent, { userId }, ctx) => {
    return ctx.db.query.purchases(
        {
            where: {
                user: {
                    id: userId
                },
                cancelledAt: null
            },
            orderBy: "confirmedAt_DESC"
        }
    )
};

PurchaseQueries.prototype.findByBusiness = (parent, { businessId }, ctx) => {
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
        }
    )
};

PurchaseQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.purchase({ where: { id } }, info)
};

exports['@singleton'] = true;
