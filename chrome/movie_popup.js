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
	addClass(document.getElementById('result'), 'hidden');

	if (message) {
		document.getElementById('loaderMessage').textContent = message;
	}

	removeClass(document.getElementById('loader'), 'hidden');
}

function hideLoader() {
	addClass(document.getElementById('loader'), 'hidden');
}

function showResults(data) {
	var resultNode = document.getElementById('result'),
		magnetNode = document.getElementById('magnet');

	removeClass(resultNode, 'hidden');
	removeClass(resultNode, 'good');
	removeClass(resultNode, 'bad');

	data.isGood ?
		(addClass(resultNode, 'good') || removeClass(resultNode, 'bad')) :
		(addClass(resultNode, 'bad') || removeClass(resultNode, 'good'));

	document.getElementById('title').textContent = data.title;
	document.getElementById('tag').textContent = data.quality.tag;
	magnetNode.dataset.href = data.magnetLink;
	document.getElementById('seedersLeechers').textContent =
		data.seedersAndLeechers.seeders + "/" + data.seedersAndLeechers.leechers;

	magnetNode.addEventListener('click', function () {
		var url = magnetNode.dataset.href;
		chrome.tabs.create({url: url});
	}, true);

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

function hideFilmweb() {
	removeClass(document.getElementById('filmwebTab'), 'active');
	addClass(document.getElementById('filmweb'), 'hidden');
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

function hideSearch() {
	removeClass(document.getElementById('searchTab'), 'active');
	addClass(document.getElementById('search'), 'hidden');
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

	document.getElementById('searchTab').addEventListener('click', function(event) {
		showSearch();
		hideFilmweb();
	});

	document.getElementById('filmwebTab').addEventListener('click', function(event) {
		if (document.getElementById('filmwebTab').classList.contains('disabled')) {
			return;
		}
		hideSearch();
		showFilmweb();
	});

	getCurrentTabUrl(function (url) {
		if (url.indexOf('www.filmweb') > -1) {
			showFilmweb();
			chrome.tabs.executeScript({
				code: 'var x = document.querySelectorAll("#body h2.cap, #body h1.filmTitle a");' +
				'x.length === 2 ? x[1].innerText : x[0].innerText;',
				runAt: 'document_idle'
			}, function (res) {
				document.getElementById('filmwebTitle').textContent= res;
				showLoader();
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
