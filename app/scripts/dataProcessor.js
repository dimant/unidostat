(function () {
    var dataProcessor = function () {
		
		var newDataProcessor = function(_dbInfo) {
			var dbInfo = _dbInfo;
			var rawData = [];
			
			var addRawData = function(raw) {
				rawData.push(raw);
			};
			
			var getData = function() {
				return [];
			};
			
			var getSeries = function() {
				return [];
			};
			
			return {
				addRawData:addRawData,
				getData:getData,
				getSeries:getSeries
			};
		}

        return {
			newDataProcessor:newDataProcessor
        };

    };

    var module = angular.module("unidostat");
    module.factory("dataProcessor", dataProcessor);

} ());