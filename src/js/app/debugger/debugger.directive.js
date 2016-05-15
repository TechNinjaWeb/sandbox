var _const = require('../../../../private/constants.js');

module.exports = app = angular.module(_const.namespace + '.debugger', [])
	.directive('tnDebugger', [function(){
		// Directive Object
		return {
			restrict: 'EA',
			scope: true,
			transclude: true,
			replace: true,
			require: 'tnDebugger',
			template: 
				'<div class="debug" ng-show="debug.on">' +
	    			'<strong>Status:</strong> <span class="test-status" ng-bind="debug.status"></span>' +
					'<br>' +
	    			'<strong>Message:</strong> <span class="test-message" ng-bind="debug.message"></span>' +
	    			'<br>' +
	    			'<div ng-bind="debug.on"></div>' + 
				'</div>',
			controllerAs: 'DebugCtrl',
			controller: ['$scope', '$rootScope', function(scope) {
				var self = this;
					self.scope = scope;
				// Deinfe a debug object
				self.debug = {};
				// On or off
				self.debug.on = false;
				// Define a message
				self.debug.message = "App is running";
				self.debug.status = "Loaded Run Sequence";
				// Debug Methods
				self.debug.updateStatus = function( status, message ) {
					this.status = status || this.status;
					this.message = message || this.message;
					// Apply to rootscope
					scope.$apply();
				};
				// Toggle Function
				self.debug.toggle = function( state ){
					scope.safeApply(function(){
						if(!state) self.debug.on = !self.debug.on;
						else self.debug.on = state;

						console.info("Toggled " + self.debug.on, state);
					});
				};
				// Set debug on scope
				// scope.debug = self.debug;
				angular.extend(scope, self);
				// Important $scope.$apply fix
				scope.safeApply = function(fn) {
				    var phase = this.$root.$$phase;
				    if (phase == '$apply' || phase == '$digest') {
				        if (fn && (typeof(fn) === 'function')) {
				            fn();
				        }
				    } else {
				        this.$apply(fn);
				    }
				};
			}],
			link: function(scope, el, attrs, ctrl){
				// Disable Debugger in DOM

				function hide(){ ctrl.debug.toggle(false), el.addClass('hidden'); }
				function show(){ ctrl.debug.toggle(true), el.removeClass('hidden'); }

				// Key Listeners
				scope.$on('debug:status', function(evt, data){ scope.debug.updateStatus( data.status, data.message ); });
				// RootScope Functions
				scope.$on('debug:toggle', function(evt, state){ 
					switch (state) {
						case JSON.parse( state ) === true:
							show()
							break;
						case JSON.parse( state ) === false:
							hide();
							break;
						default:
							scope.debug.on ? hide() : show();
							break;
					}
				});

				// Debugging
				// console.log(
				// 	['El', el],
				// 	['scope', scope],
				// 	['attrs', attrs],
				// 	['Controller', ctrl]
				// );
			}
		}
	}]);