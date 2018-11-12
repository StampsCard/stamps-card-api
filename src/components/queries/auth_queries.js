const bcrpyt = require('bcrypt');

exports = module.exports = (userQueries, authToken, authErrors) => {
    return new AuthQueries(userQueries, authToken, authErrors);
};

function AuthQueries(userQueries, authToken, authErrors) {
    AuthQueries.prototype.userQueries = userQueries;
    AuthQueries.prototype.authToken = authToken;
    AuthQueries.prototype.errors = authErrors;
}

AuthQueries.prototype.login = async (parent, { email, password }, ctx) => {
    const user = await AuthQueries.prototype.userQueries.getUser(email, ctx);
    if (await isAValidPassword(password, user.password) === true) {
        return {
            user: user,
            userRole: await AuthQueries.prototype.userQueries.getUserRole(ctx, user.id),
            token: AuthQueries.prototype.authToken.sign(user.id)
        };
    } else {
        throw new AuthQueries.prototype.errors.InvalidPasswordError();
    }
};

async function isAValidPassword(passwordRequested, originalPassword) {
    return await bcrpyt.compare(passwordRequested, originalPassword);
}

exports['@singleton'] = true;
exports['@require'] = ['queries/users', 'auth/auth_token', 'errors/auth_errors'];