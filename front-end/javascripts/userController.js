////////////////////////////////////////////////////////////////////////
//                          User Controller                           //
////////////////////////////////////////////////////////////////////////

// Adds controller to the angular app that takes in the userFactory, and
// $http
app.controller('userController', function(userFactory, $http){
  var vm = this;

  // Run the 'all' function from the userFactory and set the response
  // to an array named users
  userFactory.all().success(function(data){
    vm.users = data;
  })

  ///// Should be in a factory, but can't make it work.
  // Set up a new user model.
  // When the register form is submited, the attributes are passed to
  // the backend api through the post method.
  ////// change success callback function
  vm.newUser = {username: "", password: ""}
  vm.register = function(username, pw){
    $http({
      method: 'POST',
      url: "http://localhost:3000/users/create",
      data:{
        username: username,
        password: pw
      }
    }).success(function(){
      alert('Score')
    })
  }

  // Login
  vm.loginUser = {username: "", password: ""}
  vm.login = function (username, pw) {
    $http({
      method: 'GET',
      url: "http://localhost:3000/users/" + username + "/" + pw + "/show"
    }).success(function(data){

      if(data) console.log(data);
    })
  }

})






