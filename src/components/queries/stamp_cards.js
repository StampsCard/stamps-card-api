exports = module.exports = () => {
    return new StampCardQueries();
};

function StampCardQueries() {

}

StampCardQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.stampCards({}, info)
};

StampCardQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.stampCard({ where: { id } }, info)
};

StampCardQueries.prototype.findByUser = (parent, { userId }, ctx) => {
    return ctx.db.query.stampCards(
        {
            where: {
                purchases_some: {
                    user: {
                        id: userId
                    }
                }
            },
            orderBy: "createdAt_DESC"
        }
    )
};

exports['@singleton'] = true;
