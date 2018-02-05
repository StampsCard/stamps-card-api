const mutations = require('./mutations');
const queries = require('./queries');
exports.data = {
    Query: queries.data,
    Mutation: mutations.data
};