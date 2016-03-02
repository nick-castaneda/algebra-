////////////////////////////////////////////////////////////////////////
//                            User Service                            //
////////////////////////////////////////////////////////////////////////

// Sets up new angular module called 'userService' and a factory called
// 'userFacory' that accesses the $http library
angular.module("userService", [])
  .factory("userFactory", function($http){

  // Create an object to export functions
  var factory = {};

  // Grabs all users from the API
  factory.all = function(){
    return $http.get('http://ec2-52-36-162-16.us-west-2.compute.amazonaws.com:3000/users');
  }

  return factory;
})
