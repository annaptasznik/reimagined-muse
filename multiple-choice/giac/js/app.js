// Factornine - Multiple Choice App

// 'multipleChoice.services' is found in services.js
// 'multipleChoice.controllers' is found in controllers.js
angular.module('MultipleChoice', ['ngAnimate', 'ionic', 'multipleChoice.services', 'multipleChoice.controllers'])
    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            .state('tab.questions', {
                url: '/questions',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/quiz.html',
                        controller: 'QuizCtrl'
                    }
                }
            })

            .state('tab.question', {
                url: '/question/:questionId',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/question.html',
                        controller: 'QuestionCtrl'
                    }
                }
            })

            .state('tab.results', {
                url: '/results',
                views: {
                    'quiz-tab': {
                        templateUrl: 'templates/results.html',
                        controller: 'ResultsCtrl'
                    }
                }
            })

            .state('tab.home', {
                url: '/home',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/home.html'
                    }
                }
            })

            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'templates/about.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/home');
    });
