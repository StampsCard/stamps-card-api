exports = module.exports = (businessTypeQueries) => {
    return new BusinessesMutations(businessTypeQueries);
};

function BusinessesMutations(businessTypeQueries) {
    BusinessesMutations.prototype.businessTypeQueries = businessTypeQueries;
}

BusinessesMutations.prototype.create = (parent, {name, categoryName, categoryDescription}, ctx, info) => {
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
                }
            },
        }
    )
};

BusinessesMutations.prototype.update = (parent, {id, name, categoryName, categoryDescription}, ctx, info) => {
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
                }
            },
        }
    )
};

BusinessesMutations.prototype.delete = (parent, { id }, ctx, info) => {
    return ctx.db.mutation.deleteBusiness({ where: { id } }, info)
};

exports['@singleton'] = true;
exports['@require'] = ['queries/business_types'];