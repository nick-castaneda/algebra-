var example = [
    [true, true, [4, 1], [true, "x", 2] ],
    [false, true, [8, 1], [false] ],
    [true, false, [1, 1], [true, "x", 2] ],
    [false, false, [2, 1], [false] ],
    [true, false, [10, 1], [true, "x", 3] ]
  ]
var example2 = [
    [true, true, [4, 1], [true, "x", 2] ],
    [false, true, [8, 1], [false] ],
    [true, false, [10, 1], [true, "x", 3] ]
  ]

function test(expression){
  var combined = [  ];

  if(expression[0][3][0]) combined.push( [ expression[0][3][1], expression[0][3][2] ] );
  else combined.push( ["const", 1 ] );

  for(i=1; i<expression.length; i++){
    for(j=0; j<combined.length; j++){
      if( expression[i][3][1] == combined[j][0] && expression[i][3][2] == combined[j][1] ) return false;
    }
    if(expression[i][3][0]) combined.push( [ expression[i][3][1], expression[i][3][2] ] );
    else combined.push( ["const", 1 ] );
  }
  return true;
}

console.log(test(example))
console.log(test(example2))
