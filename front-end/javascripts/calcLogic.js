// $(document).ready(function(){

  // var inputText = "test"
  // $("#input-box").html(inputText);




  /////////////////////  Equation data structure  /////////////////////
  // Equation Level: [expression, equality or inequality, expression]
  // Expression Level: [term 1] or [term 1, plus or minus, term 2]
  // Term Level: [Bool for sign, [int, divisor], Bool for var, [var?, var] ]
  // Example below: 5x + -3 = -18
  var exampleEquation = [ [ [true, [5, 1], [true, "x"] ], "+", [false, [3, 1], [false] ] ], "=", [ [false, [18, 1], [false] ] ] ]

  // Takes a string equation and converts it to our data structure
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
  function splitExpression(expression){
    var expressionArray = expression.split(' ');
    var expressionTermArray = []
    for(i = 0; i < expressionArray.length; i++){
      if (expressionArray[i].length  == 0){
        expressionArray.splice(i, 1);
        i -= 1;
      }
      else expressionTermArray.push( splitTerm( expressionArray[i] ) );
    }
    return expressionTermArray
  }

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

  function printEquation(equation){
    var equationString = ""
    for(i=0; i<equation.length; i++){
      if(equation[i] == "=") equationString += equation[i];
      else {
        for(j=0; j<equation[i].length; j++){
          if(typeof equation[i][j] == "string") equationString += equation[i][j];
          else {
            if(equation[i][j][1][0] == 0) console.log(0);
            else {
              if(!equation[i][j][0]) equationString += "-";
              equationString += (equation[i][j][1][0] / equation[i][j][1][1]).toString();
              if(equation[i][j][2][0]) equationString += equation[i][j][2][1];
            }
          }
        }
      }
    }
    return equationString;
  }






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
            }
          }
        }
      }
    }
    return equation;
  }

  console.log("5x + -3 = -18")
  var test = convertToDataStructure("5x + -3 = -18")

  console.log(printEquation(hitBothSides(test, "+", 10)))

  // Do later
  function changeSignsAndCancel(){

  }

// })
