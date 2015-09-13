(function() {

    var app = angular.module("unidostat");

    var IndexController = function($scope, appstate, unidostat) {
        
        var logmein = function(valid) {
            if(valid) {
                $scope.disable = true;
                unidostat.isCredentialsValid($scope.user.email, $scope.user.password).then(
                    function(success) {
                        unidostat.setCredentials($scope.user.email, $scope.user.password);
                        appstate.setCredentials($scope.user.email, $scope.user.password);
                        $scope.loggedin = true;
                        $scope.disable = false;
                    },
                    function(error) {
                        $scope.disable = false;
                    }
                );                
            }
        };
        
        var logmeout = function() {
            unidostat.setCredentials(null, null);
            appstate.setCredentials(null, null);
            $scope.loggedin = false;
        }
        $scope.logmein = logmein;
        $scope.logmeout = logmeout;
    };

    app.controller("IndexController", IndexController);

}());