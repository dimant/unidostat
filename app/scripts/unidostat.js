(function () {
    var unidostat = function ($http, $log) {
        var url = "http://localhost:8080/stat.unido.org:443/rest";
        var username, password;
        
        var getConfig = function () {
            return {
                headers: {
                    'Username': username,
                    'Password': password
                }
            }
        };

        var setCredentials = function (_username, _password) {
            username = _username;
            password = _password;
        };

        var isCredentialsSet = function () {
            return username != null && password != null;
        }
        
        var isCredentialsValid = function(_username, _password) {
             return $http
                .get(url + "/dbinfo/" + "INDSTAT%202%202015,%20ISIC%20Revision%203", {
                    headers: {
                        'Username': _username,
                        'Password': _password
                    }
                })
                .then(function(success) {
                    return true;
                });
        }

        var dbList = _.memoize(function () {
            return $http
                .get(url + "/dblist", getConfig())
                .then(function (response) {
                    return response.data.dblist;
                });
        });

        var dbInfo = _.memoize(function (dbName) {
            return $http
                .get(url + "/dbinfo/" + dbName, getConfig())
                .then(function(response) {
                    return response.data.db;
                });
        });

        var createDataQuery = function(db, country, variable, start, end, industry) {
            var query = 
                "db=" + encodeURIComponent(db) + 
                "&cc=" + encodeURIComponent(country) +
                "&variable=" + encodeURIComponent(variable) +
                "&start=" + encodeURIComponent(start) + 
                "&end=" + encodeURIComponent(end) +
                "&isic=" + encodeURIComponent(industry);
            
            return query;
        };

        var _dbData = _.memoize(function(query) {
            console.log(query);
            return $http({
                    method: 'POST',
                    url: url + "/dbdata",
                    data: query,
                    headers: {
                        'username': username,
                        'password': password,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function(response) {
                    return response.data;
                });        
        });
        
        var dbData = function (db, country, variable, start, end, industry) {
            var query = createDataQuery(db, country, variable, start, end, industry);
            return _dbData(query);
        };

        var dbMetaData = _.memoize(function () {
            return null;
        });

        return {
            setCredentials: setCredentials,
            isCredentialsSet: isCredentialsSet,
            isCredentialsValid: isCredentialsValid,
            dbList: dbList,
            dbInfo: dbInfo,
            dbData: dbData,
            dbMetaData: dbMetaData
        };

    };

    var module = angular.module("unidostat");
    module.factory("unidostat", unidostat);

} ());