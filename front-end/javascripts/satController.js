app.controller('satController', function(satFactory){

  var vm = this;

  vm.test = "dsafdsfads";
  satFactory.all().success(function(data){
    vm.problems = data;
    console.log('hi')
    console.log(vm.problems[0].img) // fix image files and reseed
  })
  i
})
