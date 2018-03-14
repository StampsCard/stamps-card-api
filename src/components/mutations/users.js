const bcrypt = require('bcrypt');

exports = module.exports = () => {
    return new UserMutations();
};

function UserMutations() {
    UserMutations.prototype.saltRounds = 10;
}

UserMutations.prototype.create = async (parent, {username, email, password, firstName, lastName}, ctx, info) => {
    const hash = await bcrypt.hash(password, UserMutations.prototype.saltRounds);
    return ctx.db.mutation.createUser(
        {
            data: {
                username,
                email,
                password: hash,
                firstName,
                lastName
            },
        }
    );
};

UserMutations.prototype.update = async (parent, {id, username, email, password, firstName, lastName}, ctx) => {
    const hash = await bcrypt.hash(password, UserMutations.prototype.saltRounds);
    return ctx.db.mutation.updateUser(
        {
            where: { id },
            data: {
                username,
                email,
                password: hash,
                firstName,
                lastName
            },
        },
    );
};

UserMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteUser({ where: { id } }, info)
};

exports['@singleton'] = true;