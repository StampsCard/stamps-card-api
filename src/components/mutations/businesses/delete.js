module.exports = function() {
    return function(parent, { id }, ctx, info) {
        return ctx.db.mutation.deleteBusiness({ where: { id } }, info)
    }
};