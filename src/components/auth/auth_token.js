const jwt = require('jsonwebtoken');

exports = module.exports = (AuthErrors) => {
    return new AuthToken(AuthErrors);
};

function AuthToken(AuthErrors) {
    AuthToken.prototype.errors = AuthErrors;
}

AuthToken.prototype.validateToken = (ctx) => {
    const Authorization = ctx.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, process.env.APP_SECRET);

        return userId;
    }

    throw new AuthToken.prototype.errors.notAuthorized();
};

AuthToken.prototype.sign = (userId) => {
    return jwt.sign({ userId }, process.env.APP_SECRET);
};

exports['@singleton'] = true;
exports['@require'] = ['errors/auth_errors'];