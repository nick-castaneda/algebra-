// Adds controller to the angular app that takes in the userFactory
app.controller('userController', function(userFactory, $http){

  var vm = this;

  // Run the 'all' function from the userFactory and set the response
  // to an array named users
  userFactory.all().success(function(data){
    vm.users = data;
  })

  // Should be in a factory, but can't make it work
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

})
