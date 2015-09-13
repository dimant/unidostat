(function () {
    var appstate = function ($log) {
        var _state = {};
        var listeners = {};
        
        var propertyChanged = function(propertyName, newValue, oldValue) {
            if(listeners[propertyName] != null) {
                _.each(listeners[propertyName], function(l) {
                    l(newValue, oldValue);
                });
            }
        }
        
        var listenForProperty = function(propertyName, listener) {
            if(listeners[propertyName] == null) {
                listeners[propertyName] = [];
            }
            
            listeners[propertyName].push(listener);
        }
        
        var getCredentials = function() {
            return _state.credentials;
        };
        var setCredentials = function(username, password) {
          var newValue = { 
              username:username,
              password:password
          };
          var oldValue = _state.credentials;          
          _state.credentials = newValue;
          propertyChanged('credentials', newValue, oldValue);
        };
        
        var getDbInfo = function() {
            return _state.dbinfo;
        }
        var setDbInfo = function(dbinfo) {
            var oldValue = _state.dbinfo;
            _state.dbinfo = dbinfo;
            propertyChanged('dbinfo', oldValue, dbinfo);
        }
        
        var getCountries = function() {
            return _state.countries;
        }
        var setCountries = function(countries) {
            var oldValue = _state.countries;
            _state.countries = countries;
            propertyChanged('countries', oldValue, countries);
        }
        
        var getVariables = function() {
            return _state.variables;
        }
        var setVariables = function(variables) {
            var oldValue = _state.variables;
            _state.variables = variables;
            propertyChanged('variables', oldValue, variables);
        }
        
        var getPeriod = function() {
            return _state.period;
        }
        var setPeriod = function(fromYear, toYear){
            var newValue = {
                fromYear:fromYear,
                toYear:toYear
            };
            var oldValue = _state.period;
            _state.period = newValue;
            propertyChanged('period', newValue, oldValue);
        };
        
        var getIndustries = function() {
            return _state.industries;
        }
        var setIndustries = function(industries) {
            var oldValue = _state.industries;
            _state.industries = industries;
            propertyChanged('industries', oldValue, industries);
        }

        return {
            listenForProperty:listenForProperty,
            getCredentials:getCredentials,
            setCredentials:setCredentials,
            getDbInfo:getDbInfo,
            setDbInfo:setDbInfo,
            getCountries:getCountries,
            setCountries:setCountries,
            getVariables:getVariables,
            setVariables:setVariables,
            getPeriod:getPeriod,
            setPeriod:setPeriod,
            getIndustries:getIndustries,
            setIndustries:setIndustries
        };

    };

    var module = angular.module("unidostat");
    module.factory("appstate", appstate);

} ());