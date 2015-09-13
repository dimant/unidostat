(function () {
    var appdefaults = function () {
        var defaults = {};
		
		defaults['INDSTAT 2 2015, ISIC Revision 3'] = {
              country: "100",
              variable: "04",
              start: "2008",
              end: "2009",
              industry:"15"
        };
		
		return defaults;
    };

    var module = angular.module("unidostat");
    module.factory("appdefaults", appdefaults);

} ());