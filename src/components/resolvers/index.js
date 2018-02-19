const graphDates = require('graphql-iso-date');

exports = module.exports = function(queries, mutations) {

    return new Resolvers(queries, mutations);
};

function Resolvers(queries, mutations) {
    this._map = {
        Query: queries.get(),
        Mutation: mutations.get(),
        DateTime: graphDates.GraphQLDateTime,
        Date: graphDates.GraphQLDate,
        Time: graphDates.GraphQLTime
    };
}

Resolvers.prototype.get = function() {
    return this._map;
};

exports['@singleton'] = true;
exports['@require'] = ['resolvers/queries', 'resolvers/mutations'];