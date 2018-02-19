module.exports = function() {
    return function(parent, { name }, ctx, info) {
        return ctx.db.query.businessType({ where: { name: name } }, info)
    }
};