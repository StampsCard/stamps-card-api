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

UserQueries.prototype.findOne = (parent, { id }, ctx) => {
    return ctx.db.query.user({ where: { id } })
};

UserQueries.prototype.login = async (parent, { email, password }, ctx) => {
    const user = await getUser(email, ctx);
    if (await isAValidPassword(password, user.password) === true) {
        return user;
    } else {
        throw new UserQueries.prototype.errors.InvalidPasswordError();
    }
};

async function getUser(email, ctx) {
    const user = await ctx.db.query.user({where: { email: email }});
    if (!Object.keys(user).length) {
        const user = await ctx.db.query.user({where: { username: email }});
        if (!Object.keys(user).length) {
            throw new UserQueries.prototype.errors.EmailOrUsernameError();
        }
    }
    return user;
}

async function isAValidPassword(passwordRequested, originalPassword) {
    console.log("Passwords: ", await bcrpyt.hash(passwordRequested, 10), originalPassword);
    return await bcrpyt.compare(passwordRequested, originalPassword);
}

exports['@singleton'] = true;
exports['@require'] = ['errors/user_errors'];