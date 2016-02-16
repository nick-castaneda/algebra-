angular.module('algebra', ['ui.router'])
  .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html"
    })
    .state('equation-solver', {
      url: "/",
      templateUrl: "partials/equation-solver.html"
    })
    .state('expression-simplifier', {
      url: "/",
      templateUrl: "partials/expression-simplifier.html"
    })
    .state('sat-problems', {
      url: "/",
      templateUrl: "partials/sat-problems.html"
    })
    .state('notes', {
      url: "/",
      templateUrl: "partials/notes.html"
    })

  $urlRouterProvider.otherwise("/");
}
