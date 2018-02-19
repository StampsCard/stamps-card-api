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

exports['@singleton'] = true;
