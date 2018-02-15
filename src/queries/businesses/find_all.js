module.exports = () => {
    return (parent, args, ctx, info) => {
        return ctx.db.query.businesses({}, info)
    }
};