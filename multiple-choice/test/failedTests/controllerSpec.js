'use strict';

describe('IndexController', function () {

    //initialise module
    beforeEach(module('myApp.controllers'));

    beforeEach(module('ngAnimate'));

    //params initialised in scope for tests
    var ctrl, scope;

    beforeEach(inject(function ($controller) {
        //get controller from $controller provider
        scope = {};
        ctrl = $controller('IndexController', {
            $scope: scope
        });
    }));

    it('should add name parameter to scope', function () {
        expect(scope.name).toBeDefined();
    });
});

describe('StateController', function () {

    //initialise module
    beforeEach(module('myApp.controllers'));

    // inject the services
    beforeEach( module( 'multipleChoice.services' ));

    // inject the 'ngAnimate' service
    beforeEach(module('ngAnimate'));

    // inject the 'ui.router' service
    beforeEach(module('ui.router'));

    //params initialised in scope for tests
    var ctrl, service, state, scope, stateParams, stateProvider, animateProvider;

    //
    beforeEach(inject(function ($controller, $log, $state, $stateParams, $stateProvider,  QuizService) {
        //get controller from $controller provider
        scope = {};

        ctrl = $controller('StateController', {
            $scope: scope,

            QuizService : service,

            $state: state

        });
    }));

    it('should add name parameter to scope', function () {
        expect(scope.name).toBeDefined();
    });

});