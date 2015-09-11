(function () {
    var dataProcessor = function () {
		
		var newDataProcessor = function(_dbInfo) {
			var dbInfo = _dbInfo;
			var rawData = [];
			var years = [];
			
			var addRawData = function(raw) {
				rawData.push(raw);
			};
			
			var setYears = function(_years) {
				years = _years;
			}
			
			var getData = function() {
				return [];
			};
			
			var getSeries = function() {
				return [];
			};
			
			return {
				addRawData:addRawData,
				getData:getData,
				getSeries:getSeries,
				setYears:setYears
			};
		}

        return {
			newDataProcessor:newDataProcessor
        };

    };

    var module = angular.module("unidostat");
    module.factory("dataProcessor", dataProcessor);

} ());