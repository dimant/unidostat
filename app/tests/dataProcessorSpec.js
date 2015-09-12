
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
                ],
                isics: [
                    { code: '20', name: 'AI' },
                    { code: '21', name: 'BI' }
                ]
            }
        };

        var country1 = {
            data: [
                { country: '01', year: 1963, value: 1, isic: '20' },
                { country: '01', year: 1964, value: 2, isic: '20' }
            ]
        };

        var country1a = {
            data: [
                { country: '01', year: 1964, value: 1, isic: '21' },
                { country: '01', year: 1965, value: 2, isic: '21' }
            ]
        };

        var country2 = {
            data: [
                { country: '02', year: 1964, value: 1, isic: '20' },
                { country: '02', year: 1965, value: 2, isic: '20' }
            ]
        };
        
        it('should return all years as labels', function () {
            dP = dataProcessor.newDataProcessor(dbInfo.db);
            expect(dP.getLabels(1963, 1965)).toEqual([1963, 1964, 1965]);
        });

        describe('country lists', function () {
            beforeEach(function () {
                dP = dataProcessor.newDataProcessor(dbInfo.db, 'country');
            });

            it('should convert code to country', function () {
                expect(dP.codeToCountry('01')).toEqual('A');
            });
            
            it('should pad missing years with "0" values', function () {
                dP.addRawData(country1);
                dP.addRawData(country2);

                expect(dP.getData(1963, 1965)).toEqual([[1, 2, 0], [0, 1, 2]]);
            });

            it('should contain a country string for each data that has entries', function () {
                dP.addRawData(country1);
                dP.addRawData(country2);
                dP.addRawData({ data: [] });

                expect(dP.getSeries()).toEqual(['A', 'B']);
            });
        });

        describe('industry lists', function () {
            beforeEach(function () {
                dP = dataProcessor.newDataProcessor(dbInfo.db, 'isic');
            });

            it('should convert code to ISIC', function () {
                expect(dP.codeToISIC('20')).toEqual('AI');
            });
            
            it('should pad missing years with "0" values', function () {
                dP.addRawData(country1);
                dP.addRawData(country1a);

                expect(dP.getData(1963, 1965)).toEqual([[1, 2, 0], [0, 1, 2]]);
            });

            it('should contain a country string for each data that has entries', function () {
                dP.addRawData(country1);
                dP.addRawData(country1a);
                dP.addRawData({ data: [] });

                expect(dP.getSeries()).toEqual(['AI', 'BI']);
            });

        });
    });
}); 