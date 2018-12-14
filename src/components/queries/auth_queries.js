const bcrpyt = require('bcrypt');
const { sign } = require('../auth/auth_token');

exports = module.exports = (userQueries, authErrors) => {
    return new AuthQueries(userQueries, authErrors);
};

function AuthQueries(userQueries, authErrors) {
    AuthQueries.prototype.userQueries = userQueries;
    AuthQueries.prototype.errors = authErrors;
}

AuthQueries.prototype.login = async (parent, { email, password }, ctx) => {
    const user = await AuthQueries.prototype.userQueries.getUser(email, ctx);
    if (await isAValidPassword(password, user.password) === true) {
        return {
            user: user,
            userRole: await AuthQueries.prototype.userQueries.getUserRole(ctx, user.id),
            token: sign(user.id)
        };
    } else {
        throw new AuthQueries.prototype.errors.InvalidPasswordError();
    }
};

async function isAValidPassword(passwordRequested, originalPassword) {
    return await bcrpyt.compare(passwordRequested, originalPassword);
}

exports['@singleton'] = true;
exports['@require'] = ['queries/users', 'errors/auth_errors'];