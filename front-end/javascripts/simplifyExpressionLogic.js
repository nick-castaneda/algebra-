////////////////////////////////////////////////////////////////////////
//                     Simplify Expression Logic                      //
////////////////////////////////////////////////////////////////////////

  // Each expression is an array of terms
  // Term Structure: [add?, pos?, [num, den], [var?, var, exp]]
  var exampleExpression = [
    [true, true, [4, 1], [true, "x", 2] ],
    [false, true, [8, 1], [false] ],
    [true, false, [1, 1], [true, "x", 2] ],
    [false, false, [2, 1], [false] ]
  ];
  var exampleString = "4x^2 - 8 + -x^2 - -2";

////////////////////////////////////////////////////////////////////////
//                        Printing Expressions                        //
////////////////////////////////////////////////////////////////////////

  // PringExpression takes in an expression in array format and converts
  // it to array of strings. The function loops through the expression
  // array, runs each term through the printTerm function and pushes it
  // to an array, as long as the term isn't 0.
  ///// Collapse the array to 1 dimension and return it
  function printExpression(expArr){
    var strArr = [];
    for(i=0; i<expArr.length; i++){
      if(expArr[i][2][0] !== 0) strArr.push( printTerm( expArr[i] ) );
    }
    return strArr;
  }

  // PrintTerm takes in an expression and returns an array of two
  // strings, the term's leading operation and the term. First set the
  // array's first string to an operation based on the first bolean. If
  // the second boolean is false, push a neg sign to the second boolean.
  function printTerm(termArr){
    var termStrs = ["operation", ""];
    termStrs[0] = termArr[0] ?  "+" : "-";
    if( !termArr[1] ) termStrs[1] += "-";

    // Find the term's constant by dividing its numerator by its
    // denominator. As long the term isn't an isolated variable, convert
    // the number to a string and push it to the second string.
    var constant = termArr[2][0] / termArr[2][1];
    if( constant !== 1 || !termArr[3][0] ) termStrs[1] += String(constant);

    // If the term has a variable, push the variable to the string.
    // Combine html superscript tags with the value of the exponent and
    // push them to the string if the exponent is not 1
    if(termArr[3][0]){
      termStrs[1] += termArr[3][1];
      var exponent = "<sup>" + String(termArr[3][2]) + "</sup>"
      if(termArr[3][2] !== 1) termStrs[1] += exponent;
    }
    return termStrs
  }

  function convertToDataStructure(expStr){
    var expArr
  }



// Tests
console.log(printExpression(exampleExpression));
