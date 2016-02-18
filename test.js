var example = [ [ [true, [0, 1], [true, "x"] ], "+", [true, [3, 1], [false] ] ], "=", [ [false, [1, 1], [true, "y"] ], "+", [true, [0, 1], [true, "x"] ] ] ]

function test(equation){
    var isolate = [false, false, false];
    if(equation[0][2][2][0] && equation[0][2][1][1] == 1 && equation[0][2][1][1] && equation[1]) isolate[0] = true;
    if(equation[2][0][2][0] && equation[2][0][1][1] == 1 && equation[2][0][1][1]) isolate[0] = true;

    if(!equation[0][2][2][0]) isolate[1] = true;
    if(!equation[2][0][2][0]) isolate[1] = true;

    if(equation[0][0][1][0] == 0 && equation[2][2][1][0] == 0) isolate[2] = true

    console.log(isolate)
    if (isolate[0] && isolate[1] && isolate[2]) return true
    else return false;
  }

console.log(test(example))
