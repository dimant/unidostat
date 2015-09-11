(function() {

    var app = angular.module("unidostat");

    var ExploreController = function($scope, $location, $routeParams, $log, 
        unidostat, appstate, appdefaults, dataProcessor) {
        $scope.eType = $routeParams.eType;
        var db;
        
        var activateCountries = function() {
            $scope.series = [];
            $scope.data = [];
            var countries = appstate.getCountries();
            var i;
            for(i = 0; i < countries.length; i++ ) {
                $scope.series.push(countries[i].name);
                unidostat.dbData(
                    db.name, 
                    countries[i].code, 
                    "D", 
                    $scope.fromYear, 
                    $scope.toYear, 
                    [$scope.selectedIndustry.code])
                    .then(function(d) {
                        $scope.data.push(collectValues(d));
                    });
            }
        };
        
        var activateIndustries = function() {
            
        };
        
        var updateGraph = function() {                       
            $scope.labels = collectLabels($scope.fromYear, $scope.toYear); 
            
            if($scope.eType == 'industries')
                activateIndustries();
            else if($scope.eType == 'countries')
                activateCountries();
        }

        var activate = function() {
            db = appstate.getDbInfo();

            $scope.years = collectYears(db.periods).sort(function(a,b){return a - b});
            $scope.fromYear = $scope.years[0];
            $scope.toYear = $scope.years[$scope.years.length - 1];
            
            $scope.availableIndustries = db.isics;
            $scope.selectedIndustry = $scope.availableIndustries[$scope.availableIndustries.length-1];
            
            $scope.availableCountries = db.countries;
            $scope.selectedCountry = $scope.availableCountries[0];
            updateGraph();
        }

        $scope.updateGraph = updateGraph;

        $scope.back = function() {
            $location.path("/main");
        }

        activate();
    };

    app.controller("ExploreController", ExploreController);

}());