const componentGenerator = require('./templates/component');

module.exports = function(plop) {
    plop.setGenerator('component', componentGenerator)
}
