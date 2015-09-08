(function(){
    
    var app = angular.module("unidostat", ["ngRoute", "localytics.directives"]);

    app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/attributions", {
                templateUrl: "attributions.html",
                controller: "AttributionsController"
            })
            .when("/explore/:eType/:data", {
                templateUrl: "explore.html",
                controller: "ExploreController"
            })
            .otherwise({redirectTo:"/main"});
    });
    
}());