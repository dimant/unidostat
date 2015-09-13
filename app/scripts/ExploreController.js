(function () {

    var app = angular.module("unidostat");

    var ExploreController = function ($scope, $location, $routeParams, $log,
        unidostat, appstate, appdefaults, dataProcessor) {
        $scope.eType = $routeParams.eType;
        var dbInfo;
        var dP;

        var waiting = 0;

        var getData = function (country, industry, variable) {
            unidostat.dbData(
                dbInfo.name,
                country.code,
                variable.code,
                $scope.fromYear,
                $scope.toYear,
                industry.code)
                .then(function (d) {
                    dP.addRawData(d);
                    waiting = waiting - 1;
                    if (waiting == 0) {
                        updateGraph();
                    }
                });
        };

        var activateCountries = function () {
            dP = dataProcessor.newDataProcessor(dbInfo, 'country');
            var countries = appstate.getCountries();
            waiting = countries.length;

            _.each(countries, function (c) {
                getData(c, $scope.selectedIndustry, $scope.selectedVariable);
            });
        };

        var activateIndustries = function () {
            dP = dataProcessor.newDataProcessor(dbInfo, 'isic');
            var industries = appstate.getIndustries();
            waiting = industries.length;

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
            $log.info($scope.data);
        };

        var activate = function () {
            dbInfo = appstate.getDbInfo();
            // test code
            if(!dbInfo) {
                unidostat.setCredentials("diman.todorov@outlook.com", "r0llerball");
                appstate.setDbInfo(indstatDbInfo.db);
                appstate.setCountries([{code: "040", name:"Austria"}]);
                appstate.setIndustries([{code: "04", name: "Employees"}]);
                dbInfo = appstate.getDbInfo();
            }
            // --------

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
                activateCountries();
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