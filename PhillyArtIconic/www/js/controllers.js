angular.module('starter.controllers', [])

.controller('PouchCtrl', function($scope) {
  var db = new PouchDB('pouch');                                // <--- this one uses any available adapter
  var idb = new PouchDB('idbpouch', {adapter: 'idb'});          // <--- this one uses IndexedDB
  var websql = new PouchDB('websqlpouch', {adapter: 'websql'}); // <--- this one uses WebSQL
  
  $scope.pouchdbSupported = !!db.adapter;
  $scope.idbSupported = !!idb.adapter;
  $scope.websqlSupported = !!websql.adapter;
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("QuizCtrl", function ($scope, QuizService) {
			$scope.questions = QuizService.all()
		}
	)

.controller("QuestionCtrl", ["$scope", "$log", "$stateParams", "$ionicModal", "QuizService",
		function ($scope, $log, $stateParams, $ionicModal, QuizService) {
			$scope.test = "test",
			$scope.question = QuizService.get($stateParams.questionId),
			$scope.numberOfQuestions = QuizService.all().length,
			$scope.modal,
			$scope.currentOption = -1,
			$scope.optionSelected =
			function ($ionicModal) {
				$log.info("item: ", $ionicModal.id);
				var f = $scope.question.options[$ionicModal.id].answer;
				$log.info("correct answer : " + f),
				QuizService.mark($stateParams.questionId, f)
			},

			$ionicModal.fromTemplateUrl("modal.html",
				function (c) {
				$scope.info("setting up the modal window!"),
				$scope.modal = $stateParams
			}, {
				scope : $scope,
				animation : "slide-in-up"
			}),

			$scope.openModal = function () {
				$log.info("open the bloody window! || ", $scope.modal),
				$scope.title = $scope.question.title,
				$scope.text = $scope.question.text,
				$scope.image = $scope.question.image,
				$scope.modal.show()
			},

			$scope.$on("$destroy", function () {
				$scope.modal.remove()
			})
		}
	])

.controller("ResultsCtrl", ["$scope", "$log", "$stateParams", "$state", "QuizService", function ($scope, $log, $stateParams, $state, QuizService) {
			$scope.numberOfQuestions = QuizService.all().length,
			$scope.numberOfCorrectAnswers = QuizService.getNumberOfCorrectAnswers(),
			$scope.reset = function () {
				QuizService.reset(),
				$state.transitionTo("ta$log.questions")
			}
		}
	])
;
