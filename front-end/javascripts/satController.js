app.controller('satController', function(satFactory){

  var vm = this;

  vm.test = "dsafdsfads"
  satFactory.all().success(function(data){
    vm.probs = data;
    console.log('hi')
    console.log(vm.probs)
  })

})
