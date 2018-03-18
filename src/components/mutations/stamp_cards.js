exports = module.exports = () => {
    return new StampCardMutations();
};

function StampCardMutations() {

}

StampCardMutations.prototype.create = (parent, {stampPrice, businessId, total, discount}, ctx) => {
    return ctx.db.mutation.createStampCard(
        {
            data: {
                stamp_price: stampPrice,
                total: total,
                discount: discount,
                business: {
                    connect: {
                        id: businessId
                    },
                },
            }
        }
    )
};

StampCardMutations.prototype.update = (parent, {id, stampPrice, businessId, total, discount}, ctx) => {
    return ctx.db.mutation.updateStampCard(
        {
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

StampCardMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteStampCard({ where: { id } }, info)
};

exports['@singleton'] = true;
