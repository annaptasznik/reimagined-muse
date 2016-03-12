angular.module('starter.controllers', [])

.controller('LocationsCtrl', function($scope, Locations) {
  $scope.location = Locations.current();
})

.controller('BeaconsCtrl', function($scope, $http) {
  $http.get('../data/PMAPowerofArtHackathon-ibeacons.json')
        .then(function(results) {
          $scope.beacons = results.data;
        });
})

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
.controller('GalleriesCtrl', function($scope, Locations, $state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // $scope.galleries = [];
  // Galleries.all().then(function(response) {
  //   $scope.allGalleries = response.data;
  //   // just grabbing top 100 for testing...
  //   $scope.galleries = response.data.slice(0, 100);
  // });
  $scope.gallery = {};
  var thing = Locations.current().then(function(data) {
    $scope.gallery = data;
  });

})

.controller('GalleriesDetailCtrl', function($scope, $stateParams, Galleries) {
  $scope.item = {};
  Galleries.all().then(function(response) {
    $scope.item = response.data.filter(function(item){ return item.objectid == $stateParams.objectid; })[0];
  });

})

.controller('ChatCtrl', function($scope, Locations, $q) {
  $scope.myname;
  $scope.theirname = "Art";
  $scope.state = {};
  $scope.state.messages = [];

  function makeMessage(name, message, delay) {
    var deferred = $q.defer();
    delay = delay || 2000;
    $scope.state.status = name+" is typing...";
    setTimeout(function() {
      $scope.state.messages.push({
        text: message,
        datetime: new Date(),
        sender: name
      });
      $scope.state.status = "";
      $scope.$apply();
      deferred.resolve();
    }, delay);
    return deferred.promise;
  }

  try {
    $scope.myname = JSON.parse(window.localStorage.user).name;
  } catch (e) {
    $scope.myname = "you";
  }
  var thing = Locations.current().then(function(data) {
    $scope.gallery = data;
    makeMessage("Art", "Hey "+$scope.myname+", welcome to the "+data.title+" gallery").then(function() {

      makeMessage("Art", "Let me know if you have any questions, specifically around the history or process of the pieces in this gallery.");
    })
  });






  $scope.hrTime = function(date) {
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }
})

.controller('WelcomeCtrl', function($scope, $rootScope, $state) {
  $scope.user = {};
  $scope.next = function(user){
    window.localStorage.user = JSON.stringify(user);
    $state.go('welcome2', {user: user});
  };
})

.controller('Welcome2Ctrl', function($scope, $rootScope, $state) {
  $scope.user = $scope.user || JSON.parse(window.localStorage.user);
  $scope.getStarted = function(){
    $state.go('tab.galleries', {});
  };
});
