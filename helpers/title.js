var jsdom = require("jsdom"),
	Promise = require('bluebird');

function getData(url, keywords) {
	return new Promise(function (resolve, reject) {
		jsdom.env({
			url: url,
			scripts: ["http://code.jquery.com/jquery.js"],
			done: function (errors, window) {
				var $ = window.$,
					results = [];
				$('tbody > tr').each(function () {
					var $this = $(this),
						result = {};
					result.title = getTitle($this);
					result.quality = getQuality(result.title);
					result.magnetLink = getMagnetLink($this);
					result.seedersAndLeechers = getSeedersAndLeechers($this);
					if (keywords && Array.isArray(keywords)) {
						result.matchesKeywords = matchesKeywords(result.title, keywords);
					}
					result.isGood = getOverallRating(result, keywords);
					results.push(result);
				});
				resolve(results);
			}
		});
	});
}

function getTitle($row) {
	return $row.find('.detName a').text()
}

function getQuality(title) {
	var badPattern = /CAM(RIP)*|HD.*TS|TELE|HD*TV|Trailer|TBS|WEBRIP|HD.*RIP/gi,
		goodPattern = /BD.*RIP|BR.*RIP|DVD.*RIP/gi,
		goodMatch = title.match(goodPattern),
		badMatch;
	if (goodMatch) {
		return {
			'status': 'good',
			'tag': goodMatch[0]
		}
	} else {
		badMatch = title.match(badPattern);
		if (badMatch) {
			return {
				'status': 'bad',
				'tag': badMatch[0]
			}
		} else {
			return {
				status: undefined,
				tag: '???'
			}
		}
	}
}

function getMagnetLink($row) {
	return $row.find('a[href*="magnet:"]').attr('href')
}

function getSeedersAndLeechers($row) {
	var $seedersAndLeechers = $row.find('td[align="right"]');
	return {
		'seeders': $seedersAndLeechers[0].innerHTML,
		'leechers': $seedersAndLeechers[1].innerHTML
	}
}

function getOverallRating(result, keywords) {
	if (result.quality.status === 'bad') {
		return false;
	}
	if (result.seedersAndLeechers.seeders < 50 && result.seedersAndLeechers.leechers < 100) {
		return false;
	}
	if (keywords && Array.isArray(keywords)) {
		return result.matchesKeywords;
	}
	return true;
}

function matchesKeywords(title, keywords) {
	for (var i = 0; i < keywords.length; i++) {
		if (title.indexOf(keywords[i]) > -1) {
			return true;
		}
	}
}
module.exports.getData = getData;
