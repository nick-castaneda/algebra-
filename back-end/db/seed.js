////////////////////////////////////////////////////////////////////////
//                              Seed File                             //
////////////////////////////////////////////////////////////////////////

// Seed based on the database models
var SATProb = require('../models/sat-prob');

////////////////////////////////////////////////////////////////////////
exports.seedSatProblems = function(){
  SATProb.find({}).exec(function (err, collection){
    if (collection.length < 2){
      SATProb.create({
        number: 1,
        img: "../../images/prob1/prob1.png",
        choices: {
          a: "../../images/prob1/a.png",
          b: "../../images/prob1/b.png",
          c: "../../images/prob1/c.png",
          d: "../../images/prob1/d.png"
        },
        answer: "a",
        calcPermitted: Boolean
      }),
      SATProb.create({
        number: 2,
        img: "../../images/prob2/prob2.png",
        choices: {
          a: "../../images/prob2/a.png",
          b: "../../images/prob2/b.png",
          c: "../../images/prob2/c.png",
          d: "../../images/prob2/d.png"
        },
        answer: "c",
        calcPermitted: Boolean
      })
    }
  })
}
