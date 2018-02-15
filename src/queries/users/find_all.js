module.exports = function() {
    return function(parent, args, ctx, info) {
        return ctx.db.query.users({}, info)
    }
};