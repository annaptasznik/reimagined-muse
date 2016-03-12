angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
.controller('GalleriesCtrl', function($scope, Galleries) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.galleries = [];
  Galleries.all().then(function(response) {
    $scope.allGalleries = response.data;
    // just grabbing top 100 for testing...
    $scope.galleries = response.data.slice(0, 100);
  });

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('WelcomeCtrl', function($scope, $rootScope, $state) {
  $scope.user = {};
  $scope.next = function(user){
    $rootScope.user = user || { name: "you" };
    $state.go('welcome2', {user: user});
  };
})

.controller('Welcome2Ctrl', function($scope, $rootScope) {
  $scope.getStarted = function(){
    $state.go('chat', {});
  };
});
