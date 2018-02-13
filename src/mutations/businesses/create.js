module.exports = () => {
    return (parent, {name, categoryName, categoryDescription}, ctx, info) => {
        let category = require('../../queries/business_types/find_by_name')(categoryName);
        if (!Object.keys(category).length) {
            return ctx.db.mutation.createBusiness(
                {
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
        return ctx.db.mutation.createBusiness(
            {
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
