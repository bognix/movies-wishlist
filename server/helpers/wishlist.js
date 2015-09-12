var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

function load() {
    return fs.readFileAsync('wishlist.json', 'utf-8');
}


module.exports.load = load;