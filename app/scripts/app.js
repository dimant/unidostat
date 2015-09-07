(function(){
    
    var app = angular.module("unidostat", ["ngRoute", "angular-chosen"]);

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
            .when("/explore/:eType", {
                templateUrl: "explore.html",
                controller: "ExploreController"
            })
            .otherwise({redirectTo:"/main"});
    });
    
}());