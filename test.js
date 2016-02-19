var example = [ [ [true, [7, 1], [true, "x"] ], "+", [false, [3, 1], [false] ] ], "=", [ [false, [18, 1], [false] ], "+", [true, [2, 1], [true, "x"] ] ] ]

function printEquation(equation){
  var printArray = ['','','','=','','',''];
  // If the side of the equation has only one term, push a "plus" and
  // a zero to the side
  if(equation[0].length == 1){
    equation[0].push("+");
    equation[0].push([true, [0, 1], [false] ]);
  }
  // If both terms are zero, put a zero in the third collumn
  if(equation[0][0][1][0] == 0 && equation[0][2][1][0] == 0) {
    printArray[2] = "0";
  }
  // If only the second term is zero, print the first term to the
  // third collumn
  else if(equation[0][2][1][0] == 0) printArray[2] = printTerm(equation[0][0]);
  // Otherwise print the second term in the first collumn. If the
  // first term is not zero, print the first in the first collumn and
  // the operation in the second collumn.
  else{
    printArray[2] = printTerm(equation[0][2]);
    if( equation[0][0][1][0] !== 0 ){
      printArray[0] = printTerm(equation[0][0]);
      printArray[1] = equation[0][1]
    }
  }
  // Do the same for the second side. Maybe can refactor, but fuck it
  if(equation[2].length == 1){
    equation[2].push("+");
    equation[2].push([true, [0, 1], [false] ]);
  }
  if(equation[2][0][1][0] == 0 && equation[2][2][1][0] == 0) {
    printArray[4] = "0";
  }
  else if(equation[2][0][1][0] == 0) printArray[4] = printTerm(equation[2][2]);
  else{
    printArray[4] = printTerm(equation[2][0]);
    if( equation[2][2][1][0] !== 0 ){
      printArray[6] = printTerm(equation[2][2]);
      printArray[5] = equation[2][1];
    }
  }
  return printArray
}

// Takes a termArray and converts it to a string
// If the term is negative, add "-" to the string.
// If theres a variable, add it to the string with its coefficient.
// Otherwise, just add the number to the string
function printTerm(term){
  var termString = ""
  if ( !term[0] ) termString += "-";
  if ( term[2][0] ) {
    if (term[1][0] / term[1][1] !== 1) termString += (term[1][0] / term[1][1]);
    termString += term[2][1];
  } else termString += (term[1][0] / term[1][1])
  return termString
}

function check(equation){

  var leftZeroCount = 0;
  var rightZeroCount = 0;
  var isolateVarCount = 0;
  var constantCount = 0;

  if(equation[0][0][1][0] == 0) leftZeroCount += 1;
  if(equation[0][2][1][0] == 0) leftZeroCount += 1;
  if(equation[2][0][1][0] == 0) rightZeroCount += 1;
  if(equation[2][2][1][0] == 0) rightZeroCount += 1;

  if(equation[0][0][1][0] == 1 && equation[0][0][2][0]) isolateVarCount += 1;
  if(equation[0][2][1][0] == 1 && equation[0][2][2][0]) isolateVarCount += 1;
  if(equation[2][0][1][0] == 1 && equation[2][0][2][0]) isolateVarCount += 1;
  if(equation[2][2][1][0] == 1 && equation[2][2][2][0]) isolateVarCount += 1;

  if(equation[0][0][1][0] !== 0 && !equation[0][0][2][0]) constantCount += 1;
  if(equation[0][2][1][0] !== 0 && !equation[0][2][2][0]) constantCount += 1;
  if(equation[2][0][1][0] !== 0 && !equation[2][0][2][0]) constantCount += 1;
  if(equation[2][2][1][0] !== 0 && !equation[2][2][2][0]) constantCount += 1;

  if(leftZeroCount == 1 && rightZeroCount == 1 && isolateVarCount == 1 && constantCount == 1) return true;
  else return false;
}




hitBothSides = function(equation, operator, operand){
  if( !/[a-zA-Z]/.test(operand) ) operand = Number(operand)
  for(i=0; i<equation.length; i+=2){
    for(j=0; j<equation[i].length; j+=2) {
      // If both the operand and the terms are constants or if both
      // the operand and the operator have variables, first change the
      // operand to just the coefficient, and then ...
      // FIX for "x" as operand
      if( (!equation[i][j][2][0] && !/[a-zA-Z]/.test(operand) && equation[i][j][1][0] !== 0) || (equation[i][j][2][0] && /[a-zA-Z]/.test(operand) && equation[i][j][1][0] !== 0)) {
        var formatedOperand = /[a-zA-Z]/.test(operand) ? Number(operand.substring(0, operand.length - 1)) : formatedOperand = operand;
        // NEED TO BE FIXED and then commented
        if (operator == "+" && equation[i][j][0]) equation[i][j][1][0] = equation[i][j][1][0] + formatedOperand;
        else if (operator == "-" && equation[i][j][0]) equation[i][j][1][0] = equation[i][j][1][0] - formatedOperand;
        else if (operator == "+" && !equation[i][j][0]){
          equation[i][j][1][0] = (equation[i][j][1][0] * -1) + formatedOperand;
          equation[i][j][0] = true;
        } else if (operator == "-" && !equation[i][j][0]){
          equation[i][j][1][0] = (equation[i][j][1][0] * -1) - formatedOperand;
          equation[i][j][0] = true;
        }
      }
      // NEED TO BE FIXED doesn't wor
      else if (!/[a-zA-Z]/.test(operand) && equation[i][0][1][0] == 0 && equation[i][0][1][0] == 0){
        if(i == 0) equation[i][2] = [true, [Number(operand), 1] [false] ];
        if(i == 2) equation[i][0] = [true, [Number(operand), 1] [false] ];
      }
      // If you're multiplying or dividing both sides, multiply or
      // divide each term by the operand.
      // Error if you divide by zero
      if( !/[a-zA-Z]/.test(operand) ){
        if(operator == "*") equation[i][j][1][0] *= operand;
        if(operator == "/"){
          if (operand == 0) return equation; // flash an error eventually
          else equation[i][j][1][0] /= operand;
        }
      } else if ( /[a-zA-Z]/.test(operand) && ( operator == "*" || operator == "/" ) ){
        return equation; // flash an error eventually
      }
    }
  }
  return equation;
}

console.log(printEquation(example))
// console.log(check(example))

var step1 = hitBothSides(example, "+", "3")
console.log(printEquation(step1))
// console.log(check(step1))

var step2 = hitBothSides(example, "-", "2x")
console.log(printEquation(step2))
console.log(check(step2))

var step3 = hitBothSides(example, "/", "5")
console.log(printEquation(step3))
console.log(check(step3))


// console.log(hitBothSides())

