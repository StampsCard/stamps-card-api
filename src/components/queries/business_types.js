exports = module.exports = () => {
    return new BusinessTypeQueries();
};

function BusinessTypeQueries() {

}

BusinessTypeQueries.prototype.findByName = (parent, { name }, ctx) => {
    return ctx.db.businessType({ name })
};

BusinessTypeQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.businessType({ id })
};

exports['@singleton'] = true;
