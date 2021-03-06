const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: async(ctx) => {
        const Authorization = ctx.request.get('Authorization');
        if (Authorization) {
            const token = Authorization.replace('Bearer ', '');
            const { userId } = jwt.verify(token, process.env.APP_SECRET);
            if (userId) {
                return true;
            }
        }

        return false;
    },

    sign: (userId) => {
        return jwt.sign({ userId }, process.env.APP_SECRET);
    }
};