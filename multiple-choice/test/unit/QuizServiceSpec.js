'use strict';

/**
 * A Test for the 'QuizService'
 *
 * Test the API methods of the multipleChoice.services.QuizService
 * defined in the controllers.js
 *
 */
describe('QuizService', function () {

    // inject the app
    beforeEach(module('MultipleChoice'));

    // initialise all the apps's controllers
    beforeEach(module('multipleChoice.controllers'));

    // inject the services
    beforeEach(module('multipleChoice.services'));

    // inject the 'ngAnimate' service
    beforeEach(module('ngAnimate'));

    // inject the ionic service
    beforeEach(module('ionic'));

    // inject the 'ui.router' service
    beforeEach(module('ui.router'));

    //params initialised in scope for tests
    var ionic,
        quizService,
        questions,
        scope;

    // inject the required Angular services
    beforeEach(inject(function ( QuizService ) {

        scope = {};

        quizService = QuizService;

        questions = QuizService.all();

    }));

    // a silly test case example
    it("is less than 10", function () {
        expect(5).toBeLessThan(10);
    });

    // checks that the questions have been created
    // - presently hard-coded will eventually be from a mongoose database
    it('should contain questions', function() {
        expect( questions ).toBeDefined();
    });

    //
    it('should contain more than 1 question' , function () {
        expect( questions.length ).toBeGreaterThan(1);
    });

    // test the existance of the get function
    it('The QuizService should contain a get function', function () {
        expect( quizService.get ).toBeDefined() ;
    });

    // test the QuizService.get( questionId ) API function
    it('should contain a set of questions', function () {

        var question;

        for(var i=0; i<questions.length; i++){

            question = quizService.get( i );

            expect( question ).toBeDefined();
        }
    });

    // test the existance of the mark function
    it('The QuizService should contain a mark function', function () {
        expect( quizService.mark).toBeDefined() ;
    });

    //getNumberOfCorrectAnswers
    it('The QuizService should contain a getNumberOfCorrectAnswers function', function () {
        expect( quizService.getNumberOfCorrectAnswers).toBeDefined();
    });

    // Use negation to test that the getNumberOfCorrectAnswers function returns a number
    it('The number of current answers will be a number', function () {
        expect( quizService.getNumberOfCorrectAnswers).not.toBeNaN();
    }) ;
});