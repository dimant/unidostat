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

        var createDataQuery = function(db, country, variable, start, end, industries) {
            var uriJoin = function(arr) {
              var str = [];
              for(var o in arr) {
                  str.push(encodeURIComponent(arr[o]));
              }
              return str.join(',');
            };

            var query = 
                "db=" + encodeURIComponent(db) + 
                "&cc=" + encodeURIComponent(country) +
                "&variable=" + encodeURIComponent(variable) +
                "&start=" + encodeURIComponent(start) + 
                "&end=" + encodeURIComponent(end) +
                "&isic=" + uriJoin(industries);
            
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
        
        var dbData = function (db, country, variable, start, end, industries) {
            var query = createDataQuery(db, country, variable, start, end, industries);
            return _dbData(query);
        };

        var dbMetaData = _.memoize(function () {
            return null;
        });

        return {
            setCredentials: setCredentials,
            isCredentialsSet: isCredentialsSet,
            dbList: dbList,
            dbInfo: dbInfo,
            dbData: dbData,
            dbMetaData: dbMetaData
        };

    };

    var module = angular.module("unidostat");
    module.factory("unidostat", unidostat);

} ());