module.exports = function() {
    return function(parent, { name, description }, ctx, info) {
        return ctx.db.mutation.createBusinessType(
            {
                data: {
                    name,
                    description
                },
            },
            info,
        )
    }
};