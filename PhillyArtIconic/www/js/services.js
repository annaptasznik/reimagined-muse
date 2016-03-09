angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    notes: 'Odd obsession with everything',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlen',
    notes: 'Wears a sweet leather Jacket. I\'m a bit jealous',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    notes: 'I think he needs to buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    notes: 'Just the nicest guy',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory("QuizService", function () {
	var Qdb = [{
			id : 0,
			title : "The Tudors",
			text : "Do you know how many wives did HenryVIII have?",
			correct : false,
			image : "henryviii.png",
			options : [{
					id : 0,
					text : "1",
					answer : false
				}, {
					id : 1,
					text : "3",
					answer : false
				}, {
					id : 2,
					text : "6",
					answer : true
				}, {
					id : 3,
					text : "13",
					answer : false
				}
			]
		}, {
			id : 1,
			title : "The Romans",
			text : "Which Roman Emperor built a massive wall across Northern Britain in 122 A.D.?",
			correct : false,
			image : "hadrianswall.png",
			options : [{
					id : 0,
					text : "Marcus Aurelius",
					answer : false
				}, {
					id : 1,
					text : "Hadrian",
					answer : true
				}, {
					id : 2,
					text : "Nero",
					answer : false
				}, {
					id : 3,
					text : "Augustus",
					answer : false
				}
			]
		}, {
			id : 2,
			title : "The Elizabethans",
			text : "In 1594 William Shakespeare joined the company of this London theatre.",
			correct : false,
			image : "globe.png",
			options : [{
					id : 0,
					text : "Broadway",
					answer : false
				}, {
					id : 1,
					text : "Oxford University Theatre",
					answer : false
				}, {
					id : 2,
					text : "The Globe",
					answer : true
				}, {
					id : 3,
					text : "The London Palladium",
					answer : false
				}
			]
		}, {
			id : 3,
			title : "The Renaissance",
			text : "The first successful printing press was developed by this man.",
			correct : false,
			image : "gutenberg.png",
			options : [{
					id : 0,
					text : "Johannes Gutenburg",
					answer : true
				}, {
					id : 1,
					text : "Benjamin Franklin",
					answer : false
				}, {
					id : 2,
					text : "Sir Isaac Newton",
					answer : false
				}, {
					id : 3,
					text : "Martin Luther",
					answer : false
				}
			]
		}
	];

	return {
		all : function () {
			return Qdb
		},
		get : function (index) {
			return Qdb[index]
		},
		mark : function (index, c) {
			Qdb[index].correct = c
		},
		getNumberOfCorrectAnswers : function () {
			for (var b, c = 0, i = 0; i < Qdb.length; i++)
				b = Qdb[i], b.correct && c++;
			return c
		},
		reset : function () {
			for (var i = 0; i < Qdb.length; i++)
				Qdb[i].correct = false
		}
	}
});
