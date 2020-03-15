const bcrypt = require('bcrypt');

exports = module.exports = () => {
    return new UserMutations();
};

function UserMutations() {
    UserMutations.prototype.saltRounds = 10;
}

UserMutations.prototype.create = async (parent, { input }, ctx, info) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        fbToken,
        igToken,
        glToken,
        dateOfBirth,
        location
    } = input;
    const hash = await bcrypt.hash(password, UserMutations.prototype.saltRounds);
    return ctx.db.createUser({
        username,
        email,
        password: hash,
        firstName,
        lastName,
        fbToken,
        igToken,
        glToken,
        dateOfBirth,
        location
    });
};

UserMutations.prototype.update = async (parent, { input }, ctx) => {
    const {
        id,
        password,
        firstName,
        lastName,
        fbToken,
        igToken,
        glToken,
        dateOfBirth,
        location
    } = input;
    const hash = await bcrypt.hash(password, UserMutations.prototype.saltRounds);
    return ctx.db.updateUser(
        {
            where: { id },
            data: {
                password: hash,
                firstName,
                lastName,
                fbToken,
                igToken,
                glToken,
                dateOfBirth,
                location
            },
        },
    );
};

UserMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.deleteUser({ where: { id } }, info)
};

exports['@singleton'] = true;