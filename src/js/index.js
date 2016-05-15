var angular = require('angular'),
	app = require('./app/app.js');
// console.log("If this shows angular, then it's mondo cool!", app);
angular.bootstrap(document, [app.name]);