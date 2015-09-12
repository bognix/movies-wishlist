var wishlist = require("./server/helpers/wishlist"),
    Promise = require("bluebird"),
    fetcher = require("./server/helpers/fetcher"),
    notifier = require("./server/helpers/notifier");
    processor = require("./server/helpers/processor");


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
