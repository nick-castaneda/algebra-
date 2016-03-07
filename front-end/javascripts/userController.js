////////////////////////////////////////////////////////////////////////
//                          User Controller                           //
////////////////////////////////////////////////////////////////////////

// Adds controller to the angular app that takes in the scope and state
app.controller('userController', function($scope, $state){
  var vm = this;


  // Create a signedIn boolean set to false and currentUser object with
  // an empty username attribute. Tell angular to watch the currentUser
  vm.signedIn = false;
  vm.currentUser = {username: ""}
  $scope.$watch("vm.currentUser")


  // This method grabs all the users from the Firebase database.
  database.child('users').on("value",
    function(snapshot) {
      vm.users = [];
      var users = snapshot.val();
      // Since firebase collections can only store multiple items in an
      // object (as opposed to an array) you have to loop through the
      // properties and push their values (each user) to vm.users.
      for (var property in users) {
        if (users.hasOwnProperty(property)) {
          vm.users.push(users[property]);
        }
      }
      // Loop through each of the users and set their levels to the log
      // base 2 of their scores
      for(var i=0; i<vm.users.length; i++){
        vm.users[i].level = Math.floor( Math.log(vm.users[i].points.equation + vm.users[i].points.expression + vm.users[i].points.sat + 1) / Math.log(2) )
      }
    },
    // Log the error if there is one
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );


  // vm.register grabs the inputs from the register form and registers
  // the user through the Firebase email authorization method
  vm.register = function(email, username, pw, url){
    database.createUser({
      email: email,
      password: pw
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        // If there is no error, create a new user for the database with
        // the registered email, username, the image url (or a default),
        // and an empty points object. Then save the key of the new
        // database object to the route database.
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
        // Using the route variable, update the new user object with a
        // new 'route' attribute set to the route variable. Grab that
        // object from the database, create a currentUser var set to
        // that object and make the 'signedIn' boolean true and go to
        // the profile view.
        database.child('users').child(route).update({
          "route": route
        });
        database.child('users').child(route).on("value",
          function(snapshot){
            vm.currentUser = snapshot.val();
          });
        vm.signedIn = true;
        $state.go('profile');
      }
    });
  }


  // This login method grabs the email and password from the login form
  // and runs it through the Firebase auth method.
  // If there's an error, log it, otherwise, loop through the users, set
  // the currentUser to the one with the same email as the login email.
  // Set the signedIn boolean to true and go to the profile view.
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
        vm.signedIn = true;
        $state.go('profile');
      }
    });
  }


  // When the userController receives the 'raise-exp-score' message from
  // the expressionController (if a user is logged in), raise the user's
  // score by one in both the database and the currentUser object and
  // then recalculate the currentUser's level
  $scope.$on('raise-exp-score', function(event, args) {
    if(vm.currentUser.username){
      var newScore = vm.currentUser.points.expression + 1
      database.child('users').child(vm.currentUser.route).update({
        "points/expression": newScore
      })
      vm.currentUser.points.expression = newScore;
      vm.currentUser.level = Math.floor( Math.log(vm.currentUser.points.equation + vm.currentUser.points.expression + vm.currentUser.points.sat + 1) / Math.log(2) );
    }
  })


  // Same method as above, but with the equation score.
  $scope.$on('raise-eq-score', function(event, args) {
    if(vm.currentUser.username){
      var newScore = vm.currentUser.points.equation + 1
      database.child('users').child(vm.currentUser.route).update({
        "points/equation": newScore
      })
      vm.currentUser.points.equation = newScore;
      vm.currentUser.level = Math.floor( Math.log(vm.currentUser.points.equation + vm.currentUser.points.expression + vm.currentUser.points.sat + 1) / Math.log(2) );
    }
  })


  // When the user logs out, set the currentUser to an object with a
  // blank username, set the signedIn boolean to fallse, and go home.
  vm.logout = function(){
    vm.currentUser = {username: ""};
    vm.signedIn = false;
    $state.go('home');
  }
})






