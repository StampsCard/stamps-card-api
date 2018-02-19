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

exports['@singleton'] = true;
