////////////////////////////////////////////////////////////////////////
//                          User Controller                           //
////////////////////////////////////////////////////////////////////////

// Adds controller to the angular app that takes in the userFactory, and
// $http
app.controller('userController', function($http, $scope, $state){
  var vm = this;

  // Grab all users
  database.child('users').on("value",
    function(snapshot) {
      vm.users = [];
      var users = snapshot.val();
      for (var property in users) {
        if (users.hasOwnProperty(property)) {
          vm.users.push(users[property]);
        }
      }
      for(var i=0; i<vm.users.length; i++){
        vm.users[i].level = Math.floor( Math.log(vm.users[i].points.equation + vm.users[i].points.expression + vm.users[i].points.sat + 1) / Math.log(2) )
        // Include current user update
      }
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );

  // Register users
  vm.register = function(email, username, pw, url){
    database.createUser({
      email: email,
      password: pw
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        var route = database.child('users').push({
          email: email,
          username: username,
          imageURL: url ? url : "http://bestpuppyfoodbrands.com/wp-content/uploads/2015/02/happy-puppy-201x300.png",
          points: {
            equation: 0,
            expression: 0,
            sat: 0
          }
        }).key();
        database.child('users').child(route).update({
          "route": route
        });
        database.child('users').child(route).on("value",
          function(snapshot){
            vm.currentUser = snapshot.val();
          });
        vm.signedIn = true;
      }
    });
  }


  // Login
  vm.signedIn = false;
  vm.currentUser = {username: ""}
  $scope.$watch("vm.currentUser")
  vm.login = function (email, pw) {
    database.authWithPassword({
      email    : email,
      password : pw
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        vm.signedIn = true;
        for (var i = 0; i < vm.users.length; i++){
          if(vm.users[i].email == email) vm.currentUser = vm.users[i]
        }
        // $state.go('profile');
      }
    });
  }


  // Raises expression score
  $scope.$on('raise-exp-score', function(event, args) {
    if(vm.currentUser.username){
      var newScore = vm.currentUser.points.expression + 1
      database.child('users').child(vm.currentUser.route).update({
        "points/expression": newScore
      })
      vm.currentUser.points.expression = newScore;
      vm.currentUser.level = Math.floor( Math.log(vm.currentUser.points.equation + vm.currentUser.points.expression + vm.currentUser.points.sat + 1) / Math.log(2) );
      alert('success')
    }
  })

  // Raises equation score
  $scope.$on('raise-eq-score', function(event, args) {
    if(vm.currentUser.username){
      var newScore = vm.currentUser.points.equation + 1
      database.child('users').child(vm.currentUser.route).update({
        "points/equation": newScore
      })
      vm.currentUser.points.equation = newScore;
      vm.currentUser.level = Math.floor( Math.log(vm.currentUser.points.equation + vm.currentUser.points.expression + vm.currentUser.points.sat + 1) / Math.log(2) );
      alert('success')
    }
  })

  // Fix Logout
  vm.logout = function(){
    vm.currentUser = {username: ""};
    vm.signedIn = false;
    $state.go('home')
  }
})






