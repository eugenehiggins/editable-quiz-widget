editApp = angular.module('editApp',[]);

// SERVICES
editApp.service('DataService', ['$http', function($http){

	var self = this;
	
	self.getData = function() {
		return $http.get("model/quiz1.json");

	}
}])

// DIRECTIVES
editApp.directive('myAccordion', ['$compile', function($compile){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			question : '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'parts/accordion.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.convertToASCII = function(i) {
				console.log (i);
				return String.fromCharCode(i + 65);
				//return "howdy";
			}
		}
	};
}]);

// CONTROLLER
editApp.controller('editController', ['$scope','DataService', function($scope,DataService){
	
	var promise = DataService.getData();

	promise.then(
		function(payload) {
			$scope.questions = payload.data.questions;
			console.log(payload.data.questions);
		});

}])