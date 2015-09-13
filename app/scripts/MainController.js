(function() {

    var app = angular.module("unidostat");

    var MainController = function($scope, $location, $log, unidostat, appstate) {
        var loggedin = false;
    
        var onDbList = function(dblist) {
            if(loggedin) {
                $scope.availableData = dblist;
            } else {
                $scope.availableData = _.filter(dblist, function(d) {
                    return d.name == "MVA 2014";
                });
            }
            
            if(dblist.length > 0) {
                $scope.selectedData = $scope.availableData[0];
                $scope.availableIndustries = undefined;              
                $scope.availableCountries = undefined;
                selectedDataChanged();                
            }
        }     
                
        var onDbInfo = function(db) {
            appstate.setDbInfo(db);
            
            $scope.availableIndustries = db.isics;              
            $scope.availableCountries = db.countries;
        }
        
        var onError = function(reason){
          $log.error(reason); 
        };
        
        var selectedDataChanged = function() {
            unidostat.dbInfo($scope.selectedData.name).then(onDbInfo, onError);
        }

        var activate = function() {
            unidostat.dbList().then(onDbList, onError);    
        };        
        
        activate();
        
        appstate.listenForProperty('credentials', function(newValue, oldValue) {
            loggedin = unidostat.isCredentialsSet();
            activate();
        });
        
        $scope.selectedDataChanged = selectedDataChanged;
        
        $scope.explore = function(eType, valid) {
            if(valid) {
                appstate.setCountries($scope.selectedCountries);
                appstate.setIndustries($scope.selectedIndustries);
                $location.path("/explore/"+eType+"/"+$scope.selectedData.name);                
            }
        }        
    };

    app.controller("MainController", MainController);

}());