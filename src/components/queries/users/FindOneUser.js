module.exports = function() {
    return function(parent, { id }, ctx, info) {
        return ctx.db.query.user({ where: { id } }, info)
    }
};