module.exports = function(parent, {username, email, password, firstName, lastName}, ctx, info) {
    return ctx.db.mutation.createUser(
            {
                data: {
                    username,
                    email,
                    password,
                    firstName,
                    lastName
                },
            },
            info,
        )
    };
