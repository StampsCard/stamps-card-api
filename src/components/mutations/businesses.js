exports = module.exports = (businessTypeQueries, businessErrors) => {
    return new BusinessesMutations(businessTypeQueries, businessErrors);
};

function BusinessesMutations(businessTypeQueries, businessErrors) {
    BusinessesMutations.prototype.businessTypeQueries = businessTypeQueries;
    BusinessesMutations.prototype.errors = businessErrors;
}

BusinessesMutations.prototype.create = async (parent, {name, categoryName, categoryDescription, ownerId}, ctx, info) => {
    const category = await ctx.db.businessType({ where: { name: categoryName } }, info);
    if (category) {
        return await ctx.db.createBusiness(
            {
                data: {
                    name: name,
                    category: {
                        connect: {
                            name: categoryName
                        }
                    },
                    owner: {
                        connect: {
                            id: ownerId
                        }
                    }
                },
            }
        );
    }
    return await ctx.db.createBusiness(
        {
            name: name,
            category: {
                create: {
                    name: categoryName,
                    description: categoryDescription
                }
            },
            owner: {
                connect: {
                    id: ownerId
                }
            }
        },
    );
};

BusinessesMutations.prototype.update = async (parent, {id, name, categoryName, categoryDescription, ownerId}, ctx, info) => {
    const category = await ctx.db.businessType({ where: { name: categoryName } }, info);
    if (category) {
        return ctx.db.updateBusiness(
            {
                where: { id },
                data: {
                    name: name,
                    category: {
                        connect: {
                            name: categoryName
                        }
                    },
                    owner: {
                        connect: {
                            id: ownerId
                        }
                    }
                },
            }
        );
    }

    return await ctx.db.mutation.updateBusiness(
        {
            where: { id },
            data: {
                name: name,
                category: {
                    create: {
                        name: categoryName,
                        description: categoryDescription
                    }
                },
                owner: {
                    connect: {
                        id: ownerId
                    }
                }
            },
        }
    );
};

BusinessesMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteBusiness({ id }, info)
};

exports['@singleton'] = true;
exports['@require'] = ['queries/business_types', 'errors/business_errors'];