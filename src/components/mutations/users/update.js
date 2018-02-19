module.exports = function() {
    return function(parent, {id, username, email, password, firstName, lastName}, ctx, info) {
        return ctx.db.mutation.updateUser(
            {
                where: { id },
                data: {
                    username,
                    email,
                    password,
                    firstName,
                    lastName
                },
            }
        )
    }
};
