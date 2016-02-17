// Adds controller to the angular app that takes in the userFactory
app.controller('userController', function(userFactory){

  var vm = this;

  // Run the 'all' function from the userFactory and set the response
  // to an array named users
  userFactory.all().success(function(data){
    vm.users = data;
  })

  vm.newUser = {username: "", password: ""}

  vm.register = function(){
    // var jsonUser = $.param({
    //   json: JSON.stringify(vm.newUser) // send json user into userFactory
    // });
    userFactory.create(vm.newUser).success(function(){
      alert("registered!");
    })
  }

})
