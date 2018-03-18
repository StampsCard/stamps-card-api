exports = module.exports = (businessTypeQueries, userQueries, businessErrors) => {
    return new BusinessesMutations(businessTypeQueries, userQueries, businessErrors);
};

function BusinessesMutations(businessTypeQueries, userQueries, businessErrors) {
    BusinessesMutations.prototype.businessTypeQueries = businessTypeQueries;
    BusinessesMutations.prototype.userQueries = userQueries;
    BusinessesMutations.prototype.errors = businessErrors;
}

BusinessesMutations.prototype.create = (parent, {name, categoryName, categoryDescription, ownerId}, ctx, info) => {
    let category = BusinessesMutations.prototype.businessTypeQueries.findByName(parent, categoryName, ctx, info);
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
                    },
                    owner: {
                        connect: {
                            id: ownerId
                        }
                    }
                },
            }
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
                },
                owner: {
                    connect: {
                        id: ownerId
                    }
                }
            },
        }
    )
};

BusinessesMutations.prototype.update = (parent, {id, name, categoryName, categoryDescription, ownerId}, ctx, info) => {
    let category = this.businessTypeQueries.findByName(parent, categoryName, ctx, info);
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
                    },
                    owner: {
                        connect: {
                            id: ownerId
                        }
                    }
                },
            }
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
                },
                owner: {
                    connect: {
                        id: ownerId
                    }
                }
            },
        }
    )
};

BusinessesMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteBusiness({ where: { id } }, info)
};

exports['@singleton'] = true;
exports['@require'] = ['queries/business_types', 'queries/users', 'errors/business_errors'];