module.exports = function() {
    return function(parent, args, ctx) {
        return ctx.db.query.businesses()
    }
};