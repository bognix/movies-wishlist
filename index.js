var wishlist = require("./helpers/wishlist"),
    Promise = require("bluebird"),
    fetcher = require("./helpers/fetcher"),
    notifier = require("./helpers/notifier");
    processor = require("./helpers/processor");


wishlist.load()
    .then(function(content) {
        return fetcher.fetchData(content)
    })
    .then(function(resultsArr) {
        return processor.createMailContent(resultsArr)
    })
    .then(function(html) {
        return new Promise(function(resolve, reject) {
            notifier.sendMail(resolve, reject, html)
        })
    })
    .then(function(response) {
    });
