(function () {
    var dataProcessor = function () {
		
		var newDataProcessor = function(_dbInfo) {
			var dbInfo = _dbInfo;
			var byCountry = {};
			
			var codeToCountry = function(code) {
				var country = _.find(dbInfo.db.countries, function(c) {
					return c.code == code;
				});
				return country.name;
			}
			
			var addRawData = function(raw) {
				if(raw.data.length > 0) {
					byCountry[codeToCountry(raw.data[0].country)] = raw;
				}
			};
			
			var getData = function() {
				var result = [];
				
				_.each(byCountry, function(d, c) {
					
				});
				
				return [];
			};
			
			var getSeries = function() {
				return _.keys(byCountry);
			};
			
			var getLabels = function() {
				return _.pluck(dbInfo.db.periods, 'year');
			}
			
			return {
				codeToCountry:codeToCountry,
				addRawData:addRawData,
				getData:getData,
				getSeries:getSeries,
				getLabels:getLabels
			};
		}

        return {
			newDataProcessor:newDataProcessor
        };

    };

    var module = angular.module("unidostat");
    module.factory("dataProcessor", dataProcessor);

} ());