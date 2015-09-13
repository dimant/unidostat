(function() {

    var app = angular.module("unidostat");

    var MainController = function($scope, $location, $log, unidostat, appstate) {   
        
        var onDbList = function(db) {
            $scope.availableData = db;
            if(db.length > 0) {
                $scope.selectedData = db[0];
                selectedDataChanged();
            }
        }     
                
        var onDbInfo = function(db) {
            appstate.setDbInfo(db);
            
            $scope.availableIndustries = db.isics;
            $("#industries").trigger("chosen:updated");
            
            $scope.availableCountries = db.countries;
            $("#countries").trigger("chosen:updated");
        }
        
        var onError = function(reason){
          $log.error(reason); 
        };
        
        var selectedDataChanged = function() {
            if($scope.loggedin)
                unidostat.dbInfo($scope.selectedData.name).then(onDbInfo, onError);
        }

        var activate = function() {
            unidostat.dbList().then(onDbList, onError);    
        };        
        
        var logmein = function(valid) {
            if(valid) {
                unidostat.setCredentials($scope.user.email, $scope.user.password);
                unidostat.isCredentialsValid().then(
                    function(success){
                        $scope.loggedin = true;
                    },
                    onError
                );                
            }
        };
        
        var logmeout = function() {
            unidostat.setCredentials("","");
            $scope.loggedin = false;
        }
        
        activate();
        
        $scope.logmein = logmein;
        $scope.logmeout = logmeout;
        $scope.selectedDataChanged = selectedDataChanged;
        
        $scope.explore = function(eType) {
            appstate.setCountries($scope.selectedCountries);
            appstate.setIndustries($scope.selectedIndustries);
            $location.path("/explore/"+eType+"/"+$scope.selectedData.name);
        }        
    };

    app.controller("MainController", MainController);

}());