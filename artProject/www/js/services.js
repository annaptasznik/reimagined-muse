angular.module('starter.services', [])

.factory('Locations', function($http) {

  // Dummy Data
  var locations = [
  {
    id: "160",
    gallery: "European Art 1850-1900"
  }, {
    id: "161",
    gallery: "European Art 1850-1900"
  }, {
    id: "162",
    gallery: "European Art 1850-1900"
  }, {
    id: "163",
    gallery: "European Art 1850-1900"
  }
  ];

  // Alias is the gallery ID. What we want to do
  // is grab the gallery ID, then search through 
  // collection data to fetch an object in that 
  // gallery and return the gallery information...
  // using regex?
  // Parse between the first comma and the second comma.
  var returnObjectsInGallery = function(id) {

    var gallery = {
      id: id,
      title : "",
      objects : []
    };

    var galleryRegex = new RegExp(" " + id + ",","g");
    // Gallery title regex will grab everything after Gallery ###, 
    // and before the last comma.
    var regex = /,.*,/g;

    $http.get('../data/PMAPowerofArtHackathon-collectiondata.json')
      .then(function(results) {
        var objects = results.data;
        _.each(objects, function(object) {
          var desc = object.galleryLocation;
          if (galleryRegex.test(desc)) {
            gallery.objects.push(object)
          }
        });

        console.log(gallery); 
      }); 
  };

  return {
    current: function() {
      returnObjectsInGallery("163");
    },
    // Return user's previous location?
    // Could be used to "bridge the gap" -- provide facts about the purposeful transition between locations?
    previous: function() {

    },
    // Fetch adjacent locations?
    next: function() {

    }
  }
  
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
  };


})

.factory('Galleries', function($http) {
  return {
    all: function() {
      return $http.get('data/PMAPowerofArtHackathon-collectiondata.json');
    }
  };
});
