(function() {

    var app = angular.module("unidostat");

    var ExploreController = function($scope, $location, $routeParams, $log, unidostat, appstate, appdefaults) {
        $scope.eType = $routeParams.eType;
        var db;
        
        var collectYears = function(collection) {
            var result = []
            for(var i in collection) {
                result.push(collection[i].year);
            }
            return result;
        }
        
        var collectValues = function(collection) {
            var result = [];
            var data = collection.data;
            var i;
            for(i = 0; i < data.length; i++) {
                result.push(parseInt(data[i].value));
            }
            return result;
        }
        
        var collectLabels = function(fromYear, toYear) {
            var result = [];
            var i;
            for(i = 0; i < $scope.years.length; i++) {
                if($scope.years[i] >= fromYear && $scope.years[i] <= toYear) {
                    result.push($scope.years[i]);
                }
            }
            return result;
        }
        
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
                    "14", 
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