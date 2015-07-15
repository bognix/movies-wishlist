var title = require("./helpers/title"),
    wishlist = require("./helpers/wishlist"),
    Promise = require("bluebird"),
    fetcher = require("./helpers/fetcher"),
    notifier = require("./helpers/notifier");
    processor = require("./helpers/processor");


wishlist.load()
    .then(function(content) {
        return fetcher.fetchData(content)
    })
    .then(function(resultsArr) {
        return new Promise(function(resolve, reject) {
            return processor.toMailContent(resolve, resultsArr)
        })
    })
    .then(function(result) {
        return new Promise(function(resolve, reject) {
            notifier.sendMail(resolve, reject, result)
        })
    })
    .then(function(response) {
    });
