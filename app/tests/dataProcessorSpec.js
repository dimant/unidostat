
describe('dataProcessor tests', function (){ 
    var dataProcessor; 
 
    // excuted before each "it" is run. 
    beforeEach(function (){ 
      
      // load the module. 
      module('unidostat'); 
  
      // inject your service for testing. 
      // The _underscores_ are a convenience thing 
      // so you can have your variable name be the 
      // same as your injected service. 
      inject(function(_dataProcessor_) { 
        dataProcessor = _dataProcessor_; 
      });
    });
    
  // check to see if it has the expected function 
  it('should have an newDataProcessor function', function () {  
    expect(angular.isFunction(dataProcessor.newDataProcessor)).toBe(true); 
  }); 
}); 