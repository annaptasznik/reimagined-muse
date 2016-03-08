angular.module('myApp.controllers', [])

    // A simple 'test' controller
    .controller('IndexController',function ($scope, $log) {

        $scope.name = 'bob';

    }).
    controller('StateController', function ($scope, $log, $stateParams ) {

        $scope.name = 'name';

    });
