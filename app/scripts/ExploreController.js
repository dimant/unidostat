(function () {

    var app = angular.module("unidostat");

    var ExploreController = function ($scope, $location, $routeParams, $log, $q,
        unidostat, appstate, appdefaults, dataProcessor) {
        $scope.eType = $routeParams.eType;
        var dbInfo;
        var dP;



        var getData = function (country, industry, variable, done) {
            unidostat.dbData(
                dbInfo.name,
                country.code,
                variable.code,
                $scope.fromYear,
                $scope.toYear,
                industry.code)
                .then(function (d) {
                    dP.addRawData(d);
                    done();
                });
        };

        var activateCountries = function () {
            return $q(function(resolve, reject) {
                dP = dataProcessor.newDataProcessor(dbInfo, 'country');
                var countries = appstate.getCountries();
                var waiting = countries.length;
                
                var done = function() {
                    waiting = waiting - 1;
                    if (waiting == 0) {
                        resolve();
                    }
                }
    
                _.each(countries, function (c) {
                    getData(c, $scope.selectedIndustry, $scope.selectedVariable, done);
                });                
            });
        };

        var activateIndustries = function () {
            dP = dataProcessor.newDataProcessor(dbInfo, 'isic');
            var industries = appstate.getIndustries();
            var waiting = industries.length;

            _.each(industries, function (i) {
                getData($scope.selectedCountry, i, $scope.selectedVariable);
            });
        };

        var trimXAxis = function () {
            $scope.labels = dP.getLabels($scope.fromYear, $scope.toYear);
        }

        var updateGraph = function () {
            trimXAxis();
            $scope.data = dP.getData($scope.fromYear, $scope.toYear);
            $scope.series = dP.getSeries();
        };

        var activate = function () {
            dbInfo = appstate.getDbInfo();

            $scope.years = _.pluck(dbInfo.periods, 'year').sort();
            $scope.fromYear = $scope.years[0];
            $scope.toYear = $scope.years[$scope.years.length - 1];

            $scope.availableIndustries = dbInfo.isics;
            $scope.selectedIndustry = $scope.availableIndustries[$scope.availableIndustries.length - 1];

            $scope.availableCountries = dbInfo.countries;
            $scope.selectedCountry = $scope.availableCountries[0];
            
            $scope.availableVariables = dbInfo.variables;
            $scope.selectedVariable = $scope.availableVariables[0];

            refresh();
        };

        var refresh = function () {
            if ($scope.eType == 'industries')
                activateIndustries();
            else if ($scope.eType == 'countries')
                $scope.promisedData = activateCountries().then(function() {
                    updateGraph();
                });
        };

        $scope.refresh = refresh;
        $scope.trimXAxis = trimXAxis;

        $scope.back = function () {
            $location.path("/main");
        };

        activate();
    };

    app.controller("ExploreController", ExploreController);

} ());