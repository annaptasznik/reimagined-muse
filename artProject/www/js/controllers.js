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

.controller('ChatCtrl', function($scope) {
  $scope.myname;
  $scope.theirname = "Art";
  $scope.state = {};
  $scope.state.messages = [];

  try {
    $scope.myname = JSON.parse(window.localStorage.user).name;
  } catch (e) {
    $scope.myname = "you";
  }

  $scope.state.status = "Art is typing...";

  setTimeout(function() {
    $scope.state.messages.push({
      text: "Hey there, welcome to the European Art, 1850-1900",
      datetime: new Date(),
      sender: "Art"
    })
    $scope.state.status = "";
    $scope.$apply();
  }, 2000);



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
