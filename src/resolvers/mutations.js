module.exports = {
    createUser: require('../mutations/users/create')(),
    updateUser: require('../mutations/users/update')(),
    deleteUser: require('../mutations/users/delete')()
};