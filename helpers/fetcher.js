var title = require("./title"),
Promise = require("bluebird");


    function fetchData(content) {
    var url = 'https://foo.se/search/$1/0/99/200',
        results = [];

    return new Promise(function(resolve, reject) {
        var json = JSON.parse(content),
            itemsCount = Object.keys(json).length,
            i = 0,
            parsedUrl;


        for (var entry in json) {
            parsedUrl = url.replace('$1', json[entry].title);
            title.getData(parsedUrl, json[entry].keywords)
                .then(function(data) {
                    results.push(data);
                    i += 1;
                    if (itemsCount === i) {
                        resolve(results)
                    }
                })
        }
    });
}



module.exports.fetchData = fetchData;