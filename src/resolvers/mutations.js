module.exports = {
    //User
    createUser: require('../mutations/users/create')(),
    updateUser: require('../mutations/users/update')(),
    deleteUser: require('../mutations/users/delete')(),
    //Business
    createBusiness: require('../mutations/businesses/create')(),
    updateBusiness: require('../mutations/businesses/update')(),
    deleteBusiness: require('../mutations/businesses/delete')()
};