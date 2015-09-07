(function() {

    var app = angular.module("unidostat");

    var ExploreController = function($scope, $location, $routeParams, $log) {
        $scope.eType = $routeParams.eType;
        $scope.fromYear = "0";
        $scope.toYear = "3";
        
        $scope.back = function() {
            $location.path("/main");
        }
    };

    app.controller("ExploreController", ExploreController);

}());