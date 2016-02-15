// $(document).ready(function(){

  // var inputText = "test"
  // $("#input-box").html(inputText);



////////////////////////////////////////////////////////////////////////
//                       Equation data structure                      //
////////////////////////////////////////////////////////////////////////
  // Equation Level: [expression, equality or inequality, expression]
  // Expression Level: [term 1] or [term 1, plus or minus, term 2]
  // Term Level: [Bool for sign, [int, divisor], Bool for var, [var?, var] ]
  // Example below: 5x + -3 = -18
  var exampleEquation = [ [ [false, [3, 1], [false] ] ], "=", [ [false, [18, 1], [false] ] ] ]

////////////////////////////////////////////////////////////////////////
//                      Convert to Data Structure                     //
////////////////////////////////////////////////////////////////////////

  // Takes a string equation and converts it to our data structure.
  // If the equation doesn't have two sides, return an error. Otherwise,
  // run the splitExpression function on each side and push them and an
  // equal sign to the formattedEquation array and return it
  function convertToDataStructure(str){
    var formattedEquation;
    if(str.split('=').length != 2) return "error!, add an equal sign and stick to two expressions";
    else {
      formattedEquation = [
        splitExpression( str.split('=')[0] ),
        "=",
        splitExpression( str.split('=')[1] )
      ]
    }
    return formattedEquation;
  }

  // Takes an expression and converts it to an array of its terms
  // Split the expression at all the spaces.
  function splitExpression(expression){
    var expressionArray = expression.split(' ');
    var expressionTermArray = []
    for(i = expressionArray.length - 1; i >= 0; i--){
      if (expressionArray[i].length  !== 0){
        expressionTermArray.push( splitTerm( expressionArray[i] ) );
      }
    }
    return expressionTermArray
  }

  ///// Make sure changes double negative, and is smart about fractions
  // Takes a term and converts it to an array of its attributes
  function splitTerm(term){
    term = term.trim()
    var termArr = [true, [0, 1], [false] ];
    if (term == '+' || term == '-') return term;
    if(term[0] == '-'){
      termArr[0] = false;
      term = term.substr(1);
    }
    if (/[a-zA-Z]/.test( term[term.length - 1] ) ){
      termArr[2][0] = true;
      termArr[2].push(term[term.length - 1]);
      term = term.substring(0, term.length - 1);
    }
    if(term.length > 0) termArr[1][0] = Number(term);
    return termArr;
  }

////////////////////////////////////////////////////////////////////////
//                           Print Equation                           //
////////////////////////////////////////////////////////////////////////

  //
  function printEquation(equation){
    var printArray = ['','','','=','','',''];
    // First Side
    if(equation[0].length == 1){
      equation[0].push("+");
      equation[0].push([true, [0, 1], [false] ]);
    }
    if(equation[0][0][1][0] == 0 && equation[0][2][1][0] == 0) {
      printArray[2] = "0";
    }
    else if(equation[0][2][1][0] == 0) printArray[2] = printTerm(equation[0][0]);
    else{
      printArray[2] = printTerm(equation[0][2]);
      if( !(equation[0][2][1][0] == 0) ) printArray[0] = printTerm(equation[0][0]);
    }
    // Second Side
    if(equation[2].length == 1){
      equation[2].push("+");
      equation[2].push([true, [0, 1], [false] ]);
    }
    if(equation[2][0][1][0] == 0 && equation[2][2][1][0] == 0) {
      printArray[2] = "0";
    }
    else if(equation[2][2][1][0] == 0) printArray[2] = printTerm(equation[2][0]);
    else{
      printArray[2] = printTerm(equation[2][2]);
      if( !(equation[2][2][1][0] == 0) ) printArray[0] = printTerm(equation[2][0]);
    }
    return printArray
  }

  function printTerm(term){
    var termString = ""
    if ( !term[0] ) termString += "-";
    if ( term[2][0] ) {
      if (term[1][0] / term[1][1] !== 1) termString += (term[1][0] / term[1][1]);
      termString += term[2][1];
    } else termString += (term[1][0] / term[1][1])
    return termString
  }

////////////////////////////////////////////////////////////////////////
//                         Solving Equations                          //
////////////////////////////////////////////////////////////////////////

  // This function allows you to add, subtract, divide, and multiply a
  // constant to both sides of a equation
  //
  function hitBothSides(equation, operation, operator){
    if( !/[a-zA-Z]/.test(operator) ){
      for(i=0; i<equation.length; i+=2){
        for(j=0; j<equation[i].length; j+=2) { // Only works if terms combined
          if(!equation[i][j][2][0]){
            if (operation == "+" && equation[i][j][0]) equation[i][j][1][0] = equation[i][j][1][0] + operator;
            else if (operation == "-" && equation[i][j][0]) equation[i][j][1][0] = equation[i][j][1][0] - operator;
            else if (operation == "+" && !equation[i][j][0]){
              equation[i][j][1][0] = (equation[i][j][1][0] * -1) + operator;
              equation[i][j][0] = true;
            } else if (operation == "-" && !equation[i][j][0]){
              equation[i][j][1][0] = (equation[i][j][1][0] * -1) - operator;
              equation[i][j][0] = true;
            } else if (operation == "*"){

            } else if (operation == "/"){

            }
          }
        }
      }
    }
    return equation;
  }



// })
