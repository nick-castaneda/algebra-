////////////////////////////////////////////////////////////////////////
//                             SAT Logic                              //
////////////////////////////////////////////////////////////////////////

// Replace with an SAT get.
var allQuestions = [
  {
    number: 0,
    text: "a"
  },
  {
    number: 1,
    text: "b"
  },
  {
    number: 2,
    text: "c"
  },
  {
    number: 3,
    text: "d"
  },
  {
    number: 4,
    text: "e"
  }
];

var userAnswers = [];

var userQuestions = [];
for(var i = 0; i < allQuestions.length; i++){
  if( userAnswers.contains(allQuestions[i][number]) ) { // Syntax
    userQuestions.push(allQuestions[i])
  }
}

console.log(userQuestions)
