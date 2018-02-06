const createUser = require('../mutations/users/create');

module.exports = function() {
    return {
        createUser: createUser
    };

};