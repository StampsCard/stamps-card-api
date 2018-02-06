const graphDates = require('graphql-iso-date');

const mutations = require('./mutations');
const queries = require('./queries');

module.exports = {
        Query: queries,
        Mutation: mutations,
        DateTime: graphDates.GraphQLDateTime,
        Date: graphDates.GraphQLDate,
        Time: graphDates.GraphQLTime
};

