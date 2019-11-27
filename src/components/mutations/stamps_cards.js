exports = module.exports = () => {
    return new StampsCardsMutations();
};

function StampsCardsMutations() {
}

StampsCardsMutations.prototype.create = (parent, {stampPrice, businessId, total, discount}, ctx) => {
    return ctx.db.createStampCard(
        {
            stamp_price: stampPrice,
            total: total,
            discount: discount,
            business: {
                connect: {
                    id: businessId
                },
            },
        }
    )
};

StampsCardsMutations.prototype.update = (parent, {id, stampPrice, businessId, total, discount}, ctx) => {

    return ctx.db.updateStampCard(
        {
            where: { id },
            data: {
                stamp_price: stampPrice,
                total: total,
                discount: discount,
                business: {
                    connect: {
                        id: businessId
                    },
                },
            },
        }
    )
};

StampsCardsMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.deleteStampCard({ id }, info)
};

exports['@singleton'] = true;
