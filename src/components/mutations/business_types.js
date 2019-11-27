exports = module.exports = () => {
    return new BusinessTypeMutations();
};

function BusinessTypeMutations() {

}

BusinessTypeMutations.prototype.create = (parent, { name, description }, ctx, info) => {
    return ctx.db.createBusinessType(
        {
            data: {
                name,
                description
            },
        },
        info,
    )
};

exports['@singleton'] = true;
