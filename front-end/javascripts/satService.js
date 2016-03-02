////////////////////////////////////////////////////////////////////////
//                            SAT Service                             //
////////////////////////////////////////////////////////////////////////

// Sets up new angular module called 'satService' and a factory called
// 'satFacory' that accesses the $http library.
angular.module("satService", [])
  .factory("satFactory", function($http){

  // Create an object to export functions
  var factory = {};

  // Grabs all sat problems from the API
  factory.all = function(){
    return $http.get('http://ec2-52-36-162-16.us-west-2.compute.amazonaws.com:3000/sat');
  }

  return factory;
})
