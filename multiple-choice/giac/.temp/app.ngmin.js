angular.module('MultipleChoice', [
  'ngAnimate',
  'ionic',
  'multipleChoice.services',
  'multipleChoice.controllers'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    }).state('tab.questions', {
      url: '/questions',
      views: {
        'quiz-tab': {
          templateUrl: 'templates/quiz.html',
          controller: 'QuizCtrl'
        }
      }
    }).state('tab.question', {
      url: '/question/:questionId',
      views: {
        'quiz-tab': {
          templateUrl: 'templates/question.html',
          controller: 'QuestionCtrl'
        }
      }
    }).state('tab.results', {
      url: '/results',
      views: {
        'quiz-tab': {
          templateUrl: 'templates/results.html',
          controller: 'ResultsCtrl'
        }
      }
    }).state('tab.home', {
      url: '/home',
      views: { 'home-tab': { templateUrl: 'templates/home.html' } }
    }).state('tab.about', {
      url: '/about',
      views: { 'about-tab': { templateUrl: 'templates/about.html' } }
    });
    $urlRouterProvider.otherwise('/tab/home');
  }
]);
angular.module('multipleChoice.controllers', []).controller('QuizCtrl', [
  '$scope',
  '$log',
  'QuizService',
  function ($scope, $log, QuizService) {
    $scope.questions = QuizService.all();
  }
]).controller('QuestionCtrl', [
  '$scope',
  '$log',
  '$stateParams',
  '$ionicModal',
  'QuizService',
  function ($scope, $log, $stateParams, $ionicModal, QuizService) {
    $scope.test = 'test';
    $scope.question = QuizService.get($stateParams.questionId);
    $scope.numberOfQuestions = QuizService.all().length;
    $scope.modal;
    $scope.currentOption = -1;
    $scope.optionSelected = function (option) {
      $log.info('item: ', option.id);
      var correct = $scope.question.options[option.id].answer;
      $log.info('correct answer : ' + correct);
      QuizService.mark($stateParams.questionId, correct);
    };
    $ionicModal.fromTemplateUrl('modal.html', function (modal) {
      $log.info('setting up the modal window!');
      $scope.modal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
    $scope.openModal = function () {
      $log.info('open the bloody window! || ', $scope.modal);
      $scope.title = $scope.question.title;
      $scope.text = $scope.question.text;
      $scope.image = $scope.question.image;
      $scope.modal.show();
    };
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });
  }
]).controller('ResultsCtrl', [
  '$scope',
  '$log',
  '$stateParams',
  '$state',
  'QuizService',
  function ($scope, $log, $stateParams, $state, QuizService) {
    $scope.numberOfQuestions = QuizService.all().length;
    $scope.numberOfCorrectAnswers = QuizService.getNumberOfCorrectAnswers();
    $scope.reset = function () {
      QuizService.reset();
      $state.transitionTo('tab.questions');
    };
  }
]);
angular.module('multipleChoice.services', []).factory('QuizService', function () {
  var questions = [
      {
        id: 0,
        title: 'The Tudors',
        text: 'Do you know how many wives did HenryVIII have?',
        correct: false,
        image: 'henryviii.png',
        options: [
          {
            id: 0,
            text: '1',
            answer: false
          },
          {
            id: 1,
            text: '3',
            answer: false
          },
          {
            id: 2,
            text: '6',
            answer: true
          },
          {
            id: 3,
            text: '13',
            answer: false
          }
        ]
      },
      {
        id: 1,
        title: 'The Romans',
        text: 'Which Roman Emperor built a massive wall across Northern Britain in 122 A.D.?',
        correct: false,
        image: 'hadrianswall.png',
        options: [
          {
            id: 0,
            text: 'Marcus Aurelius',
            answer: false
          },
          {
            id: 1,
            text: 'Hadrian',
            answer: true
          },
          {
            id: 2,
            text: 'Nero',
            answer: false
          },
          {
            id: 3,
            text: 'Augustus',
            answer: false
          }
        ]
      },
      {
        id: 2,
        title: 'The Elizabethans',
        text: 'In 1594 William Shakespeare joined the company of this London theatre.',
        correct: false,
        image: 'globe.png',
        options: [
          {
            id: 0,
            text: 'Broadway',
            answer: false
          },
          {
            id: 1,
            text: 'Oxford University Theatre',
            answer: false
          },
          {
            id: 2,
            text: 'The Globe',
            answer: true
          },
          {
            id: 3,
            text: 'The London Palladium',
            answer: false
          }
        ]
      },
      {
        id: 3,
        title: 'The Renaissance',
        text: 'The first successful printing press was developed by this man.',
        correct: false,
        image: 'gutenberg.png',
        options: [
          {
            id: 0,
            text: 'Johannes Gutenburg',
            answer: true
          },
          {
            id: 1,
            text: 'Benjamin Franklin',
            answer: false
          },
          {
            id: 2,
            text: 'Sir Isaac Newton',
            answer: false
          },
          {
            id: 3,
            text: 'Martin Luther',
            answer: false
          }
        ]
      }
    ];
  return {
    all: function () {
      return questions;
    },
    get: function (questionId) {
      return questions[questionId];
    },
    mark: function (questionId, isCorrect) {
      questions[questionId].correct = isCorrect;
    },
    getNumberOfCorrectAnswers: function () {
      var total = 0, question;
      for (var i = 0; i < questions.length; i++) {
        question = questions[i];
        if (question.correct) {
          total++;
        }
      }
      return total;
    },
    reset: function () {
      for (var i = 0; i < questions.length; i++) {
        questions[i].correct = false;
      }
    }
  };
});