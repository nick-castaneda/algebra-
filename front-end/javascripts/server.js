angular.module('algebra', ['ui.router'])
  .config(MainRouter)

function MainRouter($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/equation-solver.html"
    })

  $urlRouterProvider.otherwise("/");
}
