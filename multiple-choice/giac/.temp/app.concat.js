// Factornine - Multiple Choice App

// 'multipleChoice.services' is found in services.js
// 'multipleChoice.controllers' is found in controllers.js
angular.module('MultipleChoice', ['ngAnimate', 'ionic', 'multipleChoice.services', 'multipleChoice.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.questions', {
                url: '/questions',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/quiz.html',
                        controller: 'QuizCtrl'
                    }
                }
            })

            .state('tab.question', {
                url: '/question/:questionId',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/question.html',
                        controller: 'QuestionCtrl'
                    }
                }
            })

            .state('tab.results', {
                url: '/results',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/results.html',
                        controller: 'ResultsCtrl'
                    }
                }
            })

            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/about.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');
    });

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

angular.module('multipleChoice.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('QuizService', function () {
        // Might use a resource here that returns a JSON array
        // examples from: http://www.proprofs.com/quiz-school/story.php?title=basic-world-history-quiz
        // Some mock testing data
        var questions = [
            { id: 0, title: 'The Tudors', text: 'Do you know how many wives did HenryVIII have?', correct: false, image: 'henryviii.png',
                options: [
                    { id: 0, text: '1', answer: false },
                    { id: 1, text: '3', answer: false },
                    { id: 2, text: '6', answer: true},
                    { id: 3, text: '13', answer: false }
                ] },
            { id: 1, title: 'The Romans', text: 'Which Roman Emperor built a massive wall across Northern Britain in 122 A.D.?', correct: false, image: 'hadrianswall.png',
                options: [
                    { id: 0, text: 'Marcus Aurelius', answer: false },
                    { id: 1, text: 'Hadrian', answer: true },
                    { id: 2, text: 'Nero', answer: false },
                    { id: 3, text: 'Augustus', answer: false }
                ]},
            { id: 2, title: 'The Elizabethans', text: 'In 1594 William Shakespeare joined the company of this London theatre.', correct: false, image: 'globe.png',
                options: [
                    { id: 0, text: 'Broadway', answer: false },
                    { id: 1, text: 'Oxford University Theatre', answer: false },
                    { id: 2, text: 'The Globe', answer: true },
                    { id: 3, text: 'The London Palladium', answer: false }
                ]},

            { id: 3, title: 'The Renaissance', text: 'The first successful printing press was developed by this man.', correct: false, image: 'gutenberg.png',
                options: [
                    { id: 0, text: 'Johannes Gutenburg', answer: true },
                    { id: 1, text: 'Benjamin Franklin', answer: false},
                    { id: 2, text: 'Sir Isaac Newton', answer: false },
                    { id: 3, text: 'Martin Luther', answer: false }
                ]}
        ];


        return {
            all: function () {
                return questions;
            },
            get: function (questionId) {
                // Simple index lookup
                return questions[ questionId ];
            },
            mark: function (questionId, isCorrect) {
                // sets the correct property to true or false
                questions[ questionId ].correct = isCorrect;
            },
            getNumberOfCorrectAnswers: function () {

                var total = 0,
                    question;

                for (var i = 0; i < questions.length; i++) {

                    question = questions[i];

                    if (question.correct) {
                        total++;
                    }
                }

                return total;
            },
            reset: function ( ){
                for (var i = 0; i < questions.length; i++) {
                    questions[i].correct = false;
                }
            }
        }
    });
