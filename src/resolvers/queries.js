const findAllUsers = require('../queries/users/find_all');

module.exports = function() {
    return {
        users: findAllUsers
    };
};