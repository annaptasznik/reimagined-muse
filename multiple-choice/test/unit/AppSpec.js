'use strict';

/**
 *  A test for the app
 *
 */

describe('App', function () {

    // load the module
    beforeEach( module('MultipleChoice'));

    //initialise module
    beforeEach(module('multipleChoice.controllers'));

    // inject the services
    beforeEach(module('multipleChoice.services'));

    // inject the ionic framework
    beforeEach( module('ionic'));

    // inject the 'ngAnimate' service
    beforeEach(module('ngAnimate'));

    // inject the 'ui.router' service
    beforeEach(module('ui.router'));

    var rootScope, state, stateProvider, urlRouterProvider, templateCache, location;
       // $injector, myServiceMock;
        //state = 'myState';

    beforeEach( function() {

        // , _$stateProvider, _$urlRouterProvider, $templateCache
//        , $urlRouterProvider

        inject( function( $rootScope, $state, $templateCache, $location ) {

            rootScope = $rootScope;

            state = $state;

            templateCache = $templateCache;

            location = $location;

            //TODO injecting these causes an error
            //stateProvider = $stateProvider;

            // urlRouterProvider = $urlRouterProvider;

            $templateCache.put('templates/quiz.html', '');

        })
    });



});