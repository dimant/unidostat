(function() {

    var app = angular.module("unidostat");

    var MainController = function($scope, $location, $log) {
        
        $scope.explore = function(eType) {
            $location.path("/explore/"+eType);    
        }
    };

    app.controller("MainController", MainController);

}());