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
	return fetch(url, {method: 'get'})
		.then(function (response) {
			return response.json();
		})
		.catch(function (err) {
		})
}

function showLoader(message) {
	if (message) {
		document.getElementById('loaderMessage').textContent = message;
	}
	removeClass(document.getElementById('loader'), 'hidden');
}

function hideLoader() {
	addClass(document.getElementById('loader'), 'hidden');
}

function showResults(data) {
	removeClass(document.getElementById('result'), 'hidden');

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

function getMagnetBaseOnInputVal() {
	var titleInput = document.getElementById('titleInput');
	if (titleInput.value) {
		showLoader();
		getMagnetLink(encodeURIComponent(titleInput.value))
			.then(function (data) {
				hideLoader();
				showResults(data[0]);
			})
			.catch(function (err) {
			});
	}
}
function showSearch() {
	addClass(document.getElementById('searchTab'), 'active');
	removeClass(document.getElementById('search'), 'hidden');
}

function showFilmweb() {
	addClass(document.getElementById('filmwebTab'), 'active');
	removeClass(document.getElementById('filmweb'), 'hidden');
}

function addClass(element, className) {
	if (!element.classList.contains(className)) {
		element.classList.add(className);
	}
}

function removeClass(element, className) {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	}
}

document.addEventListener('DOMContentLoaded', function () {

	document.getElementById('searchSubmit').addEventListener('click', function() {
		getMagnetBaseOnInputVal();
	});

	document.getElementById('search').addEventListener('keypress', function(event) {
		if (event.keyCode === 13) {
			getMagnetBaseOnInputVal();
		}
	});

	getCurrentTabUrl(function (url) {
		if (url.indexOf('www.filmweb') > -1) {
			showFilmweb();
			chrome.tabs.executeScript({
				code: 'document.querySelector("#body h2.cap").innerText'
			}, function (res) {
				showLoader("Searching for: "+ res);
				getMagnetLink(res)
					.then(function (data) {
						hideLoader();
						showResults(data[0]);
					})
					.catch(function (err) {

					});
			});
		} else {
			addClass(document.getElementById('filmwebTab'), 'disabled');
			showSearch();
		}
	});
});
