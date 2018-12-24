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

    const stampsCard = await PurchaseMutations.prototype.stampCardQueries.findOne(parent, { id: stampId }, ctx);

    const stamps = Math.round(amount/stampsCard.stamp_price);

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

    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx);

    if (null !== purchase.cancelledAt) {
        throw new PurchaseMutations.prototype.errors.purchaseCancelledError();
    }

    if (null !== purchase.confirmedAt) {
        throw new PurchaseMutations.prototype.errors.purchaseAlreadyConfirmedError();
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
        // Throws an error if the user has not found.
        await PurchaseMutations.prototype.userQueries.findOne(parent, { id: userId }, ctx);
        data = Object.assign({}, data, {
            user: {
                connect: {
                    id: userId
                }
            }
        });
    }


    const purchase = await PurchaseMutations.prototype.query.findOne(parent, { id }, ctx);

    if (null !== purchase.confirmedAt) {
        throw new PurchaseMutations.prototype.errors.purchaseConfirmedError();
    }

    if (null !== purchase.cancelledAt) {
        throw new PurchaseMutations.prototype.errors.purchaseAlreadyCancelledError();
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
    'queries/stamps_cards',
    'queries/users',
    'errors/purchase_errors'
];