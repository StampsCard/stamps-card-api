exports = module.exports = () => {
    return new BusinessTypeQueries();
};

function BusinessTypeQueries() {

}

BusinessTypeQueries.prototype.findByName = (parent, { name }, ctx) => {
    return ctx.db.query.businessType({ where: { name: name } })
};

BusinessTypeQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.businessType({ where: { id } }, info)
};

exports['@singleton'] = true;
