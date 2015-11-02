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

function getMagnetLink(title) {
	var url = "http://moviewishlist-bogna.rhcloud.com/api/status/" + title + "/1";
	showLoader();
	return fetch(url, {method: 'get'})
		.then(function (response) {
			return response.json();
		})
		.catch(function (err) {
			console.log(err);
		})
}

function showLoader() {
	document.getElementById('loader').style.display = "block";
	document.getElementById('content').style.display = "none";
}

function hideLoader() {
	document.getElementById('loader').style.display = "none";
	document.getElementById('content').style.display = "block";
}

function showResults(data) {
	document.getElementById('search').style.display = "none";
	document.getElementById('result').style.display = "block";

	document.getElementById('title').textContent = data.title;
	document.getElementById('tag').textContent = data.quality.tag;
	document.getElementById('magnet').addEventListener('click', function () {
		var url = document.getElementById('magnet').dataset.href;
		chrome.tabs.create({url: url});
	}, true);

	document.getElementById('magnet').dataset.href = data.magnetLink;
	document.getElementById('seedersLeechers').textContent =
		data.seedersAndLeechers.seeders + "/" + data.seedersAndLeechers.leechers;
}

document.addEventListener('DOMContentLoaded', function () {

	document.addEventListener('click', function () {
		var titleInput = document.getElementById('titleInput');
		if (titleInput.value) {
			getMagnetLink(encodeURIComponent(titleInput.value))
				.then(function (data) {
					hideLoader();
					showResults(data[0]);
				})
				.catch(function (err) {

				});
		}
	}, true);

	getCurrentTabUrl(function (url) {
		if (url.indexOf('www.filmweb') > -1) {
			chrome.tabs.executeScript({
				code: 'document.querySelector("#body h2.cap").innerText'
			}, function (res) {
				getMagnetLink(res)
					.then(function (data) {
						hideLoader();
						showResults(data[0]);
					})
					.catch(function (err) {

					});
			});
		}
	});
});
