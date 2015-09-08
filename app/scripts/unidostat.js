(function () {
    var unidostat = function ($http, $log) {
        var url = "https://stat.unido.org/rest";
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
            return $http.get(url + "/dblist", getConfig()).then(function (response) {
                return response.data.dblist;
            });
        });

        var dbInfo = _.memoize(function (dbName) {
            if(isCredentialsSet) {
                return $http.get(url + "/dbinfo/" + dbName, getConfig()).then(function(response) {
                    return response.data.db;
                });
            } else {
                return null;                
            }
        });

        var dbData = _.memoize(function () {
            return null;
        });

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