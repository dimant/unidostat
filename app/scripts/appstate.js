(function () {
    var appstate = function ($log) {
        var _state = {};
        var listeners = {};
        
        var propertyChanged = function(propertyName, oldValue, newValue) {
            if(listeners[propertyName] != null) {
                for(var l in listeners[propertyName]) {
                    l(oldValue, newValue);
                }
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
          propertyChanged('credentials', oldValue, newValue);
        };
        
        var getDataSet = function() {
            return _state.dataset;
        };
        var setDataSet = function(dataset) {
            var oldValue = _state.dataset;
            _state.dataset = dataset;
            propertyChanged('dataset', oldValue, dataset);
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
            propertyChanged('period', oldValue, newValue);
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
            getDataset:getDataSet,
            setDataSet:setDataSet,
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