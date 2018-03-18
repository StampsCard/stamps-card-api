exports = module.exports = () => {
    return new StampCardMutations();
};

function StampCardMutations() {

}

StampCardMutations.prototype.create = (parent, {stampPrice, businessId, total, discount}, ctx) => {
    return ctx.db.mutation.createStampCard(
        {
            data: {
                stampPrice,
                total,
                discount,
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
                stampPrice,
                total,
                discount,
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
