const moment = require('moment');

exports = module.exports = (queries, errors) => {
    return new PurchaseMutations(queries, errors);
};

function PurchaseMutations(queries, errors) {
    PurchaseMutations.prototype.query = queries;
    PurchaseMutations.prototype.errors = errors;
}

PurchaseMutations.prototype.create = (parent, { amount, stamps, concept, userId, stampId }, ctx) => {
    return ctx.db.mutation.createPurchase(
        {
            data: {
                amount,
                stamps,
                concept,
                user: {
                    connect: {
                        id: userId
                    }
                },
                stampCard: {
                    connect: {
                        id: stampId
                    }
                }
            },
        }
    )
};

PurchaseMutations.prototype.confirm = async (parent, { id }, ctx, info) => {
    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx, info);
    if ('cancelledAt' in purchase) {
        throw new PurchaseMutations.prototype.errors.purchaseCancelledError();
    }
    return ctx.db.mutation.updatePurchase(
        {
            where: { id },
            data: {
                confirmedAt: moment().format(),
            },
        },
        info,
    )
};

PurchaseMutations.prototype.cancel = async (parent, { id }, ctx, info) => {
    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx, info);
    if ('confirmedAt' in purchase) {
        throw new PurchaseMutations.prototype.errors.purchaseConfirmedError();
    }
    return ctx.db.mutation.updatePurchase(
        {
            where: { id },
            data: {
                cancelledAt: moment().format(),
            },
        },
        info,
    )
};

exports['@singleton'] = true;
exports['@require'] = ['queries/purchases', 'errors/purchase_errors'];