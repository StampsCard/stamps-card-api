exports = module.exports = () => {
    return new BusinessQueries();
};

function BusinessQueries() {

}

BusinessQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.businesses({}, info)
};

BusinessQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.business({ where: { id } }, info)
};

BusinessQueries.prototype.findByCustomer = (parent, { userId }, ctx, info) => {
    return ctx.db.query.business({
            where: {
                stampCards_some: {
                    purchases_some: {
                        user: {
                            id: userId
                        }
                    }
                }
            },
            orderBy: "createdAt_DESC"
        },
        info
    )
};

exports['@singleton'] = true;
