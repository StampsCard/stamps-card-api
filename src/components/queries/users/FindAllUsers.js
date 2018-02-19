module.exports = () => {
    return (parent, args, ctx, info) => {
        return ctx.db.query.users({}, info)
    }
};