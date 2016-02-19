////////////////////////////////////////////////////////////////////////
//                          User Controller                           //
////////////////////////////////////////////////////////////////////////

// Adds controller to the angular app that takes in the userFactory, and
// $http
app.controller('userController', function(userFactory, $http, $scope, $state){
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
  vm.newUser = {username: "", password: "", url: ""}
  vm.register = function(username, pw, url){
    $http({
      method: 'POST',
      url: "http://localhost:3000/users/create",
      data:{
        username: username,
        password: pw,
        picUrl: url
      }
    }).success(function(){
      vm.login(username, pw);
      userFactory.all().success(function(data){
        vm.users = data;
      });
      $state.go('profile');
    })
  }

  // Login
  vm.currentUser = {username: ""}
  $scope.$watch("vm.currentUser")
  vm.login = function (username, pw) {
    $http({
      method: 'GET',
      url: "http://localhost:3000/users/" + username + "/" + pw + "/show"
    }).success(function(data){
      if(data){
        vm.currentUser = data;
        vm.showUserLinks = true;
        $state.go('profile');
      }
    })
  }

  vm.raiseScore = function (category) {
    $http({
      method: 'PUT',
      url: "http://localhost:3000/users/" + username + "/edit",
      data:{
        // category
      }
    }).success(function(data){
      if(data){
        vm.currentUser = data;
        vm.showUserLinks = true;
        $state.go('profile');
      }
    })
  }

  vm.logout = function(){
    vm.currentUser = {username: ""};
    $state.go('home')
  }
})






