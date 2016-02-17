app.controller('equationController', function(satFactory){

  var vm = this;

  vm.test = "dsafdsfads"
  satFactory.all().success(function(data){
    vm.probs = data;
  })


})
