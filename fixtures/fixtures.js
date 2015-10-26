var fixtures = require('pow-mongodb-fixtures').connect('moviewishlist');


//Objects
fixtures.load({
	Movies: [
		{
			title: 'Tomorrowland',
			keywords: [2015]
		}
	]
});
