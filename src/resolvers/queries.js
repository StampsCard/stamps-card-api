module.exports = {
        //Users
        users: require('../queries/users/find_all')(),
        user: require('../queries/users/find_one')(),
        //Business
        businesses: require('../queries/businesses/find_all')()
};