describe('debugger component', function(){
	var angular = require('angular'),
		debugProperties;
	// Before Each
	beforeEach(function(){ browser.get( 'http://localhost:8080' ); debugProperties = {
		message: 'Nothing to see here',
		status: 'Protractor Test: Debugger Component'
	}});
	// Test
	it("should be allowed to be set to on or off", function(){
		// Get Element
		var Debugger = element(by.css('.debug'));
		// Is it a div?
		expect(Debugger.getTagName()).toBe('div');
		// Can it be enabled: false by default
		expect(Debugger.isDisplayed()).toBe(false);
		// Get Emitter
		var emitter = angular.element(document).scope().$emit;
		// Set Debugger to displayed
		emitter('debug:toggle', 'true');
		expect(Debugger.isDisplayed()).toBe(true);
		// Set Message
		emitter('debug:status', debugProperties);
		// Check Status
		Debugger.element(by.css('.test-status')).getText().then(function(text){
			console.log("Text", text);
			expect(text).toEqual( debugProperties.status );
		});
		// Check Message
		Debugger.element(by.css('.test-message')).getText().then(function(text){
			console.log("Text", text);
			expect(text).toEqual( debugProperties.message );
		});
	})
});