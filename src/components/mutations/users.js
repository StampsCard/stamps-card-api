const bcrypt = require('bcrypt');

exports = module.exports = () => {
    return new UserMutations();
};

function UserMutations() {
    UserMutations.prototype.saltRounds = 10;
}

UserMutations.prototype.create = (parent, {username, email, password, firstName, lastName}, ctx, info) => {
    bcrypt.hash(password, UserMutations.prototype.saltRounds, (err, hash) => {
        return ctx.db.mutation.createUser(
            {
                data: {
                    username,
                    email,
                    password: hash,
                    firstName,
                    lastName
                },
            },
            info,
        )
    });
};

UserMutations.prototype.update = (parent, {id, username, email, password, firstName, lastName}, ctx, info) => {
    bcrypt.hash(password, UserMutations.prototype.saltRounds, (err, hash) => {
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
            info
        )
    });
};

UserMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteUser({ where: { id } }, info)
};

exports['@singleton'] = true;