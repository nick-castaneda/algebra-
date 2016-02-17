// Sets up new angular module called 'userService' and a factory called
// 'userFacory' that accessed the $http library
angular.module("userService", [])
  .factory("userFactory", function($http){

  // Create an object to export functions
  var factory = {};

  // Grabs all users from the API
  factory.all = function(){
    return $http.get('http://localhost:3000/users');
  }
  // ?????
  factory.create = function(userData) {
    return $http.post('http://localhost:3000/users/create', userData);
  };

  return factory;
})
