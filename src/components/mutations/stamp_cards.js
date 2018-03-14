exports = module.exports = () => {
    return new StampCardMutations();
};

function StampCardMutations() {

}

StampCardMutations.prototype.create = (parent, {stamp_price, user_id, business_id, total}, ctx, info) => {
    return ctx.db.mutation.createStampCard(
        {
            data: {
                stamp_price,
                total,
                user: {
                    connect: {
                        id: user_id
                    },
                },
                business: {
                    connect: {
                        id: business_id
                    },
                },
            }
        }
    )
};

StampCardMutations.prototype.update = (parent, {id, stamp_price, user_id, business_id, total}, ctx, info) => {
    return ctx.db.mutation.updateStampCard(
        {
            data: {
                stamp_price,
                total,
                user: {
                    connect: {
                        id: user_id
                    },
                },
                business: {
                    connect: {
                        id: business_id
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
