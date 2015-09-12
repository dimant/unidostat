(function () {
    var dataProcessor = function () {
		
		var newDataProcessor = function(_dbInfo, _groupBy) {
			var dbInfo = _dbInfo;
			var groupBy = _groupBy;
			var grouped = {};
			var decoders = {};
			
			var codeToName = function(collection, code) {
				var result = _.find(collection, function(c) {
					return c.code == code;
				});
				return result.name;				
			}
			
			var codeToCountry = function(code) {
				return codeToName(dbInfo.countries, code);
			}
			
			var codeToISIC = function(code) {
				return codeToName(dbInfo.isics, code);
			}
			
			decoders = {
				country:codeToCountry,
				isic:codeToISIC
			};
			
			var addRawData = function(raw) {
				if(raw.data.length > 0) {
					grouped[raw.data[0][groupBy]] = raw;
				}
			};
			
			var getData = function(start, end) {
				var years = getLabels(start, end);
				var result = [];
				
				_.each(grouped, function(d, c) {
					var flatGrouped = {};
					
					_.each(d.data, function(e) {
						flatGrouped[e.year] = parseInt(e.value);
					});
					
					result.push(_.map(years, function(y) {
						if(flatGrouped[y])
							return flatGrouped[y];
						else
							return 0;
					}));
				});
				
				return result;
			};
			
			var getSeries = function() {
				return _.map(_.keys(grouped), decoders[groupBy]);
			};
			
			var getLabels = function(start, end)  {
				return _.filter(_.pluck(dbInfo.periods, 'year').sort(), function(y) {
					return 	y >= start && y <= end;
				});
			}
			
			return {
				codeToCountry:codeToCountry,
				codeToISIC:codeToISIC,
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