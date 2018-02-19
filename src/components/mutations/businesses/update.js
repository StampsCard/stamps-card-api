module.exports = function() {
    return function(parent, {id, name, categoryName, categoryDescription}, ctx, info) {
        //define a dependency container!
        let category = require('../../queries/business_types/FindBusinessTypeByName')(categoryName);
        if (!Object.keys(category).length) {
            return ctx.db.mutation.updateBusiness(
                {
                    where: { id },
                    data: {
                        name: name,
                        category: {
                            create: {
                                name: categoryName,
                                description: categoryDescription
                            }
                        }
                    },
                },
                info,
            )
        }
        return ctx.db.mutation.updateBusiness(
            {
                where: { id },
                data: {
                    name: name,
                    category: {
                        connect: {
                            name: categoryName
                        }
                    }
                },
            },
            info,
        )
    }
};
