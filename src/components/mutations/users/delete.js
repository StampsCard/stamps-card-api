module.exports = function() {
    return function(parent, { id }, ctx, info) {
        return ctx.db.mutation.deleteUser({ where: { id } }, info)
    }
};