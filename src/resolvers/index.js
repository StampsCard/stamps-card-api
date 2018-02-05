const dates = require('graphql-iso-date');

const mutations = require('./mutations');
const queries = require('./queries');

exports.data = {
    Query: queries.data,
    Mutation: mutations.data,
    DateTime: dates.GraphQLDateTime,
    Date: dates.GraphQLDate,
    Time: dates.GraphQLTime
};