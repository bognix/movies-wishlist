var title = require("./helpers/title"),
    wishlist = require("./helpers/wishlist"),
    Promise = require("bluebird");

var url = 'https://foo/search/$1/0/99/200';
wishlist.load()
    .then(function(content) {
        return new Promise(function(resolve, reject) {
            var json = JSON.parse(content),
                parsedUrl;

            for (var entry in json) {
                parsedUrl = url.replace('$1', json[entry].title);
                title.getData(parsedUrl)
                    .then(function(data) {
                        resolve(data);
                    })
            }
        });
    })
    .then(function(result) {
        console.log(result);
    });
