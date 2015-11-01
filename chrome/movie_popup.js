function getCurrentTabUrl(callback) {
	var queryInfo = {
		active: true,
		currentWindow: true
	};

	chrome.tabs.query(queryInfo, function (tabs) {
		var tab = tabs[0],
			url = tab.url;

		callback(url);
	});
}

function renderStatus(statusText) {
	document.getElementById('status').textContent = statusText;
}

function getMagnetLink(title) {
	var url = "http://moviewishlist-bogna.rhcloud.com/api/status/" + title + "/1";
	return fetch(url, {method: 'get'})
		.then(function (response) {
			return response.json();
		})
		.catch(function (err) {
			console.log(err);
		})
}

document.addEventListener('DOMContentLoaded', function () {
	getCurrentTabUrl(function (url) {
		var title;

		if (url.indexOf('www.filmweb') > -1) {
			chrome.tabs.executeScript({
				code: 'document.querySelector("#body h2.cap").innerText'
			}, function (res) {
				renderStatus('Getting best magnet link for title: ' + res[0]);
				getMagnetLink(res)
					.then(function (data) {
						document.getElementById('status').style.display = "none";
						document.getElementById('result').style.display = "block";
						document.getElementById('title').textContent = data[0].title;
						document.getElementById('tag').textContent = data[0].quality.tag;
						document.getElementById('magnet').addEventListener('click', function() {
							var url = document.getElementById('magnet').dataset.href;
							chrome.tabs.create({url: url});
						}, true);

						document.getElementById('magnet').dataset.href = data[0].magnetLink;
						document.getElementById('seedersLeechers').textContent =
							data[0].seedersAndLeechers.seeders + "/" + data[0].seedersAndLeechers.leechers;

					})
					.catch(function (err) {
						renderStatus("Error when fetching data");
					});
			});
		}
	});
});
