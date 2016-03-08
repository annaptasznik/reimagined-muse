'use strict';

/**
 *  A test for the QuestionCtrl Controller
 *
 */

describe('QuestionCtrl', function () {

    //initialise module
    beforeEach(module('multipleChoice.controllers'));

    // inject the services
    beforeEach(module('multipleChoice.services'));

    // inject the 'ngAnimate' service
    beforeEach(module('ngAnimate'));

    // inject the 'ui.router' service
    beforeEach(module('ui.router'));

    //params initialised in scope for tests
    var ctrl, quizService, state, scope, stateParams, stateProvider, animateProvider;

    // , $animateProvider, $state, $stateParams, $stateProvider,
    beforeEach(inject(function ($controller, QuizService, $stateParams) {

        scope = {};

        quizService = QuizService;

        stateParams = $stateParams;

        ctrl = $controller('QuestionCtrl', {

            $scope: scope,

            QuizService: quizService,

            $stateParams: stateParams
        });
    }));

    it('should add test parameter to scope', function () {
        expect(scope.test).toBeDefined();
    });

    it('dummy fail test', function () {
        expect(4).toBeGreaterThan(2) ;
    });

    // test the question with a 'mock'
    it('the question method should return a valid question', function () {

        var question;

        question = quizService.get( 0 );

        expect( question ).toBeDefined();
    });

    // test the  $scope.numberOfQuestions
    it('should expect the question to scope', function () {
        expect(scope.numberOfQuestions).toBeDefined() ;
    });

    // test that currentOption the default is -1
    it('should expect the initial value of current option to be -1', function () {
        expect( scope.currentOption ).toEqual(-1);
    });

    // test the existence of a optionSelected method
    it('should have a function named optionSelected', function(){
        expect( scope.optionSelected ).toBeDefined() ;
    });
});