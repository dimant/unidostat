
describe('dataProcessor service tests', function () {
    var dataProcessor; 
 
    // excuted before each "it" is run. 
    beforeEach(function () { 
      
        // load the module. 
        module('unidostat'); 
  
        // inject your service for testing. 
        // The _underscores_ are a convenience thing 
        // so you can have your variable name be the 
        // same as your injected service. 
        inject(function (_dataProcessor_) {
            dataProcessor = _dataProcessor_;
        });
    });
    
    // check to see if it has the expected function 
    it('should have an newDataProcessor function', function () {
        expect(angular.isFunction(dataProcessor.newDataProcessor)).toBe(true);
    });

    it('should create a valid dataProcessor oject', function () {
        var dP = dataProcessor.newDataProcessor();
        expect(angular.isFunction(dP.addRawData)).toBe(true);
        expect(angular.isFunction(dP.getData)).toBe(true);
        expect(angular.isFunction(dP.getSeries)).toBe(true);
    });

    describe('dataProcessor object tests', function () {
        var dP;
        var dbInfo = {
            db: {
                countries: [
                    { code: '01', name: 'A' },
                    { code: '02', name: 'B' },
                    { code: '03', name: 'C' }
                ],
                periods: [
                    { year: 1963 },
                    { year: 1964 },
                    { year: 1965 }
                ]
            }
        };

        beforeEach(function () {
            dP = dataProcessor.newDataProcessor(dbInfo);
        });
        
        describe('year lists', function() {
           it('should return all years as labels', function() {
               expect(dP.getLabels()).toEqual([1963, 1964, 1965]);
           }); 
        });

        describe('country lists', function () {
            var country1 = {
                data: [
                    { country: '01' },
                    { country: '01' }
                ]
            };

            var country2 = {
                data: [
                    { country: '02' },
                    { country: '02' }
                ]
            };

            it('should convert code to country', function () {
                expect(dP.codeToCountry('01')).toEqual('A');
            });

            it('should contain a country string for each data that has entries', function () {
                dP.addRawData(country1);
                dP.addRawData(country2);
                dP.addRawData({ data: [] });

                expect(dP.getSeries()).toEqual(['A', 'B']);
            });

        });
    });
}); 