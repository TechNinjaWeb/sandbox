describe('calculator', function() {
    beforeEach(module('tn.app'));

    var $controller;
    var myModule = angular.module('tn.app');

    console.log("My Module", myModule);

    beforeEach(inject(function(_$controller_, $rootScope) {
        $controller = _$controller_;
    }));

    describe('sum', function() {
        it('1 + 2 should equal 3', function() {
            inject(function($controller, $rootScope){
            	var ctrl = $controller('mainCtrl', {
            		$scope: $rootScope
            		// Everything Here is a mock
            	});

            	console.log("Controller: Main", ctrl);

            })
        });
    });

it("should say hello", function(){
		expect('Hello!').toEqual('Hello!');
	});

});