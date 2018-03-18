exports = module.exports = () => {
    return new BusinessTypeQueries();
};

function BusinessTypeQueries() {

}

BusinessTypeQueries.prototype.findByName = async (parent, { name }, ctx, info) => {
    return await ctx.db.query.businessType({ where: { name: name } }, info)
};

BusinessTypeQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.businessType({ where: { id } }, info)
};

exports['@singleton'] = true;
