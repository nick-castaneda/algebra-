app.controller('equationController', function(solverFunctions){

  var vm = this;

  vm.currentEq = []
  vm.post = function(){
    var equationString = $('#input-box').val();
    vm.currentEq = vm.currentEq.length > 0 ? vm.currentEq : solverFunctions.convertStringToDataStructure(equationString);
    var equationStringArr = solverFunctions.printEquation(vm.currentEq);

    $('#firstTerm').append( "<p class='eqPart'>" + equationStringArr[0] + "</p>" )
    $('#firstOperator').append( "<p class='eqPart'>" + equationStringArr[1] + "</p>" )
    $('#secondTerm').append( "<p class='eqPart'>" + equationStringArr[2] + "</p>" )
    $('#equalSign').append( "<p class='eqPart'>" + equationStringArr[3] + "</p>" )
    $('#thirdTerm').append( "<p class='eqPart'>" + equationStringArr[4] + "</p>" )
    $('#secondOperator').append( "<p class='eqPart'>" + equationStringArr[5] + "</p>" )
    $('#fourthTerm').append( "<p class='eqPart'>" + equationStringArr[6] + "</p>" )

    $("#equation-form").css('display', 'none');
    $("#operate-form").css('display', 'block');
  }

  vm.operate = function(){
    var Operation = $("input:radio[name ='operation']:checked").val()
    var Operand = $('#operand-input-box').val()
    var Equation = vm.currentEq;
    // console.log(vm.currentEq)
    vm.currentEq = solverFunctions.hitBothSides(Equation, Operation, Operand);
    // console.log(vm.currentEq)
    vm.post()
  }

  vm.test = "2x+5=7";
  vm.test2 = solverFunctions.printEquation([ [ [true, [7, 1], [true, "x"] ], "+", [false, [3, 1], [false] ] ], "=", [ [false, [18, 1], [false] ], "+", [true, [2, 1], [true, "x"] ] ] ])



})
