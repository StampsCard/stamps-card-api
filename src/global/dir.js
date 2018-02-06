module.exports = function() {
    return {
        pwd: __dirname + '/',
        require: function(name) {
            return require(__dirname + '/' + name);
        }
    };
};