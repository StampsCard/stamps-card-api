const bcrpyt = require('bcrypt');

exports = module.exports = (userErrors) => {
    return new UserQueries(userErrors);
};

function UserQueries(userErrors) {
    UserQueries.prototype.errors = userErrors;
}

UserQueries.prototype.findAll = (parent, args, ctx, info) => {
    return ctx.db.query.users({}, info)
};

UserQueries.prototype.findOne = (parent, { id }, ctx, info) => {
    return ctx.db.query.user({ where: { id } }, info)
};

UserQueries.prototype.login = async (parent, { email, password }, ctx, info) => {
    const user = await getUser(email, ctx, info);
    if (await isAValidPassword(password, user.password) === true) {
        return user;
    } else {
        throw new UserQueries.prototype.errors.InvalidPasswordError();
    }
};

async function getUser(email, ctx, info) {
    const user = await ctx.db.query.user({where: { email: email }}, info);
    if (!Object.keys(user).length) {
        throw new UserQueries.prototype.errors.EmailOrUsernameError();
    }
    return user;
}

async function isAValidPassword(passwordRequested, originalPassword) {
    console.log("Passwords: ", await bcrpyt.hash(passwordRequested, 10), originalPassword);
    return await bcrpyt.compare(passwordRequested, originalPassword);
}

exports['@singleton'] = true;
exports['@require'] = ['errors/user_errors'];