exports = module.exports = () => {
    return new PurchaseQueries();
};

function PurchaseQueries() {

}

PurchaseQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.purchases({}, info)
};

PurchaseQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.purchase({ where: { id } }, info)
};

exports['@singleton'] = true;
