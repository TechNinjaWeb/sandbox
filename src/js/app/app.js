var _const = require('_constants'),

app = angular.module( _const.namespace, [
	require('./debugger/debugger.directive.js').name,
	require('angular-ui-router'),
	require('angular-resource')
])
.controller('mainCtrl', ['$scope', function($scope){
	$scope.message = "";
}])
.run(['$rootScope', '$state', '$window', function($rootScope, $state, $window){
	// Navigate To State
	$rootScope.navigateTo = function( state ) {
		$state.go( state );
		console.log("Navigating You To "+ state);
	};
	// Refresh State
	$rootScope.refresh = function( ) {
		$state.reload();
		console.log("Refreshed State");
	};
	// Complete Reload Window
	$rootScope.reload = function( ) {
		$window.location.reload();
		console.log("Reloaded State");
	};
	// Back Button Function
    $rootScope.goBack = function(){
        console.log(["Going Back In History"]);
        $window.history.back();
    };

	// Window Factory
	var windowFactory = require('../modules/window/window.maker.js')( app.name );
		windowFactory.root( app );
		// Custom Window Factory
		windowFactory.modules[ app.name ].run.rootscope = $rootScope;

}]);

module.exports = app;