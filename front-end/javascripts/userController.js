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
  vm.newUser = {username: "", password: "", url: ""}
  vm.register = function(email, username, pw, url){
    database.createUser({
      email: email,
      password: pw
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        database.child('users').push({
          email: email,
          username: username,
          imageURL: url,
          points: {
            equation: 0,
            expression: 0,
            sat: 0
          }
        })
        // Make registered user the current user
        console.log(userData);
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
        for (var i = 0; i < vm.users.length; i++){
          if(vm.users[i].email == email) vm.currentUser = vm.users[i]
        }
        // vm.currentUser.databaseid = authData.
        // $state.go('profile');
        console.log(authData);
      }
    });
  }


  // Fix Score raising
  // $scope.$on('raise-exp-score', function(event, args) {
  //   if(vm.currentUser.username){

  //     var newScore = vm.currentUser.points.expression + 1
  //     $http({
  //       method: 'PUT',
  //       url: "http://ec2-52-36-162-16.us-west-2.compute.amazonaws.com:3000/users/" + vm.currentUser.username + "/edit",
  //       data:{
  //         points: {
  //           expression: newScore,
  //           equation: vm.currentUser.points.equation
  //         }
  //       }
  //     }).success(function(data){

  //       userFactory.all().success(function(data){
  //         vm.users = data;
  //         for(i=0; i<vm.users.length; i++){
  //           vm.users[i].level = Math.floor( Math.log(vm.users[i].points.equation + vm.users[i].points.expression + vm.users[i].points.sat + 1) / Math.log(2) )
  //         }
  //       })
  //       vm.login(vm.currentUser.username, vm.currentUser.password);
  //     })
  //   }

  // })

  // $scope.$on('raise-eq-score', function(event, args) {
  //   if(vm.currentUser.username){

  //     var newScore = vm.currentUser.points.equation + 1
  //     $http({
  //       method: 'PUT',
  //       url: "http://ec2-52-36-162-16.us-west-2.compute.amazonaws.com:3000/users/" + vm.currentUser.username + "/edit",
  //       data:{
  //         points: {
  //           equation: newScore,
  //           expression: vm.currentUser.points.expression
  //         }
  //       }
  //     }).success(function(data){
  //       console.log("success")
  //       userFactory.all().success(function(data){
  //         vm.users = data;
  //         for(i=0; i<vm.users.length; i++){
  //           vm.users[i].level = Math.floor( Math.log(vm.users[i].points.equation + vm.users[i].points.expression + vm.users[i].points.sat + 1) / Math.log(2) )
  //         }
  //       })
  //       vm.login(vm.currentUser.username, vm.currentUser.password);
  //     })
  //   }

  // })

  // Fix Logout
  vm.logout = function(){
    vm.currentUser = {username: ""};
    vm.signedIn = false;
    $state.go('home')
  }
})






