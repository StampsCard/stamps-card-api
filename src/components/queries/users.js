exports = module.exports = () => {
    return new UserQueries();
};

function UserQueries() {

}

UserQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.users({}, info)
};

UserQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
};

exports['@singleton'] = true;
