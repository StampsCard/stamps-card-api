const moment = require('moment');

exports = module.exports = (queries, stampCardQueries, userQueries, errors) => {
    return new PurchaseMutations(queries, stampCardQueries, userQueries, errors);
};

function PurchaseMutations(queries, stampCardQueries, userQueries, errors) {
    PurchaseMutations.prototype.query = queries;
    PurchaseMutations.prototype.stampCardQueries = stampCardQueries;
    PurchaseMutations.prototype.userQueries = userQueries;
    PurchaseMutations.prototype.errors = errors;
}

PurchaseMutations.prototype.create = async (parent, { amount, concept, stampId }, ctx) => {

    const stampCard = await PurchaseMutations.prototype.stampCardQueries.findOne(parent, { id: stampId }, ctx);

    const stamps = Math.round(amount/stampCard.stamp_price);

    return ctx.db.mutation.createPurchase(
        {
            data: {
                amount,
                stamps,
                concept,
                stampCard: {
                    connect: {
                        id: stampId
                    }
                }
            },
        }
    )
};

PurchaseMutations.prototype.confirm = async (parent, { id, userId }, ctx, info) => {

    await PurchaseMutations.prototype.userQueries.findOne(parent, { id: userId }, ctx);

    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx, info);

    if ('cancelledAt' in purchase) {
        throw new PurchaseMutations.prototype.errors.purchaseCancelledError();
    }
    return ctx.db.mutation.updatePurchase(
        {
            where: { id },
            data: {
                user: {
                    connect: {
                        id: userId
                    }
                },
                confirmedAt: moment().format(),
            },
        },
        info,
    )
};

PurchaseMutations.prototype.cancel = async (parent, { id, userId }, ctx, info) => {

    let data = {
        cancelledAt: moment().format()
    };

    if (userId) {
        await PurchaseMutations.prototype.userQueries.findOne(parent, { id: userId }, ctx);
        data = Object.assign({}, data, {
            user: {
                connect: {
                    id: userId
                }
            }
        });
    }


    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx, info);
    if ('confirmedAt' in purchase) {
        throw new PurchaseMutations.prototype.errors.purchaseConfirmedError();
    }
    return ctx.db.mutation.updatePurchase(
        {
            where: { id },
            data
        },
        info,
    )
};

exports['@singleton'] = true;
exports['@require'] = [
    'queries/purchases',
    'queries/stamp_cards',
    'queries/users',
    'errors/purchase_errors'
];