angular.module('multipleChoice.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('QuizService', function () {
        // Might use a resource here that returns a JSON array
        // examples from: http://www.proprofs.com/quiz-school/story.php?title=basic-world-history-quiz
        // Some mock testing data
        var questions = [
            { id: 0, title: 'The Tudors', text: 'Do you know how many wives did HenryVIII have?', correct: false, image: 'henryviii.png',
                options: [
                    { id: 0, text: '1', answer: false },
                    { id: 1, text: '3', answer: false },
                    { id: 2, text: '6', answer: true},
                    { id: 3, text: '13', answer: false }
                ] },
            { id: 1, title: 'The Romans', text: 'Which Roman Emperor built a massive wall across Northern Britain in 122 A.D.?', correct: false, image: 'hadrianswall.png',
                options: [
                    { id: 0, text: 'Marcus Aurelius', answer: false },
                    { id: 1, text: 'Hadrian', answer: true },
                    { id: 2, text: 'Nero', answer: false },
                    { id: 3, text: 'Augustus', answer: false }
                ]},
            { id: 2, title: 'The Elizabethans', text: 'In 1594 William Shakespeare joined the company of this London theatre.', correct: false, image: 'globe.png',
                options: [
                    { id: 0, text: 'Broadway', answer: false },
                    { id: 1, text: 'Oxford University Theatre', answer: false },
                    { id: 2, text: 'The Globe', answer: true },
                    { id: 3, text: 'The London Palladium', answer: false }
                ]},

            { id: 3, title: 'The Renaissance', text: 'The first successful printing press was developed by this man.', correct: false, image: 'gutenberg.png',
                options: [
                    { id: 0, text: 'Johannes Gutenburg', answer: true },
                    { id: 1, text: 'Benjamin Franklin', answer: false},
                    { id: 2, text: 'Sir Isaac Newton', answer: false },
                    { id: 3, text: 'Martin Luther', answer: false }
                ]}
        ];


        return {
            all: function () {
                return questions;
            },
            get: function (questionId) {
                // Simple index lookup
                return questions[ questionId ];
            },
            mark: function (questionId, isCorrect) {
                // sets the correct property to true or false
                questions[ questionId ].correct = isCorrect;
            },
            getNumberOfCorrectAnswers: function () {

                var total = 0,
                    question;

                for (var i = 0; i < questions.length; i++) {

                    question = questions[i];

                    if (question.correct) {
                        total++;
                    }
                }

                return total;
            },
            reset: function ( ){
                for (var i = 0; i < questions.length; i++) {
                    questions[i].correct = false;
                }
            }
        }
    });
