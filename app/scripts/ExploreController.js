(function() {

    var app = angular.module("unidostat");

    var ExploreController = function($scope, $location, $routeParams, $log, unidostat, appstate, appdefaults) {
        $scope.eType = $routeParams.eType;
        
        var collectYears = function(collection) {
            var result = []
            for(var i in collection) {
                result.push(collection[i].year);
            }
            return result;
        }

        var activate = function() {
            $log.info(appstate.getDbInfo());
            
            $scope.years = collectYears(appstate.getDbInfo().periods).sort(function(a,b){return a - b});
            $scope.fromYear = $scope.years[0];
            $scope.toYear = $scope.years[$scope.years.length - 1];
            // unidostat.dbData("INDSTAT 2 2015, ISIC Revision 3", 100, "04", 2008, 2009, [15]).then(function(d){
            //     $log.info(d);
            // });  
        }

        activate();

        $scope.back = function() {
            $location.path("/main");
        }
    };

    app.controller("ExploreController", ExploreController);

}());