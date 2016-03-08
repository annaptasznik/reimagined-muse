'use strict';

describe('QuizCtrl', function () {

        // initialise module
        beforeEach(module('multipleChoice.controllers'));

        // params initialised in scope for tests
        var ctrl, service, scope;

        beforeEach( module( 'multipleChoice.services' ));

        beforeEach(inject( function ( $controller, QuizService ) {

            scope = {};

            service = QuizService;

            ctrl = $controller('QuizCtrl', {
                $scope: scope,

                QuizService : service
            });
        }));

        it ('should add questions parameter to scope', function() {
            expect(scope.questions).toBeDefined();
        });
    }


);