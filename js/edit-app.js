editApp = angular.module('editApp',['ui.bootstrap']);

// SERVICES
editApp.service('DataService', ['$http', function($http){

	var self = this;
	
	self.getData = function() {
		return $http.get("model/quiz1.json");

	}

	self.postData = function(questionId,field,value){

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
			question : '=',
			questionId : '='
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'parts/questions-view.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, element, iAttrs, controller) {

			//console.log(scope.questionId)
			scope.convertToASCII = function(i) {
				// console.log (i);
				return String.fromCharCode(i + 65);
				//return "howdy";
			}
			
			element.on('click', { foo:"bar" }, function(event){

				var target = $(event.target);
				var questionId = $(element).attr('questionid');
				var answerId = '';

				//console.log(questionId);

				if (target.hasClass('questionText')) {
					questionId = target.parent().attr('id').split('-')[1];
					console.log(questionId);
				} else if (target.hasClass('answerText')) {
					answerId = target.parent().attr('id').split('-')[1];
					console.log(target.parent().attr('id').split('-')[1]);
				};
				
			});

			$('accordion').on('click', function(event){
				//console.log($(event.target).parent());
			});
		}
	};
}]);

// CONTROLLER
editApp.controller('editController', ['$scope','DataService', function($scope,DataService){
	
	var promise = DataService.getData();

	promise.then(
		function(payload) {
			$scope.questions = payload.data.questions;
			// console.log(payload.data.questions);
		});

}])