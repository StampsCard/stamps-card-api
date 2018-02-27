const moment = require('moment');

exports = module.exports = () => {
    return new PurchaseMutations();
};

function PurchaseMutations() {

}

PurchaseMutations.prototype.create = (parent, { amount, stamps, concept, user_id, stamp_id }, ctx, info) => {
    return ctx.db.mutation.createPurchase(
        {
            data: {
                amount,
                stamps,
                concept,
                user: {
                    connect: {
                        id: user_id
                    }
                },
                stampCard: {
                    connect: {
                        id: stamp_id
                    }
                }
            },
        },
        info,
    )
};

PurchaseMutations.prototype.confirm = (parent, { id }, ctx, info) => {
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

PurchaseMutations.prototype.cancel = (parent, { id }, ctx, info) => {
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
