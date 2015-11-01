var title = require("./title"),
	Promise = require("bluebird");

var url = 'https://thepiratebay.se/search/$1/0/99/200';

function fetchData(content) {
	var results = [];

	return new Promise(function (resolve, reject) {
		var json = JSON.parse(content),
			itemsCount = Object.keys(json).length,
			i = 0,
			parsedUrl;


		for (var entry in json) {
			parsedUrl = url.replace('$1', json[entry].title);
			title.getData(parsedUrl, json[entry].keywords)
				.then(function (data) {
					results.push(data);
					i += 1;
					if (itemsCount === i) {
						resolve(results)
					}
				})
		}
	});
}

function fetchDataForTitle(movieTitle) {
	return new Promise(function (resolve, reject) {
		var parsedUrl;


		parsedUrl = url.replace('$1', movieTitle);
		title.getData(parsedUrl)
			.then(function (data) {
				resolve(data)
			})
			.catch(function (err) {
				reject(err)
			});
	});
}

module.exports.fetchData = fetchData;
module.exports.fetchDataForTitle = fetchDataForTitle;
