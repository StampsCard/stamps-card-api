module.exports = () => {
    return (parent, args, ctx) => {
        return ctx.db.query.businesses()
    }
};