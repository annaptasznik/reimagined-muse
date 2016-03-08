angular.module('multipleChoice.controllers', [])

	// A simple controller that fetches a list of data from a service
	.controller('QuizCtrl', function ($scope, $log, QuizService) {
		// "QuizService" is a service returning mock data

		$scope.questions = QuizService.all();

	})
	// The controller for each question
	.controller('QuestionCtrl', function ($scope, $log, $stateParams, $ionicModal, QuizService) {

		$scope.test = "test";

		$scope.question = QuizService.get($stateParams.questionId);

		$scope.numberOfQuestions = QuizService.all().length;

		$scope.modal;
		// set to the default
		$scope.currentOption = -1;

		/**
		 * Handles the users selection of a possible answer
		 * @param option = the 'option' object
		 */
		$scope.optionSelected = function (option) {

			$log.info("item: ", option.id);

			var correct = $scope.question.options[ option.id ].answer;

			$log.info("correct answer : " + correct);

			// TODO - get A Directive to do this job?
			//option.addClass("ion-android-close"); // attr.icon

			QuizService.mark($stateParams.questionId, correct);
		};

		/**
		 * For the modal window
		 */

			// $ionicModal.fromTemplateUrl('modal.html' // WORKING! ( using script...
		$ionicModal.fromTemplateUrl('modal.html', function (modal) {

			$log.info('setting up the modal window!');

			$scope.modal = modal;

		}, {
			scope: $scope,


			animation: 'slide-in-up'
		});

		$scope.openModal = function () {

			$log.info("open the bloody window! || ", $scope.modal);

			$scope.title = $scope.question.title;

			$scope.text = $scope.question.text;

			$scope.image = $scope.question.image;

			$scope.modal.show();
		};

		//Be sure to cleanup the modal
		$scope.$on('$destroy', function () {
			$scope.modal.remove();
		});

	})
	// The controller for the 'feedback' view
	.controller('ResultsCtrl', function ($scope, $log, $stateParams, $state, QuizService) {

		$scope.numberOfQuestions = QuizService.all().length;

		$scope.numberOfCorrectAnswers = QuizService.getNumberOfCorrectAnswers();

		$scope.reset = function () {

			QuizService.reset();

			$state.transitionTo('tab.questions');
		};
	});
