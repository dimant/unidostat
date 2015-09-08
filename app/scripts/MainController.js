(function() {

    var app = angular.module("unidostat");

    var MainController = function($scope, $location, $log, unidostat) {   
        
        var onDbList = function(db) {
            $scope.availableData = db;
            if(db.length > 0) {
                $scope.selectedData = db[0];
                selectedDataChanged();
            }
        }     
                
        var onDbInfo = function(db) {
            $scope.availableIndustries = db.isics;
            $("#industries").trigger("chosen:updated");
            
            $scope.availableCountries = db.countries;
            $("#countries").trigger("chosen:updated");
        }
        
        var onError = function(reason){
          $log.error(reason); 
        };
        
        var selectedDataChanged = function() {
            unidostat.dbInfo($scope.selectedData.name).then(onDbInfo, onError);
        }

        var activate = function() {
            unidostat.setCredentials("diman.todorov@outlook.com", "r0llerball");
            unidostat.dbList().then(onDbList, onError);
            unidostat.dbData("INDSTAT 2 2015, ISIC Revision 3", 100, "04", 2008, 2009, [15]).then(function(d){
                $log.info(d);
            });      
        };        
        
        activate();
        
        $scope.explore = function(eType) {
            $location.path("/explore/"+eType+"/"+$scope.selectedData.name);
        }
        
        $scope.selectedDataChanged = selectedDataChanged;
    };

    app.controller("MainController", MainController);

}());