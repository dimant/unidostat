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
				return codeToName(dbInfo.db.countries, code);
			}
			
			var codeToISIC = function(code) {
				return codeToName(dbInfo.db.isics, code);
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
			
			var getData = function() {
				var years = getLabels();
				var result = [];
				
				_.each(grouped, function(d, c) {
					var flatGrouped = {};
					
					_.each(d.data, function(e) {
						flatGrouped[e.year] = parseInt(e.value);
					});
					
					result.push(_.map(years, function(y) {
						return flatGrouped[y];
					}));
				});
				
				return result;
			};
			
			var getSeries = function() {
				return _.map(_.keys(grouped), decoders[groupBy]);
			};
			
			var getLabels = function() {
				return _.pluck(dbInfo.db.periods, 'year');
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