module.exports = function(parent, args, ctx) {
    return ctx.db.query.users()
};