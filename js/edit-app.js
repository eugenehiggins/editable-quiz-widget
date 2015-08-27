editApp = angular.module('editApp',['ui.bootstrap','ngSanitize']);

// SERVICES
editApp.service('DataService', ['$http', function($http){

	var self = this;
	self.questionData = {};
	
	self.getData = function() {
		var configPath = self.getParameterByName("configFile");
		if (configPath) {
			return $http.get(configPath);
		} else {
			return $http.get('model/quiz1.json');
		}

	}

	self.getAnswers = function (qId) {

		for  ( var q of self.questionData) {

			if (q.id == qId) {
				return q.answers;

			}
		}
	}

	self.addAnswer = function(qId) {
		for ( var q of self.questionData) {

			if (q.id == qId) {

				var answers = q.answers;

				answers[length + 1] = {"text":""}
				self.questionData[qId].answers = answers;

				console.log( JSON.parse(self.questionData[qId].answers) )
			}
		}
	}

	self.setQuestionData = function(questions) {
		self.questionData = questions;
	}

	self.setQuestionText = function(qId, text) {
		for  ( var q of self.questionData) {
			if (q.id == qId) {
				self.questionData[q.id].text = text;
			}
		}
	}

	self.setAnswerText = function(qId, aId, text) {
		for  ( var q of self.questionData) {
			if (q.id == qId) {
				var i = 0;
				for (var a of q.answers){
					if (i == aId){	
						self.questionData[q.id].answers[i].text = text;

						return;
					}
					i++;
				}
			}
		}
	}

	self.setCorrectAnswer = function (qId,aId) {

		for  ( var q of self.questionData) {
			if (q.id == qId) {

				var i = 0;
				for(var a of q.answers) {
					if (i == aId) {
						self.questionData[q.id].answers[i].correct = "true";
					} else {
						delete self.questionData[q.id].answers[i].correct;
					}
					i++;
				}
			}
		}
	}

	self.deleteAnswer = function (qId,aId){
		for  ( var q of self.questionData) {
			if (q.id == qId) {
				var i = 0;
				for(var a of q.answers) {

					if (i == aId) {
						
						//delete self.questionData.id[q.id].answers.id[a.id];
						//console.log(self.questionData[q.id].answers[i])
						self.questionData[q.id].answers.splice(i,1);
						return;
						//q.answers.splice(i,1);

					}

					i++;
				}

			}
		}

	}

	self.getParameterByName = function (name) {
    	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), 
    		results = regex.exec(location.search);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	self.postData = function(){
		var postObj = {};
		postObj['type'] = "configuration";
		postObj['method'] = "file";
		postObj['payload'] = self.questionData;
		window.parent.postMessage(postObj, "*");
	}

	

}])

// DIRECTIVES
editApp.directive('myAccordion', ['$compile','DataService', function($compile,DataService){
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

			scope.convertToASCII = function(i) {
				return String.fromCharCode(i + 65);
			}

			element.on('change', function(event){
				var target = $(event.target);
				var questionId = $(element).attr('questionid');		
				var targetClass = target.attr('class');
				var answerId;


				if (target.hasClass('check')) {

					//find sibling checkboxes
					var checkBoxes = $(element).find('checkbox');
					
					//set other checkboxes for just this question to false
					$(element).find(':checked').not(target).attr("checked", false);

					// determine which question to set "correct"
					answerId = target.parents('li').attr('id').split("-")[1];

					// Tell the data service to set this answer for this question to "correct"
					// and set the others to false
					DataService.setCorrectAnswer(questionId,answerId);

					// Change the promptText for this answer to green
					target.parents('li').find('.promptText').addClass('correct').removeClass('incorrect');

					// Change other answers' prompt text to red
					target.parents('ul').siblings().find('.promptText.correct').addClass('incorrect').removeClass('correct');
					
				} else if (target.hasClass('questionText')) {
					DataService.setQuestionText(questionId, target.val());
				} else if (target.hasClass('answerText')) {
					answerId = target.parents('li').attr('id').split("-")[1];
					DataService.setAnswerText(questionId, answerId, target.val());
				}
				
				
				DataService.postData();	

			});

			element.on('click',function(event){
				$target = $(event.target);

				questionId = $target.parents('my-accordion').attr('questionid');

				// answer trash button was click
				if($target.hasClass('btn-trash')) {
					answerId = $target.parents('li.btnEdit').attr('id').split('-')[1];
					$target.parents('li.btnEdit').hide('slow').remove();
					DataService.deleteAnswer(questionId,answerId);
											console.log(DataService.getAnswers(questionId))

					DataService.postData();	
				} else if ($target.hasClass('addAnswerButton')) {
					var answers = DataService.getAnswers(questionId);

					var newIndex = answers.length;
					//console.log(questionId);
					var newAnswerHTML = angular.element("<li class=\"btnEdit ng-scope\" id=\"answer-" + newIndex + "\" ><span class=\"enumeration ng-binding\">"+scope.convertToASCII(newIndex)+"</span><label class=\"switch\"><input type=\"checkbox\" class=\"check\" ng-checked=\"\"><span class=\"switch-label\"></span></label><textarea class=\"answerInput answerText ng-binding\" placeholder=\"Add Answer\" rows=\"1\" style=\"height: 58px;\"></textarea><div ng-class=\"a.correct ? \'correct':\'incorrect\'\" class=\"promptText  incorrect\">promptText</div><textarea class=\"optionalText ng-binding\" placeholder=\"Add Feedback (Optional)\" rows=\"1\" style=\"height: 72px;\"></textarea></li>");
					$target.before(newAnswerHTML);
					DataService.addAnswer(questionId);
					//scope.$apply();
				}
			});

		}
	};
}]);

// CONTROLLER
editApp.controller('editController', ['$scope','DataService', function($scope,DataService){
	
	var promise = DataService.getData();

	promise.then(
		function(payload) {
			DataService.setQuestionData($scope.questions = payload.data);
		});

}])